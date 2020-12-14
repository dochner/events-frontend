<template>
  <v-footer
    dark
    padless
  >
    <v-card
      class="flex"
      flat
      tile
    >

      <v-card-text class="py-2 white--text text-center">
        <v-spacer></v-spacer>

        <v-btn
          class="mx-4"
          dark
          icon
          href="https://github.com/dochner"
        >
          <v-icon size="24px">mdi-github</v-icon>
        </v-btn>

        {{ new Date().getFullYear() }} — <strong>Vuetify</strong>

        <v-btn
          class="mx-4"
          dark
          icon
          href="https://facebook.com/douglas.g.ochner"
        >
          <v-icon size="24px">mdi-facebook</v-icon>
        </v-btn>
      </v-card-text>
    </v-card>
  </v-footer>
</template>