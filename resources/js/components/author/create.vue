<template>
    <div>
        <el-row>
            <el-col :span="24">
                <el-card shadow="never">
                    <div slot="header">
                        <span>{{$route.params.id ? 'Edytuj' : 'Utwórz'}} Autor</span>
                        </div>
                    <el-form ref="form" @submit.native.prevent="onSubmit" :model="form" label-width="120px">
                        <el-form-item prop="name" :rules="$root.validate.required" label="Name">
                            <el-input v-model="form.name"></el-input>
                            </el-form-item>
                        <el-form-item>
                            <el-button :disabled="disabled" type="primary" @click="onSubmit('form')">{{$route.params.id
                                ? 'Edytuj' : 'Utwórz'}} Autor
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
                },
                loading: false,
                disabled: false
            }
        },
        beforeRouteEnter (to, from, next) {
            if (to.params.id) {
                axios.get(`/api/authors/${to.params.id}`).then(function (response) {
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
                axios.get(`/api/authors/${to.params.id}`).then(function (response) {
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
                this.$router.push({name: 'view-author'})
            },
            onSubmit() {
                var vm = this
                this.$refs.form.validate((valid) => {
                    if (valid) {
                        vm.disabled = true
                        let id = vm.$route.params.id;
                        axios[id ? 'put' : 'post'](`/api/authors${id ? `/${id}` : ''}`, vm.form).then(function () {
                            vm.disabled = false
                            vm.$message({
                                type: 'success',
                                message: 'Author has been created'
                            })
                        }).catch(function (error) {
                            vm.disabled = false
                            if (error.response.statusText) {
                                vm.$message({
                                    type: 'error',
                                    message: error.response.statusText
                                })
                            }
                        })
                    }
                })
            }
        }
    }
    </script>