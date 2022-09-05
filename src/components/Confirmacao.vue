<template>
  <div class="modal2">
    <div class="fechar" @click="funcao3">
      x
    </div>
    <div class="confirmar">
      <div class="textConfirm">
        <p>Confirmar devolução do livro <span>{{ nome }}</span>?</p>
      </div>
      
      <div class="btnsConfirm">
        <ButtonVue btnText="Confirmar" @click="funcao1"/>
        <ButtonVue btnText="Rejeitar" @click="funcao2"/>
      </div>
    </div>
  </div>
</template>

<script>
  import ButtonVue from '@/form/Button.vue'

  export default {
    name: 'ModalConfirmacao',
    props: [
      "nome",
      "funcao1",
      "funcao2",
      "funcao3"
    ],
    components: {
      ButtonVue
    }
  }
</script>

<style>
  .modal2{
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
    justify-content: center;
    align-items: center;
  }
  .fechar{
    position: absolute;
    top: 39%; left: 65.3%;
    cursor: pointer;
    color: #f1f1f1;
  }
  .fechar:hover{
    color: #f1f1f1;
    font-size: 1.8vw;
    top: 38.2%
  }
  .confirmar{
    width: 30%;
    min-height: 15%;
    background-color: #63B1BC;
    border: solid 3px #031B4E;
    border-radius: 10px;
    color: #1f1f1f;
    position: absolute;
    padding: 0 2% 0 2%;
    /* top: 35%; left: 35% */
    
  }
  .textConfirm{ 
    text-align: center;
  }
  .textConfirm span{
    font-weight: bold;
  }
  .btnsConfirm{
    height: 50%;
    /* background-color: black; */
    display: flex;
    /* align-items: center; */
    justify-content: space-evenly
  }
  .btnsConfirm button{
    width: 30%;
    background-color: #031B4E;
    color: #f1f1f1;
    border-radius: 5px;
    border: solid 2px #f1f1f1;
    padding: 1% 0 1% 0;
    margin-bottom: 4%;
  }
  .btnsConfirm button:hover{
    background-color: #f1f1f1;
    color: #031B4E;
    border: solid 2px #031B4E;
  }
</style>