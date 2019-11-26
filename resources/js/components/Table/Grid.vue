<template>
    <div>
        <el-row>
            <el-col v-if="onCreateName" :span="6">
                <el-button type="primary" @click="$router.push({ name: onCreateName})">{{createName}}</el-button>
            </el-col>
        </el-row>
        <el-table :data="data.data"
                  @sort-change="handleSortChange"
                  v-loading="loading"
                  style="width: 100%">
            <slot></slot>
            <el-table-column
                    v-for="(column, index, key) in columns"
                    :key="`${index}-${key}-${column.prop}-${column.label}`"
                    :sortable="column.sort ? true : false"

                    :label="column.label"
                    :prop="column.prop">
            </el-table-column>

            <el-table-column
                    align="right">
                <template slot="header" slot-scope="scope">
                    <el-input v-model="search"
                              @input="search_"
                              size="mini"
                              placeholder="Type to search"/>
                </template>
                <template slot-scope="scope">

                    <el-button
                            size="mini"
                            @click="handleEdit(scope.$index, scope.row)">Edit
                    </el-button>
                    <el-button
                            size="mini"
                            type="danger"
                            @click="handleDelete(scope.$index, scope.row)">Delete
                    </el-button>
                </template>
            </el-table-column>

        </el-table>
        <el-pagination
                @current-change="handleCurrentChange"
                :current-page="data.current_page"
                :page-size="data.per_page"
                layout="total, prev, pager, next, jumper"
                :total="data.total">
        </el-pagination>
    </div>
</template>
<script>
    export default{
        props: {
            createName: String,
            onCreateName: String,
            onEditName: String,
            onDelete: String,
            data: {},
            columns: Array,
        },
        data(){
            var vm = this
            return {
                search: vm.$route.query.search ? vm.$route.query.search : '',
                loading: false
            }
        },
        methods: {
            handleSortChange(val){
                var vm = this;
                var option = _.clone(vm.$route.query)
                option.column = val.prop;
                option.direction = val.order == 'ascending' ? 'asc' : 'desc';
                vm.onRouteChange(option)
            },
            handleCurrentChange(val) {
                var vm = this;
                var option = _.clone(vm.$route.query)
                option.page = valvm.onRouteChange(option)
            },
            onRouteChange(option){
                var vm = this
                vm.loading = true
                vm.$router.push({
                    path: `${vm.$route.path}`,
                    query: option
                }, function () {
                    vm.loading = false
                }, function () {
                    vm.loading = false
                });
            },
            search_(){
                var vm = this
                vm.onSearch(vm.search, vm)
            },
            onSearch: _.debounce(function (query, vm) {
                var vm = this;
                vm.loading = true
                vm.$router.push({
                    path: `${vm.$route.path}`,
                    query: {search: query}
                }, function () {
                    vm.loading = false
                }, function () {
                    vm.loading = false
                });
            }, 500),
            handleEdit(index, row) {
                var vm = this
                vm.$router.push({name: vm.onEditName, params: {id: row.id}})
            },
            handleDelete(index, row) {
                var vm = this
                vm.loading = true
                vm.$confirm('This will permanently delete the file. Continue?', 'Warning', {
                    confirmButtonText: 'OK',
                    cancelButtonText: 'Cancel',
                    type: 'warning'
                }).then(() => {
                    axios.delete(`${vm.onDelete ? vm.onDelete : '/api/agencies'}/${row.id}`)
                    vm.$emit('delete', index)
                    this.$message({
                        type: 'success',
                        message: 'Delete completed'
                    });
                    vm.loading = false
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: 'Delete canceled'
                    });
                    vm.loading = false
                });
            }
        }
    }
</script>