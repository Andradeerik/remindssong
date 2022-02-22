const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [{ path: "", component: () => import("pages/Index.vue") }],
  },
  {
    path: "/home",
    component: () => import("layouts/Home.vue"),
    meta: {
      aut: true,
    },
    children: [{ path: "", component: () => import("pages/home/Index.vue") }],
  },
  {
    path: "/user",
    component: () => import("layouts/Home.vue"),
    meta: {
      aut: true,
    },
    children: [{ path: "", component: () => import("pages/user.vue") }],
  },
  {
    path: "/politicadeprivacidad",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("pages/politicadeprivacidad.vue") },
    ],
  },
  {
    path: "/eliminardatos",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("pages/eliminardatos.vue") },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/Error404.vue"),
  },
];

export default routes;
