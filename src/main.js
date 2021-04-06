import Vue from 'vue';
import './style.scss';
import Overview from './components/Overview.vue';
import VueResource from 'vue-resource';
Vue.use(VueResource);
// Moment.js
import moment from 'moment-timezone';
moment.tz.setDefault("UTC");
Object.defineProperty(Vue.prototype, '$moment', { get() { return this.$root.moment } });
// Vue Event Bus
import { checkFilter } from './util/bus';
const bus = new Vue();
Object.defineProperty(Vue.prototype, '$bus', { get() { return this.$root.bus } });
new Vue({
    el: '#app',
    data: {
        genre: [],
        time: [],
        movies: [],
        moment,
        day: moment(),
        bus
    },
    components: {
        Overview
    },
    created() {
        this.$http.get('/api').then(response => {
            this.movies = response.data;
        });
        //subscribing to the bus event / listener. 
        // binding checkfilter to this so bus.js has proper context.
        this.$bus.$on('check-filter', checkFilter.bind(this));
    }
})
