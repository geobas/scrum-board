import C from '../constants'
import { combineReducers } from 'redux'

export const allNotes = (state=[], action) => {

	switch(action.type) {

		case C.ADD_NOTE : 

			return [...state, action.payload]

		case C.EDIT_NOTE :

			return state.map( note => {
				if (note._id !== action.payload._id) {
					// This isn't the item we care about - keep it as-is
					return note
				}

				// Otherwise, this is the one we want - return an updated value
				return {
					...note,
					...action.payload
				}   
			} )

		case C.REMOVE_NOTE :

			return state.filter(note => note._id !== action.payload)     

		default:
			return state
	}

}

export default combineReducers({
	allNotes
})