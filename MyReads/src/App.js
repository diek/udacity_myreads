import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import * as BooksAPI from "./BooksAPI";
import "./App.css";
import Book from "./Book";
import BookShelf from "./BookShelf";
import BookFilter from "./BookFilter";

const MyReadsApp = () => {
  const [Books, setBooks] = useState([]);
  const [bookSearch, setBookSearch] = useState([]);
  const [idBooksMap, setIdBooksMap] = useState(new Map());
  const [bookDataBase, setBookDataBase] = useState("");
  const [addBook, setAddBook] = useState([]);

  // Query Database - Funct 1
  useEffect(() => {
    let isFlag = true;
    if (bookDataBase) {
      BooksAPI.search(bookDataBase).then((data) => {
        if (data.error) {
          setBookSearch([]);
        } else {
          if (isFlag) {
            setBookSearch(data);
          }
        }
      });
    }
    return () => {
      isFlag = false;
      setBookSearch([]);
    };
  }, [bookDataBase]);

  // Get Books - Func 2
  useEffect(() => {
    BooksAPI.getAll().then((data) => {
      setBooks(data);
    });
  }, []);

  // Query Books - Func 3
  useEffect(() => {
    const queryBook = bookSearch.map((book) => {
      if (idBooksMap.has(book.id)) {
        return idBooksMap.get(book.id);
      } else {
        return book;
      }
    });
    setAddBook(queryBook);
  }, [bookSearch]);

  //Function 5 - Fix
  const updateShelf = (book, updatedShelf) => {
    const updatedBooks = Books.map((bok) => {
      if (bok.id === book.id) {
        book.shelf = updatedShelf;
        return book;
      }
      return bok;
    });

    if (!idBooksMap.has(book.id)) {
      book.shelf = updatedShelf;
      updatedBooks.push(book);
    }

    setBooks(updatedBooks);
    BooksAPI.update(book, updatedShelf);
  };

  return (
    <div className="app">
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <div className="list-books">
                <div className="list-books-title">
                  <h1>MyReads Derrick</h1>
                </div>
                <div className="list-books-content">
                  <BookShelf books={Books} updateShelf={updateShelf} />
                </div>
                <div className="open-search">
                  <Link to="/search">
                    <button style={{ backgroundColor: "green" }}>
                      insert a book
                    </button>
                  </Link>
                </div>
              </div>
            }
          ></Route>

          <Route
            path="/search"
            element={
              <div className="search-books">
                <div className="search-books-bar">
                  <Link to="/">
                    <button className="close-search">Close</button>
                  </Link>
                  <div className="search-books-input-wrapper">
                    <input
                      type="text"
                      placeholder="Search by title or author"
                      value={bookDataBase}
                      onChange={(e) => setBookDataBase(e.target.value)}
                    />
                  </div>
                </div>
                <div className="search-books-results">
                  <ol className="books-grid">
                    {addBook.map((bok) => (
                      <li key={bok.id}>
                        <Book book={bok} changeShelf={updateShelf} />
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            }
          ></Route>
        </Routes>
      </Router>
    </div>
  );
}; // end MyReadsApp

export default MyReadsApp;
