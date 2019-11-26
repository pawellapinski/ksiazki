export default {
    data(){
        return {
            users: []
        }
    },
    methods: {
        search_user(query){
            var vm = this
            if (query !== '') {
                vm.onSearchUser(query, vm)
            } else {
                vm.loading = false
                vm.users = []
            }
        },
        onSearchUser: _.debounce(function (query, vm) {
            vm.loading = true
            axios.get('/api/users/search?search=' + query).then(function (q) {
                vm.loading = false
                vm.users = q.data.data.map(item => {
                    return {value: item.id, label: item.name};
                })
            }).catch(function () {
                vm.loading = false
            })
        }, 350),
    }
}