import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';

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
            left: this.props.pageX + 'px',
            top: this.props.pageY + 'px',
            transform: 'rotate(' + this.randomBetween(-15, 15) + 'deg)'
        };
        this.color = ( this.props.color != '' ) ? this.props.color + '-note' : '';
    }

    componentDidMount() {
        var $note = $(ReactDOM.findDOMNode(this));
        var self = this;
        $note.draggable({
            stop: function() {
                self.storeNote($note, self);
            }
        });
    }

    storeNote(note, self) {
        $.ajax({
            type: 'PUT',
            url: '/notes',
            data: { id: self.props._id, content: note.find('p').text(), pageX: note.position().left, pageY: note.position().top, color: self.getColor(note) } })
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

    getColor(self) {
        var colors = self.attr('class').split(/\s+/);
        var color = null;
        var length = colors.length;
        for ( var i=0; i < length; i++ ) {
            if ( colors[i].match(/-note/g) ) {
                var res = colors[i].split("-");
                color = res[0];
                break;
            }
       }
       return (color != null) ? color : '';
    }

    edit() {
        this.setState({editing: true});
    }

    save() {
        this.props.onChange(ReactDOM.findDOMNode(this.refs.newText).value, this.props.index); // trigger 'onChange' event
        this.setState({editing: false});
        var $note = $(ReactDOM.findDOMNode(this));
        var self = this;
        $.ajax({ type: 'PUT', url: '/notes', data: { id: self.props._id, content: ReactDOM.findDOMNode(this.refs.newText).value,
                                                        pageX: $note.position().left, pageY: $note.position().top, color: self.getColor($note) } })
            .done(function(data) {
                console.log(data);
            });
    }

    remove() {
        this.props.onRemove(this.props.index); // trigger 'onRemove' event
        var self = this;
        $.ajax({ type: 'DELETE', url: '/notes', data: { id: self.props._id } })
            .done(function(data) {
                console.log(data);
            });
    }

    renderDisplay() {
        return <div className={ classNames('note', this.color) } style={this.style}>
                <p>{this.props.children}</p>
                <span>
                    <button onClick={this.changeColorBlue} className="btn btn-info glyphicon glyphicon-text-background" />
                    <button onClick={this.changeColorGreen} className="btn btn-success glyphicon glyphicon-text-background" />
                    <button onClick={this.edit} className="btn btn-primary glyphicon glyphicon-pencil edit" />
                    <button onClick={this.remove} className="btn btn-danger glyphicon glyphicon-trash remove" />
                </span>
            </div>;
    }

    renderForm() {
        return <div className={ classNames('note', this.color) } style={this.style}>
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