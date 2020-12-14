<template>
  <v-row class="justify-center">
    <v-col cols="8">
      <v-card class="mx-auto" max-width="400" color="grey lighten-5" elevation="5">
        <v-row class="justify-center">
          <v-card-title>Login</v-card-title>
          <v-col cols="10">
            <form name="form" @submit.prevent="handleLogin">
              <div class="form-group">
                <v-text-field
                  label="Usuario"
                  v-model="user.username"
                  v-validate="'required'"
                  class="form-control"
                  name="username"
                ></v-text-field>
                <div
                  v-if="errors.has('username')"
                  class="alert alert-danger"
                  role="alert"
                >
                  Username is required!
                </div>
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
              <div>
                <span
                  v-show="loading"
                  class="spinner-border spinner-border-sm"
                ></span>
              </div>
              <div class="form-group">
                <div v-if="message" class="alert alert-danger" role="alert">
                  {{ message }}
                </div>
              </div>
            </form>
          </v-col>
          <v-card-actions>
            <v-btn text color="primary" @click="handleLogin()">LOGIN</v-btn>
          </v-card-actions>
        </v-row>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import User from "../models/user";

export default {
  name: "Login",
  data() {
    return {
      user: new User("", ""),
      loading: false,
      message: "",
      passwordShow: false,
    };
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
  },
  created() {
    if (this.loggedIn) {
      this.$router.push("/profile");
    }
  },
  methods: {
    handleLogin() {
      this.loading = true;
      this.$validator.validateAll().then((isValid) => {
        if (!isValid) {
          this.loading = false;
          return;
        }

        if (this.user.username && this.user.password) {
          this.$store.dispatch("auth/login", this.user).then(
            () => {
              this.$router.push("/profile");
            },
            (error) => {
              this.loading = false;
              this.message =
                (error.response &&
                  error.response.data &&
                  error.response.data.message) ||
                error.message ||
                error.toString();
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