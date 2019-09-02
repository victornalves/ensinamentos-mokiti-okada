import axios from "axios";
import firebase from 'firebase/app';
import 'firebase/firestore';

export default {
  namespaced: true,
  state: {
    books: [],
    volumes: [],
    editions: [],
    chapters: [],
    teachings: [],
    teachings_view: [],
    teaching_tags: [],
    loading: false
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
    getTagsByTeachingId: (state) => (id) => {
      return state.teaching_tags.filter(tag => tag.teaching_id === id)
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
    BOOKS_FETCHED: (state, payload) => {
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
    TEACHINGS_TAGS_FETCHED: (state, payload) => {
      state.teaching_tags = payload
    },
    API_PENDING: (state, payload) => {
      state.loading = true;
    },
    API_COMPLETED: (state, payload) => {
      state.loading = false;
    },
    TEACHINGS_VIEW_CREATED: (state, {payload, getters}) => {

      state.teachings_view = state.teachings.map( teaching => {

        let chapter = getters['getChapterById'](teaching.id_chapter);
        let edition = getters['getEditionById'](chapter.id_edition);
        let volume  = getters['getVolumeById'](edition.id_volume);
        let book    = getters['getBookById'](volume.id_book);
        let tags    = getters['getTagsByTeachingId'](teaching.id);

        return {
          name: teaching.name,
          meta: [
            { key: 'Capítulo', value: chapter.name },
            { key: 'Edição', value: edition.name },
            { key: 'Volume', value: volume.name },
            { key: 'Livro', value: book.name }
          ],
          tags: tags
        }

      })


    },
  },
  actions: {
    loadData: ({ commit, getters }) => {
      commit('API_PENDING');
      axios
        .get(`statics/data/books.json`)
        .then(res => {
          commit('BOOKS_FETCHED', res.data)

          axios.get(`statics/data/volumes.json`)
          .then(res => {
            commit('VOLUMES_FETCHED', res.data)

            axios.get(`statics/data/editions.json`)
            .then(res => {
              commit('EDITIONS_FETCHED', res.data)

                axios.get(`statics/data/chapters.json`)
                .then(res => {
                  commit('CHAPTERS_FETCHED', res.data)

                    axios.get(`statics/data/teachings.json`)
                    .then(res => {
                      commit('TEACHINGS_FETCHED', res.data)

                      let collection = firebase.firestore().collection('tags')
                      collection.get()
                          .then(querySnapshot => {
                            let arr = [];
                            querySnapshot.forEach(tag => {
                              arr.push(tag.data())
                            })
                            commit('TEACHINGS_TAGS_FETCHED', arr)
                            commit('TEACHINGS_VIEW_CREATED', { commit, getters });
                            commit('API_COMPLETED');
                          })
                          .catch(error => console.error(error))

                    })
                })
            })

          })
        })
        .catch(err => { throw (err) })

    },
    loadBooks: ({ commit }) => {
      axios
        .get(`statics/data/books.json`)
        .then(res => { commit('BOOKS_FETCHED', res.data) })
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
    loadTags: ({ commit, getters }) => {

      let collection = firebase.firestore().collection('tags')

      collection.get()
          .then(querySnapshot => {
            let arr = [];
            querySnapshot.forEach(tag => {
              arr.push(tag.data())
            })
            commit('TEACHINGS_TAGS_FETCHED', arr)
          })
          .catch(error => console.error(error))

    },

  }
}
