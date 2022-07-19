<template>
  <NavBar/>
  <div class="container4">
    <div class="devolucao">
      <div class="textAdmin">
        <h2>Livros para confirmar devolução:</h2>
      </div>
      <div class="listaDevolucao">
        <LivrosComp v-for="(livro, i) in livros" :key="i"
          :titulo="livro.nome"
          :autor="livro.autor"
          :status="livro.disponibilidade"
        /> 
      </div>
    </div>
    <div class="perfilAdmin">
      <div class="contAdminPerfil">
        <div class="adminPerfilImg"></div>
        <h2>{{ nomeUser }}</h2>   
      </div>
      <div class="contTextoAdmin">
        <p class="p1">Livros Para confirmar a devolução:</p>
        <p class="p2">{{ livros.length }}</p>
      </div>
    </div>
  </div>
</template>

<script>
  import NavBar from '@/components/Navbar.vue'
  import LivrosComp from '@/components/Livros.vue'

  export default {
    name: "PerfilAdmin",
    data() {
      return{
        livros: [],
        nomeUser: sessionStorage.nome
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
            for(let i = 0; i < json.length; i++) {
              if(json[i].disponibilidade == "amarelo") {
                this.livros.push(json[i])
              }
            }
            console.log(json);
          })
        }
      }).catch((erro) => {
        console.log(erro);
      })
    }
  }
</script>

<style>
  .container4{
    width: 100%;
    height: 91vh;
    display: flex;
    justify-content: center;
    align-items: center;
    /* padding: 5% 0 5% 0; */
  }
  .devolucao{
    width: 65%;
    height: 85%;
    background-color: #63B1BC;
    border-radius: 5px;
    overflow-y: scroll;
/* margin: 2.5% 0 0 0; */
  }
  .textAdmin{
    width: 100%;
    color: #f1f1f1;
  }
  .textAdmin h2{
    font-weight: 400;
    margin-left: 2%;
  }
  .listaDevolucao{
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    /* align-items: center; */
  }
  .listaDevolucao .livroInfo{
    margin: 4% 3% 0 3%;
  }
  .perfilAdmin{
    width: 25%;
    height: 85%;
    background-color: #031B4E;
    border-radius: 5px;
    margin: 0 0 0 2%;
  }
  .contAdminPerfil{
    width: 100%;
    height: 55%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    color: #f1f1f1;
  }
  .adminPerfilImg{
    width: auto;
    height: auto;
    padding: 30%;
    border-radius: 50%;
    background-color: #8a8a8a;
    align-self: center;
    /* margin-top: 8%; */
  }
  .contAdminPerfil h2{
    margin: 0;
    font-weight: 400;
  }
  .contTextoAdmin{
    width: 100%;
    color: #f1f1f1;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
  .contTextoAdmin .p1{
    font-size: 1.4rem;
    margin-top: 10%;
  }
  .contTextoAdmin .p2{
    font-size: 1.5rem;
    margin-top: 4%;
  }
</style>