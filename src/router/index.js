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
        }
    ]
})


router.beforeEach((to, from, next) => {
    if (localStorage.token === undefined) {
        if (to.path !== '/login') {
            next({path: '/login'})
        } else {
            next()
        }
    } else {
        if (to.path !== '/') {
            next({path: '/'})
        } else {
            next()
        }
    }
});


export default router;
