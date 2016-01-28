# Login Flow

This application demonstrates what a React.js based register/login workflow might look like on the Frontend. I used my [react-boilerplate](https://github.com/mxstbr/react-boilerplate) as a starting point — the app thus uses  Redux, PostCSS, react-router, ServiceWorker, AppCache, bcrypt and lots more.

The default username is `AzureDiamond` and the default password is `hunter2`, but feel free to register new users! The registered users are saved to localStorage, so they'll persist across page reloads.

-----

## Authentication

Everything authentication related is collected in the [`js/utils`](js/utils) folder. The actual auth happens in [`auth.js`](js/utils/auth.js), using [`fakeRequest.js`](js/utils/fakeRequest.js) and [`fakeServer.js`](js/utils/fakeServer.js).

`fakeRequest` is a fake XMLHttpRequest wrapper with a syntax similar to [`request.js`](https://github.com/request/request). It simulates network latency too, so loading states are visible. `fakeServer` responds to the fake HTTP requests and pretends to be a real server, storing the current users in localStorage with the passwords encrypted using `bcrypt`.

To change it to real authentication, you’d only have to import `request.js` instead of `fakeRequest.js` and it should work! *(Provided you have a server somewhere and the endpoints configured)*

## Features

- Using [**react-hot-loader**](https://github.com/gaearon/react-hot-loader), your changes in the CSS and JS get reflected in the app instantly without refreshing the page. That means that the **current application state persists** even when you change something in the underlying code! For a very good explanation and demo watch Dan Abramov himself [talking about it at react-europe](https://www.youtube.com/watch?v=xsSnOQynTHs).

- [**Redux**](https://github.com/rackt/redux) is a much better implementation of a flux–like, unidirectional data flow. Redux makes actions composable, reduces the boilerplate code and makes hot–reloading possible in the first place. For a good overview of redux check out the talk linked above or the [official documentation](https://gaearon.github.io/redux/)!

- [**PostCSS**](https://github.com/postcss/postcss) is like Sass, but modular and capable of much more. PostCSS is, in essence, just a wrapper for plugins which exposes an easy to use, but very powerful API. While it is possible to [replicate Sass features](https://github.com/jonathantneal/precss) with PostCSS, PostCSS has an [ecosystem of amazing plugins](http://postcss.parts) with functionalities Sass cannot even dream about having.

- [**react-router**](https://github.com/rackt/react-router) is used for routing in this application. react-router makes routing really easy to do and takes care of a lot of the work.

- [**ServiceWorker**](http://www.html5rocks.com/en/tutorials/service-worker/introduction/) and [**AppCache**](http://www.html5rocks.com/en/tutorials/appcache/beginner/) make it possible to use the application offline. As soon as the website has been opened once, it is cached and available without a network connection. [**`manifest.json`**](https://developer.chrome.com/multidevice/android/installtohomescreen) is specifically for Chrome on Android. Users can add the website to the homescreen and use it like a native app!

## Getting started

1. Clone this repo using `git clone git@github.com:mxstbr/login-flow`.

2. Run `npm install` to install the dependencies.

3. Run `npm start` to start the local web server.

4. Go to `http://localhost:3000` and you should see the app running!

## CSS

The CSS modules found in the `css` subfolders all get imported into the `main.css` file, which get inlined and minified into the `compiled.css` file. To add/change the styling, either write the CSS into the appropriate module or make a new one and `@import` it in the `main.css` file at the appropriate place.

### PostCSS Plugins

The boilerplate uses PostCSS, and includes a few plugins by default:

* `postcss-import`: Inlines `@import`ed stylesheets to create one big stylesheet.

* `postcss-simple-vars`: Makes it possible to use `$variables in your CSS.

* `postcss-focus`: Adds a `:focus` selector to every `:hover`.

* `autoprefixer-core`: Prefixes your CSS automatically, supporting the last two versions of all major browsers and IE 8 and up.

* `cssnano`: Optimizes your CSS file. For a full list of optimizations check [the official website](http://cssnano.co/optimisations/).

* `postcss-reporter`: Makes warnings by the above plugins visible in the console.

For a full, searchable catalog of plugins go to [postcss.parts](http://postcss.parts).

### Folder Structure

The boilerplate comes with a basic folder structure to keep the CSS files organised. This is what the folders are for:

* `base`: Global styling, e.g. setting the box–model for all elements

* `components`: Component specific styling, e.g. buttons, modals,...

* `layout`: Global layouts, e.g. article, homepage,...

* `utils`: Utility files, e.g. variables, mixins, functions,...

* `vendor`: External files, e.g. a CSS reset

## JS

All files that are `import`ed/`require`d somewhere get compiled into one big file at build time. (`build/bundle.js`) Webpack automatically optimizes your JavaScript with `UglifyJS`, so you do not have to worry about that.

### Folder Structure

The folder structure of the JS files reflects how [Redux](https://github.com/gaearon/redux) works, so if you are not familiar with Redux check out the [official documentation](https://gaearon.github.io/redux/).

* `actions`: Actions get dispatched with this/these utility module(s)

* `components`: The main JS folder. All the React components are in this folder, with pages (routes) saved in the `pages` subfolder. E.g. a navigation component `Nav.react.js`

* `constants`: Action constants are defined in this/these utility module(s)

* `reducers`: Reducers manage the state of this app, basically a simplified implementation of Stores in Flux. For an introduction to reducers, watch [this talk](https://www.youtube.com/watch?v=xsSnOQynTHs) by @gaearon.

* `utils`: Utility files.

### Authentication

Authentication happens in `js/utils/auth.js`, using `fakeRequest.js` and `fakeServer.js`. `fakeRequest` is a fake XMLHttpRequest wrapper with a similar syntax to `request.js` which simulates network latency. `fakeServer` responds to the fake HTTP requests and pretends to be a real server, storing the current users in localStorage with the passwords encrypted using `bcrypt`.
To change it to real authentication, you'd only have to import `request.js` instead of `fakeRequest.js` and have a server running somewhere.

## Opinionated features

### Web Fonts

If you simply use web fonts in your project, the page will stay blank until these fonts are downloaded. That means a lot of waiting time in which users could already read the content.

[FontFaceObserver](https://github.com/bramstein/fontfaceobserver) adds a `js-<font-name>-loaded` class to the `body` when the fonts have loaded. You should specify an initial `font-family` with save fonts, and a `.js-<font-name>-loaded` `font-family` which includes your web font.

#### Adding a new font

1. Add the `@font-face` declaration to `base/_fonts.css`.

2. In `base/_base.css`, specify your initial `font-family` in the `body` tag with only save fonts. In the `body.js-<font-name>-loaded` tag, specify your `font-family` stack with your web font.

3. In `js/app.js` add a `<font-name>Observer` for your font.

### Offline access

Using a `ServiceWorker` and the `AppCache`, the application is cached for offline usage. To cache a file, add it to the `urlsToCache` variable in the `serviceworker.js` file.

Once you run locally you will need to terminate the serviceworker when running another app in the same localhost port, to terminate the serviceworker visit `chrome://inspect/#service-workers` find the path to your localhost and terminate the worker. You might need to stop the worker if terminating wasn't enough `chrome://serviceworker-internals` then find the path to your localhost and stop/unregister.

### Add To Homescreen

On Chrome for Android (soon hopefully more browsers), users can add a webpage to the homescreen. Combined with offline caching, this means the app can be used exactly like a native application.

## Gotchas

These are some things to be aware of when using this boilerplate.

### Images in the HTML file(s)

Adding images to the HTML is a bit of a pain right now as webpack only goes through the JavaScript file. Add the image to your HTML file how you always would:

```HTML
<!-- Normal Image -->
<img src="img/yourimg.png" />
<!-- Meta tags -->
<meta property="og:image" content="img/yourimg.png" />
<!-- ... -->
```

If you simply do this, webpack will not transfer the images to the build folder. To get webpack to transfer them, you have to import them with the file loader in your JavaScript somewhere, e.g.:

```JavaScript
import 'file?name=[name].[ext]!../img/yourimg.png';
```

Then webpack will correctly transfer the image to the build folder.

## License

This project is licensed under the MIT license, Copyright (c) 2015 Maximilian Stoiber. For more information see `LICENSE.md`.
