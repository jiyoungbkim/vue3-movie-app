import axios from 'axios'

export default {
  // module
  namespaced: true,
  // data
  state: () => ({
    movies: []
  }),
  // computed
  getters: {
    // movieIds(state) {
    //   return state.movies.map(m => m.imdbID)
    // }
  },
  // methods
  // mutations : 변이(관리하는 데이터 변경 권한)
  mutations: {
    updateState(state, payload) {
      // ['movies', 'message', 'loading']
      Object.keys(payload).forEach(key => {
        state[key] = payload[key]
      })
    },
    resetMovies(state) {
      state.movies = []
    }
  },
  // 스토어 데이터 직접 변경 불가능
  // 비동기로 동작
  actions: {
    async searchMovies(context, payload) {
      const {title, type, number, year} = payload
      const OMDB_API_KEY = '7035c60c'
      const res = await axios.get(`https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${title}&type=${type}&y=${year}&page=1`)
      const { Search, totalResults } = res.data
      context.commit('updateState', {
        movies: Search
      })
    }
  }
}