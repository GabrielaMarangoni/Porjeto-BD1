<template>
<div>
    <h1>Buscar Usuário</h1>
     <form @submit.prevent="">
            <div class="row">
                <div class="col-md-8">
                    <input type="text" v-model="nome_busca" id="nomeLocalizar" class="form-control" placeholder="Nome" pattern="^[A-Za-z ]+" required autofocus>
                    <br>
                </div>
                <div class="col-md-4">
                    <button class="btn btn-primary btn-block" type="button"  @click="search(nome_busca)">Localizar por nome</button>
                </div>
            </div>
        </form>
    <div id="list" class="row"  style="font-size: 18px;" >
          <div class="table-responsive col-md-12" id="myDiv" ref="myDiv">
            <table class="table table-striped" cellspacing="0" cellpadding="0" style="text-align: left;">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nome</th>
                  <th>Email</th>
                  <th class="actions" style="text-align: right; padding-right: 190px;">Ações</th>
                </tr>
              </thead>
              <tbody v-for="(res, i) in usuarios_cadastrados" :key="res.id">
                <tr>
                  <td>{{i+1}}</td>
                  <td>{{res.nome}}</td>
                  <td>{{res.email}}</td>
                  <td class="actions">
                  <form class="form" id="formid" action='http://localhost:3000/api/users/actions' method="post" style="text-align: right;">
                    <input type="hidden" name="cpf" id="inputCPF" class="form-control" v-model="res.cpf" >
                    <button type="button" style="width: 75px;" class="btn btn-success btn-sm" data-toggle="modal" data-target=".bd-example-modal-lg-ver-mais" @click="openModal(res)">Ver Mais</button>
                    <button type="button" style="width: 75px;" class="btn btn-info btn-sm" data-toggle="modal" data-target=".bd-example-modal-lg-editar" @click="openModal(res)">Editar</button>
                    <button type="button" style="width: 75px;" class="btn btn-danger btn-sm"  data-toggle="modal" data-target=".bd-example-modal-lg-excluir" @click="openModal(res)">Excluir</button>
                  </form>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

      <!-- MODAL VER MAIS (INICIO) -->
      <div class="modal fade bd-example-modal-lg-ver-mais" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg">
          <div class="modal-content">
            <div class="modal-header" style="background-color:green;">
              <label style="color:white;">Ver Mais</label>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
                <label>Nome: {{modalData.nome}}</label>
                <br>
                <label>Email: {{modalData.email}}</label>
                <br>
                <label>CPF: {{modalData.cpf}}</label>
                <br>
                <label>Telefone: {{modalData.telefone}}</label>
                <br>
                <label>Endereço: {{modalData.endereco}}</label>
                <br>
            </div>
          </div>
        </div>
      </div>
      <!-- MODAL VER MAIS (FIM) -->

      <!-- MODAL VER MAIS (EXCLUIR) -->
      <div class="modal fade bd-example-modal-lg-excluir" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg">
          <div class="modal-content">
            <div class="modal-header" style="background-color:red;">
              <label style="color:white;">Excluir Registro</label>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
                <label>Nome: {{modalData.nome}}</label>
                <br>
                <label>Email: {{modalData.email}}</label>
                <br>
                <label>CPF: {{modalData.cpf}}</label>
                <br>
                <label>Telefone: {{modalData.telefone}}</label>
                <br>
                <label>Endereço: {{modalData.endereco}}</label>
                <br>
                <div style="float: right;">
                  <button type="button"  class="btn btn-secondary" data-dismiss="modal">Cancelar</button>
                  <button type="button" style="padding-left: 10px" class="btn btn-danger" @click="btnExcluir(modalData)">Eu desejo excluir este registro</button>
                </div>
                <br>
            </div>
          </div>
        </div>
      </div>
      <!-- MODAL VER MAIS (EXCLUIR) -->

      <!-- MODAL VER MAIS (EDITAR) -->
      <div class="modal fade bd-example-modal-lg-editar" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg">
          <div class="modal-content">
            <div class="modal-header" style="background-color:#46b8da;">
              <label style="color:white;">Editar Registro</label>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
                 <form @submit="btnEditar" class="form">
                  <input type="text" name="nome" id="inputNome" class="form-control" placeholder="Nome *" v-model=modalData.nome pattern="[a-zA-Z \s]+$" required autofocus>
                  <br>
                  <div class="row">
                      <div class="col-md-6">
                          <input type="text" name="cpf" id="inputCPF" class="form-control" placeholder="CPF *" v-model="modalData.cpf"  readonly=“true” required autofocus>
                          <br>
                      </div>
                      <div class="col-md-6">
                          <input type="text"  name="telefone" id="inputTelefone" class="form-control" placeholder="Telefone *" v-model="modalData.telefone" required autofocus>
                      </div>
                      <br>
                  </div>
                  <input type="text" name="endereco" id="inputEndereco" class="form-control" placeholder="Endereço *" v-model="modalData.endereco" required autofocus>
                  <br>
                  <input type="email" name="email" id="inputEmail" class="form-control" placeholder="Email *" v-model="modalData.email" required autofocus>
                  <br>
                <div style="float: right;">
                  <button type="button"  class="btn btn-secondary" data-dismiss="modal">Cancelar</button>
                  <button type="submit" style="padding-left: 10px" class="btn btn-danger">Concluir</button>
                </div>
              </form>
                <br>
            </div>
          </div>
        </div>
      </div>
      <!-- MODAL VER MAIS (EDITAR) -->

    </div><!-- /#list -->
</div>
</template>

<script>
import User from '../services/users.js'
export default {
    data(){
        return {
            usuarios_cadastrados: [],
            modalVisible: false,
            modalData: '',
            obj_user: {
              nome: '',
              cpf: '',
              telefone: '',
              endereco: '',
              email: '',
              pass1: ''
            },
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
      openModal (data) {
        this.modalData = data
        this.modalVisible = true
      },
      btnExcluir (data) {
        User.excluir(JSON.stringify(data)).then(resposta => {
          alert('Exluido com sucesso')
          location.reload()
        }).catch(function (error) {
          console.log(error)
          alert('Erro, Base não Conectada')
        })
      },
      btnEditar () {
        this.obj_user.nome = document.getElementById('inputNome').value;
        this.obj_user.cpf = document.getElementById('inputCPF').value;
        this.obj_user.telefone = document.getElementById('inputTelefone').value;
        this.obj_user.endereco = document.getElementById('inputEndereco').value;
        this.obj_user.email = document.getElementById('inputEmail').value;


        User.editar(JSON.stringify(this.obj_user)).then(resposta => {
          alert('Editado com sucesso')
        }).catch(function (error) {
          console.log(error)
          alert('Erro, Base não Conectada')
        })
      },
      search (nome) {
        if(nome){
          User.buscar(String(nome)).then(resposta => {
            this.usuarios_cadastrados =  resposta.data;
          }).catch(function (error) {
            console.log(error)
            alert('Erro, Base não Conectada')
          })
        }else{
          User.listar().then(resposta => {
            this.usuarios_cadastrados =  resposta.data;
            console.log(this.usuarios_cadastrados);
          }).catch(function (error) {
            console.log(error)
            alert('Erro, Base não Conectada')
          })
        }

      },


    },
  }

</script>

<style >

</style>