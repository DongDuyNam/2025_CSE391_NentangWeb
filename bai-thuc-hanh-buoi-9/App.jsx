import React, { useState, useEffect } from 'react';
import BookForm from './components/BookForm';
import BookList from './components/BookList';

function App() {
  const [books, setBooks] = useState([]);
  const [editingBook, setEditingBook] = useState(null);

  useEffect(() => {
    const storedBooks = localStorage.getItem('books');
    if (storedBooks) {
      setBooks(JSON.parse(storedBooks));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('books', JSON.stringify(books));
  }, [books]);

  const handleAddBook = (newBook) => {
    setBooks([...books, newBook]);
  };

  const handleUpdateBook = (updatedBook) => {
    const updatedList = books.map(book =>
      book.id === updatedBook.id ? updatedBook : book
    );
    setBooks(updatedList);
    setEditingBook(null);
  };

  const handleDeleteBook = (id) => {
    if (confirm('Bạn có chắc muốn xóa sách này?')) {
      setBooks(books.filter(book => book.id !== id));
    }
  };

  const handleEditClick = (book) => {
    setEditingBook(book);
  };

  return (
    <div style={{ margin: '20px', fontFamily: 'Arial' }}>
      <h1 style={{ textAlign: 'center' }}>📚 Quản Lý Sách</h1>
      <div style={{
        display: 'flex',
        gap: '20px',
        alignItems: 'flex-start'
      }}>
        <div style={{
          flex: 1,
          background: '#fff',
          padding: '15px',
          borderRadius: '8px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
        }}>
          <BookForm
            onAdd={handleAddBook}
            onUpdate={handleUpdateBook}
            editingBook={editingBook}
          />
        </div>

        <div style={{
          flex: 1,
          background: '#fff',
          padding: '15px',
          borderRadius: '8px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
        }}>
          <BookList
            books={books}
            onEdit={handleEditClick}
            onDelete={handleDeleteBook}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
