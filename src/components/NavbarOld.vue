<template>
  <nav class="navbar">
    <router-link class="link-home" to="/home">
      <div class="div-link">
        <img src="../imgs/sptech_logo.png" alt="">
        <p>Home</p>
      </div>
    </router-link>
    <hr>
    <router-link to="/lista">
      <div class="div-link">
        <p>Lista de Livros</p>
      </div>
    </router-link>
    <hr>
    <router-link to="/reserva">
      <div class="div-link">
        <p>Reservar</p>
      </div>
    </router-link>
    <hr>
    <div class="div-perfil">
      <router-link class="link-perfil" to="/perfilUser">
        <div class="nomeUser">
        <p>{{ nomeUser }}</p>
        </div>        
        <img class="foto-perfil" :src="'http://localhost:5000/img/' + img">
      </router-link>
    </div>
  </nav>
</template>

<script>
  export default{
    name: 'NavBar',
    data() {
      return{
        nomeUser: sessionStorage.nome,
        img: sessionStorage.img
      }
    }
  }
</script>

<!-- <style>
  .navbar{
    width: 100%;
    height: 9vh;
    background-color: #031B4E;
    display: flex;
  }
  .navbar a{
    text-decoration: none;
    color: #f1f1f1;
  } 
  .navbar .link-home{
    width: 15%;
  }
  .div-link{
    height: 100%;
    display: flex;
    align-items: center;
  }
  .navbar .div-link:hover{
    background-color: #63B1BC;
  }
  .navbar hr{
    margin: 0%;
    height: 100%;
  }
  .div-link img{
    width: 50%;
  }
  .div-link p{
    margin: 0 1.5em 0 1.5em
  }
  .div-perfil{
    height: 100%;
    width: 15%;
    margin-left: 50%;
    display: flex;
    /* background-color: black; */
  }
  .link-perfil{
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  .link-perfil p{
    margin: 0 1em 0 1em;
  }
  .foto-perfil{
    width: 25%;
    height: 85%;
    border-radius: 50%;
    vertical-align: middle;
    border: solid 2px #63B1BC;
  } -->
<!-- </style> -->