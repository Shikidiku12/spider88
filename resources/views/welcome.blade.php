<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" data-bs-theme="dark">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0">

    <!-- PWA setup -->
    <!-- Android -->
    <link rel="manifest" href="/manifest.json" />
    <meta name="theme-color" content="#1c1c1c" />

    <meta name="apple-mobile-web-app-capable" content="yes" />
    <meta name="mobile-web-app-capable" content="yes" />

    <!-- IOS -->
    <link rel="apple-touch-icon" sizes="16x16" href="/pwa/icons/ios/16.png" />
    <link rel="apple-touch-icon" sizes="20x20" href="/pwa/icons/ios/20.png" />
    <link rel="apple-touch-icon" sizes="29x29" href="/pwa/icons/ios/29.png" />
    <link rel="apple-touch-icon" sizes="32x32" href="/pwa/icons/ios/32.png" />
    <link rel="apple-touch-icon" sizes="40x40" href="/pwa/icons/ios/40.png" />
    <link rel="apple-touch-icon" sizes="50x50" href="/pwa/icons/ios/50.png" />
    <link rel="apple-touch-icon" sizes="60x60" href="/pwa/icons/ios/60.png" />
    <link rel="apple-touch-icon" sizes="64x64" href="/pwa/icons/ios/64.png" />
    <link rel="apple-touch-icon" sizes="72x72" href="/pwa/icons/ios/72.png" />
    <link rel="apple-touch-icon" sizes="76x76" href="/pwa/icons/ios/76.png" />
    <link rel="apple-touch-icon" sizes="80x80" href="/pwa/icons/ios/80.png" />
    <link rel="apple-touch-icon" sizes="87x87" href="/pwa/icons/ios/87.png" />
    <link rel="apple-touch-icon" sizes="100x100" href="/pwa/icons/ios/100.png" />
    <link rel="apple-touch-icon" sizes="114x114" href="/pwa/icons/ios/114.png" />
    <link rel="apple-touch-icon" sizes="120x120" href="/pwa/icons/ios/120.png" />
    <link rel="apple-touch-icon" sizes="128x128" href="/pwa/icons/ios/128.png" />
    <link rel="apple-touch-icon" sizes="144x144" href="/pwa/icons/ios/144.png" />
    <link rel="apple-touch-icon" sizes="152x152" href="/pwa/icons/ios/152.png" />
    <link rel="apple-touch-icon" sizes="167x167" href="/pwa/icons/ios/167.png" />
    <link rel="apple-touch-icon" sizes="180x180" href="/pwa/icons/ios/180.png" />
    <link rel="apple-touch-icon" sizes="192x192" href="/pwa/icons/ios/192.png" />
    <link rel="apple-touch-icon" sizes="256x256" href="/pwa/icons/ios/256.png" />
    <link rel="apple-touch-icon" sizes="512x512" href="/pwa/icons/ios/512.png" />
    <link rel="apple-touch-icon" sizes="1024x1024" href="/pwa/icons/ios/1024.png" />

    <link rel="apple-touch-icon" sizes="1024x1024" href="/pwa/icons/ios/1024.png" />
    <link rel="apple-touch-startup-image" sizes="512x512" href="/pwa/icons/ios/512.png" />
    <link rel="apple-touch-startup-image" sizes="256x256" href="/pwa/icons/ios/256.png" />
    <link rel="apple-touch-startup-image" sizes="192x192" href="/pwa/icons/ios/192.png" />

    <!-- Windows -->
    <meta name="msapplication-config" content="/browserconfig.xml" />
    <meta name="msapplication-TileColor" content="#1c1c1c" />
    <meta name="msapplication-TileImage" content="/pwa/icons/Square150x150Logo.scale-100.png" />
    <!-- PWA setup ends here -->

    <title>88LAICAI</title>
    <script src="https://login.flyingdragon88.com/jswrapper/flyingdragon88/integration.js"></script>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@200;300;400;500;700;800&family=Montserrat:wght@200;300;400;500;700;800&family=Rubik:wght@200;300;400;500;700;800&family=Poppins:wght@200;300;400;500;700;800&display=swap" rel="stylesheet">
    <link rel="icon" type="/images/" href="/images/favicon.ico">
    @viteReactRefresh
    @vite([
    'resources/sass/app.scss',
    'resources/js/app.js',
    ])
    @vite([
    'resources/js/main.jsx',
    ])
</head>

<body class="pb-5">
    <div id="root"></div>
</body>

</html>