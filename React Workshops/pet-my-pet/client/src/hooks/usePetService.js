import useNotificationContext from "./useNotificationContext";
import * as requester from "../utils/requester";

const usePetService = () => {
    const { notifyError, notifyInfo } = useNotificationContext();

    const getAllPets = function (category) {
        const queryString = category ? `?category=${category}` : "";

        try {
            return requester.get(queryString);
        } catch (e) {
            notifyError(e.message);
        }
    };

    const getPetById = async function (id = "") {
        const queryString = `?id=${id}`;

        try {
            const pet = await requester.get(queryString);
            return pet[0];
        } catch (e) {
            notifyError(e.message);
        }
    };

    const createPet = function (petObject) {
        try {
            const res = requester.post(petObject);
            notifyInfo(`Successfully added ${petObject.name}!`);
            return res;
        } catch (e) {
            notifyError(`Couldn't add pet - ${e.message}`);
        }
    };

    const editPet = function (id, newDescription) {
        try {
            const res = requester.patch(id, { description: newDescription });
            notifyInfo(`Successfully edited pet!`)
            return res;
        } catch (e) {
            notifyError(`Couldn't edit pet - ${e.message}`);
        }
    };

    const updateLikesList = function (id, peopleLiked) {
        return requester.patch(id, { peopleLiked });
    };

    const likePet = async function ({ likes, id }, username) {
        try {
            const res = await requester.patch(id, { likes: (Number(likes) + 1).toString() })
            const peopleLiked = res.peopleLiked;
            peopleLiked.push(username);

            updateLikesList(id, peopleLiked);
            return res.likes;
        } catch (e) {
            notifyError(`Couldn't like pet - ${e.message}`);
        }
    };

    const unpet = async function ({ likes, id }, username) {
        try {
            const res = await requester.patch(id, { likes: (Number(likes) - 1).toString() })
            const peopleLiked = res.peopleLiked;

            const userIndex = peopleLiked.indexOf(username);
            peopleLiked.splice(userIndex, 1);

            updateLikesList(id, peopleLiked);
            return res.likes;
        } catch (e) {
            notifyError(`Error: ${e.message}`);
        }
    };

    const deletePet = (id) => {
        try {
            const res = requester.remove(id);
            notifyInfo(`Successfully removed pet!`);
            return res;
        } catch (e) {
            notifyError(`Couldn't delete pet - ${e.message}`);
        }
    };

    const hasUserLikedPet = (id, username) => {
        return getPetById(id).then((pet) => {
            return pet.peopleLiked.includes(username);
        });
    };

    return {
        getAllPets,
        getPetById,
        createPet,
        editPet,
        likePet,
        unpet,
        deletePet,
        hasUserLikedPet,
    };
};

export default usePetService;
