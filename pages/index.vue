<script lang="ts">
    import {defineComponent} from 'vue'
    import RetroBoard from '~/components/RetroBoard.vue'

    export default defineComponent({
        name: "Index",
        components: {
            RetroBoard
        },
        data() {
            return {
                columns: [
                    {
                        title: "Liked",
                    },
                    {
                        title: "Learned",
                    },
                    {
                        title: "Lacked",
                    },
                ]
            }
        }
    })
</script>

<template>
    <div class="min-h-screen bg-gray-50 p-6">
        <h1 class="text-3xl font-bold text-center mb-6 text-blue-700">
            Retro
        </h1>
        <RetroBoard
            :columns="columns"
        />
    </div>
</template>

<style scoped>

</style>