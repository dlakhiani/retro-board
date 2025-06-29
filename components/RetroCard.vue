<template>
    <UCard :class="[note.color]">
        <div class="space-y-2">
            <div v-if="editing" class="space-y-2">
                <UTextarea v-model="editTextLocal" autofocus placeholder="Edit note..." />
                <div class="flex gap-2">
                    <UButton size="sm" @click="save">Save</UButton>
                    <UButton size="sm" color="gray" @click="cancel">Cancel</UButton>
                </div>
            </div>
            <div v-else>
                <p class="text-retro-slate text-sm">{{ note.text }}</p>
                <div class="flex justify-between items-center">
                    <div class="flex gap-2 text-xs text-retro-blue">
                        <span>by {{ note.author }}</span>
                        <UBadge v-if="note.votes > 0" color="gray">Votes: {{ note.votes }}</UBadge>
                    </div>
                    <div class="flex gap-1">
                        <UButton size="xs" icon="i-heroicons-hand-thumb-up" variant="soft" @click="vote" />
                        <UButton size="xs" icon="i-heroicons-pencil" variant="soft" @click="startEdit" />
                        <UButton size="xs" icon="i-heroicons-x-mark" variant="soft" @click="deleteNote" />
                    </div>
                </div>
            </div>
        </div>
    </UCard>
</template>

<script>
export default {
    name: 'RetroCard',
    props: {
        note: {
            type: Object,
            default: () => {},
        },
        editing: {
            type: Boolean,
            default: false,
        },
        editText: {
            type: String,
            default: '',
        },
    },
    data() {
        return {
            editTextLocal: this.editText || '',
        }
    },
    watch: {
        editText(newVal) {
            this.editTextLocal = newVal
        },
    },
    methods: {
        save() {
            this.$emit('save', this.editTextLocal)
        },
        cancel() {
            this.$emit('cancel')
        },
        deleteNote() {
            this.$emit('delete')
        },
        vote() {
            this.$emit('vote')
        },
        startEdit() {
            this.$emit('start-edit')
        },
    },
}
</script>
