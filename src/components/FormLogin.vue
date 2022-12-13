<template>
  <div class="form">
    <h1>Login</h1>
    <div class="template">
      <TemplateForm :funcao="logar"/>
    </div>
  </div>
</template>

<script>
  import TemplateForm from './Form.vue'

  export default{
    name: 'FormLogin',
    components: {
      TemplateForm
    },
    props: [
      'logar'
    ]
  }
</script>

<style>
  .form{
    height: 60%;
    width: 100%;
  }
  .form h1{
    margin: 0;
    color: #0762C8;
    margin: 1.5rem 0 .3em 2rem;
  }
  .template{
    width: 100%;
}
</style>