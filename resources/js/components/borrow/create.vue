<template>
    <div>
        <el-row>
            <el-col :span="24">
                <el-card shadow="never">
                    <div slot="header">
                        <span>{{$route.params.id ? 'Edytuj' : 'Utwórz'}} Wypożyczenie</span>
                        </div>
                    <el-form ref="form" @submit.native.prevent="onSubmit" :model="form" label-width="120px">
                        <el-form-item prop="book_id"  label="Ksiazka">
                            <el-select
                                v-model="form.book_id"
                                filterable
                                remote
                                reserve-keyword
                                placeholder="Please enter a keyword"
                                :remote-method="search_book"
                                reserve-keyword
                                :loading="loading">
                                <el-option
                                    v-for="item in books"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        <el-form-item prop="user_id"  label="Uzywtkownik">
                            <el-select
                                v-model="form.user_id"
                                filterable
                                remote
                                reserve-keyword
                                placeholder="Please enter a keyword"
                                :remote-method="search_user"
                                :loading="loading">
                                <el-option
                                    v-for="item in users"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        <el-form-item prop="date_issued" label="Data wypożyczenia">
                            <el-date-picker v-model="form.date_issued" type="date" placeholder="Pick a day"></el-date-picker>
                            <div v-if="errors.date_issued" v-for="error in errors.date_issued" class="el-form-item__error">
                                {{error}}
                                </div>
                            </el-form-item>
                        <el-form-item prop="date_due_for_return" label="termin zwrotu">
                            <el-date-picker v-model="form.date_due_for_return" type="date" placeholder="Pick a day"></el-date-picker>
                            <div v-if="errors.date_due_for_return" v-for="error in errors.date_due_for_return" class="el-form-item__error">
                                {{error}}
                                </div>
                            </el-form-item>
                        <el-form-item>
                            <el-button :disabled="disabled" type="primary" @click="onSubmit('form')">{{$route.params.id
                                ? 'Edytuj' : 'Stwórz'}} Wypożyczenie
                                </el-button>
                            <el-button @click="onCancel">Analuj</el-button>
                            </el-form-item>
                        </el-form>
                    </el-card>
                </el-col>
            </el-row>
        </div>
    </template>
<script>
    import book from './../mixin/search/book.js'
    import user from './../mixin/search/user.js'
    export default {
        mixins: [book, user],
        data() {
            return {
                form: {
                    book_id: '',
                    user_id: '',
                    date_issued: '',
                    date_due_for_return: '',
                },
                errors: {},
                loading: false,
                disabled: false
            }
        },
        beforeRouteEnter (to, from, next) {
            if (to.params.id) {
                axios.get(`/api/borrows/${to.params.id}`).then(function (response) {
                    next(vm => vm.setData(response.data))
                }).catch(function (error) {
                    if (error.response.statusText) {
                        next(vm => vm.$message({
                            type: 'error',
                            message: error.response.statusText
                        }))
                    }
                })
            } else {
                next()
            }
        },
        beforeRouteUpdate (to, from, next) {
            var vm = this
            if (to.params.id) {
                vm.errors = {}
                axios.get(`/api/borrows/${to.params.id}`).then(function (response) {
                    vm.setData(response.data)
                    next()
                }).catch(function (error) {
                    if (error.response.statusText) {
                        vm.$message({
                            type: 'error',
                            message: error.response.statusText
                        })
                    }
                })
            } else {
                next()
            }
        },
        methods: {
            setData(response){
                var vm = this
                vm.books = []
                vm.users = []
                vm.books = [{value:  response.book.id, label:  response.book.title}];
                vm.users = [{value: response.user.id, label: response.user.name}];
                vm.form = response
                vm.form.book_id = response.book.id
                vm.form.user_id = response.user.id
            },
            onCancel(){
                this.$router.push({name: 'view-borrow'})
            },
            onSubmit() {
                var vm = this
                this.$refs.form.validate((valid) => {
                    if (valid) {
                        vm.disabled = true
                        vm.errors = {}
                        let id = vm.$route.params.id;
                        axios[id ? 'put' : 'post'](`/api/borrows${id ? `/${id}` : ''}`, vm.form).then(function () {
                            vm.disabled = false
                            vm.errors = {}
                            vm.$message({
                                type: 'success',
                                message: 'Borrow has been created'
                            })
                        }).catch(function (error) {
                            vm.disabled = false
                            if (error.response.data.errors && error.response.data.message) {
                                vm.errors = error.response.data.errors;
                                vm.$message({message: error.response.data.message, type: 'error'})
                            }
                        })
                    }
                })
            }
        }
    }
    </script>