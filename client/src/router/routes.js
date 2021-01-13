const routes = [
  {  
    path: '/',
    component: () => import("../components/Specialties.vue")
  },
  {  
    path: '/Authorization/',
    component: () => import("../components/Authorization/Sign-in.vue")
  },
  { 
    path: '/Authorization/signUP',
    component: () => import("../components/Authorization/Sign-up.vue")
  },
  { 
    path: '/:specialty/:idSpecialty',
    component: () => import("../components/Groups.vue"),
    props: true,
    meta: {  requiresAuth: true  }
  },
  { 
    path: '/:specialty/:group/:idGroup',
    component: () => import("../components/Magazines.vue"),
    props: true,
    meta: {  requiresAuth: true  }
  },
  { 
    path: '/:specialty/:group/:magazines',
    component: () => import("../components/Academic-attendance/Academic-attendance.vue"),
    props: true,
    meta: {  requiresAuth: true  }
  },
  { 
    path: '/:specialty/:group/:magazines/info',
    component: () => import("../components/Academic-attendance/Academic-attendance-info.vue"),
    props: true,
    meta: {  requiresAuth: true  }
  }
]

export default routes