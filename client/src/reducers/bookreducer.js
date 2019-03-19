
const INITIAL_STATE = {
    bookList : null
}

export default function( state= INITIAL_STATE, action ){
    switch(action.type){
        case 'GET_BOOKS':
            return { ...state, bookList:action.payload}
        default:
            return state;
    }
}