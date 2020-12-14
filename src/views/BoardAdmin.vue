<template>
  <div class="container">
    <header class="jumbotron">
      <h3>{{content}}</h3>
    </header>
    <EventosTable />
  </div>
</template>

<script>
import UserService from '../service/user.service';
import EventosTable from '@/components/Eventos/EventosTable.vue'

export default {
  components: { EventosTable },
  name: 'Admin',
  data() {
    return {
      content: ''
    };
  },
  mounted() {
    UserService.getAdminBoard().then(
      response => {
        this.content = response.data;
      },
      error => {
        this.content =
          (error.response && error.response.data && error.response.data.message) ||
          error.message ||
          error.toString();
      }
    );
  }
};
</script>
