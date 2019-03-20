
const INITIAL_STATE = {
    bookList : null
}

export default function( state= INITIAL_STATE, action ){
    switch(action.type){
        case 'GET_BOOKS':
            return { ...state, bookList:action.payload}
        case 'GET_BOOK_WITH_REVIEWER':
            return {
                ...state,
                book: action.payload.book,
                reviewer: action.payload.reviewer
            }
        default:
            return state;
    }
}
