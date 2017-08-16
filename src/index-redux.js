import storeFactory from './store'
import { addNote, editNote, removeNote } from './actions'

const store = storeFactory()

store.dispatch(
	addNote("1234567890","Note4", 52.76666259765625, 172.76666259765625, "green")	
)

store.dispatch(
	addNote("0987654321","Note3", 52.76666259765625, 172.76666259765625, "green")
)

store.dispatch(
	editNote("1234567890","Note444444", 52.76666259765625, 172.76666259765625, "blue")
)

store.dispatch(
	removeNote("0987654321")
)

store.dispatch(
	removeNote("1234567890")
)