import Vue from "vue"
import VueRouter, { RouteConfig } from "vue-router"

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/user/LoginView.vue"),
  },
  {
    path: "/dashBoard",
    name: "dashBoard",
    component: () => import("@/views/dashBoard/DashBoard.vue"),
  },
  {
    path: "/taskSetting",
    name: "taskSetting",
    component: () => import("@/views/taskSetting/TaskSetting.vue"),
  },
  {
    path: "/",
    name: "home",
    component: () => import("@/views/HomeView.vue"),
    redirect: "/dashBoard",
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "@/views/AboutView.vue"),
  },
]

const router = new VueRouter({
  routes,
})

router.beforeEach((to, from, next) => {
  // to:即将到达的路由    from:即将离开的路由 next:向下执行的方法
  if (to.path == "/login") {
    // 如果是登录页面,放行
    next()
  } else {
    // 如果不是登录页面,验证token。如果有token,则执行next(),否则跳转到登录页面
    const token = true //getCookie("token")
    if (token) {
      next()
    }
    if (!token) {
      next("/login")
    }
  }
})

export default router
