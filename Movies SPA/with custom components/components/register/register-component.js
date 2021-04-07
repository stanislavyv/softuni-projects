import { html, render } from 'https://unpkg.com/lit-html?module';
import { Router } from 'https://unpkg.com/@vaadin/router';
import authService from "../../scripts/models/auth.js";

const template = (ctx) => html`
    <form class="text-center border border-light p-5 form-box" id="register-form" @submit=${ctx.onSubmit}>
        ${html`<header-component></header-component>`}
        <div class="form-group">
            <label for="email">Email</label>
            <input type="email" class="form-control" placeholder="Email" name="email" value="">
        </div>
        <div class="form-group">
            <label for="password">Password</label>
            <input type="password" class="form-control" placeholder="Password" name="password" value="">
        </div>
    
        <div class="form-group">
            <label for="repeatPassword">Repeat Password</label>
            <input type="password" class="form-control" placeholder="Repeat-Password" name="repeatPassword" value="">
        </div>
    
        <input class="btn btn-primary" type="submit" value="Register" />
    </form>
`;

export default class Register extends HTMLElement {
    connectedCallback() {
        this.render();
    };

    onSubmit(e) {
        e.preventDefault();

        const formEl = document.querySelector('#register-form');
        const fd = new FormData(formEl);

        const userData = {
            email: fd.get('email'),
            password: fd.get('password'),
            repeatPassword: fd.get('repeatPassword')
        };

        authService
            .register(userData)
            .then(res => {
                if (res) { Router.go('/'); }
            });
    };

    render() {
        render(template(this), this, { eventContext: this });
    };
}