import Axios from "axios";

const state = {
  status: "",
  token: localStorage.getItem("token") || "",
  user: {},
};

const mutations = {
  auth_request(state) {
    state.status = "loading";
  },
  auth_success(state, {token, user}) {
      console.log(user)
    state.status = "success";
    state.token = token;
    state.user = user;
  },
  auth_error(state) {
    state.status = "error";
  },
  logout(state) {
    state.status = "";
    state.token = "";
  },
};

const actions = {
  login({ commit }, user) {
    return new Promise((resolve, reject) => {
      commit("auth_request");
      Axios({
        url: "http://localhost:3000/api/users/login",
        method: "POST",
        data: {
          user,
        },
      })
        .then((resp) => {
          const {
            data: {
              user: { token, email, username },
            },
          } = resp;
          const respUser = {
            email,
            username,
          };
          localStorage.setItem("token", token);
          Axios.defaults.headers.common["Authorization"] = `Token ${token}`;
          commit("auth_success", {token, respUser});
          resolve(resp);
        })
        .catch((err) => {
          commit("auth_error");
          localStorage.removeItem("token");
          reject(err);
        });
    });
  },
  register({ commit }, user) {
    return new Promise((resolve, reject) => {
      commit("auth_request");
      Axios({
        url: "http://localhost:3000/api/users",
        method: "POST",
        data: {
          user,
        },
      })
        .then((resp) => {
          const {
            data: {
              user: { token, email, username },
            },
          } = resp;
          const respUser = {
            email,
            username,
          };
          localStorage.setItem("token", token);
          Axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
          commit("auth_success", {token, respUser});
          resolve(resp);
        })
        .catch((err) => {
          commit("auth_error");
          localStorage.removeItem("token");
          reject(err);
        });
    });
  },
  logout({ commit }) {
    return new Promise((resolve, reject) => {
      commit("logout");
      localStorage.removeItem("token");
      delete axios.defaults.headers.common["Authorization"];
      resolve();
    });
  },
};

const getters = {
  isLoggedIn: (state) => !!state.token,
  authStatus: (state) => state.status,
};

const AuthStore = {
  state,
  mutations,
  actions,
  getters,
};

export default AuthStore;