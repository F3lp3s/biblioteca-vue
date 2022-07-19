<template>
  <NavBar/>  
  <div class="logo">
    <img src="../imgs/sptech_logo.png" alt="">
    <div class="msg">
      <p>Veja detalhe sobre os livros disponiveis em nossa biblioteca</p>
    </div>
  </div>
  <div class="recomendados">
    <h1>Recomendações:</h1>  

    <div class="livros">
      <LivrosComp v-for="(livro, i) in livros" :key="i"
        :titulo="livro.nome"
        :autor="livro.autor"
        :status="livro.disponibilidade"
      />
    </div> 
    
  </div>
</template>

<script>
  import NavBar from '../components/Navbar.vue';
  import LivrosComp from '../components/Livros.vue';

  export default {
    name: 'TelaHome',
    data() {
      return{
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
            // console.log(JSON.stringify(json));
              
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
  .logo{
    width: 80%;
    height: 70vh;
    background-color: #031B4E;
    display: flex;
    align-items: center;
    margin: 10vh 0 0 10%;
  }
  .logo img{
    width: 50%;
  }
  .msg p{
    color: #f1f1f1;
    font-size: 3rem ;
    text-align: center;
    margin-right: 1.3em;
  }
  .recomendados{
    /* width: 100%; */
    height: 100vh;
    background-color: #63B1BC;
    padding: 5%;
    display: flex;
    flex-direction: column;
  }
  .recomendados h1{
    height: fit-content;
    color: #f1f1f1;
    margin: 0;
    width: fit-content;
  }
  .livros{
    height: 100%;
    display: flex;
    flex-wrap: wrap;
  }
  .cards{
    width: 30%;
    height: 40%;
    background-color: #f1f1f1;
    margin-right: 3.3%
  }
  .img-livro{
    float: left;
    height: 100%;
    width: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .placeholder{
    width: 80%;
    height: 80%;
    background-color: #1f1f1f;
  }
</style>