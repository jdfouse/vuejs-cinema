<template>
  <div id="movie-list">
    <div v-if="filteredMovies.length">
      <movie-item v-for="movie in filteredMovies" v-bind:movie="movie.movie">
        <div class="movie-sessions">
          <div
            v-for="session in filteredSessions(movie.sessions)"
            class="session-time-wrapper tooltip-wrapper"
            v-tooltip="{ seats: session.seats }"
          >
            <div class="session-time" v-on:hover>
              {{ formatSessionTime(session.time) }}
            </div>
          </div>
        </div>
      </movie-item>
    </div>
    <div v-else-if="movies.length">{{ noResults }}</div>
    <div v-else>Loading...</div>
  </div>
</template>
<script>
import times from '../util/times';
import MovieItem from './MovieItem.vue';
export default {
  components: { MovieItem },
  props: ['genre', 'time', 'movies', 'day'],
  methods: {
    moviePassesGenreFilter(movie) {
      if (!this.genre.length) {
        return true;
      } else {
        let movieGenres = movie.movie.Genre.split(', ');
        let matched = true;
        this.genre.forEach((genre) => {
          if (movieGenres.indexOf(genre) === -1) {
            matched = false;
          }
        });
        return matched;
      }
    },
    formatSessionTime(raw) {
      return this.$moment(raw).format('h:mm A');
    },
    filteredSessions(sessions) {
      return sessions.filter(this.sessionPassesTimeFilter);
    },
    sessionPassesTimeFilter(session) {
      // only if the day is the same - filter a given day; if not same day return false.
      if (!this.day.isSame(this.$moment(session.time), 'day')) {
        return false;
      } else if (this.time.length === 0 || this.time.length === 2) {
        return true;
      } else if (this.time[0] === times.AFTER_6PM) {
        return this.$moment(session.time).hour() >= 18;
      } else {
        return this.$moment(session.time).hour() < 18;
      }
    },
  },
  computed: {
    //https://vuejs.org/v2/guide/computed.html
    filteredMovies() {
      return this.movies
        .filter(this.moviePassesGenreFilter)
        .filter((movie) => movie.sessions.find(this.sessionPassesTimeFilter));
    },
    noResults() {
      let times = this.time.join(', ');
      let genres = this.genre.join(', ');
      let seperator = times.length && genres.length ? ',' : '';
      return `No results for ${times}${seperator} ${genres}.`;
    },
  },
};
</script>
