import * as requester from "./requester";

export const getAllPets = function (category) {
    const queryString = category ? `?category=${category}` : "";

    try {
        return requester.get(queryString);
    } catch (e) {
        console.log(e.message);
    }
};

export const getPetById = async function (id = "") {
    const queryString = `?id=${id}`;

    try {
        const pet = await requester.get(queryString);
        return pet[0];
    } catch (e) {
        console.log(e.message);
    }
};

export const createPet = function (petObject) {
    try {
        const res = requester.post(petObject);
        return res;
    } catch (e) {
        console.log(`Couldn't add pet - ${e.message}`);
    }
};

export const editPet = function (id, newDescription) {
    try {
        const res = requester.patch(id, { description: newDescription });
        return res;
    } catch (e) {
        console.log(`Couldn't edit pet - ${e.message}`);
    }
};

const updateLikesList = function (id, peopleLiked) {
    return requester.patch(id, { peopleLiked });
};

export const likePet = async function ({ likes, id }, username) {
    try {
        const res = await requester.patch(id, { likes: (Number(likes) + 1).toString() })
        const peopleLiked = res.peopleLiked;
        peopleLiked.push(username);

        updateLikesList(id, peopleLiked);
        return res.likes;
    } catch (e) {
        console.log(`Couldn't like pet - ${e.message}`);
    }
};

export const unpet = async function ({ likes, id }, username) {
    try {
        const res = await requester.patch(id, { likes: (Number(likes) - 1).toString() })
        const peopleLiked = res.peopleLiked;

        const userIndex = peopleLiked.indexOf(username);
        peopleLiked.splice(userIndex, 1);

        updateLikesList(id, peopleLiked);
        return res.likes;
    } catch (e) {
        console.log(`Error: ${e.message}`);
    }
};

export const deletePet = (id) => {
    try {
        const res = requester.remove(id);
        return res;
    } catch (e) {
        console.log(e);
    }
};

export const hasUserLikedPet = (id, username) => {
    return getPetById(id).then((pet) => {
        return pet.peopleLiked.includes(username);
    });
};