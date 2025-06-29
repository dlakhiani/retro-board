<script lang="ts">
    import {defineComponent} from 'vue'

    export default defineComponent({
        name: "RetroBoard",
        props: {
            columns: {
                type: Array,
                required: true,
            }
        },
    })
</script>

<template>
    <div class="grid gap-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 p-4">
        <RetroColumn
            v-for="(column, index) in columns"
            :key="index"
            :title="column.title"
            :cards="column.cards"
        />
    </div>
</template>

<style scoped>

</style>