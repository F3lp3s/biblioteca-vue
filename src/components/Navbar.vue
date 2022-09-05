<template>
  <nav>
    <!-- <div class="logo-nav">
      <img src="@/imgs/sptech_logo.png" alt="">
    </div> -->
    <div class="links-nav">
      <router-link v-if="home" to="/home">
        <div class="link">
          <p>Inicio</p>
        </div>
      </router-link>
      <router-link v-if="lista" to="/lista">
        <div class="link">
          <p>Lista de Livros</p>
        </div>
      </router-link>
      <router-link v-if="reservar" to="/reserva">
        <div class="link">
          <p>Reservas</p>
        </div>
      </router-link>
      <router-link v-if="perfils" to="/home">
        <div class="link">
          <p>Gestão de perfil</p>
        </div>
      </router-link>
      <router-link v-if="livros" to="/GestaoLivros">
        <div class="link">
          <p>Gestão de livros</p>
        </div>
      </router-link>
    </div>
    <div @click="clickButton" class="darkMode">
      <img src="../imgs/darkmode.png" alt="">
    </div>
    <div class="perfil">
      <router-link v-if="user" to="/perfilUser">
        <div class="link-perfil">
          <span>{{ nomeUser }}</span>
          <img :src="'http://localhost:5000/img/' + img">
        </div>
      </router-link>
      <router-link v-if="admin" to="/perfilAdmin">
        <div class="link-perfil">
          <span>{{ nomeUser }}</span>
          <img :src="'http://localhost:5000/img/' + img">
        </div>
      </router-link>
    </div>
  </nav>
</template>

<script>
  export default{
    name: 'NavBarV2',
    data() {
      return {
        nomeUser: sessionStorage.nome,
        img: sessionStorage.img,
        home: false,
        lista: false,
        reservar: false,
        perfils: false,
        livros: false,
        user: false,
        admin: false
      }
    },
    beforeMount() {
      console.log(sessionStorage.dark === 'true');
        if(sessionStorage.dark === 'true') {
          console.log('escuro')
          document.body.classList.add("dark");
          document.body.classList.remove("light");
        } else {
          console.log('branco')
          document.body.classList.add("light");
          document.body.classList.remove("dark");
        }
    },
    mounted() {
      if(sessionStorage.permissoes == 1) {
        this.perfils = true;
        this.livros = true;
        this.admin = true;
      } else if(sessionStorage.permissoes == 2) {
        this.home = true;
        this.lista = true;
        this.reservar = true;
        this.user = true;
      } else if(sessionStorage.permissoes == 3) {
        this.home = true;
        this.lista = true;
        this.perfil = true;
      }
    },
    methods: {
      clickButton() {
        if(document.body.classList.contains("dark")) {
          sessionStorage.dark = "false"
        } else {
          sessionStorage.dark = "true"
        }
        location.reload();
      }
    }
  }
</script>

<style>
  nav{
    width: 100%;
    height: 8.5vh;
    background-color: #031B4E;
    display: flex;
    z-index: 0;
    border-bottom: 1px solid #f1f1f1;
  }
  nav a{
    text-decoration: none;
    color: #f1f1f1;
  }
  .links-nav{
    height: 100%;
    width: 75%;
    /* background-color: black; */
    display: flex;
  }
  .link{
    height: 100%;
    display: flex;
    align-items: center;
    border-right: solid 1px #f1f1f1;
    /* background-color: red; */
  }
  .link:hover{
    background-color: #63B1BC ;
  }
  .link p{
    margin: 0 1.2em 0 1.2em;
  }
  .perfil{
    height: 100%;
    width: 15%;
    /* margin-left: 10%; */
    /* background-color: pink; */
  }
  .perfil img{
    width: 27%;
    height: 90%;
    border-radius: 50%;
    border: solid 2px #63B1BC;
    margin: 0 5% 0 10%;
    /* float: right; */
  }
  .link-perfil{
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    border-right: solid 1px #f1f1f1;
    /* background-color: blueviolet; */
  }
  .link-perfil:hover{
    color: #63B1BC;
  }
  .changeColor{
    width: 10%;
    height: 50%;
    margin-right: 10%;
  }
  .darkMode{
    width: 10%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    /* background-color: red; */
  }
  .darkMode img{
    width: 20%
  }
</style>