import { defineStore } from 'pinia'

export const useBoardStore = defineStore('board', {
	state: () => ({
		userName: 'You',
		COLORS: {
			'liked': 'bg-green-100 border-green-200',
			'learned': 'bg-yellow-100 border-yellow-200',
			'lacked': 'bg-blue-100 border-blue-200',
			'default': 'bg-pink-100 border-pink-200',
		},
		columns: [
			{
				id: 'col-liked',
				title: 'Liked',
				color: 'bg-green-50 border-green-200',
				notes: [],
			},
			{
				id: 'col-learned',
				title: 'Learned',
				color: 'bg-yellow-50 border-yellow-200',
				notes: [],
			},
			{
				id: 'col-lacked',
				title: 'Lacked',
				color: 'bg-blue-50 border-blue-200',
				notes: [],
			},
		],
		activeColumn: null,
		editingNote: null,
		editText: '',
	}),
	getters: {
		totalNotes: (state) => state.columns.reduce((sum, col) => sum + col.notes.length, 0),
		totalVotes: (state) => state.columns.reduce((sum, col) => sum + col.notes.reduce((n, note) => n + note.votes, 0), 0),
	},
	actions: {
		startAdd(columnId) {
			this.activeColumn = columnId
		},
		cancelAdd() {
			this.activeColumn = null
		},
		addNote(columnId, text) {
			if (!text.trim()) return
			const newNote = {
				id: Date.now().toString(),
				text,
				author: this.userName,
				votes: 0,
				color: this.COLORS[columnId.split('-')[1]] || this.COLORS.default,
			}
			this.columns = this.columns.map(col =>
				col.id === columnId
					? { ...col, notes: [...col.notes, newNote] }
					: col
			)
			this.cancelAdd()
		},
		deleteNote(columnId, noteId) {
			this.columns = this.columns.map(col =>
				col.id === columnId
					? { ...col, notes: col.notes.filter(note => note.id !== noteId) }
					: col
			)
		},
		voteNote(columnId, noteId) {
			this.columns = this.columns.map(col =>
				col.id === columnId
					? {
						...col,
						notes: col.notes.map(note =>
							note.id === noteId ? { ...note, votes: note.votes + 1 } : note
						),
					}
					: col
			)
		},
		startEdit(note) {
			this.editingNote = note.id
			this.editText = note.text
		},
		cancelEdit() {
			this.editingNote = null
			this.editText = ''
		},
		saveEdit(columnId, noteId, newText) {
			this.columns = this.columns.map(col =>
				col.id === columnId
					? {
						...col,
						notes: col.notes.map(note =>
							note.id === noteId ? { ...note, text: newText } : note
						),
					}
					: col
			)
			this.cancelEdit()
		},
	},
})
