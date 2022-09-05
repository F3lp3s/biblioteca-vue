<template>
  <NavBar/>
  <InfoLivros v-if="modal" 
    :funcao="fechar"
    :id="id"
    :nome="nome"
    :autor="autor"
    :data="data.split('/')"
    :descricao="descricao"
    :caminho="caminho"
    :fechar="fechar"
  />
  <div class="logo" :class="bordaBanner" >
    <img src="../imgs/sptech_logo.png" alt="">
    <div class="msg">
      <p>Veja detalhe sobre os livros disponiveis em nossa biblioteca</p>
    </div>
  </div>
  <div class="recomendados" :class="recomeDark">
    <h1>Recomendações:</h1>  

    <div class="livros">
      <LivrosComp v-for="(livro, i) in livros.slice(0, 8)" :key="i"
        :titulo="livro.nome"
        :autor="livro.autor"
        :status="livro.disponibilidade"
        :caminho="livro.caminho"
        @click="teste(livro.id, livro.nome, livro.autor, livro.dataPublic, livro.descricao, livro.caminho)"
      />
    </div> 
    
  </div>
</template>

<script>
  import NavBar from '../components/Navbar.vue';
  import LivrosComp from '../components/Livros.vue';
  import InfoLivros from '../components/InfoLivros.vue';

  export default {
    name: 'TelaHome',
    data() {
      return{
        livros: [],
        modal: false,
        id: null,
        nome: null,
        autor: null,
        data: null,
        caminho: null,
        descricao: null
      }
    },
    components: {
      NavBar,
      LivrosComp,
      InfoLivros
    },
    computed: {
      bordaBanner() {
        return {
          bordaBanner: sessionStorage.dark === "true"
        }
      },
      recomeDark() {
        return {
          recomendacaoDark: sessionStorage.dark === "true"
        }
      }
    },
    methods: {
      teste(id, nome, autor, data, descricao, caminho) {
        this.id = id;
        this.nome = nome;
        this.autor = autor;
        this.caminho = caminho;
        console.log(caminho)
        let dia = data.split('-');
        dia[2] = dia[2].slice(0,2);
        dia = dia.join('/');
        this.data = dia;
        console.log(dia)
        this.descricao = descricao;
        this.fechar();
      },
      fechar() {
        this.modal = !this.modal;
      }
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
            let i = 0;
            let lista = [];
            let trys = 0
            while(i < 8) {
              trys++
              let n = Math.floor(Math.random() * json.length);
              let ac = true;
              for(let j = 0; j < lista.length; j++) {
                if(n == lista[j]) {
                  ac = false;
                }
              }
              console.log(trys)
              if(ac) {
                lista.push(n)
                this.livros.push(json[n])
                i++
              }
            }
            console.log(this.livros);
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
    /* border:5px solid black; */
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
  .bordaBanner{
    background-color: #010e29;  
    border-left: 1px solid #1658DE;
    border-right: 1px solid #1658DE;
    border-top: 1px solid #1658DE;
  }
  .recomendacaoDark {
    background-color: #092769;
  }
</style>