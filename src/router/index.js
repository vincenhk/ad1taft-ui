import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'
import PorsiBankView from '@/views/PorsiBankView.vue'
import BankPendanaanView from '@/views/BankPendanaanView.vue'
import PorsiDendaView from '@/views/PorsiDendaView.vue'
import GroupBankView from '@/views/GroupBankView.vue'
import EntryBankCriteriaView from '@/views/EntryBankCriteriaView.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/porsi-bank',
      name: 'porsi bank',
      component: PorsiBankView
    },
    {
      path: '/bank-pendanaan',
      name: 'bank pendanaan',
      component: BankPendanaanView
    },
    {
      path: '/porsi-denda',
      name: 'porsi denda',
      component: PorsiDendaView
    },
    {
      path: '/bank-group',
      name: 'Bank Group',
      component: GroupBankView
    },
    {
      path: '/bank-criteria',
      name: 'Bank Criteria',
      component: EntryBankCriteriaView
    }
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('../views/AboutView.vue')
    // }
  ]
})

export default router
