export default function( state={}, action ){
    switch(action.type){
        case 'LOGIN_USER':
            return { ...state, login: action.payload }
        default:
            return state;
    }
}