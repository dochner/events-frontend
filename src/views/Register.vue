<template>
  <v-row class="justify-center">
    <v-col cols="8">
      <v-card
        class="mx-auto"
        max-width="400"
        color="grey lighten-5"
        elevation="5"
      >
        <v-row class="justify-center">
          <v-card-title>Register</v-card-title>
          <v-col cols="10">
            <form name="form" @submit.prevent="handleRegister">
              <v-text-field
                label="Username"
                v-model="user.username"
                type="text"
              ></v-text-field>
              <div
                v-if="submitted && errors.has('username')"
                class="alert-danger"
              >
                {{ errors.first("username") }}
              </div>

              <v-text-field
                label="Email"
                v-model="user.email"
                type="text"
              ></v-text-field>
              <div v-if="submitted && errors.has('email')" class="alert-danger">
                {{ errors.first("email") }}
              </div>

              <div>
                <v-text-field
                  label="Senha"
                  v-model="user.password"
                  :type="passwordShow ? 'text' : 'password'"
                  :append-icon="
                    passwordShow ? 'mdi-eye-outline' : 'mdi-eye-off-outline'
                  "
                  @click:append="passwordShow = !passwordShow"
                ></v-text-field>
                <div
                  v-if="errors.has('password')"
                  class="alert alert-danger"
                  role="alert"
                >
                  Password is required!
                </div>
              </div>
              <div
                v-if="submitted && errors.has('password')"
                class="alert-danger"
              >
                {{ errors.first("password") }}
              </div>
              <div v-if="message">
                <v-alert dismissible :color="succesful ? 'error' : 'success'">{{
                  message
                }}</v-alert>
              </div>
            </form>
          </v-col>
          <v-card-actions>
            <v-btn text color="primary" @click="handleRegister()"
              >Registrar</v-btn
            >
          </v-card-actions>
          <v-col cols="12">
            <v-alert class="mb-n3 pb-n3 text-center" color="grey lighten-2"
              ><span
                >Já possui uma conta?
                <router-link to="/login" tag="v-btn">
                <v-btn small text height="10px">Login</v-btn>
                </router-link></span
              ></v-alert
            ></v-col
          >
        </v-row>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import User from "../models/user";

export default {
  name: "Register",
  data() {
    return {
      user: new User("", "", ""),
      submitted: false,
      successful: false,
      message: "",
      passwordShow: false,
    };
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
  },
  mounted() {
    if (this.loggedIn) {
      this.$router.push("/profile");
    }
  },
  methods: {
    handleRegister() {
      this.message = "";
      this.submitted = true;
      this.$validator.validate().then((isValid) => {
        if (isValid) {
          this.$store.dispatch("auth/register", this.user).then(
            (data) => {
              this.message = data.message;
              this.successful = true;
            },
            (error) => {
              this.message =
                (error.response &&
                  error.response.data &&
                  error.response.data.message) ||
                error.message ||
                error.toString();
              this.successful = false;
            }
          );
        }
      });
    },
  },
};
</script>

<style scoped>
label {
  display: block;
  margin-top: 10px;
}

.card-container.card {
  max-width: 350px !important;
  padding: 40px 40px;
}

.card {
  background-color: #f7f7f7;
  padding: 20px 25px 30px;
  margin: 0 auto 25px;
  margin-top: 50px;
  -moz-border-radius: 2px;
  -webkit-border-radius: 2px;
  border-radius: 2px;
  -moz-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
  -webkit-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
}

.profile-img-card {
  width: 96px;
  height: 96px;
  margin: 0 auto 10px;
  display: block;
  -moz-border-radius: 50%;
  -webkit-border-radius: 50%;
  border-radius: 50%;
}
</style>