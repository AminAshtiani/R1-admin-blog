import Axios from "axios";

const state = {
  status: "",
  articles: [],
  selectedArticle: {},
  articlesCount: 0,
  tags: []
};

const mutations = {
  create_article_request(state) {
    state.status = 'loading'
  },
  create_article_success(state) {
    state.status = 'success'
  },
  create_article_error(state) {
    state.status = 'error'
  },
  delete_article_request(state) {
    state.status = 'loading'
  },
  delete_article_success(state, payload) {
    state.status = 'success'
    state.articles = state.articles.filter(article => article.slug !== payload.slug)
  },
  delete_article_error(state) {
    state.status = 'error'
  },
  update_article_request(state) {
    state.status = 'loading'
  },
  update_article_success(state) {
    state.status = 'success'
  },
  update_article_error(state) {
    state.status = 'error'
  },
  tags_request(state) {
    state.status = 'loading';
  },
  tags_success(state, payload) {
    state.status = 'success';
    state.tags = payload.tags;
  },
  tags_error(state) {
    state.status = 'error',
    state.tags = []
  },
  article_by_slug_request(state) {
    state.status = "loading"
  },
  article_by_slug_success(state, payload) {
    state.status = "success",
    state.selectedArticle.title = payload.title,
    state.selectedArticle.description = payload.description,
    state.selectedArticle.body = payload.body,
    state.selectedArticle.tagList = payload.tagList
  },
  article_by_slug_error(state) {
    state.status = "error"
  },
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
    state.status = ""
  },
  create_error(state) {
    state.status = "error"
  }
};

const actions = {
  getArticles({ commit }, offset=0) {
    return new Promise((resolve, reject) => {
        commit("articles_request");
        Axios({
            url: `${process.env.VUE_APP_BASE_URL}/articles?offset=${offset}&&limit=5`,
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
  getArticleBySlug({ commit }, slug) {
    return new Promise((resolve, reject) => {
      commit('article_by_slug_request')
      Axios({
        url: `${process.env.VUE_APP_BASE_URL}/articles/${slug}`,
        method: 'GET',
      }).then(res => {
        const { article : { body, description, title, tagList }} = res.data
        commit('article_by_slug_success', { body, description, title, tagList });
        resolve(res)
      }).catch(err => {
        commit('article_by_slug_error');
        reject(err);
      })
    })
  },
  getTags({ commit }) {
    return new Promise((resolve, reject) => {
      commit('tags_request')
      Axios({
        url: `${process.env.VUE_APP_BASE_URL}/tags`,
        method: 'GET',
      }).then(res => {
        const { tags } = res.data
        commit('tags_success', { tags });
        resolve(res)
      }).catch(err => {
        commit('tags_error');
        reject(err);
      })
    })
  },
  createArticle({commit}, {article}) {
    return new Promise((resolve, reject) => {
      commit('create_article_request')
      Axios({
        url: `${process.env.VUE_APP_BASE_URL}/articles/`,
        method: 'POST',
        data: {
          article
        }
      }).then(res => {
        commit('create_article_success');
        resolve(res)
      }).catch(err => {
        commit('create_article_error');
        reject(err);
      })
    })
  },
  updateArticle({commit}, {body, slug}) {
    return new Promise((resolve, reject) => {
      commit('create_article_request')
      Axios({
        url: `${process.env.VUE_APP_BASE_URL}/articles/${slug}`,
        method: 'PUT',
        data: {
          article: {
            body
          }
        }
      }).then(res => {
        commit('create_article_success');
        resolve(res)
      }).catch(err => {
        commit('create_article_error');
        reject(err);
      })
    })
  },
  deleteArticle({commit}, {slug}) {
    return new Promise((resolve, reject) => {
      commit('delete_article_request')
      Axios({
        url: `${process.env.VUE_APP_BASE_URL}/articles/${slug}`,
        method: 'DELETE',
      }).then(res => {
        commit('delete_article_success', { slug });
        resolve(res)
      }).catch(err => {
        commit('delete_article_error');
        reject(err);
      })
    })
  }
};

const getters = {
  getArticles: (state) => state.articles,
  getArticlesCount: (state) => state.articlesCount,
  getArticleBySlug: state => state.selectedArticle,
  getTags: state => state.tags
};

const BlogStore = {
  state,
  mutations,
  actions,
  getters,
};

export default BlogStore;
