<template>
  <div class="admin">
    <layout>
      <BlogPost :post="post" @on-submit="updatePost" v-if="!loading"/>
    </layout>
  </div>
</template>
<script>
import Layout from "@/components/Layout";
import BlogPost from "@/components/BlogPostForm";
import { mapGetters } from "vuex";
import { required } from "vuelidate/lib/validators";
export default {
  name: "Create",
  components: {
    Layout,
    BlogPost
  },
  data() {
    return {
      loading: true,
      post: {
        title: "",
        body: "",
        description: "",
        tagList: "",
        tag: "",
      },
    };
  },
  beforeMount() {
    console.log("test");
    const slug = this.$router.history.current.params.slug;
    this.$store.dispatch("getArticleBySlug", slug).then((resp) => {
      this.post = { ...this.$store.state.BlogStore.selectedArticle }
      this.loading = false;
    });
  },
  computed: {
    ...mapGetters({
      article: "getArticleBySlug",
      tags: "getTags",
    }),
  },
  methods: {
    updatePost(evt) {
      const {body} = evt;
      const slug = this.$router.history.current.params.slug;
      this.$store
        .dispatch("updateArticle", { body, slug })
        .then(() => {
          this.$bvToast.toast(`<b>Well Done</b> Article updated successfully`, {
            variant: 'success',
            title: 'Error',
            autoHideDelay: 5000,
          })
          this.$router.push("/admin");
        })
        .catch((err) => {
          this.$bvToast.toast(`${err.message}`, {
            variant: 'danger',
            title: 'Error',
            autoHideDelay: 5000,
          })
        });
    },
    validateState(name) {
      const { $dirty, $error } = this.$v.form[name];
      return $dirty ? !$error : null;
    },
  },
  validations: {
    form: {
      title: {
        required,
      },
      body: {
        required,
      },
      description: {
        required,
      },
    },
  },
};
</script>
<style scoped>
.tags {
  border: 1px solid #ced4da;
  text-align: left;
  padding: 1rem;
}
</style>
