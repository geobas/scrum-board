export default class NoteDAO {

	getNotes(self) {
        $.ajax({
            type: 'GET',
            url: '/notes'})
            .done(function(data) {
                data.forEach(function(note){
                    self.show(note);
                });
            });
	}

	addNote(self, text, column, pageX, pageY, color) {
        $.ajax({
            type: 'POST',
            url: '/notes',
            data: { content: text, column: column, pageX: pageX, pageY: pageY, color: color } })
            .done(function(data) {
                var arr = self.state.notes;
                arr.push({
                    id: self.nextId(),
                    note: text,
                    _id: data._id,
                    pageX: pageX,
                    pageY: pageY,
                    color: color
                });
                self.setState({notes: arr});
            });
	}

	updateNote(id, content, pageX, pageY, color) {
		$.ajax({
			type: 'PUT',
			url: '/notes',
			data: { id: id, content: content, pageX: pageX, pageY: pageY, color: color } })
			.done(function(data) {
				console.log(data);
			});
	}

	removeNote(id) {
		$.ajax({
			type: 'DELETE',
			url: '/notes',
			data: { id: id } })
			.done(function(data) {
				console.log(data);
			});
	}

}