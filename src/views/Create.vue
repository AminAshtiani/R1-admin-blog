<template>
  <div class="admin">
    <layout>
      <BlogPost @on-submit="submit"/>
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
    BlogPost,
  },
  methods: {
    submit(evt) {
      this.$store
        .dispatch("createArticle", { article: evt })
        .then(() => {
          this.$bvToast.toast(`<b>Well Done</b> Article created successfully`, {
            variant: "success",
            autoHideDelay: 5000,
          });
          this.$router.push("/admin");
        })
        .catch((err) => {
          this.$bvToast.toast(`${err.message}`, {
            variant: "danger",
            title: "Error",
            autoHideDelay: 5000,
          });
        });
    },
  }
};
</script>
<style scoped>
.tags {
  border: 1px solid #ced4da;
  text-align: left;
  padding: 1rem;
}
</style>
