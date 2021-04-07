import { html, render } from 'https://unpkg.com/lit-html?module';
import authService from '../../scripts/models/auth.js';

const template = (ctx) => html`
    <div class="jumbotron jumbotron-fluid text-light" style="background-color: #343a40;">
        ${html`<header-component></header-component>`}
        <img src="https://s.studiobinder.com/wp-content/uploads/2019/06/Best-M-Night-Shyamalan-Movies-and-Directing-Style-StudioBinder.jpg"
            class="img-fluid" alt="Responsive image">
        <h1 class="display-4">Movies</h1>
        <p class="lead">Unlimited movies, TV shows, and more. Watch anywhere. Cancel anytime.</p>
    </div>
    
    ${ctx.userData?.loggedIn
        ? html`<movies-component></movies-component>`
        : ''
    }
`;

export default class Home extends HTMLElement {
    connectedCallback() {
        const userData = authService.getUserData();
        this.userData = userData;
        this.render();
    };

    render() {
        render(template(this), this);
    };
}