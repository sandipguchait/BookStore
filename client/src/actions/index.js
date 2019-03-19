import bookAPI from '../API/bookAPI';

export const getBooks = ( limit = 10 , start = 0 , order = 'asc') => async dispatch => {
    const response = await bookAPI.get(`/api/books?limit=${limit}&skip=${start}&order=${order}`);
    dispatch({
        type: 'GET_BOOKS',
        payload: response.data
    })
}