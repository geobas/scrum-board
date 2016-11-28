import React from 'react';
import Board from './Board_browserified.js';

React.render(React.createElement(Board, { count: 10 }), document.getElementById('react-container'));
