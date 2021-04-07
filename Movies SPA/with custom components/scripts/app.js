import { Router } from 'https://unpkg.com/@vaadin/router';

const root = document.querySelector('#root');
const router = new Router(root);

import Home from "../components/home/home-component.js";
import Header from "../components/common/header.js";
import HeaderForm from "../components/common/header-form.js";
import NotFound from "../components/common/not-found.js";
import Register from "../components/register/register-component.js";
import Login from "../components/login/login-component.js";
import MovieCard from "../components/movies/movie-card-component.js";
import Movies from "../components/movies/movies-component.js";
import MovieDetails from "../components/movies/movie_details/movie-details-component.js";
import AddMovie from "../components/movies/add_movie/add-movie-component.js";
import EditMovie from "../components/movies/edit_movie/edit-movie-component.js";

defineComponents();

router.setRoutes([
    { path: '/', component: 'home-component' },
    { path: '/index.html', redirect: '/' },
    { path: '/register', component: 'register-component' },
    { path: '/login', component: 'login-component' },
    { path: '/add-movie', component: 'add-movie-component' },
    { path: '/details/:key', component: 'movie-details-component' },
    { path: '/details/:key/edit', component: 'edit-movie-component' },
    { path: '(.*)', component: 'not-found-component' }
]);

function defineComponents() {
    customElements.define('home-component', Home);
    customElements.define('header-component', Header);
    customElements.define('header-form-component', HeaderForm);
    customElements.define('not-found-component', NotFound);
    customElements.define('register-component', Register);
    customElements.define('login-component', Login);
    customElements.define('movie-card-component', MovieCard);
    customElements.define('movies-component', Movies);
    customElements.define('movie-details-component', MovieDetails);
    customElements.define('add-movie-component', AddMovie);
    customElements.define('edit-movie-component', EditMovie);
}
