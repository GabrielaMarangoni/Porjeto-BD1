<template>
    <div class="flex-container">
    <div class="sidenav">
      <img src="../assets/logo02.png" class="rounded float-left" style="width: 90%; height: auto;" alt="...">
      <img src="../assets/logo01.png" class="rounded float-left" style="width: 80%; height: auto;" alt="...">

      <hr>
 
      <router-link class="dropdown-btn" to="/home">Home</router-link>

      <button class="dropdown-btn">Cadastros</button>
      <div class="dropdown-container">
        <router-link to="/cadastrarcliente" style="font-size: 16px;">Cadastrar Cliente</router-link>
        <router-link to="/cadastrarsorvete" style="font-size: 16px;">Cadastrar Sorvetes</router-link>
      </div>


      <button class="dropdown-btn">Buscas</button>
      <div class="dropdown-container">
        <router-link to="/buscarcliente" style="font-size: 16px;">Buscar Usuário</router-link>
        <router-link to="/buscarsorvete" style="font-size: 16px;">Buscar Sorvete</router-link>
      </div>


      <button class="dropdown-btn">Venda</button>
      <div class="dropdown-container">
        <router-link to="/vendersorvete" style="font-size: 16px;">Vender Sorvete</router-link>
      </div>


      <button class="dropdown-btn">Relatórios</button>
      <div class="dropdown-container">
        <router-link to="/buscar" style="font-size: 16px;">Relatório Cliente</router-link>
        <router-link to="/buscar" style="font-size: 16px;">Relatório Sorvete</router-link>
      </div>

      
    </div>

    <div class="container-fluid main" >
        <workspace></workspace>
    </div>
</div>
</template>

<script>
import Workspace from "./Workspace";
export default {
  name: "hello",
  components: {
    Workspace
  }
};
</script>

<style>
.sidenav {
  height: 100%;
  width: 210px;
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  background-color: rgb(17, 17, 17);
  overflow-x: hidden;
  padding-top: 20px;
}

.sidenav a {
  padding: 6px 8px 6px 16px;
  text-decoration: none;
  color: #818181;
  display: block;
}

.sidenav a:hover {
  color: #f1f1f1;
}

/* Style the sidenav links and the dropdown button */
.sidenav a, .dropdown-btn {
  padding: 6px 8px 6px 16px;
  text-decoration: none;
  font-size: 20px;
  color: #818181;
  display: block;
  border: none;
  background: none;
  width: 100%;
  text-align: left;
  cursor: pointer;
  outline: none;
}

/* On mouse-over */
.sidenav a:hover, .dropdown-btn:hover {
  color: #f1f1f1;
}

/* Dropdown container (hidden by default). Optional: add a lighter background color and some left padding to change the design of the dropdown content */
.dropdown-container {
  display: none;
  background-color: #262626;
  padding-left: 0px;
}

/* Add an active class to the active dropdown button */
.active {
  background-color: green;
  color: white;
}


/* Optional: Style the caret down icon */
.fa-caret-down {
  float: right;
  padding-right: 0px;
}



.main {
  margin-left: 210px; /* Same as the width of the sidenav */
  font-size: 28px; /* Increased text to enable scrolling */
}

@media screen and (max-height: 450px) {
  .sidenav {
    padding-top: 15px;
  }
  .sidenav a {
    font-size: 18px;
  }
}
</style>
