<template>
  <div class="container">
    <input
      v-model="title"
      class="form-control"
      type="text" 
      placeholder="Search for Movies, Series & more" 
      @keyup.enter="apply" />
    <div class="selects">
      <select
        v-for="filter in filters"
        v-model="$data[filter.name]"
        :key="filter.name"
        class="form-select">
        <option
          v-if="filter.name === 'year'"
          value="">
          All Years
        </option>
        <option
          v-for="item in filter.items"
          :key="item">
          {{ item }}
        </option>
      </select>
    </div>
    <button
      class="btn btn-primary"
      @click="apply">
      Apply
    </button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title:'',
      type: 'movie',
      number: 10,
      year: '',
      filters: [
        {
          name:'type',
          items: ['movie', 'series', 'episode']
        },
        {
          name: 'number',
          items: [10, 20, 30]
        },
        {
          name: 'year',
          // 즉시 실행 함수 (() => {})()
          items: (()=> {
            const years = []
            const thisYear = new Date().getFullYear()
            for(let i = thisYear; i >= 1985; i-=1){
              years.push(i);
            }
            return years;
          })()
        }
      ]
    }
  },
  // store의 mutations를 실행할 때는 .commit() 메소드를, Actions를 실행할 때는 .dispatch()메소드를 사용
  methods: {
    async apply() {
      // Search movies
      // movie는 index.js 모듈에 작성한 이름
      // store의 movie 모듈에 접근 /dispatch로 searchMovies actions사용
      this.$store.dispatch('movie/searchMovies', {
        // 갱신된 데이터 전달
        title: this.title,
        type: this.type,
        number: this.number,
        year: this.year
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  > * {
    margin-right: 10px;
    font-size: 15px;
    &:last-child {
      margin-right: 0;
    }
  }
  .selects {
    display: flex;
    select {
      width: 120px;
      margin-right: 10px;
      &:last-child {
        margin-right: 0;
      }
    }
  }
  .btn {
    width: 120px;
    height: 50px;
    font-weight: 700;
    flex-shrink: 0;
  }
}
</style>