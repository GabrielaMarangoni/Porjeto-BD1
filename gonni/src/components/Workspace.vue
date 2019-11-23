<template>
    <main role="main" class="col-md-9 ml-sm-auto col-lg-10">
          <div class="justify-content-between flex-wrap flex-md-nowrap align-items-center ">
            <router-view />
          </div>
    </main>
</template>

<script>
import CadastrarUsuario from './CadastrarUsuario'
import Buscar from './Buscar'
export default {
  components: {
    CadastrarUsuario,
    Buscar,
  }
}
</script>

<style>

</style>