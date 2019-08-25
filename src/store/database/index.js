import axios from "axios";

export default {
  namespaced: true,
  state: {
    books: [],
    volumes: [],
    editions: [],
    chapters: [],
    teachings: []
  },
  getters: {
    getVolumesOfBook: (state) => (id_book) => {
      return state.volumes.filter(volume => volume.id_book === id_book)
    },
    getEditionsOfVolume: (state) => (id_volume) => {
      return state.editions.filter(edition => edition.id_volume === id_volume)
    },
    getChaptersOfEdition: (state) => (id_edition) => {
      return state.chapters.filter(chapter => chapter.id_edition === id_edition)
    },
    getTeachingsOfChapter: (state) => (id_chapter) => {
      return state.teachings.filter(teaching => teaching.id_chapter === id_chapter)
    },
  },
  mutations: {
    BOOOKS_FETCHED: (state, payload) => {
      state.books = payload
    },
    VOLUMES_FETCHED: (state, payload) => {
      state.volumes = payload
    },
    EDITIONS_FETCHED: (state, payload) => {
      state.editions = payload
    },
    CHAPTERS_FETCHED: (state, payload) => {
      state.chapters = payload
    },
    TEACHINGS_FETCHED: (state, payload) => {
      state.teachings = payload
    },
  },
  actions: {
    loadBooks: ({ commit }) => {
      axios
        .get(`data/books.json`)
        .then(res => { commit('BOOOKS_FETCHED', res.data) })
        .catch(err => { throw (err) })
    },
    loadVolumes: ({ commit }) => {
      axios
        .get(`data/volumes.json`)
        .then(res => { commit('VOLUMES_FETCHED', res.data) })
        .catch(err => { throw (err) })
    },
    loadEditions: ({ commit }) => {
      axios
        .get(`data/editions.json`)
        .then(res => { commit('EDITIONS_FETCHED', res.data) })
        .catch(err => { throw (err) })
    },
    loadChapters: ({ commit }) => {
      axios
        .get(`data/chapters.json`)
        .then(res => { commit('CHAPTERS_FETCHED', res.data) })
        .catch(err => { throw (err) })
    },
    loadTeachings: ({ commit }) => {
      axios
        .get(`data/teachings.json`)
        .then(res => { commit('TEACHINGS_FETCHED', res.data) })
        .catch(err => { throw (err) })
    }

  }
}
