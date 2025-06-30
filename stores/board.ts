import { defineStore } from 'pinia'
import { yColumns } from '~/utils/yjs'

const COLORS: Record<string, string> = {
	'liked': 'bg-green-100 border-green-200',
	'learned': 'bg-yellow-100 border-yellow-200',
	'lacked': 'bg-blue-100 border-blue-200',
	'default': 'bg-pink-100 border-pink-200',
}

export interface Note {
	id: string
	text: string
	author: string
	votes: number
	color: string
}

export interface Column {
	id: string
	title: string
	color: string
	notes: Note[]
}

export interface BoardState {
	columns: Column[]
	activeColumn: string | null
	editingNote: string | null
	editText: string
	userName: string
}

export const useBoardStore = defineStore('board', {
	state: (): BoardState => ({
		userName: 'You',
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
		/* shared state */
		init() {
			if (yColumns.length > 0) {
				// init shared state
				this.columns = this.readToLocal()
			} else {
				// seed shared state
				this.readToY();
			}

			yColumns.observe(() => {
				this.columns = this.readToLocal()
			})
		},
		readToY() {
			yColumns.delete(0, yColumns.length)
			this.columns.forEach(col => {
				yColumns.push([JSON.stringify(col)])
			})
		},
		readToLocal() {
			return yColumns.toArray().map(col => JSON.parse(<string>col))
		},

		/* actions affecting a shared state */
		addNote(columnId: string, text: string) {
			if (!text.trim()) return
			const newNote = {
				id: Date.now().toString(),
				text,
				author: this.userName,
				votes: 0,
				color: COLORS[columnId.split('-')[1]] || COLORS.default,
			}
			this.columns = this.columns.map(col =>
				col.id === columnId
					? { ...col, notes: [...col.notes, newNote] }
					: col
			)
			this.readToY()
		},
		deleteNote(columnId: string, noteId: string) {
			this.columns = this.columns.map(col =>
				col.id === columnId
					? { ...col, notes: col.notes.filter(note => note.id !== noteId) }
					: col
			)
			this.readToY()
		},
		voteNote(columnId: string, noteId: string) {
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
			this.readToY()
		},
		saveEdit(columnId: string, noteId: string, newText: string) {
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
			this.readToY()
			this.cancelEdit()
		},

		startAdd(columnId: string) {
			this.activeColumn = columnId
		},
		cancelAdd() {
			this.activeColumn = null
		},
		startEdit(note: Note) {
			this.editingNote = note.id
			this.editText = note.text
			this.readToY()
		},
		cancelEdit() {
			this.editingNote = null
			this.editText = ''
			this.readToY()
		},
	},
})
