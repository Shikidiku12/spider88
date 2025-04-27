FROM php:8.2-fpm-alpine

ARG UID=1000
ARG GID=1000

ENV UID=${UID}
ENV GID=${GID}

RUN addgroup -g ${GID} --system laravel
RUN adduser -G laravel --system -D -s /bin/sh -u ${UID} laravel
RUN sed -i "s/user = www-data/user = laravel/g" /usr/local/etc/php-fpm.d/www.conf
RUN sed -i "s/group = www-data/group = laravel/g" /usr/local/etc/php-fpm.d/www.conf

RUN apk add --no-cache zip libzip-dev
RUN docker-php-ext-install pdo pdo_mysql
RUN docker-php-ext-configure zip
RUN docker-php-ext-install zip

RUN apk add --virtual build-dependencies --no-cache autoconf gcc g++ make freetype-dev zlib-dev libpng-dev libjpeg-turbo-dev libmcrypt-dev openssl ca-certificates libxml2-dev oniguruma-dev

RUN docker-php-ext-configure gd --enable-gd --with-freetype=/usr/include/freetype2/ --with-jpeg=/usr/include/
RUN docker-php-ext-install gd
RUN docker-php-ext-enable gd

RUN php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');"
RUN php -r "if (hash_file('sha384', 'composer-setup.php') === 'dac665fdc30fdd8ec78b38b9800061b4150413ff2e3b6f88543c636f7cd84f6db9189d43a81e5503cda447da73c7e5b6') { echo 'Installer verified'; } else { echo 'Installer corrupt'; unlink('composer-setup.php'); } echo PHP_EOL;"

RUN php composer-setup.php
RUN php -r "unlink('composer-setup.php');"
RUN mv composer.phar /usr/local/bin/composer

WORKDIR /var/www/html

COPY . .

RUN composer install
RUN php artisan key:generate

EXPOSE 9000
