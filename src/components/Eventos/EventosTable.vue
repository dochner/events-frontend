<template>
  <v-row class="justify-center">
    <v-col cols="10">
      <div class="ma-4">
        <v-data-table
          dense
          :items="events"
          :headers="headers"
          :items-per-page="5"
          class="elevation-1"
          :search="search"
        >
          <template v-slot:top>
            <v-toolbar flat>
              <v-toolbar-title>Eventos</v-toolbar-title>
              <v-divider class="mx-4" inset vertical></v-divider>
              <v-spacer></v-spacer>
              <v-dialog v-model="dialog" max-width="500px">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    color="primary"
                    dark
                    class="mb-2"
                    v-bind="attrs"
                    v-on="on"
                  >
                    Novo
                  </v-btn>
                  <v-card-title>
                    <v-text-field
                      v-model="search"
                      append-icon="mdi-magnify"
                      label="Search"
                      single-line
                      hide-details
                    ></v-text-field>
                  </v-card-title>
                </template>
                <v-card>
                  <v-card-title>
                    <span class="headline">{{ formTitle }}</span>
                  </v-card-title>

                  <v-card-text>
                    <v-container>
                      <v-row>
                        <v-col cols="12" class="my-n4">
                          <v-text-field
                            v-model="editedItem.pessoa"
                            label="Pessoa"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" class="my-n4">
                          <v-text-field
                            v-model="editedItem.destino"
                            label="Destino"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="6" class="my-n4">
                          <v-text-field
                            v-model="editedItem.entrance"
                            label="Entrada"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="6" class="my-n4">
                          <v-text-field
                            v-model="editedItem.leave"
                            label="Saida"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" class="my-n4">
                          <v-text-field
                            v-model="editedItem.veiculo"
                            label="Veiculo"
                          ></v-text-field>
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-card-text>

                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="close">
                      Cancel
                    </v-btn>
                    <v-btn color="blue darken-1" text @click="save">
                      Save
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
              <v-dialog v-model="dialogDelete" width="350">
                <v-card color="error" class="error--text lighten-3">
                  <v-card-title class="headLine"
                    >Quer mesmo deletar?</v-card-title
                  >
                  <v-card-text class="error--text darken-2"
                    >Tenha certeza dos seus atos!</v-card-text
                  >
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                      text
                      class="error--text darken-1"
                      @click="closeDelete"
                      >Cancelar</v-btn
                    >
                    <v-btn
                      text
                      class="error--text darken-1"
                      @click="deleteItem()"
                      >OK</v-btn
                    >
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-toolbar>
          </template>
          <template v-slot:[`item.actions`]="{ item }">
            <v-icon small class="mr-2" @click="editItem(item)">
              mdi-pencil
            </v-icon>
            <v-icon small @click="showDeleteDialog(item)"> mdi-delete </v-icon>
          </template>
        </v-data-table>
      </div>
    </v-col>
  </v-row>
</template>

<script>
import EventService from "@/service/EventService";
export default {
  name: "CrudApp",
  data() {
    return {
      search: "",
      events: [],
      event: {
        id: 0,
        pessoa: "",
        destino: "",
        entrance: "",
        leave: "",
        veiculo: "",
      },
      headers: [
        { text: "ID", value: "id" },
        { text: "Pessoa", value: "pessoa" },
        { text: "Destino", value: "destino" },
        { text: "Entrance", value: "entrance" },
        { text: "Leave", value: "leave" },
        { text: "Veiculo", value: "veiculo" },
        { text: "Actions", value: "actions", sortable: false },
      ],
      displayModal: false,
      editedIndex: -1,
      editedItem: {
        id: 0,
        pessoa: "",
        destino: "",
        entrance: "",
        leave: "",
        veiculo: "",
      },
      defaultItem: {
        pessoa: "",
        destino: "",
        entrance: "",
        leave: "",
        veiculo: "",
      },
      itemToDelete: {
        id: 0,
        pessoa: "",
        destino: "",
        entrance: "",
        leave: "",
        veiculo: "",
      },
      dialog: false,
      dialogDelete: false,
    };
  },
  eventService: null,
  created() {
    this.eventService = new EventService();
  },
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "Novo" : "Editar";
    },
  },
  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },
  mounted() {
    this.getAll();
  },
  methods: {
    showSaveModal() {
      this.displayModal = true;
    },
    getAll() {
      this.eventService.getAll().then((data) => {
        this.events = data.data;
      });
    },
    save() {
      this.eventService.save(this.editedItem).then((data) => {
        if (data.status === 200) {
          this.displayModal = false;
          this.editedItem = {
            pessoa: "",
            destino: "",
            entrance: "",
            telefono: "",
          };
          this.close();
          this.getAll();
        }
      });
    },
    closeModal() {
      this.displayModal = false;
    },
    editItem(item) {
      this.editedIndex = this.events.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },
    deleteItem() {
      console.log("deleteItem", this.itemToDelete);
      this.eventService.delete(this.itemToDelete.id);
      this.closeDelete();
      this.getAll();
    },
    showDeleteDialog(item) {
      this.itemToDelete = item;
      this.dialogDelete = !this.dialogDelete;
    },
    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },
    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },
  },
};
</script>

<style>
*::-webkit-scrollbar {
  overflow-x: hidden;
  width: 12px;
}

*::-webkit-scrollbar-track {
  overflow-x: hidden;
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 10px;
}

*::-webkit-scrollbar-thumb {
  overflow-x: hidden;
  border-radius: 10px;
  -webkit-box-shadow: inset 0 0 6px rgba(146, 78, 241, 0.5);
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.5);
}
.theme--light.v-data-table tbody tr:nth-of-type(even) {
  background-color: rgba(0, 0, 0, 0.03);
}
.theme--dark.v-data-table tbody tr:nth-of-type(even) {
  background-color: rgba(0, 0, 0, 0.5);
}
</style>