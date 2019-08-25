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
    getBookById: (state) => (id) => {
      return state.books.filter(book => book.id === id)[0]
    },
    getVolumeById: (state) => (id) => {
      return state.volumes.filter(volume => volume.id === id)[0]
    },
    getEditionById: (state) => (id) => {
      return state.editions.filter(edition => edition.id === id)[0]
    },
    getChapterById: (state) => (id) => {
      return state.chapters.filter(chapter => chapter.id === id)[0]
    },
    getTeachingById: (state) => (id) => {
      return state.teachings.filter(teaching => teaching.id === id)[0]
    },

    getVolumesOfBook: (state) => (id) => {
      return state.volumes.filter(volume => volume.id === id)
    },
    getEditionsOfVolume: (state) => (id) => {
      return state.editions.filter(edition => edition.id === id)
    },
    getChaptersOfEdition: (state) => (id) => {
      return state.chapters.filter(chapter => chapter.id === id)
    },
    getTeachingsOfChapter: (state) => (id) => {
      return state.teachings.filter(teaching => teaching.id === id)
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
