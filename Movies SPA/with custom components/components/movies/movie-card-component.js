import { html, render } from 'https://unpkg.com/lit-html?module';

const template = ({ movieData }) => html`
    <div class="card mb-4">
        <img class="card-img-top" src="${movieData.imageUrl}" alt="Card image cap" width="400">
        <div class="card-body">
            <h4 class="card-title">${movieData.title}</h4>
        </div>
        <div class="card-footer">
            <a href="/details/${movieData.key}"><button type="button"
                    class="btn btn-info" >Details</button></a>
        </div>
    </div>
`;

export default class MovieCard extends HTMLElement {
    connectedCallback() {
        this.render();
    };

    render() {
        render(template(this), this, { eventContext: this });
    };
}