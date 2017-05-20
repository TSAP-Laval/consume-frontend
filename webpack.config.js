let debug = !(process.env.ENV === 'production');
let webpack = require('webpack');
let path = require('path');
const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: "./src/index.tsx",
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, 'dist'),
    },

    // Enable sourcemaps for debugging webpack's output.
    devtool: debug ? "eval-cheap-source-map" : "source-map",

    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
            }
        }),

        new webpack.optimize.UglifyJsPlugin({
            mangle: true,
            compressor: {
                warnings: false
            }
        }),
        new HtmlWebpackPlugin({
            title: "TSAP",
            template: "templates/index.ejs"
        })
    ],

    externals: {
        'Config': JSON.stringify({
            serverUrl: "http://consume-backend-prod.pms5mbrhfk.ca-central-1.elasticbeanstalk.com/"
        })
    },

    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: [".webpack.js", ".web.js", ".ts", ".tsx", ".js", ".scss"]
    },

    module: {
        rules: [
            // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
            { test: /\.js$/, loader: "source-map-loader" },
            { test: /\.tsx?$/, use: 'ts-loader'}
        ]
    },
};
