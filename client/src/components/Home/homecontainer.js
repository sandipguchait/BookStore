import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getBooks } from '../../actions/index';

import BookItems from '../../WIDGETSUI/bookitem';

class HomeContainer extends Component {

    componentWillMount = () => {
      this.props.getBooks(2,0,'asc')
    }

    renderItems = (books) => {
        return books.bookList ?     
            books.bookList.map(item => (
                <BookItems key={item._id} {...item} />
            ))
        : null
    } 

    loadmore = () => {
        let count = this.props.books.bookList.length;
        this.props.getBooks(2, count,'asc', this.props.books.bookList )
    }

    render() {
        return (
            <div>
                {this.renderItems(this.props.books)}
                <div className="loadmore" onClick={this.loadmore}>
                    Load More
                </div>
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