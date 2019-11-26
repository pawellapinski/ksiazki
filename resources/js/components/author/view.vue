<template>
    <div>
        <grid-view :columns="columns"
                   :data="data"
                   create-name="Dodaj Autora"
                   on-delete="/api/authors"
                   on-edit-name="edit-author"
                   on-create-name="create-author"
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
                        label: 'Imie',
                        prop: 'name',
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
            axios.get(`/api/authors`, {params: to.query}).then(function (response) {
                next(vm => vm.setData(response.data))
            })
        },
        beforeRouteUpdate (to, from, next) {
            var vm = this
            axios.get(`/api/authors`, {params: to.query}).then(function (response) {
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