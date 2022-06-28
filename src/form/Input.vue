<template>
  <label for="">{{ label }}</label>
  <input 
    :value="loginValue" 
    @input="$emit('update:loginValue', $event.target.value)"
    :class="classe" 
    :type="type"  
  >
</template>

<script>
  export default{
    name: 'FormButton',
    props: [
      'label',
      'type',
      'classe',
      'loginValue'
    ],
    emits: [
      'update:loginValue'
    ]
  }
</script>