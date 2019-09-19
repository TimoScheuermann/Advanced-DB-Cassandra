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
    { path: '/home', name: 'home', component: HomeView },
    { path: '/demo', name: 'demo', component: DemoView },
    { path: '/doku', name: 'doku', component: DokuView },
    { path: '/github', name: 'github', component: GitHubView },
  ]
});