'use strict';

var path = require('path');

module.exports = {
    entry: {
        main: './main.jsx'
    },
    output: {
        path: path.join(__dirname, 'bundles'),
        filename: '[name].bundle.js',
        publicPath: '/bundles/'
    },
   resolve: {
        extensions: ['', '.html', '.js', '.json', '.scss', '.css'],
        alias: {
            leaflet_css: __dirname + '/node_modules/leaflet/dist/leaflet.css',
            leaflet_marker: __dirname + '/node_modules/leaflet/dist/images/marker-icon.png',
            leaflet_marker_green: __dirname + '/images/marker-icon-green.png',
            leaflet_marker_2x: __dirname + '/node_modules/leaflet/dist/images/marker-icon-2x.png',
            leaflet_marker_shadow: __dirname + '/node_modules/leaflet/dist/images/marker-shadow.png',
            bootstrap_css: __dirname + '/node_modules/bootstrap/dist/css/bootstrap.css'
        }
    },
    module: {
        loaders: [
            {test: /\.css$/, loader: 'style-loader!css-loader'},
            {test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file'},
            {test: /\.(woff|woff2)$/, loader: 'url?prefix=font/&limit=5000'},
            {test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/octet-stream'},
            {test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=image/svg+xml'},
            {
                test: /.jsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    presets: ['react']
                }
            },
            {test: /\.(png|jpg)$/, loader: 'file-loader?name=images/[name].[ext]'}
        ]
    }
};
