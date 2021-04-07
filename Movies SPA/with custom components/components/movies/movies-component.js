import { html, render } from 'https://unpkg.com/lit-html?module';
import { Router } from 'https://unpkg.com/@vaadin/router';
import authService from '../../scripts/models/auth.js';
import movieService from '../../scripts/models/movieService.js';

const template = (ctx) => html`
    <h1 class="text-center">Movies</h1>
    <section>
        <a href="/add-movie" class="btn btn-warning ">Add Movie</a>
        <form class="search float-right" id="search-form" @submit=${ctx.search}>
            <label>Search: </label>
            <input type="text" name="search-title">
            <input type="submit" class="btn btn-info" value="Search">
        </form>
    </section>
    
    <div class=" mt-3 ">
        <div class="row d-flex d-wrap">
            <div class="card-deck d-flex justify-content-center">
                ${ctx.movies 
                    ? ctx.movies.map(m => html`<movie-card-component .movieData=${m}></movie-card-component>`)
                    : html`<h2>No Movies...</h2>`
                }
            </div>
        </div>
    </div>
`;

export default class Movies extends HTMLElement {
    connectedCallback() {
        this.render();
    };

    async render() {
        const userId = authService.getUserData().id;
        let movies = await movieService.getAllMovies(userId);
        movies = Object.keys(movies).map(key => ({...movies[key], ...{ key }}));
        this.movies = movies;
        
        render(template(this), this, { eventContext: this });
    };

    async search(e) {
        e.preventDefault();

        const formEl = document.forms.item('search-form');
        const fd = new FormData(formEl);

        const title = fd.get('search-title');

        const userId = authService.getUserData().id;
        const key = await movieService.searchMovie(userId, title);

        Router.go(`/details/${key}`);
    };
} // <-- bug??