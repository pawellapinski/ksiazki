<template>
    <div>
        <grid-view :columns="columns"
                   :data="data"
                   create-name="Dodaj zamówienie"
                   on-delete="/api/borrows"
                   on-edit-name="edit-borrow"
                   on-create-name="create-borrow"
                   @delete="data.data.splice($event, 1)"
                   ></grid-view>
        </div>
    </template>
<style>
    </style>
<script>
    import GridView from './../Table/Grid.vue'
    export default{
        data(){
            return {
                columns: [
                    {
                        label: 'Tytuł',
                        prop: 'book.title',
                        sort: true
                    }, {
                        label: 'Nazwa uzytkownika',
                        prop: 'user.name',
                        sort: true
                    }, {
                        label: 'wpopozyczenie',
                        prop: 'date_issued',
                        sort: true
                    }, {
                        label: 'termin zwrotu',
                        prop: 'date_due_for_return',
                        sort: true
                    }
                ],
                data: []
            }
        },
        components: {
            GridView,
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
                this.data = response
            },
        }
    }
    </script>