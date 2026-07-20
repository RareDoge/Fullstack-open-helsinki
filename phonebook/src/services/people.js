import axios from 'axios'
const URL = 'api/persons'

const getAll = () => {
    const request = axios.get(URL)
    return request.then(response => response.data)
}

const create = (newNameObj) => {
    const request = axios.post(URL, newNameObj)
    return request.then(response => response.data)
}

const update = (id, updatedPerson) => {
    const request = axios.put(`${URL}/${id}`, updatedPerson)
    return request.then(response => response.data)
}

const remove = (id) => {
    const request = axios.delete(`${URL}/${id}`)
}

export default {getAll, create, update, remove}