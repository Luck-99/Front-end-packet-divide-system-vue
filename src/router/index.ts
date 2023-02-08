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
    path: "/",
    name: "home",
    component: () => import("@/views/main/main.vue"),
    redirect: "dashBoard",
    children: [
      {
        path: "dashBoard",
        name: "dashBoard",
        component: () => import("@/views/dashBoard/DashBoard.vue"),
      },
      {
        path: "taskSetting",
        name: "taskSetting",
        component: () => import("@/views/taskSetting/TaskSetting.vue"),
      },
      {
        path: "taskListDetail",
        name: "taskListDetail",
        component: () => import("@/views/taskListDetail/TaskListDetail.vue"),
      },
    ],
  },
]

const router = new VueRouter({
  mode: "history",
  routes,
  base: "/html",
})

// router.beforeEach((to, from, next) => {
//   // to:即将到达的路由    from:即将离开的路由 next:向下执行的方法
//   if (to.path == "/login") {
//     // 如果是登录页面,放行
//     next()
//   } else {
//     // 如果不是登录页面,验证token。如果有token,则执行next(),否则跳转到登录页面
//     const token = true //getCookie("token")
//     if (token) {
//       next()
//     }
//     if (!token) {
//       next("/login")
//     }
//   }
// })

export default router
