import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import EmployeeTable from './components/EmployeeTable';
import EmployeeModal from './components/EmployeeModal';
import Pagination from './components/Pagination';
import employeesData from './data';

const App = () => {
  const [employees, setEmployees] = useState(() => {
    const storedEmployees = localStorage.getItem('employees');
    return storedEmployees ? JSON.parse(storedEmployees) : employeesData;
  });
  const [modalOpen, setModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentEmployee, setCurrentEmployee] = useState(null);
  const [selectedIds, setSelectedIds] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  
  useEffect(() => {
    localStorage.setItem('employees', JSON.stringify(employees));
  }, [employees]);

  // Điều chỉnh trang hiện tại khi số lượng nhân viên thay đổi
  useEffect(() => {
    const totalPages = Math.ceil(employees.length / itemsPerPage);
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(totalPages);
    } else if (employees.length === 0) {
      setCurrentPage(1);
    }
  }, [employees, currentPage]);

  const handleAddOrUpdate = (employee) => {
    if (isEditing) {
      setEmployees(employees.map(emp => emp.id === employee.id ? employee : emp));
    } else {
      const newId = employees.length ? Math.max(...employees.map(emp => emp.id)) + 1 : 1;
      setEmployees([...employees, { ...employee, id: newId }]);
    }
    setModalOpen(false);
  };

  const handleDeleteSingle = (employeeId) => {
    // Thêm xác nhận trước khi xóa
    if (window.confirm('Bạn có chắc chắn muốn xóa nhân viên này?')) {
      setEmployees(employees.filter(emp => emp.id !== employeeId));
      // Sau khi xóa, kiểm tra lại trang hiện tại nếu xóa mục cuối cùng trên trang
      const totalPages = Math.ceil((employees.length - 1) / itemsPerPage);
      if (currentPage > totalPages && totalPages > 0) {
        setCurrentPage(totalPages);
      } else if (employees.length - 1 === 0) {
        setCurrentPage(1);
      }
    }
  };
  
  const handleDeleteSelected = () => {
    if (window.confirm(`Bạn có chắc chắn muốn xóa ${selectedIds.length} nhân viên đã chọn?`)) {
      setEmployees(employees.filter(emp => !selectedIds.includes(emp.id)));
      setSelectedIds([]); // Xóa các ID đã chọn sau khi xóa
      // Điều chỉnh trang hiện tại sau khi xóa nhiều mục
      const totalPages = Math.ceil((employees.length - selectedIds.length) / itemsPerPage);
      if (currentPage > totalPages && totalPages > 0) {
        setCurrentPage(totalPages);
      } else if (employees.length - selectedIds.length === 0) {
        setCurrentPage(1);
      }
    }
  };
  
  const handleEdit = (employeeId) => {
    const employeeToEdit = employees.find(emp => emp.id === employeeId);
    if (employeeToEdit) { 
      setCurrentEmployee(employeeToEdit);
      setIsEditing(true);
      setModalOpen(true);
    }
  };
  

  const handleSelect = (id, isChecked) => {
    if (isChecked) {
      setSelectedIds([...selectedIds, id]);
    } else {
      setSelectedIds(selectedIds.filter(itemId => itemId !== id));
    }
  };

  // Hàm xử lý khi chọn/bỏ chọn tất cả nhân viên trên trang hiện tại
  const handleSelectAll = (isChecked) => {
    if (isChecked) {
      setSelectedIds(paginatedEmployees.map(emp => emp.id));
    } else {
      setSelectedIds([]);
    }
  };

  const paginatedEmployees = employees.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="container">
      <Navbar />
      <div className="manage-employees-header">
        <h2>Manage Employees</h2>
        <div className="action-buttons">
          <button id="Delete-btn" onClick={handleDeleteSelected} disabled={selectedIds.length === 0}>
            Delete
          </button>
          <button id="Add-btn" onClick={() => {
            setModalOpen(true);
            setIsEditing(false);
            setCurrentEmployee(null);
          }}>
            Add New Employee
          </button>
        </div>
      </div>
      <div className="content-table">
        <EmployeeTable
          employees={paginatedEmployees}
          onDelete={handleDeleteSingle} 
          onEdit={handleEdit}
          onSelect={handleSelect} 
          onSelectAll={handleSelectAll} 
          selectedIds={selectedIds}
        />
      </div>
      <Pagination
        totalItems={employees.length}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
      {modalOpen && (
        <EmployeeModal
          onClose={() => setModalOpen(false)}
          onSave={handleAddOrUpdate}
          employeeToEdit={currentEmployee}
          isEditing={isEditing}
        />
      )}
    </div>
  );
};

export default App;