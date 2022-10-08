import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'HomeOut',
    component: () => import('../layouts/MainLayout.vue'),
  },
  {
    path: '/Home',
    name: 'HomePage',
    component: () => import('../pages/HomePage.vue'),
    children: [
      { path: '/Posts', component: () => import('pages/AddEditPost.vue') },
    ],
  },

  {
    path: '/Post',
    name: 'Post',
    component: () => import('pages/AddEditPost.vue'),
    //children: [{ path: '/Posts', component: () => import('pages/AddEditPost.vue'), }],
  },

  {
    path: '/Register',
    component: () => import('components/SignUp.vue'),
    //children: [{ path: '', component: () => import('pages/IndexPage.vue') }],
  },

  {
    path: '/RegisterUser',
    name: 'RegisterUser',
    component: () => import('components/RegisterUser.vue'),
  },

  {
    path: '/Login',
    name: 'Login',
    component: () => import('components/Login.vue'),
  },

  // {
  //   path: '/ResetPassword',
  //   component: () => import('components/ResetPassword.vue'),
  // },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
