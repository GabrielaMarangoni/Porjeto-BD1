<template>
  <div>
      <div id="list" class="row"  style="font-size: 18px;" >
          <div class="table-responsive col-md-12" id="myDiv" ref="myDiv">
           <h2>Top 3 Sorvetes</h2>
            <table class="table table-striped" cellspacing="0" cellpadding="0" style="text-align: left;">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Sabor</th>
                  <th>Quantidade de Produtos Vendidos</th>
                </tr>
              </thead>
              <tbody v-for="(res, i) in sorvetes" :key="res.id">
                <tr>
                  <td>{{i+1}}</td>
                  <td>{{res.sabor}}</td>
                  <td>{{res.total}}</td>
                </tr>
              </tbody>
            </table>
          </div>
      </div>
  </div>
</template>

<script>
import Sorvete from '../services/sorvete.js'
export default {
    data(){
        return {
            sorvetes: [],
        }
    },
    mounted () {
      Sorvete.top3().then(resposta => {
            //this.usuarios_cadastrados = resposta.data
            this.sorvetes =  this.sorvetes.concat(resposta.data);
            console.log(this.sorvetes);
      }).catch(function (error) {
        console.log(error)
        alert('Erro, Base não Conectada')
      })
    },
  }

</script>

<style >

</style>