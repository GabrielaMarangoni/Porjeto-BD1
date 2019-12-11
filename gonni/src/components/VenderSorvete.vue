<template>
    <div>
        <h1>Vendas</h1>
        <form  @submit.prevent="" class="form">
          <div class="row">
               <div class="col-md-2">
                 <h4>Cliente da Compra:</h4>
                </div>
                <div class="col-md-10">
                 <select class="form-control" placeholder="Sabor *" id="inputnome" required autofocus>
                    <option  v-for="(res2) in usuarios_cadastrados" :key="res2.id">{{res2.cpf}}</option>
                  </select>
                </div>
                <br>
            </div>
             <div class="row">
               <div class="col-md-2">
                 <h4>Item:</h4>
                </div>
               <div class="col-md-3">
                 <select class="form-control" placeholder="Sabor *" id="inputsabor" required autofocus>
                    <option>Flocos</option>
                    <option>Chocolate</option>
                    <option>Milho-Verde</option>
                    <option>Maracuja</option>
                    <option>Morango</option>
                    <option>Manga</option>
                    <option>Uva</option>
                    <option>Limao</option>
                  </select>
                </div>
                <div class="col-md-3">
                    <input type="number"  name="quantidade" id="inputquantidade" class="form-control" placeholder="Quantidade *" required autofocus>
                </div>
                <div class="col-md-4">
                    <button class="btn btn-primary btn-block" type="submit" @click="btnInserirPedido" >Inserir no Pedido</button>
                    <br>
                </div>
                <br>
            </div>
        </form>

          <div id="list" class="row"  style="font-size: 18px;" >
          <div class="table-responsive col-md-12" id="myDiv" ref="myDiv">
            <table class="table table-striped" cellspacing="0" cellpadding="0" style="text-align: left;">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Sabor</th>
                  <th>Quantidade</th>
                  <th>Valores Parciais</th>
                </tr>
              </thead>
              <tbody v-for="(res, i) in pedidos" :key="res.id">
                <tr>
                  <td>{{i+1}}</td>
                  <td>{{res.sabor}}</td>
                  <td>{{res.quantidade}}</td>
                  <td>R$: {{res.valorparcial.toFixed(2)}}</td>
                </tr>
              </tbody>
            </table>
          </div>
          </div>
            <hr>
            <div class="row">
              <div class="col-md-4">
              <label>Valor Total: R$ {{this.valorTotal.toFixed(2)}}</label>
              </div>
              <div class="col-md-2">
                <button class="btn btn-danger btn-block" type="button" @click="btnCancelar">Cancelar</button>
              </div>
              <div class="col-md-6">
                <button class="btn btn-success btn-block" type="button"  @click="btnConcluir">Concluir Pedido</button>
              </div>
            </div>
            
    </div>
</template>

<script>
import User from '../services/users.js'
import Vendas from '../services/vendas.js'
export default {
    data(){
        return {
            usuarios_cadastrados: [],
            pedidos: [],
            modalVisible: false,
            modalData: '',
            valorTotal: 0,
        }
    },
    mounted () {
      User.listar().then(resposta => {
            //this.usuarios_cadastrados = resposta.data
            this.usuarios_cadastrados =  this.usuarios_cadastrados.concat(resposta.data);
            console.log(this.usuarios_cadastrados);
      }).catch(function (error) {
        console.log(error)
        alert('Erro, Base não Conectada')
      })
    },
    methods: {
      btnInserirPedido () {
        var p = new Object();
        p.sabor = document.getElementById('inputsabor').value;
        p.quantidade = document.getElementById('inputquantidade').value;
        p.valorparcial =  parseFloat(document.getElementById('inputquantidade').value) *  parseFloat("1.5");
        this.valorTotal = parseFloat(this.valorTotal) + parseFloat(p.valorparcial);
        this.pedidos =  this.pedidos.concat(p);
        console.log(this.pedidos)
      },
      btnCancelar () {
        location.reload();
      },
      btnConcluir (){
        var obj_pedido = new Object();
        obj_pedido.cpf = document.getElementById('inputnome').value;
        obj_pedido.pedidos = this.pedidos;
        console.log(obj_pedido);
        Vendas.vender(JSON.stringify(obj_pedido)).then(resposta => {
          alert('Pedido Concluido')
          //window.location.href = 'http://localhost:8080/home';
        }).catch(function (error) {
          console.log(error)
          alert('Erro, Base não Conectada')
        })
      }
    },
  }

</script>

<style >

</style>