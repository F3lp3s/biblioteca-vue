<template>
  <button @click="funcao" :class="classdif">{{ btnText }}</button>
</template> 

<script>
  export default{
    name: 'FormButton',
    props: [
      'btnText',
      'classdif'
    ]
  }
</script>