import VueRouter from 'vue-router';
import Index from '@/views/Index.vue'
import Login from '@/views/Login.vue'
import Loading from '@/views/Loading.vue'


export default new VueRouter({
    routes: [
        {
            path: '/',
            component: Index
        },
        {
            path: '/login',
            component: Login
        },
        {
            path: '/loading',
            component: Loading
        }
    ]
})
