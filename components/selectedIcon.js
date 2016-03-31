'use strict';
var L = require('leaflet');
require('leaflet_marker_green');

var selectedIcon = L.icon({
    iconUrl: L.Icon.Default.imagePath + 'marker-icon-green.png'
});

module.exports = selectedIcon;
