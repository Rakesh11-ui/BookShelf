// AddBook.jsx - a form that creates a new book (route: /add-book).

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const API_URL = "http://localhost:5001/api/books";

const AddBook = () => {
  let navigate = useNavigate();

  // One state variable for each form field
  let [title, setTitle] = useState("");
  let [author, setAuthor] = useState("");
  let [genre, setGenre] = useState("");
  let [coverImage, setCoverImage] = useState("");
  let [description, setDescription] = useState("");
  let [content, setContent] = useState("");
  let [error, setError] = useState("");

  const handleSubmit = async (e) => {
    // Stop the browser from reloading the page
    e.preventDefault();
    setError("");

    let newBook = { title, author, genre, coverImage, description, content };

    try {
      // POST sends the new book to Express as JSON
      let response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newBook),
      });

      if (response.ok) {
        // Clear the form, then go back to the library
        setTitle("");
        setAuthor("");
        setGenre("");
        setCoverImage("");
        setDescription("");
        setContent("");
        navigate("/");
      } else {
        let data = await response.json();
        setError(data.message);
      }
    } catch (err) {
      setError("Could not reach the server. Is the backend running?");
    }
  };

  return (
    <div className="page">
      <h2>Add a New Book</h2>

      <form className="book-form" onSubmit={handleSubmit}>
        <label htmlFor="title">Book Title</label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        ></input>

        <label htmlFor="author">Author Name</label>
        <input
          id="author"
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          required
        ></input>

        <label htmlFor="genre">Genre</label>
        <input
          id="genre"
          type="text"
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
        ></input>

        <label htmlFor="coverImage">Book Cover Image URL</label>
        <input
          id="coverImage"
          type="text"
          value={coverImage}
          onChange={(e) => setCoverImage(e.target.value)}
        ></input>

        <label htmlFor="description">Short Description</label>
        <textarea
          id="description"
          rows="3"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>

        <label htmlFor="content">Book Content</label>
        <textarea
          id="content"
          rows="14"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        ></textarea>

        {error ? <p className="message error-message">{error}</p> : null}

        <div className="form-buttons">
          <button type="submit" className="btn btn-primary">Save Book</button>
          {/* type="button" so this button does NOT submit the form */}
          <button type="button" className="btn btn-secondary" onClick={() => navigate("/")}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddBook;
