import React, { useEffect, useState } from 'react';
import axios from 'axios';

const App = () => {
  const [books, setBooks] = useState([]);
  const [newBook, setNewBook] = useState({ title: '', author: '', published_year: '' });

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await axios.get('http://localhost:5000/books');
      setBooks(response.data);
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  const handleChange = (e) => {
    setNewBook({
      ...newBook,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/books', newBook);
      setNewBook({ title: '', author: '', published_year: '' });
      fetchBooks();
    } catch (error) {
      console.error('Error adding book:', error);
    }
  };

  return (
    <div>
      <h1>Books List</h1>
      <ul>
        {books.map(book => (
          <li key={book.id}>{book.title} by {book.author} ({book.published_year})</li>
        ))}
      </ul>
      <h2>Add a New Book</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          value={newBook.title}
          onChange={handleChange}
          placeholder="Title"
          required
        />
        <input
          type="text"
          name="author"
          value={newBook.author}
          onChange={handleChange}
          placeholder="Author"
          required
        />
        <input
          type="number"
          name="published_year"
          value={newBook.published_year}
          onChange={handleChange}
          placeholder="Published Year"
          required
        />
        <button type="submit">Add Book</button>
      </form>
    </div>
  );
};

export default App;
