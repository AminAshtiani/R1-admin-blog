<template>
    <div class="admin">
        <layout>
            <h1>List</h1>
        </layout>
    </div>
</template>
<script>
import Layout from '@/components/Layout'
export default {
    name: 'List',
    components: {
        Layout
    },
    mounted() {
        this.$store.dispatch('getArticles')
    }
}
</script>