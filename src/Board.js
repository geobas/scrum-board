"use strict";

class Note extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editing: false
        };
        this.renderDisplay = this.renderDisplay.bind(this);
        this.edit = this.edit.bind(this);
        this.remove = this.remove.bind(this);
        this.save = this.save.bind(this);
    }

    componentWillMount() {
        this.style = {
            right: this.randomBetween(0, window.innerWidth - 150) + 'px',
            top: this.randomBetween(0, window.innerHeight - 150) + 'px',
            transform: 'rotate(' + this.randomBetween(-15, 15) + 'deg)'
        };
    }

    componentDidMount() {
        $(React.findDOMNode(this)).draggable();
    }

    randomBetween(min, max) {
        return (min + Math.ceil(Math.random() * max));
    }

    edit() {
        this.setState({editing: true});
    }

    save() {
        // var value = this.refs.newText.getDOMNode().value;
        // alert(value);
        this.props.onChange(this.refs.newText.getDOMNode().value, this.props.index); // trigger 'onChange' event
        this.setState({editing: false});
    }

    remove() {
        // alert('removing note');
        this.props.onRemove(this.props.index); // trigger 'onRemove' event
    }

    renderDisplay() {
        return <div className="note" style={this.style}>
                <p>{this.props.children}</p>
                <span>
                    <button onClick={this.edit} className="btn btn-primary glyphicon glyphicon-pencil" />
                    <button onClick={this.remove} className="btn btn-danger glyphicon glyphicon-trash" />
                </span>
            </div>;
    }

    renderForm() {
        return <div className="note" style={this.style}>
                <textarea ref="newText" defaultValue={this.props.children} className="form-control"></textarea>
                <button onClick={this.save} className="btn btn-success btn-sm glyphicon glyphicon-floppy-disk" />
            </div>;
    }

    render() {
        if ( this.state.editing ) {
            return this.renderForm();
        }
        else {
            return this.renderDisplay();
        }
    }
};

class Board extends React.Component {
    constructor() {
        super();
        this.state = {
            notes: []
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
        var self = this;
        if (this.props.count > 0) {
            $.getJSON("http://baconipsum.com/api/?type=all-meat&sentences=" +
                this.props.count + "&start-with-lorem=1&callback=?", function(results) {
                    results[0].split('. ').forEach(function(sentence){
                        self.add(sentence.substring(0,40));
                    });
                });
        }
    }

    add(text) {
        var arr = this.state.notes;
        // arr.push(text);
        arr.push({
            id: this.nextId(),
            note: text
        });
        this.setState({notes: arr});
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
                    {this.state.notes.map(this.eachNote)}
                    <button className="btn btn-sm btn-success glyphicon glyphicon-plus" onClick={this.add.bind("null", "New Note")}/>
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

React.render(<Board count={10}/>, document.getElementById('react-container'));