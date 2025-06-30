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
		totalNotes: (state) => state.columns.reduce((sum, col: Column) => sum + col.notes.length, 0),
		totalVotes: (state) => state.columns.reduce((sum, col: Column) => sum + col.notes.reduce((n, note) => n + note.votes, 0), 0),
	},
	actions: {
		/* shared state */
		init() {
			if (yColumns.length === 0) {
				// seed shared state
				this.columns.forEach(col => {
					yColumns.push([JSON.stringify(col)])
				})
			}
			this.columns = this.readToLocal()

			yColumns.observe(() => {
				this.columns = this.readToLocal()
			})
		},
		readToLocal() {
			return yColumns.toArray().map(col => JSON.parse(<string>col))
		},
		updateSharedCol(col: Column) {
			const index = this.getColIndexFromY(col.id)
			if (index === -1) return

			yColumns.delete(index, 1)
			yColumns.insert(index, [JSON.stringify(col)])
		},
		getColIndexFromY(columnId: string) {
			const yArray = yColumns.toArray()
			return yArray.findIndex(c => {
				const parsedCol: Column = JSON.parse(<string>c)
				return parsedCol.id === columnId
			})
		},

		/* actions affecting a shared state */
		addNote(columnId: string, text: string) {
			if (!text.trim()) return
			const newNote: Note = {
				id: Date.now().toString(),
				text,
				author: this.userName,
				votes: 0,
				color: COLORS[columnId.split('-')[1]] || COLORS.default,
			}

			const index = this.getColIndexFromY(columnId)
			if (index === -1) return

			const yCol = JSON.parse(<string>yColumns.get(index))
			yCol.notes.push(newNote)
			this.updateSharedCol(yCol)
		},
		deleteNote(columnId: string, noteId: string) {
			const index = this.getColIndexFromY(columnId)
			if (index === -1) return

			const yCol = JSON.parse(<string>yColumns.get(index))
			yCol.notes = yCol.notes.filter((note: Note) => note.id !== noteId)
			this.updateSharedCol(yCol)
		},
		voteNote(columnId: string, noteId: string) {
			const index = this.getColIndexFromY(columnId)
			if (index === -1) return

			const yCol = JSON.parse(<string>yColumns.get(index))
			yCol.notes = yCol.notes.map((note: Note) =>
				note.id === noteId
					? { ...note, votes: note.votes + 1 }
					: note
			)
			this.updateSharedCol(yCol)
		},
		saveEdit(columnId: string, noteId: string, newText: string) {
			if (!newText.trim()) return
			const index = this.getColIndexFromY(columnId)
			if (index === -1) return

			const yCol = JSON.parse(<string>yColumns.get(index))
			yCol.notes = yCol.notes.map((note: Note) =>
				note.id === noteId
					? { ...note, text: newText }
					: note
			)
			this.updateSharedCol(yCol)
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
		},
		cancelEdit() {
			this.editingNote = null
			this.editText = ''
		},
	},
})
