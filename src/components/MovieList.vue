<template>
  <div id="movie-list">
    <movie-item
      v-for="movie in filteredMovies"
      v-bind:movie="movie"
      class="movie"
    ></movie-item>
  </div>
</template>
<script>
import MovieItem from './MovieItem.vue';
export default {
  components: { MovieItem },
  props: ['genre', 'time', 'movies'],
  methods: {
    moviePassesGenreFilter(movie) {
      if (!this.genre.length) {
        return true;
      } else {
        return this.genre.find((genre) => movie.genre === genre);
      }
    },
  },
  computed: {
    //https://vuejs.org/v2/guide/computed.html
    filteredMovies() {
      return this.movies.filter(this.moviePassesGenreFilter);
    },
  },
};
</script>
