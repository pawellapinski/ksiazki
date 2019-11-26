try {
    window.$ = window.jQuery = require('jquery');
    require('bootstrap');
} catch (e) {
}
window.axios = require('axios');

window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

let token = document.head.querySelector('meta[name="csrf-token"]');

if (token) {
    window.axios.defaults.headers.common['X-CSRF-TOKEN'] = token.content;
} else {
    console.error('CSRF token not found: https://laravel.com/docs/csrf#csrf-x-csrf-token');
}

window.Vue = require('vue')
import {Loading,Message, Form, FormItem, Input, Button} from 'element-ui';
Vue.prototype.$message = Message;
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Button)
Vue.use(Loading)
new Vue({
    data(){
        return {
            validate: {
                required: [
                    {required: true}
                ]
            },
        }
    },
    render: h => h(require('./components/Auth/Register.vue').default)
}).$mount('#register');