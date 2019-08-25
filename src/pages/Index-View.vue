<template>
  <q-page class="flex justify-start items-center column">

    <h1>Ensinamentos de Mokiti Okada</h1>
    <p>Um guia sobre onde encontrar os ensinamentos de Meishu-Sama</p>

    <q-input outlined v-model="filtro" label="Filtro" />

    <q-list class="q-my-md">
      <q-item v-for="(teaching, index) in getTeachings()" :key="index">
        <q-item-section>
          <q-item-label>{{index+1}} - {{teaching.name}}</q-item-label>
          <q-item-label caption>
            <span v-for="(meta, index) in teaching.meta" :key="index">
              <span><strong>{{meta.key}}:</strong></span> {{meta.value}}
            </span>
          </q-item-label>
        </q-item-section>
      </q-item>

    </q-list>

  </q-page>
</template>

<style>
</style>

<script>
import { mapState } from "vuex";
export default {
  name: "PageIndex",
  data() {
    return {
      filtro: ""
    };
  },
  beforeMount() {
    this.$store.dispatch("database/loadBooks");
    this.$store.dispatch("database/loadVolumes");
    this.$store.dispatch("database/loadEditions");
    this.$store.dispatch("database/loadChapters");
    this.$store.dispatch("database/loadTeachings");
  },
  methods: {
    getTeachings(){
      return this.$store.state.database.teachings_view.filter(t => t.name.toLowerCase().normalize("NFD").includes(this.filtro.toLowerCase().normalize("NFD")))
    }
  }
};
</script>

<style scoped>
  h1 {
    font-size: 2rem;
  }
</style>
