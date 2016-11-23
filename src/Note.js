"use strict";

window.Note = React.createClass({
    getInitialState: function() {
        return {editing: false}
    },
    componentWillMount: function() {
        this.style = {
            right: this.randomBetween(0, window.innerWidth - 150) + 'px',
            top: this.randomBetween(0, window.innerHeight - 150) + 'px',
            transform: 'rotate(' + this.randomBetween(-15, 15) + 'deg)'
        };
    },
    randomBetween: function(min, max) {
        return (min + Math.ceil(Math.random() * max));
    },
    edit: function() {
        this.setState({editing: true});
    },
    save: function() {
    	// var value = this.refs.newText.getDOMNode().value;
    	// alert(value);
        this.props.onChange(this.refs.newText.getDOMNode().value, this.props.index); // trigger 'onChange' event
        this.setState({editing: false});
    },
    remove: function() {
        // alert('removing note');
        this.props.onRemove(this.props.index); // trigger 'onRemove' event
    },
    renderDisplay: function() {
        return (
            <div className="note" style={this.style}>
                <p>{this.props.children}</p>
                <span>
                    <button onClick={this.edit} className="btn btn-primary glyphicon glyphicon-pencil" />
                    <button onClick={this.remove} className="btn btn-danger glyphicon glyphicon-trash" />
                </span>
            </div>
            );
    },
    renderForm: function() {
        return (
            <div className="note" style={this.style}>
	            <textarea ref="newText" defaultValue={this.props.children} className="form-control"></textarea>
	            <button onClick={this.save} className="btn btn-success btn-sm glyphicon glyphicon-floppy-disk" />
            </div>
            );
    },
    render: function() {
        if ( this.state.editing ) {
            return this.renderForm();
        }
        else {
            return this.renderDisplay();
        }
    }
});

// React.render(<Note>Hello World</Note>, document.getElementById('react-container'));