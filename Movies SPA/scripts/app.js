import movieService from "./models/movieService.js";
import authService from "./models/auth.js";

const templateShortcuts = {
    home: '../templates/home/home.hbs',
    header: '../templates/common/header.hbs',
    headerForm: '../templates/common/form-header.hbs',
    footer: '../templates/common/footer.hbs',
    movieCard: '../templates/movies/movie-card.hbs',
    userMovies: '../templates/movies/user-movies.hbs',
    movieDetails: '../templates/movies/movie_details/movie-details.hbs',
    register: '../templates/register/register.hbs',
    login: '../templates/login/login.hbs',
    addMovie: '../templates/movies/add_movie/add-movie.hbs',
    editMovie: '../templates/movies/edit_movie/edit-movie.hbs',
}

$(() => {
    const app = Sammy('#container', function () {
        this.use('Handlebars', 'hbs');

        // Home - GET
        this.get('#/home', async function () {
            this.userId = localStorage.getItem('userId');
            this.email = localStorage.getItem('email');
            this.movies = await movieService.getAllMovies(this.userId);

            this.loadPartials({
                header: templateShortcuts.header,
                footer: templateShortcuts.footer,
                movieCard: templateShortcuts.movieCard,
                userMovies: templateShortcuts.userMovies
            }).then(function () { // What would 'this' be were it an arrow fn??
                this.partial(templateShortcuts.home);
            });
        });

        // Register - GET
        this.get('#/register', function () {
            this.loadPartials({
                header: templateShortcuts.header,
                footer: templateShortcuts.footer,
            }).then(function () {
                this.partial(templateShortcuts.register);
            });
        });

        // Register - POST
        this.post('#/register', function (context) {
            const email = context.params.email;
            const password = context.params.password;
            const repeatPassword = context.params.repeatPassword;

            authService.register({ email, password, repeatPassword })
                .then(res => {  
                    // What is 'this??' What would it be were it a fn expression?
                    if (res) { location.replace('#/home'); }
                });
        });

        // Login - GET 
        this.get('#/login', function () {
            this.loadPartials({
                header: templateShortcuts.header,
                footer: templateShortcuts.footer,
            }).then(function () {
                this.partial(templateShortcuts.login);
            });
        });

        // Login - POST
        this.post('#/login', function (context) {
            const email = context.params.email;
            const password = context.params.password;

            authService.login({ email, password })
                .then(res => {
                    if (res) { location.replace('#/home'); }
                });
        });

        // Logout
        this.get('#/logout', function () {
            authService.logout()
                .then(res => {
                    if (res) { this.redirect('#/home'); }
                });
        });

        // Add Movie - GET
        this.get('#/add-movie', function () {
            this.loadPartials({
                header: templateShortcuts.headerForm,
                footer: templateShortcuts.footer
            })
                .then(function () {
                    this.partial(templateShortcuts.addMovie);
                });
        });

        // Add Movie - POST
        this.post('#/add-movie', function (context) {
            const movieData = {
                title: context.params.title,
                description: context.params.description,
                imageUrl: context.params.imageUrl,
                creator: localStorage.getItem('email'),
                likes: 0
            };

            movieService.addMovie(localStorage.getItem('userId'), movieData)
                .then(res => {
                    if (res) { location.replace('#/home'); }
                });
        });

        // Search - POST
        this.post('#/search', function (context) {
            this.userId = localStorage.getItem('userId');
            this.title = context.params['search-title'];

            movieService.searchMovie(this.userId, this.title)
                .then(res => {
                    if (res) { this.redirect(`#/details/${res}`)}
                });
        });

        // Details - GET
        this.get('#/details/:id', async function (context) {
            this.userId = localStorage.getItem('userId');
            this.movieId = context.params.id;
            this.email = localStorage.getItem('email');

            const movie = await movieService.getMovie(this.userId, this.movieId);
            this.title = movie.title;
            this.description = movie.description;
            this.imageUrl = movie.imageUrl;
            this.likes = movie.likes || 0;
            this.isCreator = movie.creator == this.email;
            this.alreadyLiked = movie.peopleLiked && Object
                .values(movie.peopleLiked)
                .some(obj => obj.email == this.email);

            this.loadPartials({
                header: templateShortcuts.headerForm,
                footer: templateShortcuts.footer
            }).then(function () {
                this.partial(templateShortcuts.movieDetails);
            });
        });

        // Like
        this.get('#/details/:id/like', function (context) {
            this.userId = localStorage.getItem('userId');
            this.movieId = context.params.id;
            this.likes = Number($('#likes')
                .text()
                .slice(6)); // "Liked 0";

            movieService.likeMovie(this.userId, this.movieId, this.likes)
                .then(res => {
                    if (res) { location.replace(`#/details/${this.movieId}`); }
                });
        });

        // Edit - GET
        this.get('#/details/:id/edit', async function (context) {
            this.movieId = context.params.id;

            this.loadPartials({
                header: templateShortcuts.headerForm,
                footer: templateShortcuts.footer
            }).then(function () {
                this.partial(templateShortcuts.editMovie);
            });
        });

        //Edit - POST
        this.post('#/details/:id/edit', function (context) {
            this.userId = localStorage.getItem('userId');
            this.movieId = context.params.id;

            this.movieData = {
                title: context.params.title,
                description: context.params.description,
                imageUrl: context.params.imageUrl
            };

            movieService.editMovie(this.userId, this.movieId, this.movieData)
                .then(res => {
                    if (res) { location.replace(`#/details/${this.movieId}`) };
                });
        });

        // Delete
        this.get('#/details/:id/delete', function (context) {
            this.userId = localStorage.getItem('userId');
            this.movieId = context.params.id;

            movieService.deleteMovie(this.userId, this.movieId)
                .then(res => {
                    if (res) { location.replace('#/home'); }
                });
        });

        this.notFound = function () {
            this.swap(`<h1>404 Not Found</h1>
            <br>
            <a href="#/home" class="btn btn-warning" style="font-size: 1.7em;">Go to homepage`);
        };
    });

    app.run('#/home');
})