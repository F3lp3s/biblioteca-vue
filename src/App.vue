<template>
  <router-view/>
</template>

<style>
  body{
    margin: 0;
    padding: 0;
    font-family: 'Roboto', sans-serif;
    scroll-behavior: auto;
    background-color: #f1f1f1;
  }
  .dark{
    background-color: #353535;
  }
  .light{
    background-color: #f1f1f1;
  }
  /* width */
  ::-webkit-scrollbar {
    width: 10px;
  }

/* Track */
  ::-webkit-scrollbar-track {
    background: #63B1BC;
    /* border: solid 1px #f1f1f1; */
  }

/* Handle */
  ::-webkit-scrollbar-thumb {
    background: #031B4E;
    border: solid 1px #f1f1f1;
    border-radius: 10 px;
    border-radius: 10px;
  }
  ::-webkit-scrollbar-thumb:hover {
    background: #f1f1f1;
    border: solid 1px #031B4E;
  }
  #app{
    margin: 0;
    padding: 0;
  }
  @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@200&family=Roboto:wght@100;300;400;500&display=swap');
</style>