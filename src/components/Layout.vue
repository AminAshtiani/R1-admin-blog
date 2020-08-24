<template>
  <div class="Layout">
    <b-navbar type="dark" variant="dark">
      <b-navbar-nav class="Header-navlink">
        <b-nav-item href="#">
          <h3>Arvan Challenge</h3>
        </b-nav-item>
        <b-nav-item href="#">Welcome {{ username }}</b-nav-item>
      </b-navbar-nav>
      <b-button variant="outline-info" class="ml-auto" @click="logout">Logout</b-button>
    </b-navbar>
    <b-container fluid class="bv-example-row">
      <b-row class="test">
        <b-col cols="2" class="sidebar">
          <aside>
            <h4>Posts</h4>

            <router-link to="/admin" exact>
              <b-icon class="d-block  d-sm-block d-md-none" icon="list"></b-icon>
              <span class="d-none d-md-block d-lg-block">All Articles</span>
            </router-link>
            <router-link to="/admin/create">
              <b-icon class="d-block d-sm-block d-md-none" icon="plus"></b-icon>
              <span class="d-none d-md-block d-lg-block">Add Articles</span>
            </router-link>
          </aside>
        </b-col>
        <b-col cols="10">
          <main class="LayoutDefault__main">
            <slot />
          </main>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>
<script>
export default {
  data() {
    return {
      username: this.$store.state.AuthStore.user.username,
    };
  },
  methods: {
    logout() {
      this.$store.dispatch("logout").then((res) => {
        this.$router.push("/login");
      });
    },
  },
};
</script>
<style scoped lang="scss">
.Header-navlink {
  display: flex;
  align-items: center;
}
.LayoutDefault__main {
  height: 100%;
  padding: 2rem;
}
.test {
  height: calc(100vh - 73px);
}
.sidebar {
  background: #1c7cd5;
  padding: 0;

  & aside {
    width: 100%;
    display: flex;
    flex-flow: column;
    align-items: flex-start;

    & h4 {
      padding: 10px 20px;
      color: white;
    }

    & a {
      text-decoration: none;
      color: white;
      width: 100%;
      padding: 1rem 2rem;
      text-align: left;

      &.router-link-active {
        background: rgba(86, 192, 224, 0.14);
      }
    }
  }
}
</style>
