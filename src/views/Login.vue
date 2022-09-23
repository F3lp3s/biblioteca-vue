<template>
  <div class="background">
    <AlertaAviso v-if="aviso" alerta="alertVermelho" msg="Usuario não encontrado"/>
    <div class="text-cont">
      <div class="welcome">
        <h1>{{ mensagem }}</h1>
      </div>
      <div class="sub-frase">
          <p>{{ subMensagem }}</p>
      </div>
    </div>
    <div class="login">
      <FormLogin :logar="logar"/>
    </div>
  </div>
</template>

<script>
  import FormLogin from '../components/FormLogin.vue';
  import AlertaAviso from '../components/Aviso.vue'

  export default {
    name: 'TelaLogin',
    data() {
      return {
        mensagem: "Bem vindo a TechLibrary",
        subMensagem: "Agora é possivel encontrar e reservar os livros online",
        usuario: [],
        aviso: false,
        teste: {}
      }
    },
    methods: {
      async logar(ra, senha) {
        console.log(ra,senha);
        fetch(`http://localhost:5000/usuario/${ra}&${senha}`, {
          method: 'GET',
          headers:{
            'Content-Type': 'application/json',
          }
        }).then((resp) => {
          if(resp.ok) {
            resp.json().then(json => {
              console.log(JSON.stringify(json));
                
              if(json[0].ra == ra && json[0].senha == senha) {
                sessionStorage.id = json[0].id;
                sessionStorage.ra = json[0].ra;
                sessionStorage.nome = json[0].nome;
                sessionStorage.img = json[0].img;
                sessionStorage.permissoes = json[0].permissoes;
                this.$store.dispatch('qtdLivros');
              }
              if(json[0].id == 1) {
                this.$router.push('/perfilAdmin');
              } else {
                this.$router.push('/home');
              }
            })
             
            this.aviso = true;

            const timer = setTimeout(() => {
              this.aviso = false;
            }, 3000)

            return () => clearTimeout(timer)
            }
        }).catch((erro) => {
          console.log(erro);
        })
      }
    },
    components: {
      FormLogin,
      AlertaAviso
    }
  }
</script>

<style>
  .background{
    width: 100%;
    height: 100vh;
    background-image: url('../imgs/bibliotecas.webp');
    background-repeat: no-repeat;
    background-size: cover;
    display: flex;
  }
  .text-cont{
    width: 63%;
    height: 40%;
    /* background-color: white; */
    margin-top: 11rem;
    display: flex;
    flex-direction: column;
  }
  .welcome{
    background-color: #0762C8;
    color: #f1f1f1;
    height: fit-content;
    width: fit-content;
    padding: .5em;
    margin-left: 2rem;
  }
  .welcome h1{
    font-weight: 300;
    font-size: 3rem;
    margin: 0;
  }
  .sub-frase{
    color: #f1f1f1;
    margin-top: 1rem;
    margin-left: 2rem;
    width: 50%;
    font-weight: 300;
  }
  .sub-frase p{
    margin: 0;
    font-size: 1.65rem;
  }
  .login{
    height: 100%;
    width: 37%;
    background-color: #63B1BC;
    display: flex;
    align-items: center;
  }
</style>