import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import DashboardViewVue from '../views/DashboardView.vue';
import ManageViewVue from '../views/ManageView.vue';
import ManageUserViewVue from '../views/ManageUserView.vue';
import ClaimView from '../views/ClaimView.vue';
import ClaimStatus from '../views/ClaimStatus.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'login',
    component: LoginView
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: DashboardViewVue
  },
  {
    path: '/manage/access',
    name: 'maccess',
    component: ManageViewVue
  },
  {
    path: '/manage/users',
    name: 'musers',
    component: ManageUserViewVue
  },
  {
    path: '/claim',
    name: 'claim',
    component: ClaimView
  },
  {
    path: '/claimstate',
    name: 'status',
    component: ClaimStatus
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});
export default router