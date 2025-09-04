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

const createBookAPI = (thumbnail, mainText, author, price, quantity, category) => {
    const data = {
        thumbnail: thumbnail,
        mainText: mainText,
        author: author,
        price: price,
        quantity: quantity,
        category: category
    }
    return axios.post('/api/v1/book', data)
}

const updateUserAPI = (id, fullName, phoneNumber, avatar) => {
    const data = {
        _id: id,
        fullName: fullName,
        phone: phoneNumber,
        avatar: avatar
    }
    return axios.put('/api/v1/user', data)
}
const updateBookAPI = (id, thumbnail, mainText, author, price, quantity, category) => {
    const data = {
        _id: id,
        thumbnail: thumbnail,
        mainText: mainText,
        author: author,
        price: price,
        quantity: quantity,
        category: category
    }
    return axios.put('/api/v1/book', data)
}
const deleteUserAPI = (id) => {
    const URL_BACKEND = `/api/v1/user/${id}`;
    return axios.delete(URL_BACKEND);
}
const deleteBookAPI = (id) => {
    const URL_BACKEND = `/api/v1/book/${id}`;
    return axios.delete(URL_BACKEND);
}

const fetchAllUserAPI = (current, pageSize) => {
    return axios.get(`/api/v1/user?current=${current}&pageSize=${pageSize}`);
}

const fetchAllBookAPI = (current, pageSize) => {
    return axios.get(`/api/v1/book?current=${current}&pageSize=${pageSize}`)
}

const handleUploadFile = (file, folder) => {
    const URL_BACKEND = `/api/v1/file/upload`;
    let config = {
        headers: {
            "upload-type": folder,
            "Content-type": "multipart/form-data"
        }
    }
    const bodyFormData = new FormData();
    bodyFormData.append('fileImg', file);
    return axios.post(URL_BACKEND, bodyFormData, config);
}

const registerUserAPI = (fullName, email, password, phone) => {
    const URL_BACKEND = `/api/v1/user/register`;
    const data = {
        fullName: fullName,
        email: email,
        password: password,
        phone: phone
    }
    return axios.post(URL_BACKEND, data);
}
const loginUserAPI = (email, password) => {
    const URL_BACKEND = `/api/v1/auth/login`;
    const data = {
        username: email,
        password: password,
        delay: 2000
    }
    return axios.post(URL_BACKEND, data);
}
const getAccountAPI = () => {
    const URL_BACKEND = `/api/v1/auth/account`;
    return axios.get(URL_BACKEND);
}

const logoutUserAPI = () => {
    const URL_BACKEND = `/api/v1/auth/logout`;
    return axios.post(URL_BACKEND);
}
export {
    createUserAPI,
    updateUserAPI,
    fetchAllUserAPI,
    deleteUserAPI,
    handleUploadFile,
    registerUserAPI,
    loginUserAPI,
    getAccountAPI,
    logoutUserAPI,
    fetchAllBookAPI,
    deleteBookAPI,
    createBookAPI,
    updateBookAPI
}