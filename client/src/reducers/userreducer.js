export default function( state={}, action ){
    switch(action.type){
        case 'LOGIN_USER':
            return { ...state, login: action.payload }
        case 'USER_AUTH':
            return { ...state, loginCheck: action.payload }
        default:
            return state;
    }
}