import { html, render } from 'https://unpkg.com/lit-html?module';

const template = () => html`
    <h1>404 Not Found</h1>
    <br>
    <a href="/" class="btn btn-warning", style="font-size: 1.7em;">Go to homepage</a>
`;

export default class NotFound extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.render();
    };

    render() {
        render(template(), this);
    };
};