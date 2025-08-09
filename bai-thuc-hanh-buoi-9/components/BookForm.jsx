import React, { useState, useEffect } from 'react';

function BookForm({ onAdd, onUpdate, editingBook }) {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [year, setYear] = useState('');

  useEffect(() => {
    if (editingBook) {
      setTitle(editingBook.title);
      setAuthor(editingBook.author);
      setYear(editingBook.year);
    } else {
      setTitle('');
      setAuthor('');
      setYear('');
    }
  }, [editingBook]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !author || !year) {
      alert('Vui lòng nhập đầy đủ thông tin!');
      return;
    }
    if (!/^\d{4}$/.test(year)) {
      alert('Năm xuất bản phải là 4 chữ số!');
      return;
    }

    if (editingBook) {
      onUpdate({
        ...editingBook,
        title,
        author,
        year: parseInt(year, 10),
      });
    } else {
      const newBook = {
        id: Date.now(),
        title,
        author,
        year: parseInt(year, 10),
      };
      onAdd(newBook);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{editingBook ? '✏️ Sửa Sách' : '➕ Thêm Sách'}</h2>
      <div>
        <label>Tiêu đề: </label>
        <input
          type="text"
          placeholder="Nhập tiêu đề sách..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{ margin: '5px', padding: '5px', width: '100%' }}
        />
      </div>
      <div>
        <label>Tác giả: </label>
        <input
          type="text"
          placeholder="Nhập tên tác giả..."
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          style={{ margin: '5px', padding: '5px', width: '100%' }}
        />
      </div>
      <div>
        <label>Năm XB: </label>
        <input
          type="number"
          placeholder="VD: 2024"
          value={year}
          onChange={(e) => setYear(e.target.value)}
          style={{ margin: '5px', padding: '5px', width: '100%' }}
        />
      </div>
      <button
        type="submit"
        style={{
          marginTop: '10px',
          padding: '8px 12px',
          background: '#007bff',
          color: '#fff',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer'
        }}
      >
        {editingBook ? 'Cập nhật' : 'Thêm'}
      </button>
    </form>
  );
}

export default BookForm;
