<script lang="ts">
    import {defineComponent} from 'vue'

    export default defineComponent({
        name: "RetroCard",
    })
</script>

<template>
    <UCard>
        <template #header>
            <h3 class="text-lg font-bold">Went Well</h3>
        </template>

        <p>We collaborated effectively and finished on time.</p>

        <template #footer>
            <UButton color="primary">Add Note</UButton>
        </template>
    </UCard>
</template>

<style scoped>

</style>