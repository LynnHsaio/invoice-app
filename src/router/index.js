import VueRouter from "vue-router";
import Main from "@/pages/Main.vue";
import Detail from "@/pages/Detail.vue";

const router = new VueRouter({
  routes: [
    {
      path: "/",
      component: Main,
    },
    {
      path: "/detail/:id",
      component: Detail,
    },
  ],
});

export default router;
