// EditBook.jsx - a form that updates an existing book (route: /edit-book/:id).

import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const API_URL = "http://localhost:5001/api/books";

const EditBook = () => {
  let { id } = useParams();
  let navigate = useNavigate();

  let [title, setTitle] = useState("");
  let [author, setAuthor] = useState("");
  let [genre, setGenre] = useState("");
  let [coverImage, setCoverImage] = useState("");
  let [description, setDescription] = useState("");
  let [content, setContent] = useState("");
  let [loading, setLoading] = useState(true);
  let [bookFound, setBookFound] = useState(false);
  let [error, setError] = useState("");

  // Load the current book so the form starts with its existing values
  useEffect(() => {
    const getBook = async () => {
      try {
        let response = await fetch(API_URL + "/" + id);
        let data = await response.json();
        if (response.ok) {
          setTitle(data.title);
          setAuthor(data.author);
          // "|| ''" makes sure an empty field becomes "" and not undefined
          setGenre(data.genre || "");
          setCoverImage(data.coverImage || "");
          setDescription(data.description || "");
          setContent(data.content);
          setBookFound(true);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    let updatedBook = { title, author, genre, coverImage, description, content };

    try {
      // PUT replaces the book's information with the new values
      let response = await fetch(API_URL + "/" + id, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedBook),
      });

      if (response.ok) {
        navigate("/book/" + id);
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
      <h2>Edit Book</h2>

      {loading ? <p className="message">Loading book...</p> : null}
      {error ? <p className="message error-message">{error}</p> : null}

      {/* If the book was not found there is nothing to edit, so only offer a way back */}
      {!loading && !bookFound ? (
        <button className="btn btn-secondary" onClick={() => navigate("/")}>
          Back to Library
        </button>
      ) : null}

      {bookFound ? (
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

          <div className="form-buttons">
            <button type="submit" className="btn btn-primary">Update Book</button>
            <button type="button" className="btn btn-secondary" onClick={() => navigate("/book/" + id)}>
              Cancel
            </button>
          </div>
        </form>
      ) : null}
    </div>
  );
};

export default EditBook;
