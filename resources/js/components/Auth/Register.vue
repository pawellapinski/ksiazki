<template>
    <div class="page-login">
        <div class="login-box">
            <div class="login-title">
                <h3>Biblioteka</h3>
                <p>Rejestracja</p>
                </div>
            <div class="login-form">
                <el-form label-position="top" :model="loginForm" ref="registerForm">
                    <el-form-item :class="errors.name ? 'is-error is-required' : ''" prop="name">
                        <el-input placeholder="Enter Name" type="text" v-model="loginForm.name"
                                  auto-complete="off"></el-input>
                        <div v-if="errors.name" v-for="error in errors.name" class="el-form-item__error">
                            {{error}}
                            </div>
                        </el-form-item>
                    <el-form-item :class="errors.email ? 'is-error is-required' : ''" prop="email">
                        <el-input placeholder="Enter Email" type="text" v-model="loginForm.email"
                                  auto-complete="off"></el-input>
                        <div v-if="errors.email" v-for="error in errors.email" class="el-form-item__error">
                            {{error}}
                            </div>
                        </el-form-item>
                    <el-form-item :class="errors.password ? 'is-error is-required' : ''" prop="password">
                        <el-input placeholder="Enter Password" type="password" v-model="loginForm.password"
                                  auto-complete="off"></el-input>
                        <div v-if="errors.password" v-for="error in errors.password" class="el-form-item__error">
                            {{error}}
                            </div>
                        </el-form-item>
                    <el-form-item :rules="$root.validate.required" prop="password_confirmation">
                        <el-input placeholder="Enter Password" type="password" v-model="loginForm.password_confirmation"
                                  auto-complete="off"></el-input>
                        </el-form-item>
                    <el-form-item>
                        <el-button type="primary" :loading="loading" @click="handleSubmit">Zarejestruj</el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </div>
        </div>
    </template>
<style scope>
    @import url('./auth.css');
    </style>
<script>
    export default{
        data(){
            return {
                loginForm: {
                    name: '',
                    email: '',
                    password: '',
                    password_confirmation: '',
                },
                errors: {},
                loading: false
            }
        },
        methods: {
            handleSubmit () {
                var vm = this
                this.$refs.registerForm.validate((valid) => {
                    if (valid) {
                        vm.errors = {}
                        vm.loading = true
                        axios.post('/register', vm.loginForm).then(function () {
                            vm.loading = false
                            window.location.href = window.location.href;
                        }).catch(function (error) {
                            vm.loading = false
                            if (error.response.data.errors && error.response.data.message) {
                                vm.errors = error.response.data.errors;
                                vm.$message({message: error.response.data.message, type: 'error'})
                            }else if(error.response) {
                                vm.$message({message: error.response.statusText, type: 'error'})
                            }
                        })
                    }
                })
            }
        }
    }
    </script>