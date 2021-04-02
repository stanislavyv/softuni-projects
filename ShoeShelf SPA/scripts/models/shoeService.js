import requester from "./requestService.js";
import validator from "./validationService.js";

const shoeService = (() => {
    const getAllShoes = async function (userId) {
        return await requester.get(userId);
    };

    const getShoe = async function (userId, shoeId) {
        return await requester.get(userId, shoeId);
    };

    const addOffer = async function (userData, body) {
        if (!validator.shoeData(body)) { return false; }
        body.creator = userData.email;

        return await requester.post(userData.id, body);
    };

    const editOffer = async function (userId, shoeId, body) {
        if (!validator.shoeData(body)) { return false; }

        return await requester.patch(userId, shoeId, body);
    };

    const deleteOffer = async function (userId, shoeId) {
        return await requester.remove(userId, shoeId);
    };

    const buyOffer = async function (userData, shoeId) {
        //NOTE: Using indices as object keys stores the object as an array in firebase
        const shoeObj = await getShoe(userData.id, shoeId);

        if (!shoeObj.peopleBought) { shoeObj.peopleBought = {}; }
        const counter = Object.keys(shoeObj.peopleBought).length;

        shoeObj.peopleBought[counter] = userData.email;

        return await requester.patch(userData.id, shoeId, { peopleBought: shoeObj.peopleBought });
    };

    const hasBought = function (email, shoeObj) {
        if (!shoeObj.peopleBought) { return false; }

        return shoeObj.peopleBought.some(e => e == email);
    };

    return {
        getAllShoes,
        getShoe,
        addOffer,
        editOffer,
        deleteOffer,
        buyOffer,
        hasBought
    };
})();

export default shoeService;