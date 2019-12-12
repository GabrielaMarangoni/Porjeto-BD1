<template>
  <div>
      <div id="list" class="row"  style="font-size: 18px;" >
          <div class="table-responsive col-md-12" id="myDiv" ref="myDiv">
           <h2>Top3 Clientes</h2>
            <table class="table table-striped" cellspacing="0" cellpadding="0" style="text-align: left;">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nome</th>
                  <th>Quantidade de Produtos Comprados</th>
                </tr>
              </thead>
              <tbody v-for="(res, i) in clientes" :key="res.id">
                <tr>
                  <td>{{i+1}}</td>
                  <td>{{res.nome}}</td>
                  <td>{{res.qtde}}</td>
                </tr>
              </tbody>
            </table>
          </div>
      </div>
  </div>
</template>

<script>
import User from '../services/users.js'
export default {
    data(){
        return {
            clientes: [],
        }
    },
    mounted () {
      User.top3().then(resposta => {
            //this.usuarios_cadastrados = resposta.data
            this.clientes =  this.clientes.concat(resposta.data);
            console.log(this.clientes);
      }).catch(function (error) {
        console.log(error)
        alert('Erro, Base não Conectada')
      })
    },
  }

</script>

<style >

</style>