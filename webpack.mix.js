let mix = require('laravel-mix');

require('laravel-mix-tailwind');

mix.postCss('src/assets/css/main.css', 'shopify/assets', [
  require('tailwindcss'),
]);

mix.babel(
  'src/assets/js/util/local-storage.js',
  'dist/js/util/local-storage.js',
);
// mix.babel('src/assets/js/reviews.js', 'dist/js/reviews.js');
mix.babel('src/assets/js/cookie.js', 'dist/js/cookie.js');
mix.babel('src/assets/js/cart.js', 'dist/js/cart.js');
mix.babel('src/assets/js/easycart.js', 'dist/js/easycart.js');
// mix.babel('src/assets/js/spr-badge-fix.js', 'dist/js/spr-badge-fix.js');
mix.babel('src/assets/js/snippets/liking-badge.js', 'dist/js/liking-badge.js');
//mix.babel('node_modules/alpinejs/dist/alpine.js', 'dist/js/alpine.js');

mix.scripts(
  [
    'node_modules/jquery/dist/jquery.min.js',
    'node_modules/alpinejs/dist/alpine.js',
    'src/assets/js/cart.min.js',
    //'dist/js/cart.min.js',
    'dist/js/util/local-storage.js',
    'dist/js/cookie.js',
    // 'dist/js/reviews.js',
    'dist/js/cart.js',
    'dist/js/easycart.js',
    // 'dist/js/spr-badge-fix.js',
    'dist/js/liking-badge.js',
    'src/assets/js/infinite-scrolling.js',
  ],
  'shopify/assets/main.js',
);

mix.scripts(
  ['shopify/assets/theme.dev.js'],
  'shopify/assets/theme-customized.js',
);
mix.minify(['shopify/assets/theme-customized.js']);
