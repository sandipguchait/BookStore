import React from 'react';
import { Link } from 'react-router-dom';


const BookItems = (item) => {
    return (
        <Link to={`/books/${item._id}`} className="book_item">
            <div className="book_header">
                <h2>{item.name}</h2>
            </div>
        </Link>
    );
};

export default BookItems;