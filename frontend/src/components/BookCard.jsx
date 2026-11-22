// BookCard.jsx - shows ONE book as a card.
// It receives the book and a delete function from its parent (Home) as props.

import React from "react";
import { useNavigate } from "react-router-dom";

const BookCard = ({ book, onDelete }) => {
  let navigate = useNavigate();

  return (
    <div className="book-card">
      {/* Ternary: show the cover image if the book has one, otherwise a grey box */}
      {book.coverImage ? (
        <img className="book-cover" src={book.coverImage} alt={"Cover of " + book.title}></img>
      ) : (
        <div className="book-cover no-cover">No cover</div>
      )}

      <div className="book-info">
        <h3 className="book-title">{book.title}</h3>
        <p className="book-author">by {book.author}</p>
        {book.genre ? <span className="genre-tag">{book.genre}</span> : null}
        <p className="book-description">{book.description}</p>

        <div className="card-buttons">
          <button className="btn btn-primary" onClick={() => navigate("/book/" + book._id)}>
            Read Book
          </button>
          <button className="btn btn-secondary" onClick={() => navigate("/edit-book/" + book._id)}>
            Edit
          </button>
          {/* onDelete is the handleDelete function that lives in Home */}
          <button className="btn btn-danger" onClick={() => onDelete(book._id)}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
