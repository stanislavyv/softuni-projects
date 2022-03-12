const petService = () => {
    const url = 'http://localhost:5000/pets';
    
    const getAll = function (category) {
        const queryString = category ? `?category=${category}` : '';

        const pets = fetch(`${url}${queryString}`)
                        .then(res => res.json())
                        .catch(e => console.log(e));

        return pets;
    }

    const getById = function (id = '') {
        const queryString = `?id=${id}`;

        const pet = fetch(`${url}${queryString}`)
                        .then(res => res.json())
                        .then(res => res[0])
                        .catch(console.log)

        return pet;
    }

    return { getAll, getById };
};

export default petService();
