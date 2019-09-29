import DemoView from "@/views/Demo";
import DokuView from "@/views/Doku";
import HomeView from "@/views/Home";
import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    { path: "/", redirect: { name: "home" } },
    {
      path: "/home",
      name: "home",
      component: HomeView,
      meta: { title: "Cassandra | Home" }
    },
    {
      path: "/demo",
      name: "demo",
      component: DemoView,
      meta: { title: "Cassandra | Demo" }
    },
    {
      path: "/doku",
      name: "doku",
      component: DokuView,
      meta: { title: "Cassandra | Doku" }
    }
  ]
});
