<template>
  <NavBar/>
  <p>Lista de livros</p>
</template>

<script>
  import NavBar from '../components/Navbar.vue'

  export default{
    name: 'listaLivros',
    components: {
      NavBar
    }
  }
</script>