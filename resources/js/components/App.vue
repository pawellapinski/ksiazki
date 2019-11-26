<template>

    <div >
        <div class="layout">
            <div  class="layout-topbar clearfix">
                <div class="layout-name" :class="{'sider-mini': isCollapse}">
                    <router-link class="full" to="/" v-if="!isCollapse">BIBLIOTEKA</router-link>
                    <span class="mini" v-else>P</span>
                    </div>
                <div class="layout-collapse" @click="toggleSider"><i class="fa fa-bars"></i></div>
                <div class="layout-nav">
                    <div @click="handleLogout"> <i class="fa fa-sign-out" aria-hidden="true"></i></div>
                    </div>
                </div>
            <div v-loading="$root.store.state.loading"   class="layout-body" :class="{'sider-full': !isCollapse,'sider-mini': isCollapse}">
                <aside class="layout-sider">
                    <div class="layout-user">
                        <!--<img alt="" src="../assets/.jpg" class="layout-avatar">-->
                        <div>{{$root.store.state.user.name}}</div>
                        </div>
                    <el-scrollbar style="height: calc(100% - 116px);">
                        <el-menu :unique-opened="true"
                                 background-color="#2a323c"
                                 text-color="#fff"
                                 :default-active="currentRoute"
                                 :router="true">
                            <component v-for="(item, index) in nav" :key="index" :is="item.type" :index="item.data.route"
                                       :data="item.data"></component>
                            </el-menu>
                        </el-scrollbar>


                    </aside>
                <div class="layout-panel">
                    <div class="layout-content">
                        <div class="layout-container">
                            <div class="layout-breadcrumb">
                                <el-breadcrumb separator="/">
                                    <el-breadcrumb-item :to="{ path: '/' }">Domowa</el-breadcrumb-item>
                                    </el-breadcrumb>
                                </div>
                            <div class="layout-inner">
                                <router-view></router-view>
                                </div>
                            </div>
                        </div>
                    <div class="layout-footer"> Paweł Łapiński © 2019</div>
                    </div>
                </div>
            </div>
        </div>
    </template>
<style scope>
    .el-dropdown-link {
        cursor: pointer;
        color: #409EFF;
    }
    .fa-sign-out {
        font-size: 24px;
    }
    </style>
<script>
    import MenuItem from './Navigation/menu-item.vue'
    export default {
        components: {
            MenuItem
        },
        mounted () {
            this.currentRoute = this.$route.name
        },
        watch: {
            $route (newVal, oldVal) {
                this.currentRoute = newVal.name
            }
        },
        data(){
            return {
                isCollapse: false,
                currentRoute: '',
                nav: [
                    {
                        type: 'menu-item',
                        data: {
                            route: 'view-dashboard',
                            text: 'nawigacja'
                        }
                    }, {
                        type: 'menu-item',
                        data: {
                            route: 'view-book',
                            text: 'Ksiazki'
                        }
                    }, {
                        type: 'menu-item',
                        data: {
                            route: 'view-user',
                            text: 'Uzytkownicy'
                        }
                    }, {
                        type: 'menu-item',
                        data: {
                            route: 'view-borrow',
                            text: 'Wypozyczenia'
                        }
                    }, {
                        type: 'menu-item',
                        data: {
                            route: 'view-category',
                            text: 'Kraje'
                        }
                    }, {
                        type: 'menu-item',
                        data: {
                            route: 'view-author',
                            text: 'Autorzy'
                        }
                    },
                ],
                loading: false
            }
        },
        methods: {
            toggleSider () {
                this.isCollapse = !this.isCollapse
            },
            handleLogout(){
                var vm = this
                vm.loading = true
                this.$confirm('Do you continue?', 'Signout', {
                    confirmButtonText: 'OK',
                    cancelButtonText: 'Cancel',
                    type: 'warning'
                }).then(() => {
                    vm.$root.store.dispatch('handleLoading', true)
                    axios.post('/logout').then(function (response) {
                        this.$message({
                            type: 'success',
                            message: 'Signout successfully'
                        });
                    })
                    window.location.href = window.location.href;
                }).catch(() => {
                    vm.$root.store.dispatch('handleLoading', false)
                    vm.loading = false
                    this.$message({
                        type: 'info',
                        message: 'canceled'
                    });
                });
            }
        }
    }
    </script>
<style>
    html,
    body,
    #app {
        margin: 0;
        height: 100%;
    }
    .layout-topbar {
        position: fixed;
        width: 100%;
        height: 70px;
        line-height: 70px;
        background-color: #03a9f4;
        z-index: 101;
        color: #fff;
    }
    .layout-topbar a {
        color: #d3dce6;
    }
    .layout-topbar .el-dropdown-link {
        color: #fff;
    }
    .layout-name {
        width: 224px;
        text-align: center;
        float: left;
        background-color: #2a323c;
        font-family: Helvetica;
        font-size: 30px;
    }
    .layout-name.sider-mini {
        width: 64px;
    }
    .layout-name .full {
        text-decoration: none;
    }
    .layout-nav {
        float: right;
        padding-right: 10px;
    }
    .layout-nav .nav-item {
        margin-right: 10px;
    }
    .layout-nav .nav-item .fa {
        font-size: 20px;
    }
    .layout-nav .nav-item .el-badge__content.is-fixed {
        top: 20px;
    }
    .layout-nav .layout-avatar {
        width: 36px;
        height: 36px;
        border: 2px solid #d3dce6;
    }
    .layout-avatar {
        border-radius: 50%;
        vertical-align: middle;
        cursor: pointer;
    }
    .layout-user {
        padding: 20px;
        text-align: center;
        color: #fff;
    }
    .layout-user .layout-avatar {
        width: 64px;
        height: 64px;
        margin-bottom: 10px;
    }
    .layout-sider {
        width: 224px;
        background-color: #2a323c;
        position: fixed;
        top: 70px;
        left: 0;
        height: 100%;
        transition: all 0.3s ease;
        z-index: 102;
        overflow-x: hidden;
    }
    .layout-panel,
    .layout-content {
        position: absolute;
        left: 0;
        top: 0;
        bottom: 0;
        right: 0;
        overflow: hidden;
        background: #f5f5f5;
        transition: all 0.3s ease;
        width: auto;
    }
    .layout-collapse {
        float: left;
        width: 70px;
        cursor: pointer;
        background-color: rgba(255, 255, 255, 0.1);
        text-align: center;
        color: #fff;
    }
    .layout-body {
        position: absolute;
        width: 100%;
        top: 70px;
        bottom: 0;
        z-index: 100;
    }
    .layout-body.sider-full .layout-panel {
        left: 224px;
    }
    .layout-body.sider-mini .layout-panel {
        left: 64px;
    }
    .layout-body.sider-mini .layout-sider {
        width: 64px;
    }
    .layout-body.sider-mini .layout-user {
        display: none;
    }
    .layout-body.sider-mini .el-menu .el-submenu__icon-arrow,
    .layout-body.sider-mini .el-menu .nav-next {
        display: none;
    }
    .layout-body.sider-mini .el-menu-item {
        padding: 0 !important;
    }
    .layout-body.sider-mini .el-menu .el-submenu {
        text-align: center;
    }
    .layout-content {
        overflow-y: auto;
    }
    .layout-container {
        padding: 15px;
    }
    .layout-inner {
        padding: 10px;
        background: #fff;
        border-radius: 3px;
        margin-top: 10px;
    }
    .layout-breadcrumb {
        box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.1);
        padding: 25px 15px;
        background-color: #fff;
        margin: -15px -15px 0 -15px;
    }
    .layout-footer {
        height: 64px;
        line-height: 64px;
        text-align: center;
        font-size: 12px;
        color: #999;
        background: #fff;
        border-top: 1px solid #e9e9e9;
        width: 100%;
        display: none;
    }
    .layout-header {
        padding: 20px 10px;
        border-bottom: 1px solid #e9e9e9;
        background-color: #324057;
    }
    .layout-header:before,
    .layout-header:after {
        content: '';
        display: table;
    }
    .layout-header:after {
        clear: both;
    }
    .layout-header .is-user {
        float: right;
    }
    </style>