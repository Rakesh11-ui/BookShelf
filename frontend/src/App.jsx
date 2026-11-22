// App.jsx - the main component. It decides which page shows for each URL.

import React from "react";
import { Routes, Route, NavLink } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import BookDetails from "./pages/BookDetails";
import AddBook from "./pages/AddBook";
import EditBook from "./pages/EditBook";

const App = () => {
  return (
    <div className="app">
      <Navbar></Navbar>

      <main className="main">
        <Routes>
          {/* showHero is a prop: "/" shows the welcome banner, "/books" does not */}
          <Route path="/" element={<Home showHero={true}></Home>}></Route>
          <Route path="/books" element={<Home showHero={false}></Home>}></Route>
          {/* :id is a dynamic part of the URL, e.g. /book/65f2... */}
          <Route path="/book/:id" element={<BookDetails></BookDetails>}></Route>
          <Route path="/add-book" element={<AddBook></AddBook>}></Route>
          <Route path="/edit-book/:id" element={<EditBook></EditBook>}></Route>
          {/* "*" matches any URL that no other route matched */}
          <Route
            path="*"
            element={
              <div className="page">
                <p className="message">This page does not exist.</p>
                <NavLink to="/" className="btn btn-primary">Back to Library</NavLink>
              </div>
            }
          ></Route>
        </Routes>
      </main>

      <footer className="footer">
        <p>BookShelf - a online book reading platform
          
        </p>
      </footer>
    </div>
  );
};

export default App;
