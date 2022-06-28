<template>
  <nav class="navbar">
    <div class="navimg">
      <img src="../imgs/sptech_logo.png" alt="">
      <router-link to="/home">Home</router-link>
    </div>
    <hr>
    <div class="navlink">
      <router-link to="/home/lista">Lista de Livros</router-link>
    </div>
    <hr>
    <div class="navlink">
      <router-link to="/home/reserva">Reservar</router-link>
    </div>
    <hr>
    <div class="perfil">
      {{ ra }}
    </div>
  </nav>
</template>

<script>
  export default{
    name: 'NavBar',
    data() {
      return{
        ra: sessionStorage.nome
      }
    }
  }
</script>

<style>
  .navbar{
    width: 100%;
    height: 9vh;
    background-color: #031B4E;
    display: flex;
  }
  .navbar img{
    width: 50%
  }
  .navbar hr{
    width: 0;
    height: 100%;
    margin: 0;
    background-color: #f1f1f1;
  }
  .navimg{
    width: 15%;
    display: flex;
    align-items: center;
  }
  .navlink{
    width: fit-content;
    display: flex;
    align-items: center;
  }
  .navbar a{
    margin: 1em;
    text-decoration: none;
    color: #f1f1f1;
  }
  .navimg:hover ,.navlink:hover{
    background-color: #63B1BC;
  }
  .perfil{
    display: flex;
    align-self: center;
    color: #f1f1f1;
    margin-left: 60%;
  }
</style>