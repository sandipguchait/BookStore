import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getBooks } from '../../actions/index';

import BookItems from '../../WIDGETSUI/bookitem';

class HomeContainer extends Component {

    componentWillMount = () => {
      this.props.getBooks(10,0,'asc')
    }

    renderItems = (books) => {
        return books.bookList ?     
            books.bookList.map(item => (
                <BookItems key={item._id} {...item} />
            ))
        : null
    } 

    render() {
        console.log(this.props.books)
        return (
            <div>
                {this.renderItems(this.props.books)}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        books: state.books
    }
}

export default connect(mapStateToProps,{ getBooks })(HomeContainer);