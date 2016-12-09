import React from 'react';
import Note from '../Note.js';
import Board from '../Board.js';
import TestUtils from 'react-addons-test-utils';
import expect, { createSpy, spyOn, isSpy } from 'expect';

describe('Board', function () {

    it('loads without error', function () {
        var board = TestUtils.renderIntoDocument(
            <Board />
        );

        expect(board).toExist();
    });

    it('loads two Notes', function () {
        var BoardTest = class extends Board {
		    constructor(props) {
		        super(props);
		        this.state = {
		            notes: [
		                {id:1 , note:'Note 1'},
		                {id:2 , note:'Note 2'}
		            ]
		        };
		    }
        };

        var board = TestUtils.renderIntoDocument(
            <BoardTest />
        );

	    var notes = TestUtils.scryRenderedComponentsWithType(
            board, Note
        );

		expect(notes).toBeAn('array');
		expect(notes.length).toBe(2);
        expect(board.state.notes.length).toEqual(2);
		expect(notes[0].props.children).toEqual('Note 1');
		expect(notes[1].props.children).toEqual('Note 2');
    });

    it('increments uniqueId', function() {
        var board = TestUtils.renderIntoDocument(
            <Board />
        );

        board.nextId();
        expect(board.uniqueId).toEqual(1);
    });

    it('adds three Notes', function() {
        var board = TestUtils.renderIntoDocument(
            <Board />
        );

        board.add('A new note 1');
        board.add('A new note 2');
        board.add('A new note 3');

	    var notes = TestUtils.scryRenderedComponentsWithType(
            board, Note
        );

        expect(notes.length).toBe(3);
        expect(board.state.notes.length).toEqual(3);
        expect(notes[1].props.children).toEqual('A new note 2');
        expect(notes[1].props.index).toEqual(1);
    });

    it('remove Notes', function() {
        var BoardTest = class extends Board {
            constructor(props) {
                super(props);
                this.state = {
                    notes: [
                        {id:1 , note:'Note 1'},
                        {id:2 , note:'Note 2'}
                    ]
                };
            }
        };

        var board = TestUtils.renderIntoDocument(
            <BoardTest />
        );

        var notes = TestUtils.scryRenderedComponentsWithType(
            board, Note
        );

        var lengthBefore = notes.length;

        board.remove(1);
        expect(board.state.notes.length).toEqual(lengthBefore - 1);
        board.remove(0);
        expect(board.state.notes.length).toEqual(0);
    });

    it('updates a Note', function() {
        var BoardTest = class extends Board {
            constructor(props) {
                super(props);
                this.state = {
                    notes: [
                        {id:1 , note:'Note 1'},
                        {id:2 , note:'Note 2'}
                    ]
                };
            }
        };

        var board = TestUtils.renderIntoDocument(
            <BoardTest />
        );

        var notes = TestUtils.scryRenderedComponentsWithType(
            board, Note
        );

        board.update('A new Note 2', 1);
        expect(notes[1].props.children).toNotEqual('Note 2');
        expect(notes[1].props.children).toEqual('A new Note 2');
    });
});