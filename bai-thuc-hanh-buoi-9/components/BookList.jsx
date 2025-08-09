import React from 'react';

function BookList({ books, onEdit, onDelete }) {
  if (books.length === 0) {
    return <p>📭 Chưa có sách nào.</p>;
  }

  return (
    <div>
      <h2> Danh sách sách</h2>
      <ul>
        {books.map((book) => (
          <li key={book.id} style={{ marginBottom: '8px' }}>
            <strong>{book.title}</strong> - {book.author} ({book.year})
            {' '}
            <button onClick={() => onEdit(book)} style={{ marginLeft: '10px', background: '#ffc107', border: 'none', padding: '5px 8px', borderRadius: '5px' }}>
              Sửa
            </button>
            {' '}
            <button onClick={() => onDelete(book.id)} style={{ background: '#dc3545', color: '#fff', border: 'none', padding: '5px 8px', borderRadius: '5px' }}>
              Xóa
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default BookList;
