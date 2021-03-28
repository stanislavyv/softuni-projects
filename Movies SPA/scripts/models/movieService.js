import requester from "./requester.js";
import notificationService from "./notificationService.js";

const movieService = (() => {
    const getAllMovies = async function (userId) {
        const movies = await requester.get(userId);
        return movies;
    };

    const getMovie = async function (userId, movieId) {
        const movie = await requester.get(userId, movieId);
        return movie;
    };

    const addMovie = async function (userId, movieData) {
        if (!movieData.title || !movieData.description || !movieData.imageUrl) {
            notificationService.showError('Please fill in all required fields!');
            return false;
        }

        try {
            requester.post(userId, movieData);
            notificationService.showInfo(`Successfully added ${movieData.title}`);
            return true;
        } catch (e) {
            notificationService.showError(`There was an error while adding the movie - ${e.message}`);
            return false;
        }
    };

    const likeMovie = async function (userId, movieId, currLikes) {
        try {
            const likesBody = { likes: ++currLikes };
            requester.patch(userId, movieId, likesBody);

            const emailBody = { email: localStorage.getItem('email') };
            requester.post(userId, emailBody, `${movieId}/peopleLiked`);
            return true;
        } catch (e) {
            notificationService.showError(`There was an error while trying to like this movie - ${e.message}`);
            return false;
        }
    };

    const editMovie = async function (userId, movieId, movieData) {
        if (!movieData.title || !movieData.description || !movieData.imageUrl) {
            notificationService.showError('Please fill in all required fields!');
            return false;
        }

        try {
            requester.patch(userId, movieId, movieData);
            notificationService.showInfo(`Successfully edited ${movieData.title}`);
            return true;
        } catch (e) {
            notificationService.showError(`There was an error while editing the movie - ${e.message}`);
            return false;
        }
    }

    const deleteMovie = async function (userId, movieId) {
        try {
            requester.remove(userId, movieId)
            return true;
        } catch (e) {
            notificationService.showError(`Coundn\'t delete movie - ${e.message}`);
            return false;
        }
    }

    const searchMovie = async function (userId, movieTitle) {
        if (!movieTitle) {
            return false;
        }
        
        try {
            const allMovies = await getAllMovies(userId);
            const movieKeyValue = Object
                .entries(allMovies)
                .find(([key, value]) => value.title.toLowerCase() == movieTitle.toLowerCase());

            if (movieKeyValue) {
                return movieKeyValue[0];
            } else {
                throw new Error('There are no movies with that title!');
            }
        } catch (e) {
            notificationService.showError(`Couldn't find movie - ${e.message}`);
            return false;
        };
    }

    return {
        getAllMovies,
        getMovie,
        addMovie,
        likeMovie,
        editMovie,
        deleteMovie,
        searchMovie
    };
})();

export default movieService;