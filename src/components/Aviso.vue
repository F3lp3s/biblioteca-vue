<template>
  <div class="alerta">
    <h3>Usuario não encontrado</h3>
  </div>
</template>

<script>
  export default{
    name: 'alertaAviso'
  }
</script>

<style>
  .alerta{
    position: absolute;
    background-color: #c23737;
    border: 2px solid #5f0a0a;
    color: #5f0a0a;
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