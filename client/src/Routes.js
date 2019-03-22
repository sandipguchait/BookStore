import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from './components/Home/home';
import Layout from './HOC/layout';
import BookView from './components/BookPages/bookpages';
import Login from './components/Admin/Login';

import Auth from './HOC/Auth';


const Routes = () => {
    return (
        <Layout>
            <Switch>
                <Route path="/" exact component={Auth(Home)} />
                <Route path="/books/:id" component={BookView} />
                <Route path="/login" component={Login} />
            </Switch>
        </Layout>
    );
};

export default Routes;