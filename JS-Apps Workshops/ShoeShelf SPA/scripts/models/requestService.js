const requester = (() => {
    const databaseUrl = `${firebaseConfig.databaseURL}/Shoes`;

    const makeRequest = async function (method, userId, endpoint, body) {
        if (!userId) { return; }

        // prevents error when endpoint isn't passed as an argument
        if (!endpoint) { endpoint = ''; }

        const request = {
            method,
            headers: {
                'Content-Type': 'application/json'
            }
        }

        if (body) { request.body = JSON.stringify(body) };

        const res = await fetch(`${databaseUrl}/${endpoint}.json`, request);
        const data = await res.json();

        return data;
    };

    const get = async function (userId, endpoint) {
        return await makeRequest('GET', userId, endpoint);
    };

    const post = async function (userId, body, endpoint) {
        return await makeRequest('POST', userId, endpoint, body);
    };

    const put = async function (userId, endpoint, body) {
        return await makeRequest('PUT', userId, endpoint, body)  
    };

    const patch = async function (userId, endpoint, body) {
        return await makeRequest('PATCH', userId, endpoint, body);
    };

    const remove = async function (userId, endpoint) {
        return await makeRequest('DELETE', userId, endpoint);
    };

    return {
        get,
        post,
        put,
        patch,
        remove
    };
})();

export default requester;