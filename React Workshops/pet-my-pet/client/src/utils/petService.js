const petService = () => {
    const url = 'http://localhost:5000/pets';
    
    const getAll = function (category) {
        const queryString = category ? `?category=${category}` : '';

        const pets = fetch(`${url}${queryString}`)
                        .then(res => res.json())
                        .catch(e => console.log(e));

        return pets;
    };

    const getById = function (id = '') {
        const queryString = `?id=${id}`;

        const pet = fetch(`${url}${queryString}`)
                        .then(res => res.json())
                        .then(res => res[0])
                        .catch(console.log)

        return pet;
    };

    const create = function (petObject) {
        return fetch(url, {
           method: 'POST',
           headers: {
            'Content-Type': 'application/json'
           },
           body: JSON.stringify(petObject)
        })
        .then(res => res.json())
        .catch(console.log);
    };

    const edit = function (id, newDescription) {
        return fetch(`${url}/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
               },
            body: JSON.stringify({ description: newDescription } )
        })
        .then(res => res.json())
        .catch(console.log);
    }

    return { getAll, getById, create, edit};
};

export default petService();
