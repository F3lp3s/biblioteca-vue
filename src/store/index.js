import { createStore } from "vuex";

export default createStore({
  state: {
    darkMode: true,
    qtdLivros: 0
  },
  getters: {

  },
  mutations: {
    changMode(state) {
      state.darkMode = !state.darkMode
    },
    qtdLivros(state, qtdLivros) {
      console.log(qtdLivros)
      state.qtdLivros = qtdLivros;
    }
  },
  actions: {
    qtdLivros({ commit }) {
      fetch(`http://localhost:5000/devolucao/${sessionStorage.id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'applicarion/json'
        }
      }).then((resp) => {
        if(resp.ok) {
            resp.json().then(json => {
              commit('qtdLivros', json.length);
            })
        }
      }).catch((err) => {
        console.log(err);
      })
    }

  },
  modules: {

  }
})