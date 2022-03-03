import { html, render } from 'https://unpkg.com/lit-html?module';
import { Router } from 'https://unpkg.com/@vaadin/router';
import authService from "../../scripts/models/auth.js";

const template = (ctx) => html`
    <form class="text-center border border-light p-5 form-box" id="login-form" @submit=${ctx.onSubmit}>
        ${html`<header-component></header-component>`}
        <div class="form-group">
            <label for="email">Email</label>
            <input type="email" class="form-control" placeholder="Email" name="email" value="">
        </div>
        <div class="form-group">
            <label for="password">Password</label>
            <input type="password" class="form-control" placeholder="Password" name="password" value="">
        </div>
    
        <button type="submit" class="btn btn-primary">Login</button>
    </form>
`;

export default class Login extends HTMLElement {
    connectedCallback() {
        this.render();
    };

    render() {
        render(template(this), this)
    };

    onSubmit(e) {
        e.preventDefault();

        const formEl = document.forms.item('login-form');
        const fd = new FormData(formEl);

        const userData = {
            email: fd.get('email'),
            password: fd.get('password')
        };

        authService
            .login(userData)
            .then(res => {
                if (res) { Router.go('/') }
            });
    };
}