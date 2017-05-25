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
        $(ReactDOM.findDOMNode(this)).draggable();
    }

    randomBetween(min, max) {
        return (min + Math.ceil(Math.random() * max));
    }

    changeColorBlue() {
        $(ReactDOM.findDOMNode(this)).removeClass('green-note').toggleClass('blue-note');
    }

    changeColorGreen() {
        $(ReactDOM.findDOMNode(this)).removeClass('blue-note').toggleClass('green-note');
    }

    edit() {
        this.setState({editing: true});
    }

    save() {
        // var value = this.refs.newText.getDOMNode().value;
        // alert(value);
        this.props.onChange(ReactDOM.findDOMNode(this.refs.newText).value, this.props.index); // trigger 'onChange' event
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