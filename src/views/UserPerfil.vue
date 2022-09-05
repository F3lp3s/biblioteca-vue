<template>
  <NavBar/>
  <TrocarImg v-if="aparecer" :funcao1="mudar"/>
  <div class="container3">
    <div class="perfilConfig" :class="perfilConfigDark">
      <div class="sep1">
        <img class="perfil" :src="'http://localhost:5000/img/' + idImg" alt="">
        <div class="edit">
          <img src="../imgs/Vector.png" @click="mudar">
        </div>
        {{ nomeUser }}
      </div>
      <div class="sep2">
        <p>Total de livros reservador:</p>
        <p>{{ livros.length }}</p>
      </div>
      <div class="sep3">
        <ButtonForm :funcao="logout" btnText="Logout"/>
      </div>
    </div>
    <div class="historico" :class="historicoDark">
      <div class="tituloHist">
        <p>Histórico:</p>
      </div>
      <div class="contHistorico">
        <LivrosComp v-for="(livro, i) in livros.slice(-4)" :key="i"
          :titulo="livro.nome"
          :autor="livro.autor"
          :status="livro.disponibilidade"
          :caminho="livro.caminho"
        />
      </div>
    </div>
  </div>
</template>

<script>
  import NavBar from '../components/Navbar.vue';
  import ButtonForm from '../form/Button.vue';
  import LivrosComp from '../components/Livros.vue';
  import TrocarImg from '@/components/TrocaImg.vue';

  export default{
    nome: "PerfilUser",
    data() {
      return {
        nomeUser: sessionStorage.nome,
        livros: [],
        aparecer: false,
        idImg: sessionStorage.img
      }
    },
    components: {
      NavBar,
      ButtonForm,
      LivrosComp,
      TrocarImg
    },
    computed: {
      perfilConfigDark() {
        return {
          perfilConfigDark: sessionStorage.dark === "true"
        }
      },
      historicoDark() {
        return {
          historicoDark: sessionStorage.dark === "true"
        }
      }
    },
    methods: {
      logout() {
        sessionStorage.clear();
        this.$router.push('/')
      },
      mudar() {
        this.aparecer = !this.aparecer
      }
    },
    mounted() {
      fetch(`http://localhost:5000/historico/${sessionStorage.id}`, {
        method: 'GET',
        headers:{
          'Content-Type': 'application/json'
        },
      }).then((resp) => {
        if(resp.ok) {
          resp.json().then(json => {
            
            this.livros = json
            
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
  .container3{
    width: 100%;
    height: 91vh;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    /* padding: 4% 0 4% 0; */
  }
  .perfilConfig{
    width: 90%;
    height: 25%;
    margin-bottom: 2%;
    background-color: #63B1BC;
    color: #f1f1f1;
    border-radius: 5px;
    display: flex;
  }
  .perfilConfigDark{
    background-color: #092769;
    border: solid 1px #d6d6d6;    
  }
  .sep1{
    width: 33.33%;
    height: 100%;
    display: flex;
    align-items: center;
    font-size: 1.4rem;
  }
  .sep1 .perfil{
    vertical-align: middle;
    border-radius: 50%;
    width: 25%;
    height: 70%;
    margin: 0 4% 0 10%;
    border: solid 2px #1f1f1f;
  }
  .edit{
    width: 2.5%;
    height: 5%;
    border-radius: 50%;
    position: absolute;
    top: 18%; left: 14%;
    background-color: #031B4E;
    border: 1px solid #f1f1f1;
  }
  .edit img{
    width: 65%;
    margin: 13% 0 0 14%;
    cursor: pointer;
  }
  .sep2{
    width: 33.33%;
    height: 100%;
    text-align: center;
    padding-top: 2%;
    font-size: 1.2rem;
  }
  .sep3{
    width: 33.33%;
    height: 100%;
    /* background-color: red; */
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
  .sep3 button{
    width: 50%;
    height: 25%;
    font-size: 1.2rem;
    margin: 0 15% 0 0;
    color: #f1f1f1;
    background-color: #031B4E;
    border: solid 2px #f1f1f1;
    border-radius: 5px;
  }
  .sep3 button:hover{
    color: #031B4E;
    background-color: #f1f1f1;
    border: solid 2px #031B4E;
    cursor: pointer;
  }
  .historico{
    width: 90%;
    min-height: 55%;
    background-color: #031B4E;
    border-radius: 5px;
  }
  .historicoDark{
    background-color: #010e29;
    border: solid 1px #d6d6d6;
  }
  .tituloHist{
    overflow: auto;
    color: #f1f1f1;
    font-size: 1.3rem;
  }
  .tituloHist p{
    margin: 0.5% 0 1.5% 3.5%;
  }
  .contHistorico{
    width: 100%;
    display: flex;
    flex-wrap: wrap;
  }
  .contHistorico .livroInfo{
    margin-top: 0%;
    margin-bottom: 2.5%;
  }
</style>