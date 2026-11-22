// models/Book.js
// A schema describes what one book document looks like inside MongoDB.
// A model is the tool we use to create, read, update and delete those documents.

import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  genre: { type: String },
  coverImage: { type: String },
  description: { type: String },
  content: { type: String, required: true },
  // Date.now (without brackets) is run each time a new book is saved
  createdAt: { type: Date, default: Date.now },
});

// "Book" becomes the "books" collection in MongoDB
const Book = mongoose.model("Book", bookSchema);

export default Book;
