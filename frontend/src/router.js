import Vue from 'vue'
import Router from 'vue-router'
import DemoView from '@/views/Demo';
import DokuView from '@/views/Doku';
import GitHubView from '@/views/GitHub';
import HomeView from '@/views/Home';

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    { path: '/', redirect: { name: 'home' } },
    { path: '/home', name: 'home', component: HomeView, meta: { title: "Cassandra | Home" } },
    { path: '/demo', name: 'demo', component: DemoView, meta: { title: "Cassandra | Demo" } },
    { path: '/doku', name: 'doku', component: DokuView, meta: { title: "Cassandra | Doku" } },
    { path: '/github', name: 'github', component: GitHubView, meta: { title: "Cassandra | GitHub" } },
  ]
});