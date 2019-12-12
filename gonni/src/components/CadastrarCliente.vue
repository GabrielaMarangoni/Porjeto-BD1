<template>
    <div>
        <h1>Cadastro de Cliente</h1>
        <form @submit.prevent="btnCadastrarCliente" class="form">
            <input type="text" name="nome" id="inputNome" class="form-control" placeholder="Nome *" pattern="[a-zA-Z \s]+$" required autofocus>
            <br>
             <div class="row">
                <div class="col-md-6">
                    <input type="text" name="cpf" id="inputCPF" class="form-control" placeholder="CPF *" required autofocus>
                    <br>
                </div>
                <div class="col-md-6">
                    <input type="text" name="telefone" id="inputTelefone" class="form-control" placeholder="Telefone *" required autofocus>
                </div>
                <br>
            </div>
            <input type="text" name="endereco" id="inputEndereco" class="form-control" placeholder="Endereço *" required autofocus>
             <br>
            <input type="email" name="email" id="inputEmail" class="form-control" placeholder="Email *" required autofocus>
            <br>
            <button class="btn btn-success btn-block" type="submit" >Cadastrar</button>
        </form>
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
            },
        }
    },
    methods: {
      btnCadastrarCliente () {
        this.obj_user.nome = document.getElementById('inputNome').value;
        this.obj_user.cpf = document.getElementById('inputCPF').value;
        this.obj_user.telefone = document.getElementById('inputTelefone').value;
        this.obj_user.endereco = document.getElementById('inputEndereco').value;
        this.obj_user.email = document.getElementById('inputEmail').value;
        console.log("S");

        User.cadastrar(JSON.stringify(this.obj_user)).then(resposta => {
          alert('Cadastrado com sucesso')
          window.location.href = 'http://localhost:8080/home';
        }).catch(function (error) {
          console.log(error)
          alert('Erro, Base não Conectada')
        })
      },

    },
  }

</script>

<style >

</style>