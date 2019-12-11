<template>
    <div>
        <h1>Cadastro Sorvete</h1>
        <form  @submit="btnCadastrarSorvete" class="form" method="post">
            <input type="text" name="sabor" id="inputSabor" class="form-control" placeholder="Sabor *" pattern="[a-zA-Z \s]+$" required autofocus>
            <br>
             <div class="row">
                <div class="col-md-4">
                    <input type="text" name="descricao" id="inputDescricao" class="form-control" placeholder="Descrição *" required autofocus>
                    <br>
                </div>
                <div class="col-md-4">
                    <input type="number" min="0.0" name="lote" id="inputLote" class="form-control" placeholder="Lote *" required autofocus>
                </div>
                <div class="col-md-4">
                    <input type="number" min="0.0" step="any" name="preco" id="inputPreco" class="form-control" placeholder="Preço *" required autofocus>
                </div>
                <br>
            </div>
            <button class="btn btn-success btn-block" type="submit" >Cadastrar</button>
        </form>
    </div>
</template>

<script>
import Sorvete from '../services/sorvete.js'
export default {
    data(){
        return {
          obj_sorvete: {
            sabor: '',
            descricao: '',
            lote: '',
            preco: '',
          }
        }
    },
    methods: {
      btnCadastrarSorvete () {
        this.obj_sorvete.sabor = document.getElementById('inputSabor').value;
        this.obj_sorvete.descricao = document.getElementById('inputDescricao').value;
        this.obj_sorvete.lote = document.getElementById('inputLote').value;
        this.obj_sorvete.preco = document.getElementById('inputPreco').value;

        console.log(this.obj_sorvete)
        Sorvete.cadastrar(JSON.stringify(this.obj_sorvete)).then(resposta => {
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