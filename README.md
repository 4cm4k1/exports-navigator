# GREATER MSP: Exports Navigator

## Overview
Web portal for [GREATER MSP](https://greatermsp.org) and its 16-county region businesses to navigate the complicated ecosystem of exports

## Team members
* [Liz Kerber](https://github.com/emkerber)
* [Anthony Maki](https://github.com/4cm4k1)
* [Kyle Quamme](https://github.com/kylequamme)
* [Sahasha Reese](https://github.com/HerCode)
* [Katie Vogel](https://github.com/katiebvogel)

## Installation
Use the following one-liner shell code to clone this repo, change your directory, and install all the npm packages to `node_modules` (be sure to execute this code inside of the directory where you prefer to keep your coding projects):

```sh
git clone https://github.com/4cm4k1/exports-navigator.git && cd exports-navigator && npm install
```

## Development

The following Grunt tasks (listed by command line keywords) are available to assist development:
* `grunt`: runs the default task, which consists of `jshint`, `uglify`, `cssmin`, and `watch`, and only terminates on error or `Ctrl-C`
* `grunt copy`: copies specified vendor libraries from `node_modules` to `public/assets/vendors`
* `grunt cssmin`: minifies CSS files in `client/styles` and exports to `public/assets/styles/style.min.css`
* `grunt jshint`: evaluates all JS files except the `.min.js` file for proper syntax and other errors
* `grunt uglify`: minifies JS files in `client/scripts` and exports to `public/assets/scripts/client.min.js`

Also, `nodemon` is recommended. It runs `npm start` and monitors the project for any changes, after which it will restart the server. No more repeated `npm start`! Install nodemon globally with this command: `npm install nodemon -g`

Using the `grunt` default task and `nodemon` in conjunction makes development significantly more buttery smooth.
