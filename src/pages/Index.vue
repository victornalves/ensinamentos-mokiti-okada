<template>
  <q-page class="flex flex-center column">

    <h1>Ensinamentos de Mokiti Okada</h1>
    <p>Um guia sobre onde encontrar os ensinamentos de Meishu-Sama</p>

    <q-input outlined v-model="filtro" label="Filtro" />

    <q-list class="q-my-md">
      <q-item v-for="(teaching, index) in getTeachings()" :key="index">
        <q-item-section>
          <q-item-label>{{index+1}} - {{teaching.name}}</q-item-label>
          <q-item-label caption>
            <span v-for="(meta, index) in getMetaOfTeaching(teaching.id)" :key="index">
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
  mounted() {
    this.$store.dispatch("database/loadBooks");
    this.$store.dispatch("database/loadVolumes");
    this.$store.dispatch("database/loadEditions");
    this.$store.dispatch("database/loadChapters");
    this.$store.dispatch("database/loadTeachings");
  },
  computed: {
    ...mapState("database",{ books: state => state.books}),
    ...mapState("database",{ teachings: state => state.teachings}),
  },
  methods: {
    getTeachings(){
      return this.$store.state.database.teachings.filter(t => t.name.toLowerCase().normalize("NFD").includes(this.filtro.toLowerCase().normalize("NFD")))
    },
    getMetaOfTeaching(teaching_id) {
      let teaching = this.$store.getters['database/getTeachingById'](teaching_id);

      let chapter = this.$store.getters['database/getChapterById'](teaching.id_chapter);
      let edition = this.$store.getters['database/getEditionById'](chapter.id_edition);
      let volume  = this.$store.getters['database/getVolumeById'](edition.id_volume);
      let book    = this.$store.getters['database/getBookById'](volume.id_book);

      return [
        { key: 'Livro', value: book.name },
        { key: 'Capítulo', value: chapter.name },
        { key: 'Volume', value: volume.name },
        { key: 'Edição', value: edition.name },
      ]
    },
  }
};
</script>

<style scoped>
  h1 {
    font-size: 2rem;
  }
</style>
