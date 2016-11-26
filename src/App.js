"use strict";

var React = require('react');
var Board = require('./Board');

React.render(
	<Board count={10}/>, document.getElementById('react-container')
);