import VueRouter from 'vue-router';
import Index from '@/views/Index.vue'
import Login from '@/views/Login.vue'
import Loading from '@/views/Loading.vue'


const router = new VueRouter({
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


router.beforeEach((to, from, next) => {
    if (to.path !== '/login' && localStorage.token === undefined) {
        next({path: '/login'})
    } else {
        next()
    }
});


export default router;
