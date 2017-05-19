let debug = !(process.env.ENV === 'production');
let webpack = require('webpack');
let path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const sassLoaders = [
    'css-loader',
    'postcss-loader',
    'sass-loader?includePaths[]=' + path.resolve(__dirname, 'node_modules')
];

module.exports = {
    entry: "./src/Index.tsx",
    output: {
        filename: "bundle.js",
        path: "dist",
        publicPath: '/'
    },

    // Enable sourcemaps for debugging webpack's output.
    devtool: debug ? "eval-cheap-source-map" : "source-map",

    plugins: [
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.DedupePlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        }),

        new webpack.optimize.UglifyJsPlugin({
            mangle: true,
            compressor: {
                warnings: false
            }
        }),
        new ExtractTextPlugin('bundle.css'),
        new HtmlWebpackPlugin({
            title: "TSAP",
            template: "templates/index.ejs"
        })
    ],

    externals: {
        'Config': JSON.stringify({
            serverUrl: "http://http://consume-backend-prod.pms5mbrhfk.ca-central-1.elasticbeanstalk.com/"
        })
    },

    postcss: [
        autoprefixer({
            browsers: ['last 2 versions']
        })
    ],

    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: ["", ".webpack.js", ".web.js", ".ts", ".tsx", ".js", ".scss"]
    },

    module: {
        loaders: [
            // All files with a '.ts' or '.tsx' extension will be handled by 'ts-loader'.
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                loader: "ts-loader"
            },
            {
                test: /\.scss?$/,
                loader: ExtractTextPlugin.extract('style-loader', sassLoaders.join('!'))
            },
            {
                test: /\.css$/,
                loader: 'style!css?modules',
                include: /flexboxgrid/,
            }
        ],

        preLoaders: [
            // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
            { test: /\.js$/, loader: "source-map-loader" }
        ]
    },
};