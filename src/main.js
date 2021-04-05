import Vue from 'vue';
import genres from './util/genres'
import './style.scss';
new Vue({
    el: '#app',
    components: {
        'movie-list': {
            template: `<div id="movie-list">
                            <div v-for="movie in movies" class="movie">
                                {{movie.title}}
                            </div>
                        </div>`,
            data: 
                function() {
                    return {
                     movies: [
                        { title: 'Pulp Fiction' },
                        { title: 'Shawshank' },
                        { title: 'Goodfellas' },
                    ]
                 }
                    
            }
            
        },
        'movie-filter': {
            data() {
                return {
                    //destructured assignment
                    genres
                }
            },
            template: `<div id="movie-filter">
                        <h2>Filter results</h2>
                        <div class="filter-group">
                            <check-filter v-for="genre in genres"></check-filter>
                        </div>
                        <check-filter></check-filter>        
                        </div>`,
            components: {
                'check-filter': {
                    template: `<div>Filter</div>`
                }
            }
        }
    },
})
