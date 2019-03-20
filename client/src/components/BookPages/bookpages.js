import React, { Component } from 'react';
import { connect } from 'react-redux';


class BookView extends Component {

    render() {
        return (
            <div>BookView</div>
        );
    }
}


export default connect()(BookView);