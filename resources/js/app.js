require("./bootstrap");
import Vue from "vue";
import router from "./router";
import App from "./components/App";

const app = new Vue({
    el: "#container",
    components: {
        App
    },
    router
});
