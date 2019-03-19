import { combineReducers } from 'redux';
import books from './bookreducer';
import user  from './userreducer';


 const rootReducer = combineReducers({
    books,
    user
});

export default rootReducer;
