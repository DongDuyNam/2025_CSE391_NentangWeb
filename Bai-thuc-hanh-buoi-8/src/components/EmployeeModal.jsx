import React, { useState, useEffect } from 'react';

const EmployeeModal = ({ onClose, onSave, employeeToEdit, isEditing }) => {
  const [employee, setEmployee] = useState({
    id: null,
    name: '',
    email: '',
    address: '',
    phone: '',
  });
  const [errors, setErrors] = useState({});
  const [notification, setNotification] = useState({ message: '', type: '' });

  useEffect(() => {
    if (isEditing && employeeToEdit) {
      setEmployee(employeeToEdit);
    } else {
      setEmployee({ id: null, name: '', email: '', address: '', phone: '' });
    }
    setErrors({});
    setNotification({ message: '', type: '' });
  }, [employeeToEdit, isEditing]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setEmployee({ ...employee, [id]: value });
  };

  const validate = () => {
    const newErrors = {};
    const nameRegex = /^[a-zA-Z\sÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚÝàáâãèéêìíòóôõùúýĂăĐđĨĩŨũƠơƯưẠ-ỹ]+$/;
    const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const phoneRegex = /^(0|\+84)\d{9,10}$/;

    if (!employee.name.trim()) {
      newErrors.name = 'Tên không được để trống.';
    } else if (!nameRegex.test(employee.name)) {
      newErrors.name = 'Tên không được chứa số hoặc ký tự đặc biệt.';
    }
    if (!employee.email.trim()) {
      newErrors.email = 'Email không được để trống.';
    } else if (!emailRegex.test(employee.email)) {
      newErrors.email = 'Địa chỉ email không hợp lệ.';
    }
    if (!employee.address.trim()) {
      newErrors.address = 'Địa chỉ không được để trống.';
    }
    if (!employee.phone.trim()) {
      newErrors.phone = 'Số điện thoại không được để trống.';
    } else if (!phoneRegex.test(employee.phone)) {
      newErrors.phone = 'Số điện thoại không hợp lệ.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSave(employee);
      setNotification({ message: isEditing ? 'Chỉnh sửa thành công!' : 'Thêm mới thành công!', type: 'success' });
      setTimeout(() => onClose(), 1500); // Tự động đóng sau 1.5s
    } else {
      setNotification({ message: 'Vui lòng kiểm tra lại các thông tin đã nhập.', type: 'error' });
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close-button" onClick={onClose}>&times;</span>
        <h2 id="modalTitle">{isEditing ? 'Chỉnh sửa sinh viên' : 'Thêm sinh viên'}</h2>
        <form id="emForm" onSubmit={handleSubmit}>
          {notification.message && (
            <div id="thongbao" className={`notification ${notification.type}`}>
              {notification.message}
            </div>
          )}
          <input type="hidden" id="emId" value={employee.id || ''} />
          
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input type="text" id="name" value={employee.name} onChange={handleChange} className={errors.name ? 'error-input' : ''} />
            {errors.name && <span className="error-message">{errors.name}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" value={employee.email} onChange={handleChange} className={errors.email ? 'error-input' : ''} />
            {errors.email && <span className="error-message">{errors.email}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="address">Address</label>
            <input type="text" id="address" value={employee.address} onChange={handleChange} className={errors.address ? 'error-input' : ''} />
            {errors.address && <span className="error-message">{errors.address}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="phone">Phone</label>
            <input type="tel" id="phone" value={employee.phone} onChange={handleChange} className={errors.phone ? 'error-input' : ''} />
            {errors.phone && <span className="error-message">{errors.phone}</span>}
          </div>

          <button type="submit" id="submitFormButton" className="form-submit-button">
            {isEditing ? 'Lưu' : 'Thêm'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EmployeeModal;