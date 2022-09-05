<template>
  <MsgAlerta v-if="alerta" :alerta="tipo" :msg="msg"/>
  <ConfirmarExclucao v-if="confirmar" :funcao="excluirLivro" :fechar="abrir"/>
  <div class="mudarLivros" :class="mudarLivrosDark">
    <div class="listaExcluir">
      <div class="tituloExcluir">
        <h2>Selecione o livro para exlucir:</h2>
      </div>
      <LivrosComp v-for="(livro, i) in livros" :key="i"
          :titulo="livro.nome"
          :autor="livro.autor"
          :status="livro.disponibilidade"
          :caminho="livro.caminho"
          @click="listaExcluir = i"
        />
    </div>
    <div class="exemploExcluir">
      <h2>Excluindo Livro:</h2>
      <LivrosComp
        :titulo="filtroLista[listaExcluir].nome"
        :autor="filtroLista[listaExcluir].autor"  
        :status="filtroLista[listaExcluir].disponibilidade"
        :caminho="filtroLista[listaExcluir].caminho"
      />
      <button @click="abrir">Excluir</button>
    </div>
  </div>
</template>

<script>
  import LivrosComp from '../components/Livros.vue';
  import MsgAlerta from '@/components/Aviso.vue';
  import ConfirmarExclucao from'@/components/ConfirmarExclucao.vue';

  export default{
    name: 'ExcluirLivros',
    data() {
      return {
        livros: [],
        filtroLista: [],
        listaExcluir: 0,
        alerta: false,
        tipo: "",
        msg: "",
        confirmar: false
      }
    },
    components: {
      LivrosComp,
      MsgAlerta,
      ConfirmarExclucao
    },
    beforeCreate() {
      fetch('http://localhost:5000/livros', {
        method: 'GET',
        headers:{
          'Content-Type': 'application/json'
        },
      }).then((resp) => {
        if(resp.ok) {
          resp.json().then(json => {
            this.livros = []
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
      mudarLivrosDark() {
        return {
          mudarLivrosDark: sessionStorage.dark === "true"
        }
      }
    },
    methods: {
      excluirLivro() {
        fetch(`http://localhost:5000/deleteLivro/${this.livros[this.listaExcluir].id}`, {
        method: 'DELETE',
        headers:{
          'Content-Type': 'application/json'
        },
      }).then((resp) => {
        if(resp.ok) {
          console.log('livro excluido');
          this.tipo = "alertVerde";
          this.msg = "Livro excluido com sucesso";
          this.alerta = true;
          this.abrir();
          const timer = setTimeout(() => {
            this.alerta = false;
            location.reload();
          }, 3000)
          return () => clearTimeout(timer);
        }
      }).catch((erro) => {
        console.log(erro);
      })
      },
      abrir() {
        this.confirmar = !this.confirmar
      }
    }
  }
</script>

<style>
  .listaExcluir{
    width: 60%;
    height: 100%;
    border-right: solid 2px #f1f1f1;
    overflow-y: scroll;
    display: flex;
    flex-wrap: wrap;
  }
  .tituloExcluir{
    width: 100%;
    text-align: center;
  }
  .listaExcluir .livroInfo{
    margin: 5% 5% 5% 10%;
  }
  .exemploExcluir{
    width: 40%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    /* justify-content: center; */
  }
  .exemploExcluir .livroInfo{
    margin: 9% 0 5% 0;
    color: #1f1f1f;
  }
  .exemploExcluir button{
    padding: 2% 9% 2% 9%;
    border-radius: 5px;
    border: solid 2px #f1f1f1;
    color: #f1f1f1;
    background-color: #031B4E;
    font-size: 1rem;
  }
  .exemploExcluir button:hover {
    background-color: #f1f1f1;
    border: solid 2px #1f1f1f;
    color: #1f1f1f;
  }
</style>