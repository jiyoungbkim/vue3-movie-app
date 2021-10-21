import axios from "axios";
import _uniqBy from "lodash/uniqBy";

export default {
  // module
  namespaced: true,
  // data
  state: () => ({
    movies: [],
    message: "Search for the movie title!",
    loading: false
  }),
  // computed
  getters: {
    // movieIds(state) {
    //   return state.movies.map(m => m.imdbID)
    // }
  },
  // methods
  // mutations : 변이(관리하는 데이터 변경 권한) : 데이터를 실제로 변경해 줄 수 있는 유일한 부분
  mutations: {
    // 첫번째는 state, 두번째는 api에서 받아와서 갱신할 데이터
    updateState(state, payload) {
      // Object.keys : 객체 데이터의 속성의 이름들만 가지고 새로운 배열 데이터를 만들어준다.
      // 키 이름들 ['movies', 'message', 'loading']
      Object.keys(payload).forEach((key) => {
        // state.movies = payload.movies
        // 동적으로 넣기 위해 점표기법 대신 []사용
        state[key] = payload[key];
      });
    },
    resetMovies(state) {
      state.movies = [];
    },
  },
  // 스토어 데이터 직접 변경 불가능
  // 비동기로 동작
  actions: {
    // 첫번째 매개변수는 context(state, getters, mutations 활용), 
    // 두번째 매개변수는 payload(함수가 실행될 때 인수로 들어온 데이터)
    // {state, commit} = context
    async searchMovies({state, commit}, payload) {
      if(state.loading) return
      
      commit('updateState', {
        message: '',
        loading: true
      })
      try {
        const res = await _fetchMovie({
          ...payload,
          page: 1,
        });
        // omdb api에서 가져온 데이터
        const { Search, totalResults } = res.data;
        commit('updateState', {
          // 갱신 하고자 하는 데이터 속성 이름 movies : 갱신 데이터
          // _uniqBy : 속성명으로 중복 제거
          movies: _uniqBy(Search, "imdbID"),
        });
        console.log(totalResults); // 268 => 27page
        console.log(typeof totalResults); // string

        const total = parseInt(totalResults, 10); // 십진법의 숫자로 변환
        const pageLength = Math.ceil(total / 10); // 반올림

        // 추가 요청!
        if (pageLength > 1) {
          for (let page = 2; page <= pageLength; page += 1) {
            // 검색 옵션 number [10, 20, 30] 개만 요청
            if (page > (payload.number / 10)) break;
            const res = await _fetchMovie({
              ...payload,
              page,
            });
            const { Search } = res.data;
            commit('updateState', {
              movies: [...state.movies, ..._uniqBy(Search, "imdbID")],
            });
          }
        }
      } catch (message) {
        commit('updateState', {
          movies: [],
          message
        });
      } finally {
        commit('updateState', {
          loading: false
        })
      }
    }
  }
};

function _fetchMovie(payload) {
  const { title, type, year, page } = payload;
  const OMDB_API_KEY = "7035c60c";
  const url = `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${title}&type=${type}&y=${year}&page=${page}`;
  // const url = `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}`;

  return new Promise((resolve, reject) => {
    axios
      .get(url)
      .then((res) => {
        // 예외 처리
        if (res.data.Error) {
          reject(res.data.Error);
        }
        resolve(res);
      })
      .catch((err) => {
        reject(err.message);
      });
  });
}
