import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from '@/components/Dashboard'
import CadastrarUsuario from '@/components/CadastrarUsuario'
import Buscar from '@/components/Buscar'


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
          path: 'cadastrarusuario',
          name: 'cadastrarusuario',
          component: CadastrarUsuario
        },
        {
          path: 'buscar',
          name: 'buscar',
          component: Buscar
        },
      ]
    }
  ]
})
