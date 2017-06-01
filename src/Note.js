import React,{Component} from 'react';
import ReactDOM from 'react-dom';

export default class Note extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editing: false
        };
        this.renderDisplay = this.renderDisplay.bind(this);
        this.changeColorBlue = this.changeColorBlue.bind(this);
        this.changeColorGreen = this.changeColorGreen.bind(this);
        this.getColor = this.getColor.bind(this);
        this.storeNote = this.storeNote.bind(this);
        this.edit = this.edit.bind(this);
        this.remove = this.remove.bind(this);
        this.save = this.save.bind(this);
    }

    componentWillMount() {
        this.style = {
            // right: this.randomBetween(0, window.innerWidth - 150) + 'px',
            // top: this.randomBetween(0, window.innerHeight - 150) + 'px',
            left : '60px',
            top: '160px',
            transform: 'rotate(' + this.randomBetween(-15, 15) + 'deg)'
        };
    }

    componentDidMount() {
        var $note = $(ReactDOM.findDOMNode(this));
        var obj = this;
        $note.draggable({
            stop: function() {
                obj.storeNote($note, obj);
            }
        });
    }

    storeNote(note, obj) {
        $.ajax({ type: 'PUT', url: '/notes', data: { id: obj.props._id, content: note.find('p').text(), pageX: note.position().left,
                                                        pageY: note.position().top, color: obj.getColor(note)} })
            .done(function(data) {
                console.log(data);
            });
    }

    randomBetween(min, max) {
        return (min + Math.ceil(Math.random() * max));
    }

    changeColorBlue() {
        $(ReactDOM.findDOMNode(this)).removeClass('green-note').toggleClass('blue-note');
        var $note = $(ReactDOM.findDOMNode(this));
        this.storeNote($note, this);
    }

    changeColorGreen() {
        $(ReactDOM.findDOMNode(this)).removeClass('blue-note').toggleClass('green-note');
        var $note = $(ReactDOM.findDOMNode(this));
        this.storeNote($note, this);
    }

    getColor(obj) {
        var colors = obj.attr('class').split(/\s+/);
        var color = null;
        for ( var i=0; i < colors.length; i++ ) {
            if ( colors[i].match(/-note/g) ) {
                var res = colors[i].split("-");
                color = res[0];
                break;
            }
       }
       return (color != null) ? color : 'yellow';
    }

    edit() {
        this.setState({editing: true});
    }

    save() {
        // var value = this.refs.newText.getDOMNode().value;
        // alert(value);
        this.props.onChange(ReactDOM.findDOMNode(this.refs.newText).value, this.props.index); // trigger 'onChange' event
        this.setState({editing: false});
        var $note = $(ReactDOM.findDOMNode(this));
        var obj = this;
        $.ajax({ type: 'PUT', url: '/notes', data: { id: obj.props._id, content: ReactDOM.findDOMNode(this.refs.newText).value,
                                                        pageX: $note.position().left, pageY: $note.position().top, color: obj.getColor($note) } })
            .done(function(data) {
                console.log(data);
            });
    }

    remove() {
        // alert('removing note');
        this.props.onRemove(this.props.index); // trigger 'onRemove' event
        var obj = this;
        $.ajax({ type: 'DELETE', url: '/notes', data: { id: obj.props._id } })
            .done(function(data) {
                console.log(data);
            });
    }

    renderDisplay() {
        return <div className="note" style={this.style}>
                <p>{this.props.children}</p>
                <span>
                    <button onClick={this.changeColorBlue} className="btn btn-info glyphicon glyphicon-text-background change-color-blue" />
                    <button onClick={this.changeColorGreen} className="btn btn-success glyphicon glyphicon-text-background change-color-green" />
                    <button onClick={this.edit} className="btn btn-primary glyphicon glyphicon-pencil edit" />
                    <button onClick={this.remove} className="btn btn-danger glyphicon glyphicon-trash remove" />
                </span>
            </div>;
    }

    renderForm() {
        return <div className="note" style={this.style}>
                <textarea ref="newText" defaultValue={this.props.children} className="form-control"></textarea>
                <button onClick={this.save} className="btn btn-success btn-sm glyphicon glyphicon-floppy-disk save" />
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