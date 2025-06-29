<script lang="ts">
    import {defineComponent} from 'vue'

    export default defineComponent({
        name: "RetroColumn",
        props: {
            title: {
                type: String,
                required: true
            },
            cards: {
                type: Array,
                default: () => []
            },
        },
    })
</script>

<template>
    <UCard class="h-full flex flex-col">
        <template #header>
            <h3 class="text-lg font-bold text-center">{{ title }}</h3>
        </template>

        <div class="flex-1">
            <ul class="space-y-2">
                <li
                    v-for="(card, index) in cards"
                    :key="index"
                    class="bg-white p-2 rounded border text-gray-800 shadow-sm"
                >
                    {{ card }}
                </li>
            </ul>
        </div>
    </UCard>
</template>

<style scoped>

</style>