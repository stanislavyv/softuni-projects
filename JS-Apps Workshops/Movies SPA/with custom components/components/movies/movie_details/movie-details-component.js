import { html, render } from 'https://unpkg.com/lit-html?module';
import { Router } from 'https://unpkg.com/@vaadin/router';
import authService from '../../../scripts/models/auth.js';
import movieService from '../../../scripts/models/movieService.js';

const template = (ctx) => html`
    <div class="container">
        ${html`<header-component></header-component>`}
        <br>
        <div class="row bg-light text-dark" >
            <h1>Movie title: ${ctx.movieData.title}</h1>
    
            <div class="col-md-8">
                <img class="img-thumbnail" src="${ctx.movieData.imageUrl}" alt="Movie" width="400" height="200">
            </div>
            <div class="col-md-4 text-center">
                <h3 class="my-3 ">Movie Description</h3>
                <p>${ctx.movieData.description}</p>
                ${ctx.movieData.isCreator
                    ? html`
                        <a class="btn btn-danger" href="#" @click=${ctx.delete}>Delete</a>
                        <a class="btn btn-warning" href="/details/${ctx.movieData.movieId}/edit">Edit</a>
                    `
                    : html`
                        ${ctx.movieData.alreadyLiked
                            ?
                                html`<span class="enrolled-span" id="likes">Liked ${ctx.movieData.likes ? ctx.movieData.likes : 0}</span>`
                            :
                                html`<a class="btn btn-primary" href="#" @click=${ctx.like}>Like</a>`
                        }
                    `
                }
            </div>
        </div>
    </div>
`;

export default class MovieDetails extends HTMLElement {
    async connectedCallback() {
        const movieId = this.location.params.key;
        const userData = authService.getUserData();
        const movieData = await movieService.getMovie(userData.id, movieId)

        const isCreator = movieData.creator == userData.email;
        const alreadyLiked = movieData.peopleLiked 
            ? Object.values(movieData.peopleLiked).some(obj => obj.email == userData.email)
            : false;

        Object.assign(movieData, { movieId, isCreator, alreadyLiked });
        this.movieData = movieData;
    
        this.render();
    };

    render() {
        render(template(this), this, { eventContext: this });
    };

    like() {
        const userId = authService.getUserData().id;
        const key = this.movieData.movieId;

        movieService.likeMovie(userId, key)
            .then(res => {
                if (res) { 
                    this.movieData.alreadyLiked = true;
                    this.render();
                }
            });
    };

    delete() {
        const userId = authService.getUserData().id;
        const key = this.movieData.movieId;

        movieService.deleteMovie(userId, key)
            .then(res => {
                if (res) { Router.go('/') };
            });
    }
}