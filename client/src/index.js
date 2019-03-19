import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import promiseMiddleware from 'redux-promise';
import reduxThunk from 'redux-thunk';

//component
import Routes from './Routes';
import reducers from './reducers/index';


const Store = applyMiddleware(promiseMiddleware, reduxThunk )(createStore)

ReactDOM.render(
    <Provider store={Store(reducers)}>
        <BrowserRouter>
            <Routes/>
       </BrowserRouter>
    </Provider>,
 document.getElementById('root'));
