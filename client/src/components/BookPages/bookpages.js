import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getBookWithReviewer } from '../../actions/index';

class BookView extends Component {

    componentDidMount = () => {
        this.props.getBookWithReviewer(this.props.match.params.id)
    }

    render() {
        return (
            <div>BookView</div>
        );
    }
}

const mapStateToProps = ( state ) => {
    console.log(state)
   return {
    books: state.books
   } 
}


export default connect(mapStateToProps, {getBookWithReviewer})(BookView);