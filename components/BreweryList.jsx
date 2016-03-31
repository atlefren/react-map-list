'use strict';
var React = require('react');
var _ = require('underscore');

var Brewery = React.createClass({

    onClick: function (e) {
        e.preventDefault();
        this.props.selectBrewery(this.props.brewery.id);
    },

    render: function () {
        var className = 'list-group-item';
        if (this.props.selected) {
            className += ' active';
        }
        return (
            <a href="#" className={className} onClick={this.onClick}>
                <h4 className="list-group-item-heading">{this.props.brewery.properties.name}</h4>
                <p className="list-group-item-text">...</p>
            </a>
        );
    }
});

var BreweryList = React.createClass({

    getInitialState: function () {
        return{filterText: ''};
    },

    mouseEnter: function (e){
        this.props.toggle(false);
    },

    mouseLeave: function (e){
        this.props.toggle(true);
    },

    filter: function (e) {
        var value = e.target.value;
        this.setState({filterText: value});
        this.props.filter(value);
    },

    render: function () {

        var breweries = _.map(this.props.breweries.features, function (feature) {
            return (
                <Brewery
                    brewery={feature}
                    selected={feature.id === this.props.selectedBrewery}
                    selectBrewery={this.props.selectBrewery}
                    key={feature.id} />
            );
        }, this);

        return (
            <div className="list" onMouseEnter={this.mouseEnter} onMouseLeave={this.mouseLeave}>
                <input
                    type="text"
                    placeholder="filter"
                    className="form-control"
                    value={this.state.filterText}
                    onChange={this.filter} />
                <div className="list-group">
                    {breweries}
                </div>
            </div>
        );
    }

});

module.exports = BreweryList;
