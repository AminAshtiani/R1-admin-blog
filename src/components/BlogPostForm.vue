<template>
  <div class="admin">
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
              placeholder="Enter tags(Comma seprated): "
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
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import { required } from "vuelidate/lib/validators";
export default {
  name: "BlogPostForm",
  props: {
    post: {
      type: Object,
    },
  },
  data() {
    return {
      form: {
        title: "",
        body: "",
        description: "",
        tagList: [],
        tag: "",
      },
    };
  },
  created() {
    Object.assign(
      this.form,
      this.post || {
        title: "",
        body: "",
        description: "",
        tagList: [],
        tag: "",
      }
    );
  },
  mounted() {
    this.$store.dispatch("getTags");
  },
  computed: {
    ...mapGetters({
      tags: "getTags",
    }),
  },
  methods: {
    submit() {
      this.$v.form.$touch();
      if (this.$v.form.$anyError) {
        return;
      }
      const newTag = this.form.tag.split(",");
      this.form.tagList = [...this.form.tagList, ...newTag];
      console.log(this.form);
      this.$emit("on-submit", this.form);
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
