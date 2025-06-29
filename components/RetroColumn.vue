<template>
    <UCard :class="[column.color]">
        <template #header>
            <h3 class="text-lg font-semibold text-retro-slate">{{ column.title }}</h3>
            <p class="text-sm text-retro-blue">{{ column.notes.length }} note(s)</p>
        </template>

        <div class="space-y-3">
            <RetroCard
                v-for="note in sortedNotes"
                :key="note.id"
                :note="note"
                :editing="editingNote === note.id"
                :edit-text="editText"
                @vote="$emit('vote-note', column.id, note.id)"
                @start-edit="$emit('start-edit', note)"
                @delete="$emit('delete-note', column.id, note.id)"
                @save="(text) => $emit('save-edit', column.id, note.id, text)"
                @cancel="$emit('cancel-edit')"
            />

            <!-- Add Note -->
            <div v-if="activeColumn === column.id" class="border-2 border-dashed rounded p-3">
                <UTextarea v-model="newNoteTextLocal" placeholder="What's on your mind?" autofocus />
                <div class="flex gap-2 mt-2">
                    <UButton @click="$emit('add-note', column.id, newNoteTextLocal)" :disabled="!newNoteTextLocal.trim()">Add Note</UButton>
                    <UButton color="gray" @click="$emit('cancel-add')">Cancel</UButton>
                </div>
            </div>
            <UButton
                v-else
                variant="soft"
                icon="i-heroicons-plus"
                class="w-full"
                @click="$emit('start-add', column.id)"
            >
                Add a note
            </UButton>
        </div>
    </UCard>
</template>

<script>
import RetroCard from '~/components/RetroCard.vue'

export default {
    name: 'RetroColumn',
    components: { RetroCard },
    props: {
        column: {
            type: Object,
            default: () => {},
        },
        activeColumn: {
            type: String,
            default: '',
        },
        editingNote: {
            type: String,
            default: '',
        },
        editText: {
            type: String,
            default: '',
        },
    },
    data() {
        return {
            newNoteTextLocal: '',
        }
    },
    computed: {
        sortedNotes() {
            return [...this.column.notes].sort((a, b) => b.votes - a.votes)
        },
    },
}
</script>
