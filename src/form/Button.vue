<template>
  <button @click="funcao">{{ btnText }}</button>
</template> 

<script>
  export default{
    name: 'FormButton',
    props: [
      'btnText'
    ]
  }
</script>