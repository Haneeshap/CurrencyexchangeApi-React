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
       <table border="1" cellPadding="8" cellSpacing="0">
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Author</th>
              <th>Year</th> {/* Optional: if you have a year field */}
            </tr>
          </thead>
          <tbody>
            {books.map((book) => (
              <tr key={book.id}>
                <td>{book.id}</td>
                <td>{book.title}</td>
                <td>{book.author}</td>
                <td>{book.year || "-"}</td> {/* Use book.publishedYear if you renamed it */}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Books;