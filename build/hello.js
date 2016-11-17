var Hello = React.createClass({
    displayName: "Hello",
    render: function() {
        return React.createElement("div", null,
            React.createElement("h1", null, " Hello! "), " ", React.createElement("p", null, " This is some text "), " ")
    }
});
React.render(React.createElement(Hello, null), document.body);
// React.render(React.createElement('div', null, 'Hello!'), document.body);