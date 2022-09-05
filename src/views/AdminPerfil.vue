<template>
  <NavBar/>
  <msgAviso v-if="aparecerMsg" :alerta="alerta" :msg="msg"/>
  <confirmacaoLivro v-if="aparecer" 
    :nome="this.nome" 
    :funcao1="devolucao" 
    :funcao2="rejeitar"
    :funcao3="fechar"
  />
  <div class="container4">
    <div class="devolucao" :class="devolucaoDark">
      <div class="textAdmin">
        <h2>Livros para confirmar devolução:</h2>
      </div>
      <div class="listaDevolucao">
        <LivrosComp v-for="(livro, i) in livros" :key="i"
          :titulo="livro.nome"
          :autor="livro.autor"
          :status="livro.disponibilidade"
          :caminho="livro.caminho"
          @click="confirmacao(i, livro.id, livro.nome)"
        /> 
      </div>
    </div>
    <div class="perfilAdmin" :class="perfilAdminDark">
      <div class="contAdminPerfil">
        <img class="adminPerfilImg" :src="'http://localhost:5000/img/' + img">
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
  import confirmacaoLivro from '@/components/Confirmacao.vue'
  import msgAviso from '@/components/Aviso.vue';

  export default {
    name: "PerfilAdmin",
    data() {
      return{
        livros: [],
        nomeUser: sessionStorage.nome,
        aparecer: false,
        nome: "",
        index: 0,
        aparecerMsg: false,
        alerta: "",
        msg: "",
        img: sessionStorage.img
      }
    },
    components: {
      NavBar,
      LivrosComp,
      confirmacaoLivro,
      msgAviso
    },
    mounted() {
      fetch('http://localhost:5000/livrosAdmin', {
        method: 'GET',
        headers:{
          'Content-Type': 'application/json'
        },
      }).then((resp) => {
        if(resp.ok) {
          resp.json().then(json => {
            this.livros = json
            console.log(json);
          })
        }
      }).catch((erro) => {
        console.log(erro);
      })
    },
    computed: {
      devolucaoDark() {
        return {
          devolucaoDark: sessionStorage.dark === "true"
        }
      },
      perfilAdminDark() {
        return {
          perfilAdminDark: sessionStorage.dark === "true"
        }
      }
    },
    methods: {
      confirmacao(i, id, nome) {
        this.nome = nome;
        this.index = id;
        this.i = i;
        this.aparecer = true;
      },
      devolucao() {
        console.log(this.index)
        fetch(`http://localhost:5000/devolverLivro/${this.index}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json'
          }
        }).then((resp) => {
          if(resp.ok) {
            this.livros.splice(this.i, 1);
            this.aparecer = false;

            this.alerta = "alertVerde";
            this.msg = "Devolvido com sucesso!"
            this.aparecerMsg = true;

            const timer = setTimeout(() => {
              this.aparecerMsg = false;
            }, 3000)

            return () => clearTimeout(timer)
          }
        }).catch((erro) => {
          console.log(erro);
        })
      },
      rejeitar() {
        console.log('rejeitar')
        fetch(`http://localhost:5000/voltarLivro/${this.index}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json'
          }
        }).then((resp) => {
          if(resp.ok) {
            this.livros.splice(this.i, 1);
            this.aparecer = false;

            this.alerta = "alertVerde";
            this.msg = "Rejeitado com sucesso!"
            this.aparecerMsg = true;

            const timer = setTimeout(() => {
              this.aparecerMsg = false;
            }, 3000)

            return () => clearTimeout(timer)
          }
        }).catch((erro) => {
          console.log(erro);
        })
      },
      fechar() {
        this.aparecer = false;
      }
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
  .devolucaoDark {
    background-color: #092769;
    border: solid 1px #d6d6d6;   
    overflow: auto;
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
  .perfilAdminDark{
    background-color: #010e29;
    border: solid 1px #d6d6d6;    
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
    width: 50%;
    height: 60%;
    vertical-align: middle;
    border-radius: 50%;
    align-self: center;
    border: solid 5px #63B1BC;
    margin: 10% 0 5% 0;
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