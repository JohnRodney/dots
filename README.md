# Dots

Dots is a browser based canvas game written in es6 and then compiled (babel) + bundled (webpack) into a 3 part file application.

  - index.html
  - bundle.js
  - styles.css

# npm scripts

  - npm run dev-compiler
  -- sets babel to watch src directory and transpile to dist directory
  - npm run bundle
  -- runs webpack on transpiled result and bundles to dist/bundle.js
  - npm run dev-server
  -- runs live-server in the directory to host the game


Coming Soon:
  - Server API with endpoints for multiple games
  - Database for hosting user and multiple game highscore / player gamesave
  - Universal currency for powerups in games

### Tech

* [canvas] - HTML canvas
* [node.js] - evented I/O for the backend
* [Express] - fast node.js network app framework [@tjholowaychuk]
* [Webpack] - the streaming build system
* [Internal Classes For Games] - building blocks for making games easier
* [xenos-generator] - generate fast game prototype bases

### Installation

clone this repo
`npm install`
`npm install -g babel-cli`
`npm install -g live-server`

`npm run dev-server`
