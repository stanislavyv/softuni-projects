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
    };

    const updateLikesList = function (id, peopleLiked) {
        return fetch(`${url}/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ peopleLiked })
        })
        .then(res => res.json())
        .catch(console.log);
    }

    const like = async function ({ likes, id }, username) {
        try {
            const res = await fetch(`${url}/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ likes: (Number(likes) + 1).toString() })
            });
            
            const resJson = await res.json();
            const peopleLiked = await resJson.peopleLiked;
            peopleLiked.push(username);
    
            updateLikesList(id, peopleLiked);
            return resJson.likes;
        } catch (e) {
            console.log(e);
        }
    };

    const unpet = async function ({ likes, id }, username) {
        try {
            const res = await fetch(`${url}/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ likes: (Number(likes) - 1).toString() })
            });
            
            const resJson = await res.json();
            const peopleLiked = await resJson.peopleLiked;
    
            const userIndex = peopleLiked.indexOf(username);
            peopleLiked.splice(userIndex, 1);
    
            updateLikesList(id, peopleLiked);
            return resJson.likes;
        } catch (e) {
            console.log(e);
        }
    };

    const deletePet = (id) => {
        return fetch(`${url}/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .catch(console.log);
    };

    const hasUserLikedPet = (id, username) => {
        return getById(id)
              .then(pet => {
                  return pet.peopleLiked.includes(username);
              });
    };

    return { 
        getAll,
        getById,
        create,
        edit,
        like,
        unpet,
        deletePet,
        hasUserLikedPet
    };
};

export default petService();
