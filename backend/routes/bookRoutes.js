// routes/bookRoutes.js
// All five CRUD routes for books live here.
// server.js mounts this file at /api/books, so "/" below means /api/books

import express from "express";
import Book from "../models/Book.js";

const router = express.Router();

// GET /api/books  -> READ ALL books (newest first)
router.get("/", async (req, res) => {
  try {
    // "-content" leaves out the long book text, because the library page does not need it
    const books = await Book.find().select("-content").sort({ createdAt: -1 });
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: "Could not get the books" });
  }
});

// GET /api/books/:id  -> READ ONE book (includes the full content)
router.get("/:id", async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    res.json(book);
  } catch (error) {
    // CastError means the id in the URL is not a valid MongoDB id
    if (error.name === "CastError") {
      return res.status(404).json({ message: "Book not found" });
    }
    res.status(500).json({ message: "Could not get the book" });
  }
});

// POST /api/books  -> CREATE a new book
router.post("/", async (req, res) => {
  try {
    // Only take the fields we expect from the request body
    const newBook = new Book({
      title: req.body.title,
      author: req.body.author,
      genre: req.body.genre,
      coverImage: req.body.coverImage,
      description: req.body.description,
      content: req.body.content,
    });
    const savedBook = await newBook.save();
    res.status(201).json(savedBook);
  } catch (error) {
    // ValidationError means a required field (title, author, content) is missing
    if (error.name === "ValidationError") {
      return res.status(400).json({ message: "Title, author and content are required" });
    }
    res.status(500).json({ message: "Could not create the book" });
  }
});

// PUT /api/books/:id  -> UPDATE an existing book
router.put("/:id", async (req, res) => {
  try {
    const updatedBook = await Book.findByIdAndUpdate(
      req.params.id,
      {
        title: req.body.title,
        author: req.body.author,
        genre: req.body.genre,
        coverImage: req.body.coverImage,
        description: req.body.description,
        content: req.body.content,
      },
      // new: true -> give back the updated book, runValidators -> keep the "required" rules
      { new: true, runValidators: true }
    );
    if (!updatedBook) {
      return res.status(404).json({ message: "Book not found" });
    }
    res.json(updatedBook);
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json({ message: "Title, author and content are required" });
    }
    if (error.name === "CastError") {
      return res.status(404).json({ message: "Book not found" });
    }
    res.status(500).json({ message: "Could not update the book" });
  }
});

// DELETE /api/books/:id  -> DELETE a book
router.delete("/:id", async (req, res) => {
  try {
    const deletedBook = await Book.findByIdAndDelete(req.params.id);
    if (!deletedBook) {
      return res.status(404).json({ message: "Book not found" });
    }
    res.json({ message: "Book deleted" });
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(404).json({ message: "Book not found" });
    }
    res.status(500).json({ message: "Could not delete the book" });
  }
});

export default router;
