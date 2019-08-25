import axios from "axios";

export default {
  namespaced: true,
  state: {
    books: [],
    volumes: [],
    editions: [],
    chapters: [],
    teachings: [],
    teachings_view: []
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
    TEACHINGS_VIEW_CREATED: (state, {payload, getters}) => {

      state.teachings_view = state.teachings.map( teaching => {

        let chapter = getters['getChapterById'](teaching.id_chapter);
        let edition = getters['getEditionById'](chapter.id_edition);
        let volume  = getters['getVolumeById'](edition.id_volume);
        let book    = getters['getBookById'](volume.id_book);

        return {
          name: teaching.name,
          meta: [
            { key: 'chapter', value: chapter.name },
            { key: 'edition', value: edition.name },
            { key: 'volume', value: volume.name },
            { key: 'book', value: book.name }
          ]
        }

      })


    },
  },
  actions: {
    loadBooks: ({ commit }) => {
      axios
        .get(`statics/data/books.json`)
        .then(res => { commit('BOOOKS_FETCHED', res.data) })
        .catch(err => { throw (err) })
    },
    loadVolumes: ({ commit }) => {
      axios
        .get(`statics/data/volumes.json`)
        .then(res => { commit('VOLUMES_FETCHED', res.data) })
        .catch(err => { throw (err) })
    },
    loadEditions: ({ commit }) => {
      axios
        .get(`statics/data/editions.json`)
        .then(res => { commit('EDITIONS_FETCHED', res.data) })
        .catch(err => { throw (err) })
    },
    loadChapters: ({ commit }) => {
      axios
        .get(`statics/data/chapters.json`)
        .then(res => { commit('CHAPTERS_FETCHED', res.data) })
        .catch(err => { throw (err) })
    },
    loadTeachings: ({ commit, getters }) => {
      axios
        .get(`statics/data/teachings.json`)
        .then(res => {
          commit('TEACHINGS_FETCHED', res.data);
          commit('TEACHINGS_VIEW_CREATED', { commit, getters});
        })
        .catch(err => { throw (err) })
    },
    createTeachingsView: ({commit}) => {

    }

  }
}
