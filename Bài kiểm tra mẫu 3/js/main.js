const addModal = document.getElementById("addTransactionModal");
const openModalBtn = document.querySelector(".transaction-header .btn-primary");
const closeModalBtn = document.querySelector("#addTransactionModal .close-btn");
const cancelBtn = document.getElementById("cancelBtn");
const form = document.getElementById("addTransactionForm");

const detailModal = document.getElementById("detailModal");
const closeDetailModalBtn = document.getElementById("closeDetailModalBtn");
const closeDetailBtn = document.getElementById("closeDetailBtn");
const detailId = document.getElementById("detailId");
const detailKhachhang = document.getElementById("detailKhachhang");
const detailNhanvien = document.getElementById("detailNhanvien");
const detailSotien = document.getElementById("detailSotien");
const detailNgaymua = document.getElementById("detailNgaymua");

const transactionTableBody = document.querySelector(".transaction-table tbody");
const transactionTable = document.querySelector(".transaction-table");

const khachhangInput = document.getElementById("khachhang");
const nhanvienInput = document.getElementById("nhanvien");
const sotienInput = document.getElementById("sotien");

const khachhangError = document.getElementById("error-khachhang");
const nhanvienError = document.getElementById("error-nhanvien");
const sotienError = document.getElementById("error-sotien");

let editingId = null;

function renderTransactions() {
    transactionTableBody.innerHTML = '';
    transactions.forEach(transaction => {
        const row = document.createElement('tr');
        row.setAttribute('data-id', transaction.id);
        row.innerHTML = `
            <td><input type="checkbox"></td>
            <td>
                <div class="action-buttons">
                    <button class="btn-icon blue edit-btn"><i class="fas fa-pen"></i></button>
                    <button class="btn-icon yellow view-btn"><i class="fas fa-info-circle"></i></button>
                    <button class="btn-icon red delete-btn"><i class="fas fa-trash-alt"></i></button>
                </div>
            </td>
            <td>${transaction.id}</td>
            <td>${transaction.customer}</td>
            <td>${transaction.employee}</td>
            <td>${transaction.amount.toLocaleString('vi-VN')}</td>
            <td>${transaction.date}</td>
        `;
        transactionTableBody.appendChild(row);
    });
}

function showFieldError(input, message, errorElement) {
    errorElement.textContent = message;
    errorElement.classList.remove('hidden');
    input.classList.add('error-input');
}

function clearFieldError(input, errorElement) {
    errorElement.textContent = '';
    errorElement.classList.add('hidden');
    input.classList.remove('error-input');
}

function validateForm() {
    let isValid = true;
    
    clearFieldError(khachhangInput, khachhangError);
    clearFieldError(nhanvienInput, nhanvienError);
    clearFieldError(sotienInput, sotienError);

    const khachhangValue = khachhangInput.value.trim();
    const nhanvienValue = nhanvienInput.value.trim();
    const sotienValue = sotienInput.value.trim();

    const validateName = (name) => {
        const re = /^[a-zA-Z\sÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚÝàáâãèéêìíòóôõùúýĂăĐđĨĩŨũƠơƯưẠ-ỹ]+$/;
        return re.test(String(name));
    };


    const validateAmount = (amount) => {
        const floatAmount = parseFloat(amount);
        return !isNaN(floatAmount) && floatAmount > 0;
    };

    if (khachhangValue === '') {
        showFieldError(khachhangInput, 'Tên khách hàng không được để trống.', khachhangError);
        isValid = false;
    } else if (!validateName(khachhangValue)) {
        showFieldError(khachhangInput, 'Tên khách hàng không được chứa số hoặc ký tự đặc biệt.', khachhangError);
        isValid = false;
    } else if (khachhangValue.length > 20) {
        showFieldError(khachhangInput, 'Tên khách hàng không được quá 20 ký tự.', khachhangError);
        isValid = false;
    }

    if (nhanvienValue === '') {
        showFieldError(nhanvienInput, 'Tên nhân viên không được để trống.', nhanvienError);
        isValid = false;
    } else if (!validateName(nhanvienValue)) {
        showFieldError(nhanvienInput, 'Tên nhân viên không được chứa số hoặc ký tự đặc biệt.', nhanvienError);
        isValid = false;
    } else if (nhanvienValue.length > 15) {
        showFieldError(nhanvienInput, 'Tên nhân viên không được quá 15 ký tự.', nhanvienError);
        isValid = false;
    }
    
    if (sotienValue === '') {
        showFieldError(sotienInput, 'Số tiền không được để trống.', sotienError);
        isValid = false;
    } else if (!validateAmount(sotienValue)) {
        showFieldError(sotienInput, 'Số tiền không hợp lệ (phải là số và lớn hơn 0).', sotienError);
        isValid = false;
    }

    return isValid;
}

openModalBtn.addEventListener('click', () => {
    form.reset();
    editingId = null;
    document.querySelector('#addTransactionModal .modal-header h2').textContent = 'Thêm giao dịch';
    document.getElementById('addBtn').textContent = 'Thêm';
    addModal.style.display = "block";
    

    clearFieldError(khachhangInput, khachhangError);
    clearFieldError(nhanvienInput, nhanvienError);
    clearFieldError(sotienInput, sotienError);
});

closeModalBtn.addEventListener('click', () => {
    addModal.style.display = "none";
});

cancelBtn.addEventListener('click', () => {
    addModal.style.display = "none";
});

closeDetailModalBtn.addEventListener('click', () => {
    detailModal.style.display = "none";
});

closeDetailBtn.addEventListener('click', () => {
    detailModal.style.display = "none";
});

window.addEventListener('click', (event) => {
    if (event.target === addModal) {
        addModal.style.display = "none";
    }
    if (event.target === detailModal) {
        detailModal.style.display = "none";
    }
});

form.addEventListener('submit', (e) => {
    e.preventDefault();

    if (validateForm()) {
        const date = new Date().toLocaleString('vi-VN', {
            day: '2-digit', month: 'long', year: 'numeric',
            hour: '2-digit', minute: '2-digit'
        });

        if (editingId !== null) {
            const transactionIndex = transactions.findIndex(t => t.id === editingId);
            if (transactionIndex !== -1) {
                transactions[transactionIndex].customer = khachhangInput.value.trim();
                transactions[transactionIndex].employee = nhanvienInput.value.trim();
                transactions[transactionIndex].amount = parseFloat(sotienInput.value.trim());
                transactions[transactionIndex].date = date;
            }
            editingId = null;
            alert('Dữ liệu đã được cập nhật thành công!');
        } else {
            const newTransaction = {
                id: Math.floor(Math.random() * 10000) + 1,
                customer: khachhangInput.value.trim(),
                employee: nhanvienInput.value.trim(),
                amount: parseFloat(sotienInput.value.trim()),
                date: date
            };
            transactions.push(newTransaction);
            alert('Dữ liệu đã được thêm thành công!');
        }
        
        renderTransactions();
        addModal.style.display = "none";
        form.reset();
    }
});

transactionTableBody.addEventListener('click', (e) => {
    const target = e.target.closest('button');
    if (!target) return;

    const row = target.closest('tr');
    const id = parseInt(row.getAttribute('data-id'));
    const transaction = transactions.find(t => t.id === id);

    if (target.classList.contains('delete-btn')) {
        if (confirm('Bạn có chắc chắn muốn xóa bản ghi này?')) {
            const transactionIndex = transactions.findIndex(t => t.id === id);
            transactions.splice(transactionIndex, 1);
            renderTransactions();
        }
    } else if (target.classList.contains('edit-btn')) {
        khachhangInput.value = transaction.customer;
        nhanvienInput.value = transaction.employee;
        sotienInput.value = transaction.amount;
        
        editingId = id;
        document.querySelector('#addTransactionModal .modal-header h2').textContent = 'Sửa giao dịch';
        document.getElementById('addBtn').textContent = 'Lưu';

        clearFieldError(khachhangInput, khachhangError);
        clearFieldError(nhanvienInput, nhanvienError);
        clearFieldError(sotienInput, sotienError);

        addModal.style.display = "block";
    } else if (target.classList.contains('view-btn')) {
        detailId.textContent = transaction.id;
        detailKhachhang.textContent = transaction.customer;
        detailNhanvien.textContent = transaction.employee;
        detailSotien.textContent = transaction.amount.toLocaleString('vi-VN');
        detailNgaymua.textContent = transaction.date;

        detailModal.style.display = "block";
    }
});

renderTransactions();