import Axios from "axios";

const state = {
  status: "",
  articles: [],
  articlesCount: 0,
};

const mutations = {
  articles_request(state) {
    state.status = "loading";
  },
  articles_success(state, payload) {
    state.status = ""
    state.articles = [...payload.articles]
    state.articlesCount = payload.articlesCount
  },
  articles_error(state) {
    state.status = "error";
  },
  create_request(state) {
    state.status = "loading";
  },
  create_success(state, payload) {
    console.log(payload)
    state.status = ""
  },
  create_error(state) {
    state.status = "error"
  }
};

const actions = {
  getArticles({ commit }) {
    return new Promise((resolve, reject) => {
        commit("articles_request");
        Axios({
            url: "http://localhost:3000/api/articles",
            method: 'GET',
        }).then(res => {
            const { data: {articles, articlesCount}} = res;
            commit('articles_success', {articles, articlesCount});
            resolve(res)
        }).catch(err => {
            commit('articles_error');
            reject(err)
        })
    })
  },
};

const getters = {
  articles: (state) => state.articles,
  articlesCount: (state) => state.articlesCount
};

const BlogStore = {
  state,
  mutations,
  actions,
  getters,
};

export default BlogStore;
