import { html, render } from 'https://unpkg.com/lit-html?module';

const template = () => html`
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark ">
        <a class="navbar-brand text-light" href="/">Home</a>
    </nav>
`;

export default class HeaderForm extends HTMLElement {
    connectedCallback() {
        this.render();
    };

    render() {
        render(template(), this);
    };
}