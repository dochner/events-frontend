<template>
  <v-app>
    <Header />

    <v-row class="justify-center">
      <v-col class="mt-16">
        <EventosTable />
      </v-col>
    </v-row>

    <Footer />
  </v-app>
</template>

<script>
import EventosTable from "./components/Eventos/EventosTable";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

export default {
  name: "App",

  components: {
    EventosTable,
    Header,
    Footer,
  },

  data: () => ({
    //
  }),
};
</script>
