import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from '@/components/Dashboard'
import CadastrarCliente from '@/components/CadastrarCliente'
import CadastrarSorvete from '@/components/CadastrarSorvete'
import BuscarCliente from '@/components/BuscarCliente'
import BuscarSorvete from '@/components/BuscarSorvete'
import VenderSorvete from '@/components/VenderSorvete'
import Home from '@/components/Home'


Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
     {
      path: '/',
      name: 'dashboard',
      component: Dashboard,
      children: [
        {
          path: 'cadastrarcliente',
          name: 'cadastrarcliente',
          component: CadastrarCliente
        },
        {
          path: 'cadastrarsorvete',
          name: 'cadastrarsorvete',
          component: CadastrarSorvete
        },
        {
          path: 'buscarcliente',
          name: 'buscarcliente',
          component: BuscarCliente
        },
        {
          path: 'buscarsorvete',
          name: 'buscarsorvete',
          component: BuscarSorvete
        },
        {
          path: 'vendersorvete',
          name: 'vendersorvete',
          component: VenderSorvete
        },
        {
          path: 'home',
          name: 'home',
          component: Home
        },
      ]
    }
  ]
})
