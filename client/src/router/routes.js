const routes = [
  {
    name: 'Spesialties',
    path: '/',
    component: () => import("../Views/Specialties.vue")
  },
  {
    name: 'Groups',
    path: '/search/:specialtyID',
    component: () => import("../Views/Groups.vue"),
    props: true,
    meta: {  requiresAuth: true  }
  },
  {
    name: 'Magazines',
    path: '/search/:specialtyID/:groupID',
    component: () => import("../Views/Magazines.vue"),
    props: true,
    meta: {  requiresAuth: true  }
  },
  {
    name: 'AcademicAttendance',
    path: '/search/:specialtyID/:groupID/AcademicAttendance',
    component: () => import("../Views/Academic-attendance/Academic-attendance.vue"),
    props: true,
    meta: {  requiresAuth: true  }
  },
  {
    name: 'AcademicAttendanceInfo',
    path: '/search/:specialtyID/:groupID/AcademicAttendanceInfo',
    component: () => import("../Views/Academic-attendance/Academic-attendance-info.vue"),
    props: true,
    meta: {  requiresAuth: true  }
  },

  {  
    name: 'SignIn',
    path: '/Authorization/SignIn',
    component: () => import("../Views/Authorization/Sign-in.vue")
  },
  {
    name: 'SignUp',
    path: '/Authorization/SignUp',
    component: () => import("../Views/Authorization/Sign-up.vue")
  },
  {
    name: 'AdminPanel',
    path: '/AdminPanel',
    component: () => import("../Views/AdminPanel.vue"),
    meta: {  requiresAuth: true, accountAdmin: true  }
  },
  {
    name: "NotFound",
    path: "*",
    component: () => import("../Views/NotFound.vue")
  }
]

export default routes