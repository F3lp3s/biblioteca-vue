<template>
  <div :class="alerta">
    <h3>{{ msg }}</h3>
  </div>
</template>

<script>
  export default{
    name: 'alertaAviso',
    props: [
      'alerta',
      'msg'
    ]
  }
</script>

<style>
  .alertVermelho{
    position: fixed;
    background-color: #c23737;
    border: 2px solid #5f0a0a;
    color: #5f0a0a;
    padding: 0px 10px 0px 10px;
    border-radius: 10px;
    left: 40%; top: 1vh;
    animation: aparecer 3s linear;
  }
  .alertAmarelo{
    position: fixed;
    background-color: #ffe600;
    border: 2px solid #b9aa1f;
    color: #b9aa1f;
    padding: 0px 10px 0px 10px;
    border-radius: 10px;
    left: 40%; top: 1vh;
    animation: aparecer 3s linear;
  }
  .alertVerde{
    position: fixed;
    background-color: #3AC237;
    border: 2px solid #0A5F12;
    color: #0A5F12;
    padding: 0px 10px 0px 10px;
    border-radius: 10px;
    left: 40%; top: 1vh;
    animation: aparecer 3s linear;
  }
  @keyframes aparecer{
    0% {top: -10vh;}
    10% {top: 1vh;}
    90% {top: 1vh;}
    100% {top: -10vh;}
  }
  .alerta h3{
    font-weight: 500;
  }
</style>