<template>
  <NavBar/>
  <msgAviso v-if="aviso" :alerta="alerta" :msg="msg"/>
  <InfoLivros v-if="modal" 
    :funcao="reservarLivro"
    :id="id"
    :nome="nome"
    :autor="autor"
    :data="data.split('/')"
    :descricao="descricao"
    :caminho="caminho"
    :fechar="fechar"
  />
  <div class="container">
    <div class="filtros" :class="bordaFiltro">
      <h3>Filtros:</h3>
      <hr>
      <p>Nome:</p>
      <input type="text" 
        @keyup.enter="filtrarNome()" 
        v-model="filtroNome"
        class="inputlight"
      >
      <hr>
      <p>Autor:</p>
      <input type="text" 
        @keyup.enter="filtrarAutor()" 
        v-model="filtroAutor"
        class="inputlight"
      >
      <hr>
      <div class="click" @click="verde">
        <p>Disponivel</p><div class="bolinha verde"></div>
      </div>
      <hr>
      <div class="click" @click="amarelo">
        <p>Verificando</p><div class="bolinha amarela"></div>
      </div>
      <hr>
      <div class="click" @click="vermelho">
        <p>Indisponivel</p><div class="bolinha vermelho"></div>
      </div>
      <hr>
    </div>
    <div class="lista" :class="listaDark">
      <div class="titulo">
        <h1>Livros:</h1>
      </div>
      <div class="livros">
        <LivrosComp v-for="(livro, i) in filtroLista" :key="i"
          :titulo="livro.nome"
          :autor="livro.autor"
          :status="livro.disponibilidade"
          :caminho="livro.caminho"
          @click="teste(livro.id, livro.nome, livro.autor, livro.dataPublic, livro.descricao, livro.caminho)"
        />
      </div>
    </div>
  </div>
</template>

<script>
  import NavBar from '../components/Navbar.vue';
  import LivrosComp from '../components/Livros.vue';
  import InfoLivros from '@/components/InfoLivros.vue';
  import msgAviso from '@/components/Aviso.vue';

  export default{
    name: 'listaLivros',
    data() {
      return {
        livros: [],
        filtroLista: [],
        filtroNome: "",
        filtroAutor: "",
        modal: false,
        id: null,
        nome: null,
        autor: null,
        data: null,
        descricao: null,
        caminho: null,
        aviso: false,
        msg: "",
        alerta: "branco"
      }
    },
    components: {
      NavBar,
      LivrosComp,
      InfoLivros,
      msgAviso
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
            this.livros = [...json];
            this.filtroLista = [...json];
            console.log(this.livros)
          })
        }
      }).catch((erro) => {
        console.log(erro);
      })
    },
    computed: {
      // inputDarkMode() {
      //   let itsDark = sessionStorage.dark === "true"
      //   return {
      //     darkinput: itsDark,
      //     inputlight: !itsDark
      //   }
      // },
      bordaFiltro() {
        return {
          bordaFiltro: sessionStorage.dark === "true"
        }
      },  
      listaDark() {
        return {
          listaDark: sessionStorage.dark === "true"
        }
      }
    },
    methods: {
      teste(id, nome, autor, data, descricao, caminho) {
        this.id = id;
        this.nome = nome;
        this.autor = autor;
        this.caminho = caminho;
        let dia = data.split('-');
        dia[2] = dia[2].slice(0,2);
        dia = dia.join('/');
        this.data = dia;
        console.log(dia)
        this.descricao = descricao;
        this.fechar()
      },
      fechar() {
        this.modal = !this.modal;
      },
      filtrarNome() {
        let arr = [...this.livros]
        const filtrado = arr.filter(rest => rest.nome.indexOf(this.filtroNome) >= 0);

        if(filtrado.length == 0) {
          this.alerta = "alertVermelho";
          this.msg = "Não foi encontrado nenhum livro"
          this.aviso = true;

          const timer = setTimeout(() => {
            this.aviso = false;
          }, 3000)

          return () => clearTimeout(timer)
        } else {
          this.filtroLista = filtrado;
        }
      },
      filtrarAutor() {
        let arr = [...this.livros]
        const filtrado = arr.filter(rest => rest.autor.indexOf(this.filtroAutor) >= 0);
        if(filtrado.length == 0) {
          this.alerta = "alertVermelho";
          this.msg = "Não foi encontrado nenhum livro"
          this.aviso = true;

          const timer = setTimeout(() => {
            this.aviso = false;
          }, 3000)

          return () => clearTimeout(timer)
        } else {
          this.filtroLista = filtrado;
        }
      },
      verde() {
        let arr = [...this.livros]
        const filtrado = arr.filter(rest => rest.disponibilidade.indexOf("verde") >= 0);
        if(filtrado.length == 0) {
          this.alerta = "alertVermelho";
          this.msg = "Não foi encontrado nenhum livro"
          this.aviso = true;

          const timer = setTimeout(() => {
            this.aviso = false;
          }, 3000)

          return () => clearTimeout(timer)
        } else {
          this.filtroLista = filtrado;
        }
      },
      amarelo() {
        let arr = [...this.livros]
        const filtrado = arr.filter(rest => rest.disponibilidade.indexOf("amarelo") >= 0);
        if(filtrado.length == 0) {
          this.alerta = "alertVermelho";
          this.msg = "Não foi encontrado nenhum livro"
          this.aviso = true;

          const timer = setTimeout(() => {
            this.aviso = false;
          }, 3000)

          return () => clearTimeout(timer)
        } else {
          this.filtroLista = filtrado;
        }
      },
      vermelho() {
        let arr = [...this.livros]
        const filtrado = arr.filter(rest => rest.disponibilidade.indexOf("vermelho") >= 0);
        if(filtrado.length == 0) {
          this.alerta = "alertVermelho";
          this.msg = "Não foi encontrado nenhum livro"
          this.aviso = true;

          const timer = setTimeout(() => {
            this.aviso = false;
          }, 3000)

          return () => clearTimeout(timer)
        } else {
          this.filtroLista = filtrado;
        }
      },
      reservarLivro(id) {
        fetch(`http://localhost:5000/reservar/${sessionStorage.id}&${id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json'
          }
        }).then((resp) => {
          if(resp.ok) {
            location.reload()
          }
        }).catch((erro) => {
          console.log(erro);
        })
      }
    }
  }
</script>

<style>
  .container{
    width: 100%;
    min-height: 91vh;
    display: flex;
    justify-content: center;
    /* align-items: center; */
  }
  .filtros{
    width: 15%;
    min-height: 100%;
    background-color: #031B4E;
    margin: 5% 0 5% 0;
    color: #f1f1f1;
    text-align: center;
    border-radius: 5px;
  }
  .filtros hr{
    margin: 0
  }
  .filtros p{
    margin: 3% 0 3% 0;
  }
  .click{
    cursor: pointer;
  }
  .filtros .bolinha{
    width: 0%;
    height: 0%;
    padding: 4%;
    border-radius: 50%;
    margin: 0 0 3% 46%;
  }
  .filtro .verde{
    background-color: #00FF19;
  }
  .filtros .amarela{
    background-color: #FAFF00;
  }
  .filtros .vermelho{
    background-color: #FF0000;
  }
  .inputlight{
    margin-bottom: 5%;
    border-radius: 5px;
    border: solid 2px #1f1f1f; 
  }
  /* .darkinput{
    margin-bottom: 5%;
    border-radius: 5px;
    background-color: #1f1f1f;
    border: solid 2px #f1f1f1;
    color: #f1f1f1 
  } */
  .lista{
    width: 70%;
    min-height: 100%;
    background-color: #63B1BC;
    margin: 5% 0 5% 1%;
    padding: 0 0 10% 0;
    border-radius: 5px;
  }
  .titulo{
    width: 100%;
  }
  .titulo h1{
    font-weight: 400;
    color: #f1f1f1;
    margin: 3% 0 0 3%;
  }
  .bordaFiltro{
    border: 1px solid #f1f1f1;
    background-color: #010e29;
  }
  .listaDark{
    background-color: #092769;
    border: solid 1px #f1f1f1
  }
</style>