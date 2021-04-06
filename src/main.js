import Vue from 'vue';
import './style.scss';
import VueResource from 'vue-resource';
Vue.use(VueResource);
// Moment.js
import moment from 'moment-timezone';
moment.tz.setDefault("UTC");
Object.defineProperty(Vue.prototype, '$moment', { get() { return this.$root.moment } });
// Vue Event Bus
import { checkFilter, setDay } from './util/bus';
const bus = new Vue();
Object.defineProperty(Vue.prototype, '$bus', { get() { return this.$root.bus } });
// Vue router
import VueRouter from 'vue-router';
import routes from './util/routes';

Vue.use(VueRouter);

const router = new VueRouter({
   routes
});
import { addClass, removeClass } from './util/helpers';

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
    created() {
        this.$http.get('/api').then(response => {
            this.movies = response.data;
        });
        //subscribing to the bus event / listener. 
        // binding checkfilter to this so bus.js has proper context.
        this.$bus.$on('check-filter', checkFilter.bind(this));
        this.$bus.$on('set-day', setDay.bind(this));
    },
    router
});
let mouseOverHandler = function (event) {
    let span = event.target.parentNode.getElementsByTagName('span')[0];
    addClass(span, 'tooltip-show');
}
let mouseOutHandler = function (event) {
    let span = event.target.parentNode.getElementsByTagName('span')[0];
    removeClass(span, 'tooltip-show');
}

Vue.directive('tooltip', {
    bind(el, bindings) {
        console.log(bindings.value.seats);
        let span = document.createElement('span');
        let text = document.createTextNode(`Seats available: ${bindings.value.seats}`);
        span.appendChild(text);
        addClass(span, 'tooltip');
        el.appendChild(span);
        let div = el.getElementsByTagName('DIV')[0];
        div.addEventListener('mouseover', mouseOverHandler);
        div.addEventListener('mouseout', mouseOutHandler);
        div.addEventListener('touchstart', mouseOverHandler);
        div.addEventListener('touchend', mouseOutHandler);
    },
    unbind(el) {
        let div = el.getElementsByTagName('DIV')[0];
        div.removeEventListener('mouseover', mouseOverHandler);
        div.removeEventListener('mouseout', mouseOutHandler);
        div.removeEventListener('touchstart', mouseOverHandler);
        div.removeEventListener('touchend', mouseOutHandler);
    }
}) 
