<template>
    <div>
        <h4>Cadastro de Usuário</h4>
        <form @submit.prevent="salvar">
            <input type="text" v-model="obj_User.nome" id="inputNome" class="form-control" placeholder="Nome *" pattern="[a-zA-Z \s]+$" required autofocus>
            <br>
             <div class="row">
                <div class="col-md-6">
                    <input type="text" v-model="obj_User.cpf" id="inputCPF" class="form-control" placeholder="CPF *" pattern="^[A-Za-z0-9]+" required autofocus>
                    <br>
                </div>
                <div class="col-md-6">
                    <input type="text" v-model="obj_User.telefone" id="inputTelefone" class="form-control" placeholder="Telefone *" pattern="^[A-Za-z0-9]+" required autofocus>
                </div>
                <br>
            </div>
            <input type="text" v-model="obj_User.endereco" id="inputEndereco" class="form-control" placeholder="Endereço *" required autofocus>
             <br>
            <input type="email" v-model="obj_User.email" id="inputEmail" class="form-control" placeholder="Email *" required autofocus>
            <br>
            <div class="row">
                <div class="col-md-6">
                    <input type="password" v-model="obj_User.senha1" id="inputSenha1" class="form-control" placeholder="Senha *" pattern="^[A-Za-z0-9]+" required autofocus>
                    <br>
                </div>
                <div class="col-md-6">
                    <input type="password" v-model="obj_User.senha2" id="inputSenha2" class="form-control" placeholder="Repita a senha *" pattern="^[A-Za-z0-9]+" required autofocus>
                    <br>
                </div>
            </div>
                <button class="btn btn-primary btn-block" type="submit">Cadastrar</button>
        </form>
    </div>
</template>

<script>
import User from '../services/users.js'
export default {
  data () {
    return {
      obj_User: {
        nome: '',
        cpf: '',
        telefone: '',
        endereco: '',
        email: '',
        senha1: '',
        senha2: ''
      }
    }
  },
  methods: {
     salvar () {
      var obj = JSON.parse(JSON.stringify(this.obj_User))
      console.log(obj)
      if (this.obj_User.senha1 === this.obj_User.senha2) {
        User.salvar(obj).then(resposta => {
          console.log(resposta.data)
          alert('Cadastro efetuado com sucesso!')
        }).catch(function (error) {
          console.log(error)
          alert('Erro, Cadastro não efetuado!')
        })
      } else {
        alert('Cadastro não Efetuado: As senhas se não correspondem')
      }
    }
  }
}
</script>

<style scoped>
</style>