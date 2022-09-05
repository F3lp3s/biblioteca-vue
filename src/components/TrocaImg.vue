<template>
  <div class="modal2">
    <div class="fecharImg" @click="funcao1">x</div>
    <div class="trocarImg">
      <div class="textImgs">
        <h3>Trocar imagem de perfil:</h3>
      </div>
      <div class="displayImgs">
        <img src="http://localhost:5000/img/Student_Rakan.jpg" @click="mudarImg('Student_Rakan.jpg')">
        <img src="http://localhost:5000/img/Student_Xayah.jpg" @click="mudarImg('Student_Xayah.jpg')">
        <img src="http://localhost:5000/img/Cool_Rakan.jpg" @click="mudarImg('Cool_Rakan.jpg')">
        <img src="http://localhost:5000/img/Cool_Xayah.jpg" @click="mudarImg('Cool_Xayah.jpg')">
      </div>
    </div>
  </div>
</template>

<script>
  export default{
    name: "TrocarImg",
    props: [
      "funcao1"
    ],
    methods: {
      mudarImg(img) {
        fetch(`http://localhost:5000/img/${img}&${sessionStorage.id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json'
          }
        }).then((resp) => {
          if(resp.ok) {
            console.log('img mudada')
            sessionStorage.img = img;
            location.reload()
            this.funcao1();
          }
        }).catch((erro) => {
          console.log(erro);
        })
      }
    }
  }
</script>

<style>
  .fecharImg{
    position: absolute;
    top: 23%; left: 85.5%;
    color: #f1f1f1;
    font-size: 1.5rem;
    cursor: pointer;
  }
  .fecharImg:hover{
    font-size: 2rem;
    top: 22%
  }
  .trocarImg{
    width: 70%;
    height: 45%;
    background-color: #031B4E;
    border: solid 5px #63B1BC;
    border-radius: 10px;
    position: absolute;
    /* top: 20%; left: 15% */
  }
  .textImgs{
    width: 100%;
    text-align: center;
    color: #f1f1f1;
    font-size: 1.2rem;
    /* background-color: green; */
    overflow: auto;
  }
  .displayImgs{
    width: 100%;
    height: 76%;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    /* background-color: pink; */
  }
  .displayImgs img{
    vertical-align: middle;
    border-radius: 50%;
    width: 19%;
    height: 80%;
    /* height: 70%; */
    border: solid 5px #63B1BC;
    cursor: pointer;
  }
</style>