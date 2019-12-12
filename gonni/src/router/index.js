import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from '@/components/Dashboard'
import CadastrarCliente from '@/components/CadastrarCliente'
import CadastrarSorvete from '@/components/CadastrarSorvete'
import BuscarCliente from '@/components/BuscarCliente'
import BuscarSorvete from '@/components/BuscarSorvete'
import VenderSorvete from '@/components/VenderSorvete'
import Home from '@/components/Home'
import RelatorioCliente01 from '@/components/RelatorioCliente01'
import RelatorioTop3 from '@/components/RelatorioTop3'
import RelatorioTop3Sorvetes from '@/components/RelatorioTop3Sorvetes'


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
          path: 'relatoriocliente01',
          name: 'relatoriocliente01',
          component: RelatorioCliente01
        },
        {
          path: 'relatoriotop3',
          name: 'relatoriotop3',
          component: RelatorioTop3
        },
        {
          path: 'relatoriotop3sorvetes',
          name: 'relatoriotop3sorvetes',
          component: RelatorioTop3Sorvetes
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
