import Vue from "vue";
import Router from "vue-router";
Vue.use(Router);
const router = new Router({
    mode: "history",
    scrollBehavior() {
        return {
            x: 0,
            y: 0
        };
    },
    routes: [

    ]
});

export default router;