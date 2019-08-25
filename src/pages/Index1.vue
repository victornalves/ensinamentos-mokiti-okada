<template>
  <q-page class="flex flex-center">
    <div v-for="(book,index) in books" :key="index">
      <h2>{{book.name}}</h2>

      <div v-for="(volume, index) in getVolumesOfBook(book.id)" :key="index">
        <h3>{{volume.name}}</h3>

        <div v-for="(edition, index) in getEditionsOfVolume(volume.id)" :key="index">
          <h4>{{edition.name}}</h4>

          <div v-for="(chapter, index) in getChaptersOfEdition(edition.id)" :key="index">
            <h5>{{chapter.name}}</h5>

            <div v-for="(teaching, index) in getTeachingsOfChapter(chapter.id)" :key="index">
              <h5>{{teaching.name}}</h5>
            </div>
          </div>

        </div>
      </div>
    </div>
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
    ...mapState("database", {books: state => state.books}),
  },
  methods: {
    getVolumesOfBook(id) {
      return this.$store.getters['database/getVolumesOfBook'](id);
    },
    getEditionsOfVolume(id) {
      return this.$store.getters['database/getEditionsOfVolume'](id);
    },
    getChaptersOfEdition(id) {
      return this.$store.getters['database/getChaptersOfEdition'](id);
    },
    getTeachingsOfChapter(id) {
      return this.$store.getters['database/getTeachingsOfChapter'](id);
    },
  }
};
</script>

