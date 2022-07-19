<template>
  <div class="livroInfo">
    <div class="contImg">
      <div class="imgPlaceholder"></div>
    </div>
    <hr>
    <div class="contInfo">
      <div class="linha"><p>Titulo: {{ titulo }}</p></div>
      <div class="linha"><p>Autor: {{ autor }}</p></div>
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
    props: [
      "titulo",
      "autor",
      "status"
    ]
  }
</script>

<style>
  .livroInfo{
    width: 13em;
    height: 16em;
    background-color: #f1f1f1;
    margin: 4em 2em 0 3.3em;
    border: solid 1.5px #1f1f1f;
    border-radius: 5px;
  }
  .livroInfo hr{
    margin: 0 0 0 2.4%;
    width: 95%;
    border: 1px solid #1f1f1f
  }
  .contImg{
    width: 100%;
    height: 49%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .imgPlaceholder{
    width: 40%;
    height: 95%;
    background-color: #1f1f1f;
  }
  .contInfo{
    height: 49%;
    width: 100%;
  }
  .linha{
    width: 90%;
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
</style>