// SortBooks
import BookShelf from "./BookShelf";
import React from "react";

const BookFilter = ({ books, updateShelf }) => {
  const currentlyReading = books.filter(
    (bookItem) => bookItem.shelf === "currentlyReading"
  );
  const wantToRead = books.filter(
    (bookItem) => bookItem.shelf === "wantToRead"
  );
  const read = books.filter((bookItem) => bookItem.shelf === "read");

  return (
    <div>
      <BookShelf
        title="Currently Reading"
        books={currentlyReading}
        updateShelf={updateShelf}
      />
      <BookShelf
        title="Want To Read"
        books={wantToRead}
        updateShelf={updateShelf}
      />
      <BookShelf title="Read" books={read} updateShelf={updateShelf} />
    </div>
  );
};

export default BookFilter;
