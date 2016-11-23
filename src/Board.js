"use strict";

var Board = React.createClass({
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
                <window.Note key={note.id}
                    index={i}
                    onChange={this.update}
                    onRemove={this.remove}
                >{note.note}</window.Note>
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

React.render(<Board count={10}/>, document.getElementById('react-container'));