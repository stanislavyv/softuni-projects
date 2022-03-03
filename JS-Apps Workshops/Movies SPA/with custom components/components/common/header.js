import { html, render } from 'https://unpkg.com/lit-html?module';
import { Router } from 'https://unpkg.com/@vaadin/router';
import authService from '../../scripts/models/auth.js';

const template = (ctx) => html`
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark ">
        <a class="navbar-brand text-light" href="/">Movies</a>
        <ul class="navbar-nav ml-auto ">
            ${ctx.userData?.loggedIn
                ? html`
                    <li class="nav-item">
                    <a class="nav-link">Welcome, ${ctx.userData.email}</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#" @click=${ctx.logout}>Logout</a>
                    </li>`
               : html`
                    <li class="nav-item">
                        <a class="nav-link" href="/login">Login</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="/register">Register</a>
                    </li>`
        }
        </ul>
    </nav>
`;

export default class Header extends HTMLElement {
    constructor() {
        super();

        firebase.auth()
            .onAuthStateChanged((user) => {
                if (user) { this.userData = authService.getUserData(); }
                this.render();
            });
    }
    
    connectedCallback() { 
        this.render();
    };

    render() {
        render(template(this), this, { eventContext: this });
    };

    logout() {
        authService.logout();
        this.userData = '';
    };
};