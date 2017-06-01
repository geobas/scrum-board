import React,{Component} from 'react';
import Note from './Note';

export default class Board extends Component {
    constructor(props) {
        super(props);
        this.state = {
            notes: [
                // {id:1 , note:"Note 1"},
                // {id:2 , note:"Note 2"},
                // {id:3 , note:"Note 3"}
            ]
        };
        this.add = this.add.bind(this);
        this.update = this.update.bind(this);
        this.remove = this.remove.bind(this);
        this.eachNote = this.eachNote.bind(this);
    }

    nextId() {
        this.uniqueId = this.uniqueId || 0;
        return this.uniqueId++;
    }

    componentWillMount() {
        // var self = this;
        // if (this.props.count > 0) {
        //     $.getJSON("http://baconipsum.com/api/?type=all-meat&sentences=" +
        //         this.props.count + "&start-with-lorem=1&callback=?", function(results) {
        //             results[0].split('. ').forEach(function(sentence){
        //                 self.add(sentence.substring(0,40));
        //             });
        //         });
        // }
    }

    add(text, column, pageX, pageY, color) {
        var obj = this;
        $.ajax({ type: 'POST', url: '/notes', data: { content: text, column: column, pageX: pageX, pageY: pageY, color: color } })
            .done(function(data) {
                var arr = obj.state.notes;
                // arr.push(text);
                arr.push({
                    id: obj.nextId(),
                    note: text,
                    _id: data._id,
                    color: color
                });
                obj.setState({notes: arr});
            });
    }

    update(newText, i) {
        var arr = this.state.notes;
        // arr[i] = newText;
        arr[i].note = newText;
        this.setState({notes:arr});
    }

    remove(i) {
        var arr = this.state.notes;
        arr.splice(i, 1);
        this.setState({notes: arr});
    }

    eachNote(note, i) {
        return (
                <Note key={note.id}
                    index={i}
                    _id={note._id}
                    onChange={this.update}
                    onRemove={this.remove}
                >{note.note}</Note>
            );
    }

    render() {
        // return <div className="board">{this.props.count}</div>
        // return <div className="board">
        //             {this.state.notes.map(function(note, i) {
        //                 return <window.Note key={i}>{note}</window.Note>
        //             })}
        //        </div>;
        return <div className="board">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-sm-3 text-center column" id="toDo">
                                <h1>To Do</h1>
                            </div>
                            <div className="col-sm-3 text-center column" id="inProgress">
                                <h1>In Progress</h1>
                                <div></div>
                            </div>
                            <div className="col-sm-3 text-center column" id="Testing">
                                <h1>Testing</h1>
                                <div></div>
                            </div>
                            <div className="col-sm-3 text-center column" id="Done">
                                <h1>Done</h1>
                                <div></div>
                            </div>
                            <div>{this.state.notes.map(this.eachNote)}</div>
                        </div>
                    </div>
                    <button className="btn btn-sm btn-success glyphicon glyphicon-plus add" onClick={this.add.bind("null", "New Note", "toDo", 60,160, 'yellow')}/>
               </div>;
    }
};

Board.propTypes = {
    count: function(props, propName) {
        if (typeof props[propName] !== "number"){
            return new Error('The count property must be a number');
        }
        if (props[propName] > 100) {
            return new Error("Creating " + props[propName] + " notes is ridiculous");
        }
    }
};