<template>
  <div class="login">
    <b-container>
      <b-row>
        <b-col md="4" offset-md="4">
          <b-jumbotron style="padding: 2rem 2rem">
            <h1>REGISTER</h1>
            <b-form @submit.prevent="onSubmit">
              <b-form-group
                id="input-group-1"
                label="Username:"
                label-for="input-1"
                class="text-left"
              >
                <b-form-input
                  id="input-1"
                  v-model="form.username"
                  type="text"
                  :state="validateState('username')"
                  placeholder="Enter username"
                  aria-describedby="input-1-live-feedback"
                ></b-form-input>
                <b-form-invalid-feedback id="input-1-live-feedback">
                  required field.
                </b-form-invalid-feedback>
              </b-form-group>
              <b-form-group
                id="input-group-2"
                label="Email:"
                label-for="input-2"
                class="text-left"
              >
                <b-form-input
                  id="input-2"
                  v-model="form.email"
                  type="email"
                  :state="validateState('email')"
                  placeholder="Enter email"
                  aria-describedby="input-2-live-feedback"
                ></b-form-input>
                <b-form-invalid-feedback id="input-2-live-feedback">
                  required field.
                </b-form-invalid-feedback>
              </b-form-group>
              <b-form-group
                id="input-group-3"
                label="Password:"
                label-for="input-3"
                class="text-left"
              >
                <b-form-input
                  id="input-3"
                  v-model="form.password"
                  type="password"
                  :state="validateState('password')"
                  placeholder="Enter password"
                  aria-describedby="input-3-live-feedback"
                ></b-form-input>
                <b-form-invalid-feedback id="input-3-live-feedback">
                  required field.
                </b-form-invalid-feedback>
              </b-form-group>
              <b-button type="submit" variant="primary" style="width: 100%"
                >Submit</b-button
              >
            </b-form>
            <p class="info">
              Already have account?
              <router-link to="/login"><b>Login</b></router-link>
            </p>
          </b-jumbotron>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>
<script>
// @ is an alias to /src
import {
  BRow,
  BCol,
  BContainer,
  BJumbotron,
  BForm,
  BFormInput,
  BFormGroup,
  BButton,
  BFormInvalidFeedback,
  BToast,
} from "bootstrap-vue";
import { required } from "vuelidate/lib/validators";
export default {
  name: "Login",
  components: {
    "b-container": BContainer,
    "b-row": BRow,
    "b-col": BCol,
    "b-jumbotron": BJumbotron,
    "b-form": BForm,
    "b-form-input": BFormInput,
    "b-form-group": BFormGroup,
    "b-button": BButton,
    "b-form-invalid-feedback": BFormInvalidFeedback,
    "b-toast": BToast,
  },
  data() {
    return {
      form: {
        username: "",
        email: "",
        password: "",
      },
    };
  },
  methods: {
    onSubmit(evt) {
      this.$v.form.$touch();
      if (this.$v.form.$anyError) {
        return;
      }
      let data = {
        username: this.form.username,
        email: this.form.email,
        password: this.form.password,
      };
      this.$store
        .dispatch("register", data)
        .then(() => this.$router.push("/"))
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
      email: {
        required,
      },
      password: {
        required,
      },
      username: {
        required,
      },
    },
  },
};
</script>
<style scoped>
.login {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
.info {
  text-align: left;
  margin-top: 1rem;
  margin-bottom: 0;
}
label {
  text-align: left;
}
</style>
