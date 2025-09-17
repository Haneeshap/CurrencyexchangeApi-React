import { useEffect, useState } from "react";

function Books() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/books")
      .then(res => res.json())
      .then(data => setBooks(data))
      .catch(err => {
        console.error("Error fetching books:", err);
        setBooks([]); // fallback
      });
  }, []);

  return (
    <div>
      <h2>Book List</h2>
      {books.length === 0 ? (
        <p>No books available.</p>
      ) : (
        books.map(book => (
          <div key={book.id}>
            <strong>{book.title}</strong> by {book.author}
          </div>
        ))
      )}
    </div>
  );
}

export default Books;