const requester = (() => {
    const dataBaseUrl = 'https://testapp-449d2-default-rtdb.europe-west1.firebasedatabase.app/Movies';

    const makeRequest = async function (method, userId, endpoint, body) {
        if (!userId) { return false; }

        // That way there won't be an error on GET request
        const request = {
            method,
            headers: {
                'Content-Type': 'application/json'
            }
        };

        if (body) {
            request.body = JSON.stringify(body);
        }

        const res = await fetch(`${dataBaseUrl}/${endpoint}.json`, request);
        const data = await res.json();

        return data;
    }

    const get = async function (userId, endpoint) {
        const path = endpoint ? endpoint : '';
        return await makeRequest('GET', userId, path);
    }
    const post = async function (userId, body, endpoint) {
        const path = endpoint ? endpoint : '';
        return await makeRequest('POST', userId, path, body);
    }
    const update = async function (userId, endpoint, body) {
        return await makeRequest('PUT', userId, endpoint, body);
    }
    const patch = async function (userId, endpoint, body) {
        return await makeRequest('PATCH', userId, endpoint, body);
    }
    const remove = async function (userId, endpoint) {
        return await makeRequest('DELETE', userId, endpoint);
    }

    return {
        get,
        post,
        update,
        patch,
        remove
    };
})()

export default requester;