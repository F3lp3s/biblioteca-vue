<template>
  <NavBar/>
  <div class="container2">
    <div class="livrosPerfil">
      <div class="desejados">
        <h2>Livros Desejados: (0/3)</h2>
        <div class="listLivro">
          <LivrosComp v-for="(livro, i) in livros" :key="i"
            :titulo="livro.nome"
            :autor="livro.autor"
            :status="livro.disponibilidade"
          />
        </div>
      </div>
      <hr>
      <div class="devolver">
        <h2>Livros Para Devolver: (0/3)</h2>
        <div class="listLivro">
          <LivrosComp v-for="(livro, i) in livros" :key="i"
            :titulo="livro.nome"
            :autor="livro.autor"
            :status="livro.disponibilidade"
          />
        </div>
      </div>
    </div>
    <div class="perfilInfo">
      <div class="contPerfil">
        <div class="reservaPerfilImg"></div>
        <h2>{{ nomeUser }}</h2>
      </div>
      <div class="contInfoStatus">
        <p>Dia de devolução: {{ dia }}</p>
        <p>Livos para desvolver: 0</p>
      </div>
      <div class="contBotoes">
        <ButtonForm btnText="Reservar" classdif="btn1"/>
        <ButtonForm btnText="Devolver" classdif="btn2"/>
      </div>
    </div>
  </div>
</template>

<script>
  import NavBar from '../components/Navbar.vue';
  import LivrosComp from '../components/Livros.vue';
  import ButtonForm from '../form/Button.vue'; 

  export default{
    name: 'reservaLivros',
    data() {
      return {
        livros: [],
        dia: `${new Date().getDate()}/0${new Date().getMonth() + 1}`,
        nomeUser: sessionStorage.nome
      }
    },
    mounted() {
      
      fetch('http://localhost:5000/livros', {
        method: 'GET',
        headers:{
          'Content-Type': 'application/json'
        },
      }).then((resp) => {
        if(resp.ok) {
          resp.json().then(json => {
            // console.log(JSON.stringify(json));
              
            this.livros = json;
            console.log(this.livros)
          })
        }
      }).catch((erro) => {
        console.log(erro);
      })
       
    },
    components: {
      NavBar,
      LivrosComp,
      ButtonForm
    }
  }
</script>

<style>
  .container2{
    width: 100%;
    height: 91vh;
    display: flex;
    justify-content: center;
  }
  .livrosPerfil{
    width: 65%;
    height: 83%;
    background-color: #63B1BC;
    margin: 4% 0 4% 0;
    display: flex;
    color: #f1f1f1;
    border-radius: 5px;
  }
  .livrosPerfil hr{
    margin: 0;
    border: 1px solid #f1f1f1;
  }
  .livrosPerfil h2{
    font-weight: 400;
  }
  .desejados{
    width: 50%;
    height: 100%;
    overflow-y: scroll;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .listLivro{
    width: 75%;
    color: #1f1f1f;
  }
  .devolver{
    width: 50%;
    height: 100%;
    overflow-y: scroll;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .perfilInfo{
    width: 25%;
    height: 83%;
    background-color: #031B4E;
    margin: 4% 0 4% 1%;
    color: #f1f1f1;
    text-align: center;
    border-radius: 5px;
  }
  .contPerfil{
    width: 100%;
    height: 55%;
    /* background-color: #000; */
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .reservaPerfilImg{
    width: auto;
    height: auto;
    padding: 30%;
    border-radius: 50%;
    background-color: #8a8a8a;
    align-self: center;
    margin-top: 8%;
  }
  .contPerfil h2{
    font-weight: 400;
    margin: 5% 0 0 0;
  }
  .contInfoStatus{
    /* background-color: greenyellow; */
    /* overflow: auto; */
    font-size: 1.3rem;
    margin-top: 10%;
  }
  .contBotoes{
    width: 100%;
    height: 17%;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    /* background-color: #000; */
  }
  .contBotoes button{
    width: 40%;
    height: 50%;
    font-size: 1.3rem;
    border-radius: 5px;
  }
  .contBotoes .btn1{
    color: #f1f1f1;
    background-color: #63B1BC;
    border: 2px solid #f1f1f1;
  }
  .contBotoes .btn2{
    color: #63B1BC;
    background-color: #f1f1f1;
    border:  2px solid #63B1BC;
  }
  .contBotoes .btn1:hover{
    color: #63B1BC;
    background-color: #f1f1f1;
    border:  2px solid #63B1BC;
    cursor: pointer;
  }
  .contBotoes .btn2:hover{
    color: #f1f1f1;
    background-color: #63B1BC;
    border: 2px solid #f1f1f1;
    cursor: pointer;
  }
</style>