<template>
  <NavBar/>
  <InfoLivros v-if="infoLivros" 
    :funcao="devolverLivros"
    :id="id"
    :nome="nome"
    :autor="autor"
    :data="dia"
    :descricao="desc"
    :caminho="caminho"
    :fechar="ligar"
    txtBotao="Devolver Livro"
  />
  <div class="container2">
    <div class="livrosPerfil" :class="livroPerfilDark">
      <div class="devolver">
        <h2>Livros Para Devolver: ({{ devolver.length }}/3)</h2>
        <div class="listLivro">
          <LivrosComp v-for="(devolvido, i) in devolver" :key="i"
            :titulo="devolvido.nome"
            :autor="devolvido.autor"
            :status="devolvido.disponibilidade"
            :caminho="devolvido.caminho"
            @click="ligar(devolvido.nome, devolvido.autor, devolvido.descricao, devolvido.caminho, devolvido.id)"
          />
        </div>
      </div>
    </div>
    <div class="perfilInfo" :class="perfilInfoDark">
      <div class="contPerfil">
        <img class="reservaPerfilImg" :src="'http://localhost:5000/img/' + img">
      </div>
      <div class="contInfoStatus">
        <p>Dia de devolução: {{ `${dia[2]}/${dia[1]}` }}</p>
        <p>Livros para devolver: {{ devolver.length }}</p>
      </div>
      <div class="contBotoes">
    
      </div>
    </div>
  </div>
</template>

<script>
  import NavBar from '../components/Navbar.vue';
  import LivrosComp from '../components/Livros.vue';
  import InfoLivros from '@/components/InfoLivros.vue';

  export default{
    name: 'reservaLivros',
    data() { 
      return {
        livros: [],
        dia: [new Date().getFullYear(), "0" + (new Date().getMonth() + 1), new Date().getDate()],
        // dia: `${new Date().getDate()}/0${new Date().getMonth() + 1}/${new Date}`,
        nomeUser: sessionStorage.nome,
        devolver: [],
        infoLivros: false,
        img: sessionStorage.img,
        nome: '',
        autor: '',
        desc: '',
        caminho: '',
        id: '' 
      }
    },
    mounted() {
      fetch(`http://localhost:5000/devolucao/${sessionStorage.id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      }).then((resp) => {
        if(resp.ok) {
            resp.json().then(json => {
            this.devolver = json;
          })
        }
      }).catch((erro) => {
        console.log(erro);
      });
    },
    computed: {
      livroPerfilDark() {
        return {
          livroPerfilDark: !this.$store.state.darkMode
        }
      },
      perfilInfoDark() {
        return {
          perfilInfoDark: !this.$store.state.darkMode
        }
      }
    },
    methods: {
      reservar() {
        const ids = [];
        let bloqueio = true;
        for(let i = 0; i < this.livros.length; i++) {
          if(this.livros[i].disponibilidade == "verde") {
            ids.push(this.livros[i].id);
            console.log(ids)
          } else {
            bloqueio = false;
            this.alerta = "alertAmarelo"
            this.msg = "Por favor exclua o livro que está indisponivel"
            this.aviso = true;
            const timer = setTimeout(() => {
              this.aviso = false;
            }, 3000)

            return () => clearTimeout(timer)
          }
        }

        if(bloqueio && this.devolver.length + this.livros.length <= 3) {
          this.terminarReserva(ids);
        } else {
          this.alerta = "alertAmarelo"
            this.msg = "Você já reservou o limite maximo de livros"
            this.aviso = true;
            const timer = setTimeout(() => {
              this.aviso = false;
            }, 3000)

            return () => clearTimeout(timer)
        }
      },
      excluirLivro(i) {
        this.livros.splice(i, 1);
        sessionStorage.removeItem(this.storage[i]);
        this.storage.splice(i, 1);
        this.confirmar();
      },
      devolverLivros(id) {
        fetch(`http://localhost:5000/devolver/${id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json'
          }
        }).then((resp) => {
          if(resp.ok) {
            location.reload();
            console.log('devolvido');
          }
        }).catch((erro) => {
          console.log(erro);
        })
      },
      confirmar(i, nome) {
        this.index = i;
        console.log(this.index)
        this.nomeLivro = nome;
        console.log(this.nomeLivro)
        this.confirmacao = !this.confirmacao;
      },
      ligar(nome, autor, descricao, caminho, id) {
        this.nome = nome;
        this.autor = autor;
        this.desc = descricao;
        this.caminho = caminho;
        this.id = id;
        this.infoLivros = !this.infoLivros
      },
      configMoodal(nome, autor, desc, caminho, id) {
        this.nome = nome;
        this.autor = autor;
        this.desc = desc;
        this.caminho = caminho
        this.id = id;
      }
    },
    components: {
    NavBar,
    LivrosComp, 
    InfoLivros
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
    border-radius: 10px;
  }
  .livroPerfilDark{
    background-color: #092769;
    border: solid 1px #f1f1f1;
  }
  .livrosPerfil h2{
    font-weight: 400;
  }
  .listLivro{
    width: 100%;
    height: 80%;
    color: #1f1f1f; 
    display: flex;
    justify-content: space-around;
    align-items: center;
    /* background-color: #ff008c; */
  }
  .listLivro .livroInfo{
    margin: 0
  }
  .devolver{
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .perfilInfo{
    width: 25%;
    height: 83%;
    background-color: #031B4E;
    margin: 4% 0 4% 1%;
    color: #d6d6d6;
    text-align: center;
    border-radius: 5px;
  }
  .perfilInfoDark{
    background-color: #010e29;
    border: solid 1px #d6d6d6;
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
    width: 48%;
    height: 60%;
    border-radius: 50%;
    align-self: center;
    margin-top: 8%;
    vertical-align: middle;
    border: solid 5px #63B1BC;
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