var debug = !(process.env.ENV === 'production');
const autoprefixer = require('autoprefixer');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const sassLoaders = [
  'css-loader',
  'postcss-loader',
  'sass-loader?includePaths[]='+ path.resolve(__dirname, 'node_modules')
];

module.exports = function(config) {
    config.set({
        basePath: '',
        frameworks: ['mocha', 'chai', 'sinon'],
        files: [
            './test/test_index.js'
        ],
        exclude: [],
        preprocessors: {
            './test/test_index.js': ['webpack', 'sourcemap']
        },
        webpack: {
            devtool: 'inline-source-map',
            plugins: [
                new ExtractTextPlugin('bundle.css')
            ],
            postcss: [
                autoprefixer({
                    browsers: ['last 2 versions']
                })
            ],
            module: {
                loaders: [{
                        test: /\.(ts|tsx)$/,
                        exclude: /node_modules/,
                        loader: 'ts-loader'
                    },
                    //Configuration required by enzyme
                    {
                        test: /\.json$/,
                        include: /node_modules/,
                        loader: 'json-loader'
                    },
                    {
                        test: /\.scss?$/,
                        loader: ExtractTextPlugin.extract('style-loader', sassLoaders.join('!'))
                    }
                ]
            },
            resolve: {
                //Added .json extension required by cheerio (enzyme dependency)
                extensions: ['', '.js', '.ts', '.tsx', '.json', '.scss']
            },
            //Configuration required by enzyme
            externals: {
                'react/addons': true,
                'react/lib/ExecutionEnvironment': true,
                'react/lib/ReactContext': 'window',
                'Config': JSON.stringify(debug ? {
                    serverUrl: "http://localhost:8080/api"
                } : {
                    serverUrl: "/api"
                })
                    }
        },
        webpackMiddleware: {
            // webpack-dev-middleware configuration
            // i. e.
            noInfo: true
        },

        reporters: ['spec'],
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: true,
        browsers: ['Chrome'],
        singleRun: true,
        concurrency: Infinity
    })
}
