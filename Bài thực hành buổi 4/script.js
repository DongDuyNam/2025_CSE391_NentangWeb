let selectedRow = null;

const addUpdateBtn = document.querySelector('#emForm button[type="submit"]');

function displayMessage(message, color) {
    const thongbaoDiv = document.getElementById('thongbao');
    if (thongbaoDiv) {
        thongbaoDiv.innerText = message;
        thongbaoDiv.style.color = color;
        setTimeout(() => {
            thongbaoDiv.innerText = "";
            thongbaoDiv.style.color = '';
        }, 3000);
    } else {
        console.error("Lỗi: Không tìm thấy phần tử có ID 'thongbao'!");
    }
}

var btnAdd = document.getElementById("Add-btn");
btnAdd.addEventListener('click', function() {
    alert('Bạn đã click vào nút "Add New Employee"!');
    selectedRow = null; 
    addUpdateBtn.textContent = 'Thêm'; 
    employeeForm.reset(); 
    displayMessage("", ""); 
});

const employeeForm = document.getElementById('emForm');
const employeeTableBody = document.querySelector('#employeeDataTable tbody');


employeeForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('emName').value;
    const email = document.getElementById('emEmail').value;
    const address = document.getElementById('emAddress').value;
    const phone = document.getElementById('emPhone').value;

    if (name.trim() === "") {
        displayMessage("Tên không được để trống!", "red");
        return;
    }

    let regexEmail = /^\S+@\S+\.\S+$/;
    if (!regexEmail.test(email)) {
        displayMessage("Email không hợp lệ!", "red");
        return;
    }

    if (address.trim() === "") {
        displayMessage("Địa chỉ không được để trống!", "red");
        return;
    }

    let regexPhone = /^\d{9,11}$/;
    if (!regexPhone.test(phone)) {
        displayMessage("Số điện thoại không hợp lệ (chỉ được nhập số, 9-11 chữ số)!", "red");
        return;
    }

    if (selectedRow === null) {
        const newRow = document.createElement('tr');
        newRow.classList.add('table-body');

        const checkboxCell = document.createElement('td');
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.classList.add('employeeCheckbox');
        checkboxCell.appendChild(checkbox);
        newRow.appendChild(checkboxCell);

        const nameCell = document.createElement('td');
        nameCell.textContent = name;
        newRow.appendChild(nameCell);

        const emailCell = document.createElement('td');
        emailCell.textContent = email;
        newRow.appendChild(emailCell);

        const addressCell = document.createElement('td');
        addressCell.textContent = address;
        newRow.appendChild(addressCell);

        const phoneCell = document.createElement('td');
        phoneCell.textContent = phone;
        newRow.appendChild(phoneCell);

        const actionCell = document.createElement('td');
        const editButton = document.createElement('button');
        editButton.type = 'button';
        editButton.textContent = 'Sửa';

        editButton.addEventListener('click', function() {
            editEmployee(editButton);
        });
        actionCell.appendChild(editButton);

        const deleteButton = document.createElement('button');
        deleteButton.type = 'button';
        deleteButton.textContent = 'Xóa';
        deleteButton.addEventListener('click', function() {
            const confirmDelete = confirm('Bạn có chắc chắn muốn xóa nhân viên này không?');
            if (confirmDelete) {
                newRow.remove();
                displayMessage('Xóa nhân viên thành công!', 'red');
            }
        });
        actionCell.appendChild(deleteButton);
        newRow.appendChild(actionCell);

        employeeTableBody.appendChild(newRow);
        displayMessage("Thêm nhân viên thành công!", "green");

    } else {
        selectedRow.cells[1].textContent = name;    
        selectedRow.cells[2].textContent = email;   
        selectedRow.cells[3].textContent = address; 
        selectedRow.cells[4].textContent = phone;   

        displayMessage("Cập nhật nhân viên thành công!", "green");

        selectedRow = null; 
        addUpdateBtn.textContent = 'Thêm'; 
    }

    employeeForm.reset();
});

function editEmployee(btn) {
    selectedRow = btn.parentElement.parentElement; 
    
    document.getElementById('emName').value = selectedRow.cells[1].textContent;
    document.getElementById('emEmail').value = selectedRow.cells[2].textContent;
    document.getElementById('emAddress').value = selectedRow.cells[3].textContent;
    document.getElementById('emPhone').value = selectedRow.cells[4].textContent;

    addUpdateBtn.textContent = 'Cập nhật';
    displayMessage("Sửa thông tin nhân viên...", "blue"); 
}


document.addEventListener('DOMContentLoaded', function() {
    const existingDeleteButtons = document.querySelectorAll('#employeeDataTable tbody tr button:last-child');
    existingDeleteButtons.forEach(button => {
        button.addEventListener('click', function() {
            const confirmDelete = confirm('Bạn có chắc chắn muốn xóa nhân viên này không?');
            if (confirmDelete) {
                const rowToDelete = button.closest('tr');
                if (rowToDelete) {
                    rowToDelete.remove();
                    displayMessage('Xóa nhân viên thành công!', 'red');
                }
            }
        });
    });

    const existingEditButtons = document.querySelectorAll('#employeeDataTable tbody tr button:first-child');
    existingEditButtons.forEach(button => {
        button.addEventListener('click', function() {
            editEmployee(button);
        });
    });
});