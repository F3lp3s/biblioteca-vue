<template>
  <div class="modal2">
    <div class="fechar" @click="funcao2">
      x
    </div>
    <div class="confirmar">
      <div class="textConfirm">
        <p>Retirar <span>{{ nome }}</span> da lista?</p>
      </div>
      
      <div class="btnsConfirm">
        <ButtonVue btnText="Confirmar" @click="funcao1(index)"/>
        <ButtonVue btnText="Rejeitar" @click="funcao2"/>
      </div>
    </div>
  </div>
</template>

<script>
  import ButtonVue from '@/form/Button.vue'

  export default{
    name: "RetirarModal",
    components: {
      ButtonVue
    },
    props: [
      'nome',
      'index',
      'funcao1',
      'funcao2'
    ]
  }
</script>

<style>

</style>