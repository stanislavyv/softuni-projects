import { html, render } from 'https://unpkg.com/lit-html?module';
import { Router } from 'https://unpkg.com/@vaadin/router';
import authService from "../../../scripts/models/auth.js";
import movieService from "../../../scripts/models/movieService.js";

const template = (ctx) => html`
    <form class="text-center border border-light p-5" id="edit-form" @submit=${ctx.onSubmit}>
        ${html`<header-component></header-component>`}
        <h1>Edit Movie</h1>
        <div class="form-group">
            <label for="title">Movie Title</label>
            <input type="text" class="form-control" placeholder="Movie Title" value="" name="title">
        </div>
        <div class="form-group">
            <label for="description">Movie Description</label>
            <textarea class="form-control" placeholder="Movie Description..." name="description"></textarea>
        </div>
        <div class="form-group">
            <label for="imageUrl">Image url</label>
            <input type="text" class="form-control" placeholder="Image Url" value="" name="imageUrl">
        </div>
        <button type="submit" class="btn btn-primary">Submit</button>
    </form>
`;

export default class EditMovie extends HTMLElement {
    connectedCallback() {
        this.render();
    };

    onSubmit(e) {
        e.preventDefault();

        const formEl = document.forms.item('edit-form');
        const fd = new FormData(formEl);

        const userId = authService.getUserData().id;
        const movieId = this.location.params.key;
        const movieData = {
            title: fd.get('title'),
            description: fd.get('description'),
            imageUrl: fd.get('imageUrl')
        };

        movieService
            .editMovie(userId, movieId, movieData)
            .then(res => { if (res) { Router.go(`/details/${movieId}`); } });
    };

    render() {
        render(template(this), this, { eventContext: this });
    };
};