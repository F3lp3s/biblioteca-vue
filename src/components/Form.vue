<template>
  <form class="formularioLogin" @submit.prevent="logar">
    <FormInput v-model:loginValue="ra" classe="formInput" label="RA" type="text"/>
    <FormInput v-model:loginValue="senha" classe="formInput" label="Senha" type="password"/>
    <FormButton btnText="Logar"/>
  </form>
</template>

<script>
  import FormInput from '../form/Input.vue';
  import FormButton from '../form/Button.vue';

  export default{
    name: 'TemplateForm',
    data() {
      return{
        ra: "",
        senha: ""
      }
    },
    components: {
      FormInput,
      FormButton
    },
    props: [
      "funcao"
    ],
    methods: {
      logar() {
        this.funcao(this.ra, this.senha)
      },
    }
  }
</script>

<style>
  .formularioLogin{
    display: flex;
    flex-direction: column;
    align-items: baseline;
    color: #f1f1f1;
  }
  .formularioLogin label{
    margin-top: 1em;
    margin-left: 15%;
  }
  .formInput{
    width: 65%;
    height: 2em;
    margin-left: 15%;
    font-size: 1rem;
    border-radius: 10px;
    border: 0.1em solid #0762C8;
  }
  .formularioLogin button{
    width: 30%;
    height: 2em;
    margin: 3em 0 0 0;
    border: 0.1em solid #f1f1f1;
    color: #f1f1f1;
    background-color: #0762C8;
    border-radius: 5px;
  }
  .formularioLogin button:hover{
    background-color: #031B4E;
  }
  .formularioLogin button:active{
    background-color: #000;
  }
</style>