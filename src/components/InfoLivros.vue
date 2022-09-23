<template>
  <AlertaAviso v-if="aviso" :alerta="alerta" :msg="msg"/>
  <div class="modal">
    <div class="box">
      <div class="contImgModal">
        <img :src="caminho">
      </div>
      <hr>
      <div class="infoModal">
        <div class="contInfos">
          <div class="infosLivro">
            <h3>Titulo: <span>{{ nome }}</span></h3>
            <h3>Autor: <span>{{ autor }}</span></h3>
            <h3>Data de publicação:<br><span>{{ `${data[2]}/${data[1]}/${data[0]}` }}</span></h3>
          </div>
          <div class="descLivro">
            <h3>Descrição:</h3>
            <div class="desc">
              {{ descricao }}
            </div>
          </div>
        </div>
        <div class="addLista">
          <ButtonVue @click="funcao(idFunction)" :btnText="txtBotao"/>
          <ButtonVue btnText="Fechar" @click="fechar"/> 
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import ButtonVue from '@/form/Button.vue'
  import AlertaAviso from '../components/Aviso.vue'

  export default {
    name: 'InfoLivro',
    data() {
      return {
        aviso: true,
        alerta: '',
        msg: '',
        idFunction: this.id
      }
    },
    methods: {
      chamarAlerta(classe, msg) {
        this.alerta = classe;
        this.msg = msg;
        this.aviso = true;

        const timer = setTimeout(() => {
          this.aviso = false;
        }, 3000)
        return () => clearTimeout(timer)
      }
    },
    components: {
      ButtonVue,
      AlertaAviso
    },
    props: [
      "fechar",
      "id",
      "nome",
      "autor",
      "data",
      "descricao",
      "caminho",
      "funcao",
      "txtBotao"
    ],
  }
</script>

<style>
  .modal{
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
  .box{
    width: 70%;
    height: 40%;
    background-color: #63B1BC;
    /* margin-bottom: 10%; */
    border: 7px solid #031B4E;
    border-radius: 10px ;
    display: flex;
  }
  .box .contImgModal{
    width: 25%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #fff;
  }
  .contImgModal .imgModal{
    width: 55%;
    height: 70%;
    background-color: #000;
  }
  .box hr{
    margin: 0;
    height: 98%;
    border: 4px solid #031B4E;
  }
  .box .infoModal{
    width: 74.5%;
    height: 100%;
  }
  .infoModal .contInfos{
    width: 100%;
    height: 80%;
    display: flex;
    color: #031B4E;
  }
  .contInfos .infosLivro{
    width: 40%;
    height: 100%;
    padding-left: 3%;

  }
  .infosLivro span{
    font-weight: normal;
  }
  .contInfos .descLivro{
    width: 60%;
    height: 100%;
  }
  .descLivro h3{
    margin-bottom: 0;
  }
  .descLivro .desc{
    width: 90%;
    height: 60%;
    background-color: #f1f1f1;
    border: 3px solid #031B4E;
    border-radius: 3px;
    padding: 1%;
    font-size: 0.9rem;
    overflow-y: scroll;
  }
  .infoModal .addLista{
    width: 100%;
    display: flex;
    justify-content: center;
  }
  .addLista button{
    background-color: #031B4E;
    color: #f1f1f1;
    font-size: 0.8rem;
    padding: 1% 4% 1% 4%;
    border-radius: 5px;
    margin-right: 3%;
  }

  .addLista button:hover {
    background-color: #f1f1f1;
    color: #031B4E;
    cursor: pointer;
  }
</style>