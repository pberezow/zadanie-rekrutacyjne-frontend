import axios from 'axios'
import Locale from '../locale'
import { BOOKS_DETAILS_RESOURCE_PATH, BOOKS_IMPORT_RESOURCE_PATH, BOOKS_LIST_RESOURCE_PATH } from './apiPaths'

const baseURL = process.env.REACT_APP_SERVER_BASE_URL
//const baseURL = 'http://localhost:8000/api'

console.log(baseURL)

const getHeaders = () => {
    return {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    }
}

export const api = () => {
  const headers = getHeaders()

  return axios.create({
    baseURL,
    responseType: 'json',
    headers,
    crossdomain: true,
  })
}

export const getBooks = () => {
    return api().get(BOOKS_LIST_RESOURCE_PATH)
        .then(response => response.data).catch(error => {
            console.log(error.data, error.message)
            throw error
        })
}

export const getBooksFromToDate = (from, to) => {
    return api().get(BOOKS_LIST_RESOURCE_PATH.concat('?published_date__from=').concat(from).concat('&published_date__to=').concat(to))
        .then(response => response.data)
}

export const getBookById = (bookId) => {
    return api().get(BOOKS_DETAILS_RESOURCE_PATH.replace('%BOOK_ID%', bookId))
        .then(response => response.data)
}

export const editBookById = (bookId, payload) => {
    return api().put(BOOKS_DETAILS_RESOURCE_PATH.replace('%BOOK_ID%', bookId), payload)
        .then(response => true)
}

export const addBook = (payload) => {
    return api().post(BOOKS_LIST_RESOURCE_PATH, payload)
        .then(response => true)
}

export const importBooks = (query) => {
    return api().get(BOOKS_IMPORT_RESOURCE_PATH.concat('?q=').concat(query))
        .then(response => true)
}

export const handleApiError = (error, setGlobalErrorMessage, language) => {
    setGlobalErrorMessage(Locale.t('message.api_error', {locale: language}))
}

export default {
  api,
}
