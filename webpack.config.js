/**
 * WebPack Config to be used with classic backend servers (e.g. WordPress, ...)
 * Copyright: Rasso Hilbr <mail@rassohilber.com>
 * License: ISC
 * 
 * Features:
 *    – Transpilation of JS(+TypeScript) and SCSS
 *    – Support for dynamic imports [e.g. await import(...)]
 *    – Handling of assets (Fonts, Images)
 *    – HTTPS support
 *    – Support for css autoprefixer and logical properties
 *    – Debugging over local network (BrowserSync Proxy)
 *    – Live reloading with automatic snippet injection
 *    - Optionally watches extra files and reloads the browser if they change
 * 
 * Usage: See "scripts" in package.json 
 * 
 */

/**
 * Settings
 */
const settings = {
  entryPoints: {
    app: ['./assets-src/js/app.js'],
  },
  outputPath: 'assets',
  hostname: 'swup.test',
  key: '/Applications/MAMP/Library/OpenSSL/certs/swup.test.key',
  cert: '/Applications/MAMP/Library/OpenSSL/certs/swup.test.crt',
  watchExtraFiles: '**/**.php',
  target: 'es2017'
}

/**
 * Imports
 */
const path = require('path')
const { ESBuildMinifyPlugin } = require('esbuild-loader')
const RemoveEmptyScriptsPlugin = require('webpack-remove-empty-scripts')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const LiveReloadPlugin = require('webpack-livereload-plugin')
const browserSync = require('browser-sync')
const fs = require('fs')
const chokidar = require('chokidar')
const { fileURLToPath } = require('url')
const _ = require('lodash')

/**
 * Live Reloading
 */
const initLiveReloadPlugin = () => {
  const options = {
    key: fs.readFileSync(settings.key),
    cert: fs.readFileSync(settings.cert),
    useSourceHash: true,
    appendScriptTag: true,
  }
  const liveReloadPlugin = new LiveReloadPlugin(options)
  
  if( settings.watchExtraFiles ) attachFileWatcher(liveReloadPlugin)

  return liveReloadPlugin
}

/**
 * Attach a file watcher for extra files to the liveReloadPlugin
 */
const attachFileWatcher = (liveReloadPlugin) => {
  const reload = path => {
    liveReloadPlugin.logger.info(`${path} changed, reloading...`);
    // this goes through to tiny-lr that is being used by LiveReloadPlugin
    liveReloadPlugin.server.notifyClients([path])
  }
  const watcher = chokidar.watch(settings.watchExtraFiles, {
    ignored: ['node_modules', 'vendor'], 
    ignoreInitial: true,
    followSymlinks: false,
    atomic: false
  })
  watcher
    .on('change', _.throttle(reload, 300))
    .on('unlink', _.throttle(reload, 300))
}

/**
 * Init BrowserSync for local mobile debugging
 */
const initBrowserSync = () => {
  let url = `https://${settings.hostname}`;
  url += settings.publicPath || '';
  const options = {
    proxy: url,
    ui: false,
    port: 12345,
    ghostMode: false,
    open: false,
    notify: false,
    injectChanges: false,
  };
  return browserSync.create().init(options);
}

/**
 * Setup the config
 */
let config = {
	entry: settings.entryPoints,
	output: {
    publicPath: 'auto',
		path: path.resolve(__dirname, settings.outputPath),
		clean: true,
    assetModuleFilename: '[name].[hash][ext][query]',
    chunkFilename: '[name].chunk.[contenthash].js'
	},
	module: {
		rules: [
      {
        test: /\.(t|j)sx?$/,
        loader: 'esbuild-loader',
        options: {
          target: settings.target
        }
      },
			{
        test: /\.(scss|css)$/,
        use: [
          MiniCssExtractPlugin.loader, 
          'css-loader', 
          'postcss-loader', 
          'sass-loader'
        ],
			},
      {
         test: /\.(png|jpg|gif|svg)$/,
         type: 'asset/resource',
      }, 
      {
         test: /.(ttf|otf|eot|woff(2)?)$/,
         type: 'asset/resource',
         generator: {
           filename: '[name][ext]'
         }
      },
      {
        test: /\/static\//,
        type: 'asset/resource',
        generator: {
          filename: 'static/[name][ext]'
        }
      }
		]
	},
	resolve: {
		extensions: ['.tsx', '.ts', '.js']
	},
	optimization: {
		minimizer: [new ESBuildMinifyPlugin({
      target: settings.target,
    })]
	},
	plugins: [
		new RemoveEmptyScriptsPlugin(),
		new MiniCssExtractPlugin(),
  ]
}

/**
 * Adjust the config depending on the --mode
 * @see https://webpack.js.org/configuration/mode/
 * @param {object} env  set via --env flag
 * @param {object} argv 
 * @returns 
 */
module.exports = (env, argv) => {
  
  if (argv.mode === 'development') {
    config.devtool = 'cheap-source-map'
    initBrowserSync()
    config.plugins.push(initLiveReloadPlugin())
  }

  return config;
};