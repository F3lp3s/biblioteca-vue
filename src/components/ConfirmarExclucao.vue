<template>
  <div class="modalteste">
    <div class="confirmar-exclusao">
        <p>Deseja mesmo excluir este livro?</p>
        <div class="botoesExcluir">
          <button @click="fechar">Cancelar</button>
          <button @click="funcao">Excluir</button>
        </div>
    </div>
  </div>
</template>

<script>
  export default{
    name: 'ConfirmarExclusao',
    props: [
      "funcao",
      "fechar"
    ]
  }
</script>

<style>
  .modalteste{
    /* display: none; */
    position: fixed;
    z-index: 1;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%; 
    overflow: auto;
    background-color: rgb(0,0,0);
    background-color: rgba(0,0,0,0.4);
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .confirmar-exclusao{
    background-color: #63B1BC;
    border: solid 2px #031B4E;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding: 0 2% 0 2%;
    font-size: 1.3rem;
  }
  .botoesExcluir{
    width: 100%;
    padding-bottom: 7%;
    display: flex;
    justify-content: center;
  }
  .botoesExcluir button{
    background-color: #031B4E;
    color: #f1f1f1;
    border: solid 2px #f1f1f1;
    font-size: 0.8rem;
    padding: 1% 4% 1% 4%;
    border-radius: 5px;
    margin-right: 3%;
    font-size: 1.1rem;
  }
  .botoesExcluir button:hover {
    background-color: #f1f1f1;
    border: solid 2px #031B4E;
    color: #031B4E;
  }
</style>
