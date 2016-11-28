import React from 'react';

export class Note extends React.Component {
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
        return min + Math.ceil(Math.random() * max);
    }

    edit() {
        this.setState({ editing: true });
    }

    save() {
        // var value = this.refs.newText.getDOMNode().value;
        // alert(value);
        this.props.onChange(this.refs.newText.getDOMNode().value, this.props.index); // trigger 'onChange' event
        this.setState({ editing: false });
    }

    remove() {
        // alert('removing note');
        this.props.onRemove(this.props.index); // trigger 'onRemove' event
    }

    renderDisplay() {
        return React.createElement(
            'div',
            { className: 'note', style: this.style },
            React.createElement(
                'p',
                null,
                this.props.children
            ),
            React.createElement(
                'span',
                null,
                React.createElement('button', { onClick: this.edit, className: 'btn btn-primary glyphicon glyphicon-pencil' }),
                React.createElement('button', { onClick: this.remove, className: 'btn btn-danger glyphicon glyphicon-trash' })
            )
        );
    }

    renderForm() {
        return React.createElement(
            'div',
            { className: 'note', style: this.style },
            React.createElement('textarea', { ref: 'newText', defaultValue: this.props.children, className: 'form-control' }),
            React.createElement('button', { onClick: this.save, className: 'btn btn-success btn-sm glyphicon glyphicon-floppy-disk' })
        );
    }

    render() {
        if (this.state.editing) {
            return this.renderForm();
        } else {
            return this.renderDisplay();
        }
    }
};

export { Note as default };
