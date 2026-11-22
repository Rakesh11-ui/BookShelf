// Home.jsx - the library page. It loads all books from the backend and shows them as cards.
// The prop showHero decides whether the welcome banner is shown.

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BookCard from "../components/BookCard";

// Address of our Express API
const API_URL = "http://localhost:5001/api/books";

const Home = ({ showHero }) => {
  let navigate = useNavigate();

  // books starts as an empty array and is filled after the fetch finishes
  let [books, setBooks] = useState([]);
  let [loading, setLoading] = useState(true);
  let [error, setError] = useState("");

  // useEffect with [] runs ONCE, when the page first appears
  useEffect(() => {
    // The function given to useEffect cannot be async, so we make an async function inside it
    const getBooks = async () => {
      try {
        let response = await fetch(API_URL);
        let data = await response.json();
        if (response.ok) {
          setBooks(data);
        } else {
          setError(data.message);
        }
      } catch (err) {
        // fetch itself fails when the backend is not running
        setError("Could not reach the server. Is the backend running?");
      }
      setLoading(false);
    };

    getBooks();
  }, []);

  // Called by a BookCard when its Delete button is clicked
  const handleDelete = async (id) => {
    setError("");
    try {
      let response = await fetch(API_URL + "/" + id, { method: "DELETE" });
      if (response.ok) {
        // Keep every book except the one we just deleted, so the card disappears
        let remainingBooks = books.filter((book) => book._id !== id);
        setBooks(remainingBooks);
      } else {
        let data = await response.json();
        setError(data.message);
      }
    } catch (err) {
      setError("Could not reach the server. Is the backend running?");
    }
  };

  return (
    <div>
      {showHero ? (
        <section className="hero">
          <h1>Welcome to BookShelf</h1>
          <p>Browse the shelf, open a book and read it right here in your browser.</p>
        </section>
      ) : null}

      <div className="page">
        <div className="page-header">
          <h2>All Books</h2>
          <button className="btn btn-primary" onClick={() => navigate("/add-book")}>
            Add New Book
          </button>
        </div>

        {loading ? (
          <p className="message">Loading books...</p>
        ) : (
          <div>
            {error ? <p className="message error-message">{error}</p> : null}

            {books.length === 0 ? (
              <p className="message">There are no books yet. Click "Add New Book" to add the first one.</p>
            ) : (
              <div className="book-grid">
                {/* One BookCard for every book. key must be a unique value, so we use _id */}
                {books.map((book) => {
                  return <BookCard key={book._id} book={book} onDelete={handleDelete}></BookCard>;
                })}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
