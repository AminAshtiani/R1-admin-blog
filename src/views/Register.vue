<template>
    <div class="login">
        <b-container>
            <b-alert
                v-model="showTop"
                class="position-fixed fixed-top m-0 rounded-0"
                style="z-index: 2000;"
                variant="success"
                @dismissed="showTop=false"
                dismissible
                >
                Fixed position (top) alert!
            </b-alert>
            <b-row>
                <b-col md="4" offset-md="4">
                    <b-jumbotron style="padding: 2rem 2rem">
                        <h1>REGISTER</h1>
                        <b-form @submit.prevent="onSubmit">
                            <b-form-group
                                id="input-group-1"
                                label="Email:"
                                label-for="input-1"
                                class="text-left"
                            >
                                <b-form-input
                                    id="input-1"
                                    v-model="form.username"
                                    type="text"
                                    :state="validateState('username')"
                                    placeholder="Enter email"
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
                            <b-button type="submit" variant="primary" style="width: 100%">Submit</b-button>
                        </b-form>
                        <p>Already have account? <router-link to="/login"><b>Login</b></router-link></p>
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
    BToast
} from 'bootstrap-vue'
import { required } from 'vuelidate/lib/validators';
export default {
    name: 'Login',
    components: {
        'b-container': BContainer,
        'b-row': BRow,
        'b-col': BCol,
        'b-jumbotron': BJumbotron,
        'b-form': BForm,
        'b-form-input': BFormInput,
        'b-form-group': BFormGroup,
        'b-button': BButton,
        'b-form-invalid-feedback': BFormInvalidFeedback,
        'b-toast': BToast
    },
    data() {
        return {
            showTop: false,
            form: {
                username: "",
                email: "",
                password: "",
            }
        }
    },
    methods: {
        onSubmit(evt) {
            this.$v.form.$touch();
            if (this.$v.form.$anyError) {
                return;
            }

            alert("Form submitted!");
            this.showTop = true
        },
        validateState(name) {
            const { $dirty, $error } = this.$v.form[name];
            return $dirty ? !$error : null;
        },
    },
    validations: {
        form: {
            email: {
                required
            },
            password: {
                required
            },
            username: {
                required
            }
        }
    },
}
</script>
<style scoped>
    label {
        text-align: left;
    }
</style>