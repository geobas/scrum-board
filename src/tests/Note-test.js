import React from 'react';
import ReactDOM from 'react-dom';
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

        expect(ReactDOM.findDOMNode(note.refs.newText).value).toEqual("I am a note!");
        expect(note.state.editing).toBe(true);
    });

    it("generates a random number", function () {
        var note = TestUtils.renderIntoDocument(
            <Note></Note>
        );

        expect(note.randomBetween(1,2)).toBeMoreThan(1).toBeLessThanOrEqualTo(3);
    });

});