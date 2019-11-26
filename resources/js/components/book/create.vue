<!--suppress ALL -->
<template>
    <div>
        <el-row>
            <el-col :span="24">
                <el-card shadow="never">
                    <div slot="header">
                        <span>{{$route.params.id ? 'Edit' : 'Create'}} Book</span>
                        </div>
                    <el-form ref="form" @submit.native.prevent="onSubmit" :model="form" label-width="120px">

                        <el-form-item prop="category_id"  label="Category">
                            <el-select
                                    name="category_id"
                                v-model="form.category_id"
                                filterable
                                remote
                                reserve-keyword
                                placeholder="Please enter a keyword"
                                :remote-method="search_category"
                                :loading="loading">
                                <el-option
                                    v-for="item in categories"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                    </el-option>
                                </el-select>
                            <div v-if="errors.category_id" v-for="error in errors.category_id" class="el-form-item__error">
                                {{error}}
                                </div>
                            </el-form-item>
                        <el-form-item prop="author_id"  label="Author">
                            <el-select
                                v-model="form.author_id"
                                filterable
                                remote
                                reserve-keyword
                                placeholder="Please enter a keyword"
                                :remote-method="search_author"
                                :loading="loading">
                                <el-option
                                    v-for="item in authors"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                    </el-option>
                                </el-select>
                            <div v-if="errors.author_id" v-for="error in errors.author_id" class="el-form-item__error">
                                {{error}}
                                </div>
                            </el-form-item>

                        <el-form-item prop="isbn" label="ISBN">
                            <el-input placeholder="Enter ISBN" type="text" v-model="form.isbn"
                                      auto-complete="off"></el-input>
                            <div v-if="errors.isbn" v-for="error in errors.isbn" class="el-form-item__error">
                                {{error}}
                                </div>
                            </el-form-item>
                        <el-form-item prop="title" label="Title">
                            <el-input placeholder="Enter Title" type="text" v-model="form.title"
                                      auto-complete="off"></el-input>
                            <div v-if="errors.title" v-for="error in errors.title" class="el-form-item__error">
                                {{error}}
                                </div>
                            </el-form-item>

                        <el-form-item prop="date_of_publication" :rules="$root.validate.required" label="Date of Publication">
                            <el-date-picker v-model="form.date_of_publication" type="date" placeholder="Pick a day"></el-date-picker>
                            <div v-if="errors.date_of_publication" v-for="error in errors.date_of_publication" class="el-form-item__error">
                                {{error}}
                                </div>
                            </el-form-item>
                        <el-form-item>
                            <el-button :loading="disabled" type="primary" @click="onSubmit('form')">{{$route.params.id
                                ? 'Edit' : 'Create'}} Book
                                </el-button>
                            <el-button @click="onCancel">Cancel</el-button>
                            </el-form-item>
                        </el-form>
                    </el-card>

                </el-col>
            </el-row>
        </div>
    </template>
<script>
    import author from '../mixin/search/author'
    import category from '../mixin/search/category'

    export default {
        mixins: [author, category],

        data() {
            return {
                form: {
                    isbn: '',
                    title: '',
                    date_of_publication: '',
                    category_id: '',
                    author_id: '',
                    file: '',
                    photo: {
                        url: ''
                    }
                },
                errors: {},
                loading: false,
                disabled: false
            }
        },
        beforeRouteEnter (to, from, next) {
            if (to.params.id) {
                axios.get(`/api/books/${to.params.id}`).then(function (response) {
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
                axios.get(`/api/books/${to.params.id}`).then(function (response) {
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
                vm.authors = []
                vm.categories = []
                vm.authors = [{value:  response.author.id, label:  response.author.name}];
                vm.categories = [{value: response.category.id, label: response.category.name}];
                vm.form = response
                vm.form.author_id = response.author.id

            onSubmit() {
                var vm = this
                this.$refs.form.validate((valid) => {
                    if (valid) {
                        vm.disabled = true
                        vm.errors = {}
                        let id = vm.$route.params.id;

                        axios[id ? 'put' : 'post'](`/api/books${id ? `/${id}` : ''}`, vm.form).then(function () {
                            vm.disabled = false
                            vm.$message({
                                type: 'success',
                                message: 'Book has been created'
                            })
                        }).catch(function (error) {
                            vm.disabled = false
                            if (error.response.data.errors && error.response.data.message) {
                                vm.errors = error.response.data.errors;
                                vm.$message({message: error.response.data.message, type: 'error'})
                            }
                        })
                    }:
                }),
            }
        }
    }
    </script>