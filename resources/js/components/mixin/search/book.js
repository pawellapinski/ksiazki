export default {
    data(){
        return {
            books: []
        }
    },
    methods: {
        search_book(query){
            var vm = this
            if (query !== '') {
                vm.onSearchAuthor(query, vm)
            } else {
                vm.loading = false
                vm.books = []
            }
        },
        onSearchAuthor: _.debounce(function (query, vm) {
            vm.loading = true
            axios.get('/api/books/search?search=' + query).then(function (q) {
                vm.loading = false
                vm.books = q.data.data.map(item => {
                    return {value: item.id, label: item.title};
                })
            }).catch(function () {
                vm.loading = false
            })
        }, 350),
    }
}