<template>
  <NavBar/>
  <div @click="mudar" class="switch" :class="switchDark">
    <div class="flip" :class="{desligar: criar, ligar: !criar}">
      {{ (criar) ? 'Criar' : 'Excluir' }}
    </div>
  </div>

  <AdicionarLivro v-if="criar"/>
  <ExcluirLivro v-if="!criar"/>
</template>

<script>
  import NavBar from '@/components/Navbar.vue';
  import AdicionarLivro from '@/components/Adicionar.vue';
  import ExcluirLivro from '@/components/Excluir.vue';

  export default{
    name: "GestaoLivros",
    data() {
      return {
        criar: true
      }
    },
    computed: {
      switchDark() {
        return {
          switchDark: !this.$store.state.darkMode
        }
      },
      flipDark() {
        return {
          flipDark: !this.$store.state.darkMode
        }
      }
    },
    methods: {
      mudar() {
        this.criar = !this.criar;
        this.excluir = !this.excluir;
      }
    },
    components: {
      NavBar,
      AdicionarLivro,
      ExcluirLivro
    }
  }
</script>

<style>
  .switch{
    width: 20%;
    height: 9vh;
    border-radius: 100px;
    border: solid 2px #031B4E;
    background-color: #63B1BC;
    /* display: flex; */
    /* align-items: center; */
    padding: 0 .9% 0 .5%;
    margin: 4vh 0 0 10%;
    cursor: pointer;
  }
  .switchDark{
    background-color: #092769;
    border: solid 1px #d6d6d6;   
  }
  .flip{
    height: 70%;
    width: 50%;
    background-color: #031B4E;
    border-radius: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    font-size: 1.5rem;
    border: solid 2px #000;
    box-shadow: 0em 0.3em #02143b;
    margin: 1.5% 0 0 0;
  }
  .flipDark{
    background-color: #202020;
    border: solid 1px #d6d6d6;   
    box-shadow: 0em 0.3em #000000;

  }
  .switch:hover .flip{
    background-color: #f1f1f1;
    color: #1f1f1f;
    box-shadow: 0 .3em #b9b4b4;
  }
  .ligar{
    animation: ligar .3s linear;
    margin-left: 50%;

  }
  .desligar{
    animation: desligar .3s linear;
  }
  @keyframes ligar{
    0% {margin-left: 0;
        margin-top: 2%;
        box-shadow: -.5em 0.1em #b9b4b4;}
    40% {margin-left: 20%;}
    60% {margin-left: 30%;}
    100% {margin-left: 50%;}
  }
  @keyframes desligar{
    0% {margin-left: 50%;
        margin-top: 2%;
        box-shadow: .5em 0.1em #b9b4b4;}
    40% {margin-left: 30%;}
    60% {margin-left: 20%;}
    100% {margin-left: 0%;}
  }
</style>