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
      console.log(totalResults) // 266 => 27
      console.log(typeof totalResults)
    
      const total = parseInt(totalResults, 10)
      const pageLength = Math.ceil(total / 10)

      // 추가 요청!
      if(pageLength > 1) {
        for(let page = 2; page <= pageLength; page += 1) {
          if(page > (number / 10)) break       
          const res = await axios.get(`https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${title}&type=${type}&y=${year}&page=${page}`)
          const { Search } = res.data
          console.log(res.data)
          console.log(Search)
          context.commit('updateState', {
            movies: [...context.state.movies, ...Search]
          })
        }

      }
    }
  }
}