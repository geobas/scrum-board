import React from 'react';
import Note from '../Note.js';
import TestUtils from 'react-addons-test-utils';
import expect, { createSpy, spyOn, isSpy } from 'expect';
import $ from 'jquery-browserify';
import 'jquery-ui-browserify';

describe('Note', function () {

    var defaultValue = 'I am a note!';

    it("loads without error", function () {
        var note = TestUtils.renderIntoDocument(
            <Note />
        );

        expect(note).toExist();
    });

    it("checks if draggable", function () {
        var note = TestUtils.renderIntoDocument(
            <Note>{defaultValue}</Note>
        );

        var div = TestUtils.findRenderedDOMComponentWithClass(
            note, 'ui-draggable'
        );

        expect(div).toExist();
    });

    it("renders a p", function () {
        var note = TestUtils.renderIntoDocument(
            <Note>{defaultValue}</Note>
        );

        var p = TestUtils.findRenderedDOMComponentWithTag(
            note, 'p'
        );

        expect(p.textContent).toEqual("I am a note!");
    });

    it("edits a note", function () {
        var note = TestUtils.renderIntoDocument(
            <Note>{defaultValue}</Note>
        );

        var btn = TestUtils.findRenderedDOMComponentWithClass(
            note, 'edit'
        );
        TestUtils.Simulate.click(btn);

        expect(note.refs.newText.getDOMNode().value).toEqual("I am a note!");
        expect(note.state.editing).toBe(true);
    });

    // it("saves a note", function () {
    //     var note = TestUtils.renderIntoDocument(
    //         <Note>{defaultValue}</Note>
    //     );

    //     var btnEdit = TestUtils.findRenderedDOMComponentWithClass(
    //         note, 'edit'
    //     );
    //     TestUtils.Simulate.click(btnEdit);

    //     var btnSave = TestUtils.findRenderedDOMComponentWithClass(
    //         note, 'save'
    //     );
    //     TestUtils.Simulate.click(btnSave);

    //     var value = note.refs.newText.getDOMNode().value;
    //     expect(note.props.onChange).toEqual(value);
    // });

    // it("removes a note", function () {
    //     var note = TestUtils.renderIntoDocument(
    //         <Note>{defaultValue}</Note>
    //     );

    //     var btn = TestUtils.findRenderedDOMComponentWithClass(
    //         note, 'remove'
    //     );
    //     TestUtils.Simulate.click(btn);

    //     var index = note.props.index;

    //     expect(note.props.onRemove).toEqual(index);
    // });

});