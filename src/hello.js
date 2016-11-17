var Hello = React.createClass({
    render: function() {
        return <div >
            <
            h1 > Hello! < /h1> <
        p > This is some text < /p> < /
        div >
    }
});
React.render( < Hello / > , document.body);
// React.render(React.createElement('div', null, 'Hello!'), document.body);