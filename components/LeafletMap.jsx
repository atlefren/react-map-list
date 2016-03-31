'use strict';
var L = require('leaflet');
var React = require('react');
var ReactDOM = require('react-dom');
var _ = require('underscore');

require('leaflet_css');
require('../style/map.css');
require('leaflet_marker');
require('leaflet_marker_2x');
require('leaflet_marker_shadow');

var createMap = require('./createMap');
var BreweryList = require('./BreweryList.jsx');

L.Icon.Default.imagePath = 'bundles/images/';

var selectedIcon = require('./selectedIcon');



var LeafletMap = React.createClass({

    getInitialState: function () {
        return {
            breweries: this.props.breweries,
            selectedBrewery: null
        };
    },

    componentDidMount: function () {
        var map = createMap(ReactDOM.findDOMNode(this));

        var breweriesLayer = L.geoJson(this.state.breweries, {
            pointToLayer: function (feature, latlng) {
                return L.marker(latlng);
                }
        }).addTo(map);
        // start the map in South-East England
        map.fitBounds(breweriesLayer.getBounds());

        breweriesLayer.on('click', this.clicked, this);
        this.map = map;
        this.breweriesLayer = breweriesLayer;
        this.allLayers = breweriesLayer.getLayers();
    },

    toggleInteraction: function (enable) {
        if (enable) {
            this.map.dragging.enable();
        } else {
            this.map.dragging.disable();
        }
    },

    clicked: function (e) {
        this.selectBrewery(e.layer.feature.id);
    },

    selectBrewery: function (breweryId) {
        this.setState({selectedBrewery: breweryId});
    },

    filterBreweries: function (filter) {
        var layers = _.filter(this.props.breweries.features, function (brewery) {
            return (brewery.properties.name.toLowerCase().indexOf(filter.toLowerCase()) > -1);
        });
        this.setState({breweries: {features: layers}});

        var selectedIds = _.pluck(layers, 'id');

        _.each(this.allLayers, function (layer) {
            var has = this.map.hasLayer(layer);
            var shouldHave = (selectedIds.indexOf(layer.feature.id) > -1);
            if (shouldHave && !has) {
                this.breweriesLayer.addLayer(layer);
            } else if (!shouldHave && has) {
                this.breweriesLayer.removeLayer(layer);
            }
        }, this);
        if (selectedIds.length) {
            this.map.fitBounds(this.breweriesLayer.getBounds());
        }
    },

    componentDidUpdate: function () {
        if (this.selectedFeature) {
            if (this.selectedFeature.setIcon) {
                this.selectedFeature.setIcon(new L.Icon.Default());
                this.selectedFeature.setZIndexOffset(0);
            }
        }
        var newSelected = _.find(this.breweriesLayer.getLayers(), function (layer) {
            return (layer.feature.id === this.state.selectedBrewery);
        }, this);
        if (newSelected) {
            if (newSelected.setIcon) {
                newSelected.setIcon(selectedIcon);
                newSelected.setZIndexOffset(100);
            }
        }
        this.selectedFeature = newSelected;
    },

    render: function () {
        return (
            <div className="fullscreenmap">
                <BreweryList
                    selectBrewery={this.selectBrewery}
                    breweries={this.state.breweries}
                    filter={this.filterBreweries}
                    selectedBrewery={this.state.selectedBrewery}
                    toggle={this.toggleInteraction}/>
            </div>
        );
    }
});

module.exports = LeafletMap;
