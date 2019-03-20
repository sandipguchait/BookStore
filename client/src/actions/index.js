import bookAPI from '../API/bookAPI';

export const getBooks = ( limit = 10 , start = 0 , order = 'asc', bookList = '') => async dispatch => {
    
    const request = await bookAPI.get(`/api/books?limit=${limit}&skip=${start}&order=${order}`)
                    .then(response => {
                        if(bookList) {
                            return [ ...bookList, ...response.data]
                        } else {
                            return response.data
                        }
                    })
    dispatch({
        type: 'GET_BOOKS',
        payload: request
    })
}

export const getBookWithReviewer = (id) => async dispatch => {
     
    await bookAPI.get(`/api/book?id=${id}`)
        .then(({ data }) => {
            let book = data;
            
            bookAPI.get(`/api/reviewer?id=${book.ownerId}`)
                .then(({ data })=> {
                    let response = {
                        book,
                        reviewer: data
                    }
                    console.log(response)
                    dispatch({
                        type: 'GET_BOOK_WITH_REVIEWER',
                        payload: response
                    })
                })
        })
         
}

