<template>
  <div class="admin">
    <layout>
      <b-form @submit.prevent="submit">
        <b-row>
          <b-col cols="12" sm="12" md="6">
            <b-form-group
              id="input-group-1"
              label="Title:"
              label-for="input-1"
              class="text-left"
            >
              <b-form-input
                id="input-1"
                v-model="form.title"
                type="text"
                placeholder="Title"
                :state="validateState('title')"
                aria-describedby="input-1-live-feedback"
              ></b-form-input>
              <b-form-invalid-feedback id="input-1-live-feedback">
                required field.
              </b-form-invalid-feedback>
            </b-form-group>
            <b-form-group
              id="input-group-2"
              label="Description:"
              label-for="input-2"
              class="text-left"
            >
              <b-form-input
                id="input-2"
                v-model="form.description"
                type="text"
                placeholder="Description"
                :state="validateState('description')"
                aria-describedby="input-2-live-feedback"
              ></b-form-input>
              <b-form-invalid-feedback id="input-2-live-feedback">
                required field.
              </b-form-invalid-feedback>
            </b-form-group>
            <b-form-group
              id="input-group-3"
              label="Body:"
              label-for="input-3"
              class="text-left"
            >
              <b-form-textarea
                v-model="form.body"
                id="input-3"
                :state="validateState('body')"
                aria-describedby="input-3-live-feedback"
              ></b-form-textarea>
              <b-form-invalid-feedback id="input-3-live-feedback">
                required field.
              </b-form-invalid-feedback>
            </b-form-group>
          </b-col>
          <b-col cols="12" sm="12" md="3">
            <b-form-group
              id="input-group-4"
              label="Tags:"
              label-for="input-4"
              class="text-left"
            >
              <b-form-input
                id="input-4"
                v-model="form.tag"
                type="text"
                placeholder="Enter tags"
                aria-describedby="input-4-live-feedback"
              ></b-form-input>
              <b-form-invalid-feedback id="input-4-live-feedback">
                required field.
              </b-form-invalid-feedback>
            </b-form-group>
            <b-form-group class="tags">
              <b-form-checkbox-group
                v-model="form.tagList"
                :options="tags"
                plain
                stacked
              ></b-form-checkbox-group>
            </b-form-group>
          </b-col>
        </b-row>
        <b-button type="submit" variant="primary" style="float: left"
          >Submit</b-button
        >
      </b-form>
    </layout>
  </div>
</template>
<script>
import Layout from "@/components/Layout";
import { mapGetters } from "vuex";
import { required } from "vuelidate/lib/validators";
export default {
  name: "Create",
  components: {
    Layout,
  },
  data() {
    return {
      form: {
        title: "",
        body: "",
        description: "",
        tagList: "",
        tag: "",
      },
    };
  },
  mounted() {
    const slug = this.$router.history.current.params.slug;
    this.$store.dispatch("getArticleBySlug", slug).then((resp) => {

      this.form.title = this.$store.state.BlogStore.selectedArticle.title;
      this.form.body = this.$store.state.BlogStore.selectedArticle.body;
      this.form.description = this.$store.state.BlogStore.selectedArticle.description;
      this.form.tagList = this.$store.state.BlogStore.selectedArticle.tagList;
    });
    this.$store.dispatch("getTags");
  },
  computed: {
    ...mapGetters({
      article: "getArticleBySlug",
      tags: "getTags",
    }),
  },
  methods: {
    submit(evt) {
      this.$v.form.$touch();
      if (this.$v.form.$anyError) {
        return;
      }
      const body = this.form.body;
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
