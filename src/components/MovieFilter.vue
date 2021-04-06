<template>
  <div id="movie-filter">
    <h2>Filter results</h2>
    <h3>By time of day</h3>
    <div class="filter-group">
      <check-filter
        category="time"
        v-for="time in times"
        v-bind:title="time"
        v-on:check-filter="checkFilter"
      ></check-filter>
    </div>
    <h3>By genres</h3>
    <div class="filter-group">
      <check-filter
        category="genre"
        v-for="genre in genres"
        v-bind:title="genre"
        v-on:check-filter="checkFilter"
      ></check-filter>
    </div>
  </div>
</template>
<script>
import genres from '../util/genres';
import times from '../util/times';
import CheckFilter from './CheckFilter.vue';
export default {
  data() {
    return {
      //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment
      genres,
      times,
    };
  },
  methods: {
    checkFilter(category, title, checked) {
      this.$emit('check-filter', category, title, checked);
    },
  },
  components: {
    CheckFilter,
  },
};
</script>
<style lang="sass"></style>
