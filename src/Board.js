"use strict";

var React = require('react');
var Note = require('./Note');

module.exports = React.createClass({
    getInitialState: function() {
        return {
            // notes: [
            //     'Call me',
            //     'Call him',
            //     'Call them',
            // ]
            notes: []
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
    nextId: function() {
        this.uniqueId = this.uniqueId || 0;
        return this.uniqueId++;
    },
    componentWillMount: function() {
        var self = this;
        if (this.props.count > 0) {
            $.getJSON("http://baconipsum.com/api/?type=all-meat&sentences=" +
                this.props.count + "&start-with-lorem=1&callback=?", function(results) {
                    results[0].split('. ').forEach(function(sentence){
                        self.add(sentence.substring(0,40));
                    });
                });
        }
    },
    add: function(text) {
        var arr = this.state.notes;
        // arr.push(text);
        arr.push({
            id: this.nextId(),
            note: text
        });
        this.setState({notes: arr});
    },
    update: function(newText, i) {
        var arr = this.state.notes;
        // arr[i] = newText;
        arr[i].note = newText;
        this.setState({notes:arr});
    },
    remove: function(i) {
        var arr = this.state.notes;
        arr.splice(i, 1);
        this.setState({notes: arr});
    },
    eachNote: function(note, i) {
        return (
                <Note key={note.id}
                    index={i}
                    onChange={this.update}
                    onRemove={this.remove}
                >{note.note}</Note>
            );
    },
    render: function() {
        // return <div className="board">{this.props.count}</div>
        // return <div className="board">
        //             {this.state.notes.map(function(note, i) {
        //                 return <window.Note key={i}>{note}</window.Note>
        //             })}
        //        </div>;
        return <div className="board">
                    {this.state.notes.map(this.eachNote)}
                    <button className="btn btn-sm btn-success glyphicon glyphicon-plus" onClick={this.add.bind("null", "New Note")}/>
               </div>;
    }
});