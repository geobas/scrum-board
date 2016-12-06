import React from 'react';
import Note from '../Note.js';
import TestUtils from 'react-addons-test-utils';
import expect, { createSpy, spyOn, isSpy } from 'expect';
import $ from 'jquery-browserify';
import 'jquery-ui-browserify';

describe('Note', function () {

    it("renders a p", function () {
        var note = TestUtils.renderIntoDocument(
            <Note>I am a note!</Note>
        );

        var p = TestUtils.findRenderedDOMComponentWithTag(
            note, 'p'
		);

		expect(p.textContent).toEqual("I am a note!");
	});

});