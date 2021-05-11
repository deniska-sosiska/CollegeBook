const routes = [
  {
    name: 'Spesialties',
    path: '/',
    component: () => import("../Views/Specialties.vue")
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
    name: 'Groups',
    path: '/:specialty/:idSpecialty',
    component: () => import("../Views/Groups.vue"),
    props: true,
    meta: {  requiresAuth: true  }
  },
  {
    name: 'ChoiseMagazines',
    path: '/:specialty/:group/:idGroup',
    component: () => import("../Views/Magazines.vue"),
    props: true,
    meta: {  requiresAuth: true  }
  },
  {
    name: 'AcademicAttendance',
    path: '/:specialty/:group/:magazines',
    component: () => import("../Views/Academic-attendance/Academic-attendance.vue"),
    props: true,
    meta: {  requiresAuth: true  }
  },
  {
    name: 'AcademicAttendanceInfo',
    path: '/:specialty/:group/:magazines/info',
    component: () => import("../Views/Academic-attendance/Academic-attendance-info.vue"),
    props: true,
    meta: {  requiresAuth: true  }
  },
  {
    name: 'AdminPanel',
    path: '/AdminPanel',
    component: () => import("../Views/AdminPanel.vue"),
    meta: {  requiresAuth: true, accountAdmin: true  }
  }
]

export default routes