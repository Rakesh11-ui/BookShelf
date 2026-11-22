// BookDetails.jsx - the reading page for ONE book (route: /book/:id).

import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const API_URL = "http://localhost:5001/api/books";

const BookDetails = () => {
  // useParams gives us the :id from the URL, e.g. /book/123 -> id is "123"
  let { id } = useParams();
  let navigate = useNavigate();

  let [book, setBook] = useState(null); // null means "not loaded yet"
  let [loading, setLoading] = useState(true);
  let [error, setError] = useState("");

  // Runs when the page opens, and again if the id in the URL changes
  useEffect(() => {
    const getBook = async () => {
      try {
        let response = await fetch(API_URL + "/" + id);
        let data = await response.json();
        if (response.ok) {
          setBook(data);
        } else {
          setError(data.message);
        }
      } catch (err) {
        setError("Could not reach the server. Is the backend running?");
      }
      setLoading(false);
    };

    getBook();
  }, [id]);

  return (
    <div className="page">
      <div className="page-header">
        <button className="btn btn-secondary" onClick={() => navigate("/")}>
          Back to Library
        </button>
        {book ? (
          <button className="btn btn-primary" onClick={() => navigate("/edit-book/" + book._id)}>
            Edit Book
          </button>
        ) : null}
      </div>

      {loading ? <p className="message">Loading book...</p> : null}
      {error ? <p className="message error-message">{error}</p> : null}

      {book ? (
        <article className="reader">
          <div className="reader-top">
            {book.coverImage ? (
              <img className="reader-cover" src={book.coverImage} alt={"Cover of " + book.title}></img>
            ) : null}
            <div>
              <h1 className="reader-title">{book.title}</h1>
              <p className="book-author">by {book.author}</p>
              {book.genre ? <span className="genre-tag">{book.genre}</span> : null}
            </div>
          </div>

          {/* The content is shown as it was typed. CSS keeps the line breaks. */}
          <div className="reader-content">{book.content}</div>
        </article>
      ) : null}
    </div>
  );
};

export default BookDetails;
