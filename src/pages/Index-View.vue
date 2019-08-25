<template>
  <q-page class="flex justify-start items-center column">

    <h1>Ensinamentos de Mokiti Okada</h1>
    <p>Um guia sobre onde encontrar os ensinamentos de Meishu-Sama</p>
    <p>Digite abaixo um trecho do nome e veja onde foi publicado</p>

    <q-input outlined v-model="filtro" label="Busca" />

    <q-list class="q-my-md" v-if="getTeachings().length">
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
    <div class="q-my-md" v-else>Não há ensinamentos com a busca <strong>{{filtro}}</strong></div>

    <div class="q-my-md text-center"><em>Esse aplicativo foi desenvolvido pela comunidade messiânica.
      <BR/>Contribua em <a href="https://github.com/victornalves/ensinamentos-mokiti-okada" target="_blank">https://github.com/victornalves/ensinamentos-mokiti-okada</a>
      <BR/>Ideias de melhorias ou de outros aplicativos? Envie uma mensagem para <a href="mailto:victor@w16.com.br" target="_blank">victor@w16.com.br</a>
    </em></div>

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
      filtro: "",
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
