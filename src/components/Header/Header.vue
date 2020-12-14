 <template>
  <v-app-bar app color="dark lighten-2" dark>
    <div class="d-flex align-center mb-4">
      <v-icon x-large>mdi-home-import-outline</v-icon>
      <span>Controle de Fluxo</span>
    </div>

    <v-spacer></v-spacer>
    <router-link to="/home" tag="v-btn">
      <v-btn text></v-btn>
    </router-link>
    <router-link to="/admin" tag="v-btn">
     <v-btn text  v-if="currentUser">Admin</v-btn>
    </router-link>
    <router-link to="/mod" tag="v-btn">
     <v-btn text  v-if="currentUser">Moderator</v-btn>
    </router-link>
    <router-link v-if="currentUser" to="/user" tag="v-btn">
     <v-btn text>User</v-btn>
    </router-link>
    <router-link to="/register"  tag="v-btn">
     <v-btn text v-if="!currentUser">Register</v-btn>
    </router-link>
    <router-link to="/login"  tag="v-btn">
      <v-btn text v-if="!currentUser">Login</v-btn>
    </router-link>
    <router-link to="/profile" tag="v-btn">
      <v-btn text v-if="currentUser">{{ currentUser.username }}</v-btn>
      </router-link>
    <v-btn text v-if="currentUser" @click.prevent="logOut">Logout</v-btn>

  </v-app-bar>
</template>
<script>
export default {
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
    showAdminBoard() {
      if (this.currentUser && this.currentUser.roles) {
        return this.currentUser.roles.includes('ROLE_ADMIN');
      }

      return false;
    },
    showModeratorBoard() {
      if (this.currentUser && this.currentUser.roles) {
        return this.currentUser.roles.includes('ROLE_MODERATOR');
      }

      return false;
    }
  },
  methods: {
    logOut() {
      this.$store.dispatch('auth/logout');
      this.$router.push('/login');
    }
  }
}
</script>
