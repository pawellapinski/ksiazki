export default {
    data(){
        return {
            categories: []
        }
    },
    methods: {
        search_category(query){
            var vm = this
            if (query !== '') {
                vm.onSearchCategory(query, vm)
            } else {
                vm.loading = false
                vm.categories = []
            }
        },
        onSearchCategory: _.debounce(function (query, vm) {
            vm.loading = true
            axios.get('/api/categories/search?search=' + query).then(function (q) {
                vm.loading = false
                vm.categories = q.data.data.map(item => {
                    return {value: item.id, label: item.name};
                })
            }).catch(function () {
                vm.loading = false
            })
        }, 350),
    }
}