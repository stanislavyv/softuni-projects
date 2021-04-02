import authService from "./models/authService.js";
import shoeService from "./models/shoeService.js";

const templateShortcuts = {
    header: '../templates/common/header.hbs',
    footer: '../templates/common/footer.hbs',
    login: '../templates/login/login.hbs',
    register: '../templates/register/register.hbs',
    shoePartial: '../templates/shoes/shoe-partial.hbs',
    homeGuest: '../templates/home/home-guest.hbs',
    homeLoggedIn: '../templates/home/home-logged-in.hbs',
    home: '../templates/home/home.hbs',
    createOffer: '../templates/offers/create_offer/create-offer.hbs',
    editOffer: '../templates/offers/edit_offer/edit-offer.hbs',
    offerDetails: '../templates/offers/offer_details/offer-details.hbs'
};

//TODO: Order shoes in homepage by number of buyers descending...
$(() => {
    const app = Sammy('#root', function () {
        this.use('Handlebars', 'hbs');

        // Home - GET
        this.get('/home', async function () {
            this.userId = localStorage.getItem('userId');
            this.email = localStorage.getItem('email');
            this.loggedIn = !!this.userId;
            this.shoes = await shoeService.getAllShoes(this.userId);

            this.loadPartials({
                header: templateShortcuts.header,
                footer: templateShortcuts.footer,
                homeLoggedIn: templateShortcuts.homeLoggedIn,
                homeGuest: templateShortcuts.homeGuest,
                shoePartial: templateShortcuts.shoePartial
            }).then(function () {
                this.partial(templateShortcuts.home);
            });
        });

        // Register - GET
        this.get('/register', function () {
            this.loadPartials({
                header: templateShortcuts.header,
                footer: templateShortcuts.footer
            }).then(function () {
                this.partial(templateShortcuts.register);
            });
        });

        // Register - POST
        this.post('/register', function (context) {
            authService.register(context.params)
                .then((res) => {
                    if (res) { location.replace('#/home'); }
                    else {
                        authService.clearInput();
                        location.replace('#/register');
                    }
                });
        });

        // Login - GET
        this.get('/login', function () {
            this.loadPartials({
                header: templateShortcuts.header,
                footer: templateShortcuts.footer
            }).then(function () {
                this.partial(templateShortcuts.login);
            });
        });

        // Login - POST
        this.post('/login', function (context) {
            authService.login(context.params)
                .then((res) => {
                    if (res) { location.replace('#/home'); }
                    else {
                        authService.clearInput();
                        location.replace('#/login');
                    }
                });
        });

        // Logout
        this.get('/logout', function () {
            authService.logout()
                .then(location.replace('#/home'));
        });

        // Create - GET
        this.get('/create', function () {
            this.loadPartials({
                header: templateShortcuts.header,
                footer: templateShortcuts.footer
            }).then(function () {
                this.partial(templateShortcuts.createOffer);
            });
        });

        // Create - POST 
        this.post('/create', function (context) {
            const userData = {
                id: localStorage.getItem('userId'),
                email: localStorage.getItem('email')
            };

            const shoeData = context.params;

            shoeService
                .addOffer(userData, shoeData)
                .then((res) => {
                    if (res) { location.replace('#/home'); }
                    else { authService.clearInput(); }
                });
        });

        // Details - GET
        this.get('/details/:id', async function (context) {
            this.offerId = context.params.id;
            const userId = localStorage.getItem('userId');
            const email = localStorage.getItem('email');
            const shoeObj = await shoeService.getShoe(userId, this.offerId);

            this.name = shoeObj.name;
            this.brand = shoeObj.brand;
            this.imageUrl = shoeObj.imageUrl;
            this.description = shoeObj.description;
            this.price = shoeObj.price;

            this.isCreator = shoeObj.creator == email;
            this.numPeopleBought = shoeObj.peopleBought ? Object.keys(shoeObj.peopleBought).length : 0;
            this.alreadyBought = shoeService.hasBought(email, shoeObj);

            this.loadPartials({
                header: templateShortcuts.header,
                footer: templateShortcuts.footer
            }).then(function () {
                this.partial(templateShortcuts.offerDetails);
            });
        });

        // Edit - GET
        this.get('/:id/edit', function (context) {
            this.offerId = context.params.id;

            this.loadPartials({
                header: templateShortcuts.header,
                footer: templateShortcuts.footer
            }).then(function () {
                this.partial(templateShortcuts.editOffer);
            });
        });

        // Edit - POST
        this.post('/:id/edit', function (context) {
            const userId = localStorage.getItem('userId');
            const shoeId = context.params.id;
            const shoeData = {
                name: context.params.name,
                brand: context.params.brand,
                imageUrl: context.params.imageUrl,
                description: context.params.description,
                price: context.params.price
            };

            shoeService.editOffer(userId, shoeId, shoeData)
                .then((res) => {
                    if (res) { location.replace(`#/details/${shoeId}`); }
                    else { authService.clearInput(); }
                });
        });

        // Delete
        this.get('/:id/delete', function (context) {
            const userId = localStorage.getItem('userId');
            const offerId = context.params.id;

            shoeService.deleteOffer(userId, offerId)
                .then(res => {
                    if (res) { location.replace('#/home'); }
                });
        });

        // Buy
        this.get('/:id/buy', function (context) {
            const offerId = context.params.id;
            const userData = {
                id: localStorage.getItem('userId'),
                email: localStorage.getItem('email')
            };

            shoeService.buyOffer(userData, offerId)
                .then(res => {
                    if (res) { location.replace(`#/details/${offerId}`); }
                });
        });

        this.notFound = function () {
            this.swap(`
            <div>
                <h1>
                    404 Not Found
                    <br>
                    <a href="#/home">Go to homepage</a>
                </h1>
            </div>`);
        };
    });
    app.run('#/home');
});