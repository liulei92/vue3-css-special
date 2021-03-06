import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import Home from "../views/Home.vue";
import Layout from '../Layout.vue';


const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  },
  {
    path: "/css",
    name: "Css",
    component: Layout,
    redirect: "/css/default",
    children: [
      {
        path: "",
        redirect: "/css/default"
      },
      {
        path: "default",
        name: "Default",
        component: () =>
          import(/* webpackChunkName: "css.default" */ "../views/cssPages/default.vue")
      },
      {
        path: "95",
        name: "95",
        component: () =>
          import(/* webpackChunkName: "css.95" */ "../views/cssPages/view95.vue")
      }
    ]
  },
  { path: '/*', redirect: '/home' }
];

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes
});

export default router;
