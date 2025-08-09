import React from 'react';

const EmployeeTable = ({ employees, onDelete, onEdit, onSelect, onSelectAll, selectedIds }) => {
    return (
        <table id="employeeDataTable">
            <thead>
                <tr>
                    <th>
                        <input
                            type="checkbox"
                            checked={selectedIds.length === employees.length && employees.length > 0}
                            onChange={(e) => onSelectAll(e.target.checked)}
                        />
                    </th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Address</th>
                    <th>Phone</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {employees.length > 0 ? (
                    employees.map(employee => (
                        <tr key={employee.id}>
                            <td>
                                <input
                                    type="checkbox"
                                    checked={selectedIds.includes(employee.id)}
                                    onChange={(e) => onSelect(employee.id, e.target.checked)}
                                />
                            </td>
                            <td>{employee.name}</td>
                            <td>{employee.email}</td>
                            <td>{employee.address}</td>
                            <td>{employee.phone}</td>
                            <td className="actions-buttons">
                                <button className="edit-btn" onClick={() => onEdit(employee.id)}>Edit</button>
                                <button className="delete-btn-row" onClick={() => onDelete(employee.id)}>Delete</button>
                            </td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan="6" style={{ textAlign: 'center' }}>Không tìm thấy nhân viên nào.</td>
                    </tr>
                )}
            </tbody>
        </table>
    );
};

export default EmployeeTable;