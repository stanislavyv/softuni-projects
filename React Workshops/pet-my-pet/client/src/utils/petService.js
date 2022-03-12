const petService = () => {
    const getAll = function (category) {
        const url = 'http://localhost:5000/pets';
        const queryString = category ? `?category=${category}` : '';

        const pets = fetch(`${url}${queryString}`)
                        .then(res => res.json())
                        .catch(e => console.log(e));

        return pets;
    }

    return { getAll };
};

export default petService();
