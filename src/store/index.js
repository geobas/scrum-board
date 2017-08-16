import C from '../constants'
import appReducer from './reducers'
import thunk from 'redux-thunk'
import { createStore, applyMiddleware } from 'redux'

const consoleMessages = store => next => action => {

	let result

	console.groupCollapsed(`dispatching action => ${action.type}`)
	console.log(`total notes before action "${action.type}" : `, store.getState().allNotes.length)
	result = next(action)

	let { allNotes } = store.getState()

	allNotes.forEach( (note) => {
		console.log(`
			id: ${note._id}
			content: ${note.content}
			pageX: ${note.pageX}
			pageY: ${note.pageY}
			color: ${note.color}
		`)
	})

	console.log(`total notes after action "${action.type}" : ${allNotes.length}`)

	console.groupEnd()

	return result

}

export default (initialState={}) => {
	return applyMiddleware(thunk,consoleMessages)(createStore)(appReducer, initialState)
}