<template>
    <main role="main">
          <div class="justify-content-between align-items-center ">
            <router-view />
          </div>
    </main>
</template>

<script>
import CadastrarCliente from './CadastrarCliente'
import CadastrarSorvete from './CadastrarSorvete'
import BuscarCliente from './BuscarCliente'
import BuscarSorvete from './BuscarSorvete'
import VenderSorvete from './VenderSorvete'
import Home from './Home'
export default {
  components: {
    CadastrarCliente,
    BuscarCliente,
    BuscarSorvete,
    Home,
    CadastrarSorvete,
    VenderSorvete,
  }
}
</script>

<style>

</style>