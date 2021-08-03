# workbox-demo
Using workbox in many scenarios with Webpack, typescript, eslint.

## Core Concepts

- caching strategies
- Registering routes
- Custome cache settings

## Scenarios

- cache only
- cache first
- network only
- network first
- stale while revalidate
- push notifications

- Offline article listing
via Window.caches
  accessing cache API with window object.
- background sync
  for binary request bodies
  perfect for large video, image uploads or other mediums.
    for re-trying uploads

## Choosing a Strategy

| Type | Changes | Strategy|
| --- | --- | --- |
| Needed at launch (index.html, script.js, styles.css) | Rarely | cacheOnly (default) |
| "Cache when used" Images, media | Sometimes | CacheFirst |
| Time-sensitive: e.g. News, Weather | Frequently | networkFirst |
| User avatars, etc. | Rarely, but important to user | staleWhileRevalidate |


## Brief

- [ ] STITCH #1
- use two html
try re-navigating back to index.html when refresh browser after offline.

- [x] STICH # 2
try with separate css file instead of inline

- [ ] STICH # 3
Create an offline.html ui
  - with styles
  - with javascript
  - with images
  - with google fonts

- [ ] STICH # 4
Create a network first request
with a fetch request, hold current data from JSON API or NEWS API.

- [ ] STICH # 5
Create a push notification subscribe

- [ ] STICH # 6
Try with `GenerateSW`
- cache only
- cache first
- network only
- network first
- stale while revalidate

- [ ] STICH # 6
Save input

Write
- offline
Send
- Online
Input back, not send


## Technologies

JSON Placeholder
News API

Splash API


## Dev setup (temp)

### NPM Packages

**dev-dependency**

* Webpack
    * [x] webpack
    * [x] webpack-cli
    * [x] webpack-dev-server
    * [ ] webpack-bundle-analyzer (optional; debugging: optimization helper tool)
    Loaders
        * [x] css-loader
        * [x] style-loader (option #1 CSS injection method: for inline style)
        * [x] sass-loader
        * [x] postcss-loader
        * [x] resolve-url-loader (helps sass locate repo outside its own folder, otherwise it is restricted)
        * [ ] file-loader (optional)
        * [x] babel-loader
        * [ ] ts-loader (with TypeScript; WARNING, exclude `babel-loader` - it is its replacement; Not Recommended)
    Plugins
        * [x] mini-css-extract-plugin (option #2 CSS injection method: for separate stylesheet)
        * [x] html-webpack-plugin
        * [x] clean-webpack-plugin
        * [x] workbox-webpack-plugin (optoinal; to build Service Worker)
        * [ ] image-minimizer-webpack-plugin
        * [ ] fork-ts-checker-notifier-webpack-plugin (with TypeScript; dependen `fork-ts-checker-notifier-webpack-plugin`)
        * [ ] fork-ts-checker-webpack-plugin (with TypeScript; for fast build minus browser support)

* [x] sass (AKA `dart-sass` --since 2020)
* [x] postcss
* [x] postcss-preset-env
* [x] typescript

Babel
* [x] @babel/core
* [x] @babel/preset-env
    Plugins
        * [ ] @babel/proposal-class-properties
        * [ ] @babel/proposal-object-rest-spread
        * [ ] @babel/plugin-transform-runtime (Often used with React)
        * [ ] @babel/runtime (Often used with React)
    With React
        * [ ] @babel/preset-react (with React)
    With TypeScript
        * [x] @babel/preset-typescript (with TypeScript)

React
    With TypeScript
    * [ ] @types/react (with React; integrate TypeScript support)
    * [ ] @types/react-dom (with React; integrate TypeScript support)
    * [ ] @types/react-router-dom (with React)
    * [ ] @types/react-router (with React)
    * [ ] @types/react-transition-group (with React)
    * [ ] @types/react-test-renderer (with React)

Testing Framework
* [ ] jest (optional; for Unit Testing)
* [ ] playwright (optional; for E2E Testing)
* [ ] jest-playwright-preset
    Jest With TypeScript
    * [ ] ts-jest
    * [ ] @types/jest

Terminal
* [ ] cross-env (allow environment variable setup for varous OS with on universal syntax)

Simple Server (to test for current user experience)
* [ ] http-server

Image File Compressions (optional)
    Lossless
    * [ ] imagemin-jpegtran
    * [ ] imagemin-optipng
    Lossy
    * [ ] imagemin-mozjpeg
    * [ ] imagemin-pngquant
    Misc
    * [ ] imagemin-svgo
    * [ ] imagemin-gifsicle
    * [ ] imagemin-webp

Linters
Eslint
* [x] eslint
    With Prettier
    * [x] prettier
    * [x] eslint-plugin-prettier (eslint plugin for prettier)
    * [x] eslint-config-prettier (eslint config for prettier)
    With Vanilla JavaScript
    * [ ]
    With TypeScript
    * [x] @typescript-eslint/parser
    * [x] @typescript-eslint/eslint-plugin
    With React
    * [ ] eslint-plugin-react
    * [ ] eslint-plugin-react-hooks

Linters: Airbnb Config
```
npm info "eslint-config-airbnb@latest" peerDependencies
```
* [ ] (eslint with Vanilla JavaScript)
```
npx install-peerdeps --dev eslint-config-airbnb-base
```

**dependency**
* [ ] core-js (mandatory; for further older browsers support such as IE)
* [ ] react (with React)
* [ ] react-dom (with React)


## maxAgeSeconds

* 1 year
maxAgeSeconds: 60 * 60 * 24 * 365
* 1 day
maxAgeSeconds: 60 * 60 * 24
* 1 hour
maxAgeSeconds: 60 * 60

