<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" data-bs-theme="dark">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <title>Horizon88</title>
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
