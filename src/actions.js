import C from './constants'

export function addNote(_id, content, pageX, pageY, color) {

	return {
		type: C.ADD_NOTE,
		payload: {_id, content, pageX, pageY, color}
	}

}

export function editNote(_id, content, pageX, pageY, color) {

	return {
		type: C.EDIT_NOTE,
		payload: {_id, content, pageX, pageY, color}
	}

}

export const removeNote = function(_id) {

	return {
		type: C.REMOVE_NOTE,
		payload: _id
	}

}