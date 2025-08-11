import axios from './axios.customize.js'

// const URL_BACKEND = "http://localhost:8080/api/v1/";

const createUserAPI = (fullName, email, password, phoneNumber) => {
    const data = {
        fullName: fullName,
        email: email,
        password: password,
        phone: phoneNumber
    }
    return axios.post('/api/v1/user', data)
}

const updateUserAPI = (id, fullName, phoneNumber) => {
    const data = {
        _id: id,
        fullName: fullName,
        phone: phoneNumber
    }
    return axios.put('/api/v1/user', data)
}

const deleteUserAPI = (id) => {
    const URL_BACKEND = `/api/v1/user/${id}`;
    return axios.delete(URL_BACKEND);
}

const fetchAllUserAPI = () => {
    return axios.get('/api/v1/user');
}

export {
    createUserAPI,
    updateUserAPI,
    fetchAllUserAPI,
    deleteUserAPI
}