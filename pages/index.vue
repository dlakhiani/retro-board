<script lang="ts">
    import {defineComponent} from 'vue'
    import {useBoardStore} from "~/stores/board"

    export default defineComponent({
        name: "Index",
        data() {
            return {
                board: useBoardStore(),
            }
        },
        created() {
            this.board.init()
        },
    })
</script>

<template>
    <RetroBoard />
</template>

<style scoped>

</style>