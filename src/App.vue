<template>
  <v-app id="app">
    <v-row>
      <v-col cols="12">
        <Header />
      </v-col>
      <v-col cols="12">
        <v-container class="mt-10">
          <router-view />
        </v-container>
      </v-col>
    </v-row>

    <v-row>

    </v-row>
  </v-app>
</template>

<script>
import Header from "@/components/Header/Header";
export default {
  components: { Header },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
    showAdminBoard() {
      if (this.currentUser && this.currentUser.roles) {
        return this.currentUser.roles.includes("ROLE_ADMIN");
      }

      return false;
    },
    showModeratorBoard() {
      if (this.currentUser && this.currentUser.roles) {
        return this.currentUser.roles.includes("ROLE_MODERATOR");
      }

      return false;
    },
  },
  methods: {
    logOut() {
      this.$store.dispatch("auth/logout");
      this.$router.push("/login");
    },
  },
};
</script>
