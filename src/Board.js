import React,{Component} from 'react';
import Note from './Note';

export default class Board extends Component {
    constructor(props) {
        super(props);
        this.state = {
            notes: []
        };
        this.show = this.show.bind(this);
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
        var self = this;
        if (this.props.count > 0) {
            $.ajax({
                type: 'GET',
                url: '/notes'})
                .done(function(data) {
                    data.forEach(function(note){
                        self.show(note);
                    });
                });
        }
    }

    show(obj) {
        var arr = this.state.notes;
        arr.push({
            id: this.nextId(),
            note: obj.content,
            _id: obj._id,
            pageX: obj.pageX,
            pageY: obj.pageY,
            color: obj.color
        });
        this.setState({notes: arr});
    }

    add(text, column, pageX, pageY, color) {
        var self = this;
        $.ajax({
            type: 'POST',
            url: '/notes',
            data: { content: text, column: column, pageX: pageX, pageY: pageY, color: color } })
            .done(function(data) {
                var arr = self.state.notes;
                arr.push({
                    id: self.nextId(),
                    note: text,
                    _id: data._id,
                    pageX: pageX,
                    pageY: pageY,
                    color: color
                });
                self.setState({notes: arr});
            });
    }

    update(newText, i) {
        var arr = this.state.notes;
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
                    pageX={note.pageX}
                    pageY={note.pageY}
                    color={note.color}
                    onChange={this.update}
                    onRemove={this.remove}
                >{note.note}</Note>
            );
    }

    render() {
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