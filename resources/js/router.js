import Vue from "vue";
import VueRouter from "vue-router";
import Home from "./components/home";
import Venue from "./components/venue";
Vue.use(VueRouter);

export default new VueRouter({
    routes: [
        {
            path: "",
            component: Home
        },
        {
            path: "/venue",
            name: "venue",
            component: Venue,
            props: route => ({
                city: route.query.city,
                country: route.query.country,
                id: route.query.id
            })
        }
    ],
    mode: "history"
});
