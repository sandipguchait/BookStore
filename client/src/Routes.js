import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from './components/Home/home';
import Layout from './HOC/layout';
import BookView from './components/BookPages/bookpages';


const Routes = () => {
    return (
        <Layout>
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/books/:id" component={BookView} />
            </Switch>
        </Layout>
    );
};

export default Routes;