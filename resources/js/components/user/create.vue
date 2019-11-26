<template>
    <div>
        <el-row>
            <el-col :span="24">
                <el-card shadow="never">
                    <div slot="header">
                        <span>{{$route.params.id ? 'Edit' : 'Create'}} Uzytkownik</span>
                        </div>
                    <el-form ref="form" @submit.native.prevent="onSubmit" :model="form" label-width="120px">
                        <el-form-item :class="errors.name ? 'is-error is-required' : ''" prop="name">
                            <el-input placeholder="Enter Name" type="text" v-model="form.name"
                                      auto-complete="off"></el-input>
                            <div v-if="errors.name" v-for="error in errors.name" class="el-form-item__error">
                                {{error}}
                                </div>
                            </el-form-item>
                        <el-form-item :class="errors.email ? 'is-error is-required' : ''" prop="email">
                            <el-input placeholder="Enter Email" type="text" v-model="form.email"
                                      auto-complete="off"></el-input>
                            <div v-if="errors.email" v-for="error in errors.email" class="el-form-item__error">
                                {{error}}
                                </div>
                            </el-form-item>
                        <el-form-item :class="errors.password ? 'is-error is-required' : ''" prop="password">
                            <el-input placeholder="Enter Password" type="password" v-model="form.password"
                                      auto-complete="off"></el-input>
                            <div v-if="errors.password" v-for="error in errors.password" class="el-form-item__error">
                                {{error}}
                                </div>
                            </el-form-item>
                        <el-form-item :rules="$root.validate.required" prop="password_confirmation">
                            <el-input placeholder="Enter Password" type="password" v-model="form.password_confirmation"
                                      auto-complete="off"></el-input>
                            </el-form-item>
                        <el-form-item>
                            <el-button :disabled="disabled" type="primary" @click="onSubmit('form')">{{$route.params.id
                                ? 'Edit' : 'Create'}} Uzytkownik
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
    export default {
        data() {
            return {
                form: {
                    name: '',
                    email: '',
                    password: '',
                    password_confirmation: '',
                },
                errors: {},
                loading: false,
                disabled: false
            }
        },
        beforeRouteEnter (to, from, next) {
            if (to.params.id) {
                axios.get(`/api/users/${to.params.id}`).then(function (response) {
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
                axios.get(`/api/users/${to.params.id}`).then(function (response) {
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
                this.form = response
            },
            onCancel(){
                this.$router.push({name: 'view-user'})
            },
            onSubmit() {
                var vm = this
                this.$refs.form.validate((valid) => {
                    if (valid) {
                        vm.disabled = true
                        vm.errors = {}
                        let id = vm.$route.params.id;
                        axios[id ? 'put' : 'post'](`/api/users${id ? `/${id}` : ''}`, vm.form).then(function () {
                            vm.disabled = false
                            vm.$message({
                                type: 'success',
                                message: 'User has been created'
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