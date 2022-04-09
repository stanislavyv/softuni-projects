const makeRequest = async function (method, endpoint, body) {
    const dataBaseUrl = 'http://localhost:5000/pets';

    const request = {
        method,
        headers: {
            'Content-Type': 'application/json'
        }
    };

    // That way there won't be an error on GET request
    if (body) {
        request.body = JSON.stringify(body);
    }

    const res = await fetch(`${dataBaseUrl}/${endpoint}`, request);
    const data = res.json();

    return data;
};

export const get = async function (endpoint) {
    const path = endpoint ?? '';
    return makeRequest('GET', path);
};
export const post = async function (body, endpoint) {
    const path = endpoint ?? '';
    return makeRequest('POST', path, body);
};
export const update = async function (endpoint, body) {
    return makeRequest('PUT', endpoint, body);
};
export const patch = async function (endpoint, body) {
    return makeRequest('PATCH', endpoint, body);
};
export const remove = async function (endpoint) {
    return makeRequest('DELETE', endpoint);
};
