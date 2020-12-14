<template>
  <v-row class="justify-center">
    <v-col cols="8">
      <v-card class="mx-auto" max-width="400" color="grey lighten-5" elevation="5">
        <v-row class="justify-center">
          <v-card-title>{{currentUser.username}}</v-card-title>
          <v-col cols="10">
           <v-card-text
          >Token: {{ currentUser.accessToken.substring(0, 20) }} ...
          {{
            currentUser.accessToken.substr(currentUser.accessToken.length - 20)
          }}</v-card-text
        >
        <v-card-text>ID: {{ currentUser.id }}</v-card-text>
        <v-card-text>Email: {{ currentUser.email }}</v-card-text>
        <v-card-text
          >Roles:
          <v-card-text
            v-for="(role, index) in currentUser.roles"
            :key="index"
            >{{ role }}</v-card-text
          ></v-card-text
        >
          </v-col>
        </v-row>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "Profile",
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
  },
  mounted() {
    if (!this.currentUser) {
      this.$router.push("/login");
    }
  },
};
</script>