<template>
    <div>
        <grid-view :columns="columns"
                   :data="data"
                   create-name="Dodaj ksiązke"
                   on-delete="/api/books"
                   on-edit-name="edit-book"
                   on-create-name="create-book"
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
                        label: 'Autor',
                        prop: 'author.name',
                        sort: true
                    }, {
                        label: 'Kraj',
                        prop: 'category.name',
                        sort: true
                    }, {
                        label: 'ISBN',
                        prop: 'isbn',
                        sort: true
                    }, {
                        label: 'Tytuł',
                        prop: 'title',
                        sort: true
                    }, {
                        label: 'Data publikacji',
                        prop: 'date_of_publication',
                        sort: true
                    },
                ],
                data: []
            }
        },
        components: {
            GridView,
        },
        beforeRouteEnter (to, from, next) {
            axios.get(`/api/books`, {params: to.query}).then(function (response) {
                next(vm => vm.setData(response.data))
            })
        },
        beforeRouteUpdate (to, from, next) {
            var vm = this
            axios.get(`/api/books`, {params: to.query}).then(function (response) {
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