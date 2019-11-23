<template>
<div>
    <div class="container-fluid display-table" >
      <div class="row display-table-row" style="text-align:left;" >
        <nav class="col-md-2 hidden-xs display-table-cell v-align">
          <br>
          <img src="../assets/logo02.png" class="rounded float-left" style="width: 100%; height: auto;" alt="...">
          <img src="../assets/logo01.png" class="rounded float-left" style="width: 100%; height: auto;" alt="...">
          <br>
          <div class="dropdown-divider"></div>
          <div class="dropright">
            <li class="nav-item">
            <router-link to="/cadastrarusuario">Cadastrar</router-link>
            </li>
            <li class="nav-item">
            <router-link to="/buscar">Buscar</router-link>
            </li>

          </div>
        <div class="dropdown-divider"></div>
        </nav>
        <!-- Aqui esta a workspace  -->
        <workspace></workspace>
      </div>
    </div>
</div>
</template>

<script>
import Workspace from './Workspace'
export default {
  name: 'hello',
  components: {
    Workspace
  },
  data () {
    return {
      ok: 'adm'
    }
  },
  methods: {
    greet: function (event) {
      alert('Olá ' + this.name + '!')
      if (event) {
        alert(event.target.tagName)
      }
    }
  }
}
</script>

<style>

/*
 * Navbar
 */

.navbar-brand {
  padding-top: .75rem;
  padding-bottom: .75rem;
  font-size: 1rem;
  background-color: rgba(0, 0, 0, .25);
  box-shadow: inset -1px 0 0 rgba(0, 0, 0, .25);
}
</style>