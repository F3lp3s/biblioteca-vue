<template>
  <MsgAlerta v-if="alerta" :alerta="tipo" :msg="msg"/>
  <div class="mudarLivros" :class="mudarLivrosDark">
    <div class="formAdd">
      <form @submit.prevent="postImg">
        <h2>Adicionar Livro</h2>
        <div class="duasPut">
          <div class="inputNome">
            <label for="">Titulo:</label>
            <input v-model="titulo" type="text" :class="gestaoInputDark">
          </div>
          <div class="isbnPut">
            <label for="">ISBN:</label>
            <input v-model="isbn" type="text" maxlength="13" :class="gestaoInputDark">
          </div>
        </div>
        <div class="duasPut">
          <div class="autorPut">
            <label for="">Autor:</label>
            <input v-model="autor" type="text" :class="gestaoInputDark">
          </div>
          <div class="dataPut baixo">
            <label for="">Data da Publicação:</label>
            <input v-model="data" type="date" :class="gestaoInputDark">
          </div>
        </div>
        <div @dragover.prevent="dragover" @dragleave.prevent="dragleave" @drop.prevent="guardarArqDrop" class="inputFile" :class="borderBlack">
          <input multiple id="inputFile" type="file" @change="guardarArq" :class="gestaoInputDark">
          <label for="inputFile">{{ (img == "https://imgur.com/kVpjcUx.png") ? "Insira imagem do livro" : "Arquivo Adicionado" }}</label>
        </div>
        <div class="descPut cima">
          <label for="">Descrição:</label>
          <textarea v-model="desc" type="text" :class="gestaoInputDark"/>
        </div>
        <button>Salvar</button>
      </form>
    </div>
    <div class="exemploAdd">
      <h2>Informações</h2>
      <LivrosComp
        :titulo="titulo"
        :autor="autor"
        status="verde"
        :caminho="link" 
      />
    </div>
  </div>  
</template>

<script>
  import LivrosComp from '../components/Livros.vue';
  import MsgAlerta from '@/components/Aviso.vue';

  export default{
    name: 'AdicionarLivro',
    data() {
      return {
        titulo: '',
        autor: '',
        data: '',
        desc: '',
        isbn: '',
        alerta: false,
        msg: "Livro criado com sucesso",
        tipo: "alertVerde",
        img: 'https://imgur.com/kVpjcUx.png',
        link: 'https://imgur.com/kVpjcUx.png'
      }
    },
    computed: {
      mudarLivrosDark() {
        return {
          mudarLivrosDark: !this.$store.state.darkMode
        }
      }
    },
    methods: {
      guardarArqDrop(e) {
        this.img = e.dataTransfer.files[0];
        e.currentTarget.classList.remove("teste")
        this.convertImage();
      },
      guardarArq(e) {
        this.img = e.target.files[0];
        this.convertImage();
      },
      async postImg() {
        var linkImg;
        let deuCerto = true;
        const formData = new FormData();
        formData.append("image", this.img);
        await fetch("https://api.imgur.com/3/image/", {
          method: "POST",
          headers: {
            Authorization: `Client-ID 852865f54a814b6` 
          },
          body: formData
        }).then(data => {
          console.log("entra aqui?")
          return data.json();
        }).then(data => {
          linkImg = data.data.link;
          console.log(linkImg);                 
        }).catch(error => {
          console.log("Algo deu errado!!", error);
          deuCerto = false;
        });

        if(deuCerto) {
          this.postLivro(linkImg)
        } else {
          console.log("Livro não foi cadastrado, tente novamente mais tarde!")
        }
      },
      postLivro(link) {
        let fixLink = link.split('/') 
        console.log(this.titulo, '/', this.autor, '/', this.data, '/', this.desc, '/', fixLink[3], '/', this.isbn);
        fetch(`http://localhost:5000/postLivro/${this.titulo}&${this.autor}&${this.data}&${this.desc}&${fixLink[3]}&"${this.isbn}"`, {
          method: 'POST',
          headers:{
            'Content-Type': 'application/json'
          }
        }).then((resp) => {
          if(resp.ok) {
            console.log('Livro Adicionado');
            this.titulo = '';
            this.autor = '';
            this.data = '';
            this.desc = '';
            this.isbn = '';
            this.link = 'https://imgur.com/kVpjcUx.png';
            this.alerta = true
            const timer = setTimeout(() => {
              this.alerta = false;
              
            }, 3000)
            return () => clearTimeout(timer)
          }
        }).catch((erro) => {
          console.log("testetetstetes")
          console.log(erro);
        })
      },
      convertImage() {
        const toBase64 = file => new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => resolve(reader.result);
          reader.onerror = error => reject(error);
        })

        toBase64(this.img).then(res => {
          console.log(res);
          this.link = res
        }).catch(err => {
          console.log(err)
        });
      },
      dragover(e) {
        e.currentTarget.classList.add("teste")
      },
      dragleave(e)  {
        e.currentTarget.classList.remove("teste")
      }
    },
    components: {
      LivrosComp,
      MsgAlerta
    }
  }
</script>

<style>
  .mudarLivros{
    width: 80%;
    height: 70vh;
    background-color: #63B1BC;
    margin: 2% 0 0 10%;
    border-radius: 10px;
    display: flex;
  }
  .mudarLivros h2{
    color: #f1f1f1;
  }
  .mudarLivrosDark{
    background-color: #02339c;
    border: solid 1px #d6d6d6;   
  }
  .mudarLivros label{
    color: #f1f1f1;
  }
  .mudarLivros h2{
    font-weight: 400;
    margin-bottom: 3%;
  }
  .formAdd{
    width: 60%;
    height: 100%;
    border-right: solid 2px #f1f1f1;
    text-align: center;
  }
  .exemploAdd{
    width: 40%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .exemploAdd .livroInfo{
    margin: 9% 0 0 0;
  }
  .formAdd h2{
    margin-bottom: 1%;
  }
  .nomePut{
    width: 80%;
    /* background-color: pink; */
    display: flex;
    flex-direction: column;
    text-align: start;
    padding: .5% 10% .5% 10%;
  }
  .formAdd input{
    border-radius: 5px;
    border: none;
    height: 2em;
  }
  .duasPut{
    width: 81.5%;
    /* background-color: pink; */
    display: flex;
    /* flex-direction: column; */
    text-align: start;
    padding: .5% 10% .5% 10%; 
  }
  .inputNome{
     width: 80%;
    display: flex;
    flex-direction: column;
    margin-right: 2%;
  }
  .isbnPut{
    width: 20%;
    display: flex;
    flex-direction: column;
    margin-right: 2%;
  }
  .autorPut{
    width: 80%;
    display: flex;
    flex-direction: column;
    margin-right: 2%;
  }
  .dataPut{
    width: 50%;
    display: flex;
    flex-direction: column;
    margin-right: 2%;
  }
  .baixo{
    margin-bottom: 2%;
  }
  .cima{
    margin-top: .5%;
  }
  .inputFile{
    width: 80%;
    margin-left: 4em;
    cursor: pointer;
    border: dashed #f1f1f1;
    padding: 2% 0% 2% 0%;
  }
  .inputFile label{
    padding: 3% 34% 3% 34%;
    cursor: pointer;
    /* transition: 1s; */
  }
  .inputFile input{
    display: none;
  }
  .descPut{
    width: 80%;
    /* background-color: pink; */
    display: flex;
    flex-direction: column;
    text-align: start;
    padding: .5% 10% .5% 10%;
  }
  .descPut textarea{
    height: 10em;
    flex-wrap: wrap;
    border-radius: 5px;
    border: none;
  }
  .formAdd button{
    margin-top: 3%;
    width: 30%;
    height: 2.7em;
    background-color: #031B4E;
    color: #f1f1f1;
    border-radius: 10px;
    border: solid 2px #f1f1f1;
    font-size: 1rem;
  }
  .formAdd button:hover{
    background-color: #f1f1f1;
    border: solid 2px #1f1f1f;
    color: #1f1f1f;
  }
  .teste{
    background-color: #63bca6;
  }
</style>