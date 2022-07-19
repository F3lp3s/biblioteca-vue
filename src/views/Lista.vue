<template>
  <NavBar/>
  <div class="container">
    <div class="filtros">
      <h3>Filtros:</h3>
      <hr>
      <p>Nome:</p>
      <input type="text">
      <hr>
      <p>Filtro1</p>
      <hr>
      <p>Filtro2</p>
      <hr>
      <p>Filtro3</p>
      <hr>
      <p>Filtro4</p>
      <hr>
      <p>Filtro5</p>
      <hr>
    </div>
    <div class="lista">
      <div class="titulo">
        <h1>Livros:</h1>
      </div>
      <div class="livros">
        <LivrosComp v-for="(livro, i) in livros" :key="i"
          :titulo="livro.nome"
          :autor="livro.autor"
          :status="livro.disponibilidade"
        />
      </div>
    </div>
  </div>
</template>

<script>
  import NavBar from '../components/Navbar.vue';
  import LivrosComp from '../components/Livros.vue';

  export default{
    name: 'listaLivros',
    data() {
      return {
        livros: []
      }
    },
    components: {
      NavBar,
      LivrosComp
    },
    mounted() {
      fetch('http://localhost:5000/livros', {
        method: 'GET',
        headers:{
          'Content-Type': 'application/json'
        },
      }).then((resp) => {
        if(resp.ok) {
          resp.json().then(json => {
            this.livros = json;
            console.log(this.livros)
          })
        }
      }).catch((erro) => {
        console.log(erro);
      })
    }
  }
</script>

<style>
  .container{
    width: 100%;
    min-height: 91vh;
    display: flex;
    justify-content: center;
    /* align-items: center; */
  }
  .filtros{
    width: 15%;
    min-height: 100%;
    background-color: #031B4E;
    margin: 5% 0 5% 0;
    color: #f1f1f1;
    text-align: center;
    border-radius: 5px;
  }
  .filtros hr{
    margin: 0
  }
  .filtros p{
    margin: 3% 0 3% 0;
  }
  .filtros input{
    margin-bottom: 5%;
    border-radius: 5px;
    border: solid 2px #1f1f1f; 
  }
  .lista{
    width: 70%;
    min-height: 100%;
    background-color: #63B1BC;
    margin: 5% 0 5% 1%;
    padding: 0 0 10% 0;
    border-radius: 5px;
  }
  .titulo{
    width: 100%;
  }
  .titulo h1{
    font-weight: 400;
    color: #f1f1f1;
    margin: 3% 0 0 3%;
  }   
</style>