<template>
    <div>
        <div v-if="handleBorrow" class="card-deck">
            <borrow-grid v-for="borrow in borrows" :key="borrow.id" :borrow="borrow"></borrow-grid>
            </div>
        <span v-else>No Result</span>
        </div>

    </template>
<script>
    import BorrowGrid from './../Table/borrow-grid.vue'
    export default{
        components: {
            BorrowGrid
        },
        data(){
            return {
                borrows: []
            }
        },
        computed: {
            handleBorrow(){
                return !_.isEmpty(this.borrows)
            }
        },
        beforeRouteEnter (to, from, next) {
            axios.get(`/api/borrows`, {params: to.query}).then(function (response) {
                next(vm => vm.setData(response.data))
            })
        },
        beforeRouteUpdate (to, from, next) {
            var vm = this
            axios.get(`/api/borrows`, {params: to.query}).then(function (response) {
                vm.setData(response.data)
                next()
            })
        },
        methods: {
            setData(response){
                this.borrows = response.data
            },
        }
    }
    </script>