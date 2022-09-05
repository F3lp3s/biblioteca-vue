<template>
  <div class="livroInfo" :class="{livroDark: dark}">
    <div class="contImg">
      <img :src="caminho">
    </div>
    <hr :class="changeLine">
    <div class="contInfo">
      <div class="linha"><p>Titulo: <span>{{ titulo }}</span></p></div>
      <div class="linha"><p>Autor: <span>{{ autor }}</span></p></div>
      <div class="linha">
        <p>Disponibilidade:</p>
        <div :class="status"></div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'LivrosComp',
    data() {
      return{
        dark: sessionStorage.dark === "true"
      }
    },
    computed: {
      changeLine() {
        return {
          naoInteiro: !this.dark, 
          inteiro: this.dark
        };
      }
    },
    props: [
      "titulo",
      "autor",
      "status",
      "caminho"
    ]
  }
</script>

<style>
  .livroInfo{
    width: 13em;
    height: 17em;
    background-color: #f1f1f1;
    margin: 4em 2em 0 3.3em;
    border: solid 1.5px #1f1f1f;
    border-radius: 5px;
    cursor: pointer;
  }
  .livroInfo .naoInteiro{
    margin: 0 0 0 2.4%;
    width: 95%;
    border: 1px solid #1f1f1f
  }
  .livroInfo .inteiro{
    margin: 0 0 0 2.4%;
    width: 95%;
    border: 1px solid #d6d6d6
  }
  .contImg{
    width: 100%;
    height: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .contImg img{
    width: 70%;
    height: 95%;
  }
  .contInfo{
    height: 50%;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    /* margin: 0; */
  }
  .contInfo span{
    font-weight: normal;
  }
  .linha{
    width: 100%;
    margin: 0 0 0 2.5%;
    font-size: 0.9rem;
    font-weight: 600;
    display: flex;
    align-items: center;
  }
  .linha p{
    margin: 7% 5% 7% 0;
  }
  .verde{
    width: auto;
    height: 5%;
    padding: 3%;
    background-color: #00FF19;
    border-radius: 50%;
  }
  .amarelo{
    width: auto;
    height: 5%;
    padding: 3%;
    background-color: #FAFF00;
    border-radius: 50%;
  }
  .vermelho{
    width: auto;
    height: 5%;
    padding: 3%;
    background-color: #FF0000;
    border-radius: 50%;
  }
  .livroDark{
    background-color: #1f1f1f;
    color: #d6d6d6;
    border: solid 2px #d6d6d6;
  }
</style>