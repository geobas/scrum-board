"use strict";

var Board = React.createClass({
    getInitialState: function() {
        return {
            notes: [
                'Call me',
                'Call him',
                'Call them',
            ]
        };
    },
    propTypes: {
        count: function(props, propName) {
            if (typeof props[propName] !== "number"){
                return new Error('The count property must be a number');
            }
            if (props[propName] > 100) {
                return new Error("Creating " + props[propName] + " notes is ridiculous");
            }
        }
    },
    render: function() {
        // return <div className="board">{this.props.count}</div>
        return <div className="board">
                    {this.state.notes.map(function(note, i) {
                        return <window.Note key={i}>{note}</window.Note>
                    })}
               </div>;
    }
});

React.render(<Board count={10}/>, document.getElementById('react-container'));