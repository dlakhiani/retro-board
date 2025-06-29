<template>
    <div class="min-h-screen p-6 mx-auto bg-retro-gray">
        <!-- Header -->
        <div class="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
                <h1 class="text-3xl font-bold text-retro-blue">Sprint Retrospective</h1>
                <p class="text-retro-blue mt-1">Rutabaga</p>
            </div>
            <div class="flex flex-wrap gap-2">
                <UBadge color="info">{{ totalNotes }} notes</UBadge>
                <UBadge color="info">{{ totalVotes }} votes</UBadge>
                <UButton icon="i-heroicons-arrow-down-tray" variant="soft">Export</UButton>
            </div>
        </div>

        <!-- Columns -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <RetroColumn
                v-for="column in columns"
                :key="column.id"
                :column="column"
                :active-column="activeColumn"
                :editing-note="editingNote"
                :edit-text="editText"
                @start-add="startAdd"
                @cancel-add="cancelAdd"
                @add-note="addNote"
                @vote-note="voteNote"
                @delete-note="deleteNote"
                @start-edit="startEdit"
                @save-edit="saveEdit"
                @cancel-edit="cancelEdit"
            />
        </div>
    </div>
</template>

<script>
import RetroColumn from '~/components/RetroColumn.vue'
import {useBoardStore} from "~/stores/board.ts";

export default {
    name: 'RetroBoard',
    components: { RetroColumn },
    data() {
        return {
            board: useBoardStore(),
        }
    },
    computed: {
        totalNotes() {
            return this.board.totalNotes
        },
        totalVotes() {
            return this.board.totalVotes
        },
        columns() {
            return this.board.columns;
        },
        activeColumn() {
            return this.board.activeColumn
        },
        editingNote() {
            return this.board.editingNote
        },
        editText() {
            return this.board.editText
        },
    },
    methods: {
        startAdd(columnId) {
            this.board.startAdd(columnId)
        },
        cancelAdd() {
            this.board.cancelAdd()
        },
        addNote(columnId, text) {
            this.board.addNote(columnId, text)
        },
        deleteNote(columnId, noteId) {
            this.board.deleteNote(columnId, noteId)
        },
        voteNote(columnId, noteId) {
            this.board.voteNote(columnId, noteId)
        },
        startEdit(note) {
            this.board.startEdit(note)
        },
        cancelEdit() {
            this.board.cancelEdit()
        },
        saveEdit(columnId, noteId, newText) {
            this.board.saveEdit(columnId, noteId, newText)
        },
    },
}
</script>
