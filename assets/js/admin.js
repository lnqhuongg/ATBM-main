function showSection(sectionId) {
    const sections = document.querySelectorAll('.content-section');
    sections.forEach(section => section.style.display = 'none');
    document.getElementById(sectionId).style.display = 'block';
}

document.addEventListener('DOMContentLoaded', () => {
    showSection('customer');
});

// function filterTransactions() {
//     const senderPhone = document.getElementById("senderPhone").value;
//     const transactionDate = document.getElementById("transactionDate").value;
//     const filteredTransactions = transactions.filter(transaction => {
//         const matchesPhone = senderPhone ? transaction.senderPhone.includes(senderPhone) : true;
//         const matchesDate = transactionDate ? transaction.date === transactionDate : true;
//         return matchesPhone && matchesDate;
//     });
//     displayTransactions(filteredTransactions);
// }

function resetFilters() {
    document.getElementById("senderPhone").value = "";
    document.getElementById("transactionDate").value = "";
    displayTransactions(transactions);
}

document.addEventListener('DOMContentLoaded', () => {
    displayTransactions(transactions);
});

function logout() {
    if (confirm('Bạn chắc chắn muốn đăng xuất?')) {
        window.location.href = "account.html";
    } else {
        return;
    }
    
}

function editPassword() {
    const sections = document.querySelectorAll('.content-section');
    sections.forEach(section => {
        section.style.display = 'none';
    });
    const changePasswordSection = document.getElementById('change-password-section');
    changePasswordSection.style.display = 'block';
}

function handleUserDetailsHover(userDetails) {
    const userDetailsContainer = document.querySelector('.user-details-container'); 
    userDetailsContainer.addEventListener('mouseenter', () => {
        userDetails.classList.add('hovered');
    });
    userDetailsContainer.addEventListener('mouseleave', () => {
        userDetails.classList.remove('hovered');
    });
    document.addEventListener('click', (event) => {
        if (!userDetailsContainer.contains(event.target)) {
            userDetails.classList.remove('hovered');
        }
    });
}

function initUserDetails() {
    const userDetails = document.getElementById('userDetails');
    handleUserDetailsHover(userDetails);
}
document.addEventListener('DOMContentLoaded', initUserDetails);

function showPopup(idForm) {
    const form = document.getElementById(idForm);
    form.style.display = "flex";

    window.onclick = function(event) {
        if (event.target === form) {
            closePopup(idForm);
        }
    };
}

function closePopup(idForm) {
    document.getElementById(idForm).style.display = "none";
    window.onclick = null; 
}


function addNewCustomer(idForm) {
    showPopup(idForm);
}

// Hàm showSection
function showSection(sectionId) {
    const sections = document.querySelectorAll(".content-section");
    sections.forEach((section) => (section.style.display = "none"));
    document.getElementById(sectionId).style.display = "block";

    // Gọi các hàm lấy dữ liệu tương ứng với section
    if (sectionId === "customer") {
        getDataCustomer();
    } else if (sectionId === "employee") {
        getDataEmployee();
    } else if (sectionId === "transactions") {
        getDataTransactions();
    }
}

function getDataCustomer() {
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/accounts",
        success: function (res) {
            console.log("API Response:", res);
            const tableBody = document.getElementById("customerAccountTableBody");
            tableBody.innerHTML = "";

            const filteredCustomerAccounts = res.filter((element) => element.type === 3);

            filteredCustomerAccounts.forEach((element) => {
                addRowCustomer({
                    accountID: element.accountID,
                    accountName: element.accountName,
                    phone: element.phone,
                    email: element.email,
                    address: element.address,
                    status: element.status,
                    gender: element.gender,
                },
                "customerAccountTableBody"
                );
            });
        },
    });
}

function getDataEmployee() {
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/accounts",
        success: function (res) {
            console.log("API Response:", res);
            const tableBody = document.getElementById("employeeAccountTableBody");
            tableBody.innerHTML = "";

            const filteredEmployeeAccounts = res.filter(
                (element) => element.type === 1 || element.type === 2
            );

            filteredEmployeeAccounts.forEach((element) => {
                addRowEmployee({
                    accountID: element.accountID,
                    accountName: element.accountName,
                    phone: element.phone,
                    email: element.email,
                    address: element.address,
                    status: element.status,
                    gender: element.gender,
                    type: element.type,
                },
                "employeeAccountTableBody"
                );
            });
        },
    });
}

function getDataTransactions() {
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/transactions",
        success: function (res) {
            console.log("API Response:", res);
            const tableBody = document.getElementById("transactionTableBody");
            tableBody.innerHTML = "";

            res.forEach(element => {
                addRowTransactions({
                    transactionID: element.transactionID,
                    senderPhone: element.senderPhone,
                    senderName: element.senderName,
                    receiverPhone: element.receiverPhone,
                    receiverName: element.receiverName,
                    amount: element.amount,
                    transactionFee: element.transactionFee,
                    transactionDate: element.transactionDate,
                });
            });
        },
    });
}

function addRowCustomer(data, tableId) {
    const tableBody = document.getElementById(tableId);

    // Tạo một template HTML
    const rowHtml = `
        <tr>
            <td>${data.accountID}</td>
            <td>${data.accountName}</td>
            <td>${data.phone}</td>
            <td>${data.email}</td>
            <td>${data.address}</td>
            <td>${data.status == 1 ? 'Đang hoạt động' : 'Ngừng hoạt động'}</td>
            <td>${data.gender == true ? 'Nữ' : 'Nam'}</td>
            <td>
                <button class="edit-btn">Sửa</button>
                <button class="delete-btn" id="delete-customer-btn">Xóa</button>
            </td>
        </tr>`;

    // Thêm hàng vào bảng bằng cách nối HTML
    tableBody.insertAdjacentHTML('beforeend', rowHtml);

    // Thêm sự kiện cho các nút Sửa và Xóa
    const rows = tableBody.querySelectorAll('tr');
    const lastRow = rows[rows.length - 1]; // Lấy hàng vừa thêm

    const editBtn = lastRow.querySelector('.edit-btn');
    editBtn.addEventListener('click', () => {
        console.log('Chỉnh sửa tài khoản:', data.accountID);
        showEditFormCustomer(data.accountID);
    });

    const deleteBtn = lastRow.querySelector('.delete-btn');
    deleteBtn.addEventListener('click', () => {
        const confirmDelete = confirm('Bạn có chắc chắn muốn xóa tài khoản này?');
        if (confirmDelete) {
            console.log('Xóa tài khoản:', data.accountID);
            deleteAccount(data.accountID);
        }
    });
}

function addRowEmployee(data, tableId) {
    const tableBody = document.getElementById(tableId);

    // Tạo một template HTML
    const rowHtml = `
        <tr>
            <td>${data.accountID}</td>
            <td>${data.accountName}</td>
            <td>${data.phone}</td>
            <td>${data.email}</td>
            <td>${data.address}</td>
            <td>${data.status == 1 ? 'Đang hoạt động' : 'Ngừng hoạt động'}</td>
            <td>${data.gender == true ? 'Nữ' : 'Nam'}</td>
            ${
                tableId === 'employeeAccountTableBody'
                    ? `<td>${data.type == 1 ? 'Admin' : 'Giao dịch viên'}</td>`
                    : ''
            }
            <td>
                <button class="edit-btn">Sửa</button>
                <button class="delete-btn">Xóa</button>
            </td>
        </tr>`;

    // Thêm hàng vào bảng bằng cách nối HTML
    tableBody.insertAdjacentHTML('beforeend', rowHtml);

    // Thêm sự kiện cho các nút Sửa và Xóa
    const rows = tableBody.querySelectorAll('tr');
    const lastRow = rows[rows.length - 1]; // Lấy hàng vừa thêm

    const editBtn = lastRow.querySelector('.edit-btn');
    editBtn.addEventListener('click', () => {
        console.log('Chỉnh sửa tài khoản:', data.accountID);
        showEditFormEmployee(data.accountID);
    });

    const deleteBtn = lastRow.querySelector('.delete-btn');
    deleteBtn.addEventListener('click', () => {
        const confirmDelete = confirm('Bạn có chắc chắn muốn xóa tài khoản này?');
        if (confirmDelete) {
            console.log('Xóa tài khoản:', data.accountID);
            deleteAccount(data.accountID);
        }
    });
}

function addRowTransactions(transaction) {
    const tableBody = document.getElementById("transactionTableBody");
    const rowHtml = `
        <tr>
            <td>${transaction.transactionID}</td>
            <td>${transaction.senderPhone}</td>
            <td>${transaction.senderName}</td>
            <td>${transaction.receiverPhone}</td>
            <td>${transaction.receiverName}</td>
            <td>${transaction.amount}</td>
            <td>${transaction.transactionFee || "Miễn phí"}</td>
            <td>${transaction.transactionDate}</td>
        </tr>`;
    tableBody.insertAdjacentHTML("beforeend", rowHtml);
}

document.addEventListener("DOMContentLoaded", function () {
    showSection("employee");
});

function validateForm(phone, email, pin, password, confirmPassword) {

    // Validate số điện thoại
    const phoneRegex = /^(0|\+84)[0-9]{9}$/;
    if (!phoneRegex.test(phone)) {
        alert("Số điện thoại không hợp lệ! Vui lòng nhập số bắt đầu bằng 0 hoặc +84 và có đúng 10 chữ số.");
        return false;
    }
    
    // Validate email
    const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    if (!gmailRegex.test(email)) {
        alert("Email không hợp lệ! Vui lòng nhập email có định dạng @gmail.com.");
        return false;
    }

    // Validate mã PIN
    const pinRegex = /^[0-9]{6}$/;
    if (!pinRegex.test(pin)) {
        alert("Mã PIN không hợp lệ! Vui lòng nhập mã PIN gồm đúng 6 chữ số.");
        return false;
    }

    // Validate password và confirm password
    if (password !== confirmPassword) {
        alert("Mật khẩu và Xác nhận mật khẩu không khớp!");
        return false;
    }
    return true;
}

function createCustomerAccount(){
    var accountName = $('#customerAddForm input[name="customer-name"]').val();
    var address = $('#customerAddForm input[name="customer-address"]').val();
    var phone = $('#customerAddForm input[name="customer-phone"]').val();
    var email = $('#customerAddForm input[name="customer-email"]').val();
    var password = $('#customerAddForm input[name="customer-password"]').val();
    var confirmPassword = $('#customerAddForm input[name="customer-confirm-password"]').val();
    var pin = $('#customerAddForm input[name="customer-pin"]').val();
    var gender = $('#customerAddForm select[name="gender-select"]').val();

    var myData = {
        "accountID": 0,
        "pin": pin,
        "accountName": accountName,
        "password": password,
        "status": 1,
        "type": 3,
        "phone": phone,
        "email": email,
        "address": address,
        "gender": gender
    }
    var jsonBody =  JSON.stringify(myData);
    if (accountName == "" || address == "" || phone == "" || email == "" || password == "" || confirmPassword == "" || pin == "" || gender == "") {
        alert('Vui lòng nhập đầy đủ thông tin nhân viên!');
        return;
    } else {
        if(validateForm(phone, email, pin, password, confirmPassword)) {
            $.ajax({
                url: "http://localhost:8080/accounts",
                type: "POST",
                headers: { 'Accept': '*/*', 'Content-Type': 'application/json'},
                dataType: "json",
                data: jsonBody,
                success: function(response) {
                    console.log('Ok'); 
                    alert('Thêm khách hàng thành công!'); 
                    closePopup('add-new-customer'); 
                    $('#customerAddForm')[0].reset(); 
                    getDataCustomer();
                },
                error: function(xhr, status, error) {
                    console.log(error);
                }
            });
        }
    }
}

function createEmployeeAccount(){
    var accountName = $('#tellerAddForm input[name="employee-name"]').val();
    var address = $('#tellerAddForm input[name="employee-address"]').val();
    var phone = $('#tellerAddForm input[name="employee-phone"]').val();
    var email = $('#tellerAddForm input[name="employee-email"]').val();
    var password = $('#tellerAddForm input[name="employee-password"]').val();
    var pin = $('#tellerAddForm input[name="employee-pin"]').val();
    var gender = $('#tellerAddForm select[name="gender-select"]').val();
    var position = $('#tellerAddForm select[name="position-select"]').val();

    var myData = {
        "accountID": 0,
        "pin": pin,
        "accountName": accountName,
        "password": password,
        "status": 1,
        "type": position,
        "phone": phone,
        "email": email,
        "address": address,
        "gender": gender
    }
    var jsonBody =  JSON.stringify(myData);
    $.ajax({
        url: "http://localhost:8080/accounts",
        type: "POST",
        headers: { 'Accept': '*/*', 'Content-Type': 'application/json'},
        dataType: "json",
        data: jsonBody,
        success: function(response) {
            console.log('Ok');
            alert('Thêm nhân viên thành công!'); // Hiển thị thông báo
            closePopup('add-new-teller'); // Tắt popup
            $('#customerAddForm')[0].reset(); // Reset form về trạng thái ban đầu
            getDataEmployee(); 
        },
        error: function(xhr, status, error) {
            console.log(error);
        }
    });
}

function loadCustomerData(data) {
    $('#customerEditForm input[name="customer-name"]').val(data.accountName);
    $('#customerEditForm input[name="customer-address"]').val(data.address);
    $('#customerEditForm input[name="customer-phone"]').val(data.phone);
    $('#customerEditForm input[name="customer-email"]').val(data.email);
    $('#customerEditForm input[name="customer-password"]').val(data.password);
    $('#customerEditForm input[name="customer-confirm-password"]').val(data.password);
    $('#customerEditForm input[name="customer-pin"]').val(data.pin);
    const genderValue = data.gender === true ? "true" : "false";
    $('#customerEditForm select[name="gender-select"]').val(genderValue);
    $('#customerEditForm select[name="status-select"]').val(data.status);
}

function loadEmployeeData(data) {
    $('#tellerEditForm input[name="employee-name"]').val(data.accountName);
    $('#tellerEditForm input[name="employee-address"]').val(data.address);
    $('#tellerEditForm input[name="employee-phone"]').val(data.phone);
    $('#tellerEditForm input[name="employee-email"]').val(data.email);
    $('#tellerEditForm input[name="employee-password"]').val(data.password);
    $('#tellerEditForm input[name="employee-confirm-password"]').val(data.password);
    $('#tellerEditForm input[name="employee-pin"]').val(data.pin);
    $('#tellerEditForm select[name="gender-select"]').val(data.gender.toString());
    $('#tellerEditForm select[name="position-select"]').val(data.type);
    $('#tellerEditForm select[name="status-select"]').val(data.status);
}

function showEditFormCustomer(customerId) {
    $.ajax({
        url: "http://localhost:8080/accounts/" + customerId, 
        type: "GET",
        headers: {},
        success: function(response) {
            console.log('Customer data:', response);
            loadCustomerData(response); 
            showPopup('edit-customer');
            $('#edit-customer-btn').on('click', function (e) {
                e.preventDefault(); 
                UpdateCustomerAccount(customerId); 
            });
        },
        error: function(xhr, status, error) {
            console.log("Error fetching customer data:", error);
        }
    });
}

function showEditFormEmployee(employeeId) {
    $.ajax({
        url: "http://localhost:8080/accounts/" + employeeId, 
        type: "GET",
        headers: {},
        success: function(response) {
            if (response) {
                console.log('Employee data:', response);
                loadEmployeeData(response); 
                showPopup('edit-teller');
                $('#edit-employee-btn').off('click').on('click', function (e) {
                    e.preventDefault(); 
                    UpdateEmployeeAccount(employeeId); 
                });
            } else {
                alert('Không tìm thấy thông tin nhân viên.');
            }
        },
        error: function(xhr, status, error) {
            console.log("Error fetching employee data:", error);
        }
    });
}

function UpdateCustomerAccount(customerId){
     // Lấy thông tin từ form chỉnh sửa
     var accountName = $('#customerEditForm input[name="customer-name"]').val();
     var address = $('#customerEditForm input[name="customer-address"]').val();
     var phone = $('#customerEditForm input[name="customer-phone"]').val();
     var email = $('#customerEditForm input[name="customer-email"]').val();
     var password = $('#customerEditForm input[name="customer-password"]').val();
     var confirmPassword = $('#customerEditForm input[name="customer-confirm-password"]').val();
     var pin = $('#customerEditForm input[name="customer-pin"]').val();
     var gender = $('#customerEditForm select[name="gender-select"]').val();  // "true" hoặc "false"
     var status = $('#customerEditForm select[name="status-select"]').val();
     
     var myData = {
         "accountName": accountName,
         "address": address,
         "phone": phone,
         "email": email,
         "password": password,
         "pin": pin,
         "gender": gender === "true",  
         "status": status
     };
      var jsonBody = JSON.stringify(myData);
 
    if (accountName == "" || address == "" || phone == "" || email == "" || password == "" || confirmPassword == "" || pin == "" || gender == "") {
        alert('Vui lòng nhập đầy đủ thông tin nhân viên!');
        return;
    } else {
        if(validateForm(phone, email, pin, password, confirmPassword)) {
            $.ajax({
                url: "http://localhost:8080/accounts/" + customerId,
                type: "PUT",
                headers: { 'Accept': '*/*', 'Content-Type': 'application/json' },
                dataType: "json",
                data: jsonBody,
                success: function(response) {
                    console.log('Cập nhật khách hàng thành công:', response);
                    alert('Cập nhật thông tin khách hàng thành công!');
                    closePopup('edit-customer');  // Đóng popup sau khi cập nhật thành công
                    getDataCustomer();  // Cập nhật lại danh sách khách hàng
                },
                error: function(xhr, status, error) {
                    console.log("Lỗi khi cập nhật khách hàng:", error);
                    alert('Có lỗi xảy ra, vui lòng thử lại!');
                }
            });
        }
    }
}

function UpdateEmployeeAccount(employeeId){
    // Lấy thông tin từ form chỉnh sửa
    var accountName = $('#tellerEditForm input[name="employee-name"]').val();
    var address = $('#tellerEditForm input[name="employee-address"]').val();
    var phone = $('#tellerEditForm input[name="employee-phone"]').val();
    var email = $('#tellerEditForm input[name="employee-email"]').val();
    var password = $('#tellerEditForm input[name="employee-password"]').val();
    var pin = $('#tellerEditForm input[name="employee-pin"]').val();
    var gender = $('#tellerEditForm select[name="gender-select"]').val();  
    var status = $('#tellerEditForm select[name="status-select"]').val();
    var type = $('#tellerEditForm select[name="position-select"]').val();
    
    var myData = {
        "accountName": accountName,
        "address": address,
        "phone": phone,
        "email": email,
        "password": password,
        "pin": pin,
        "gender": gender === "true",  
        "status": status,
        "type": type,
    };

    // Chuyển đối tượng thành JSON
    var jsonBody = JSON.stringify(myData);

    // Gửi yêu cầu PUT lên API để cập nhật thông tin khách hàng
    $.ajax({
        url: "http://localhost:8080/accounts/" + employeeId,
        type: "PUT",
        headers: { 'Accept': '*/*', 'Content-Type': 'application/json' },
        dataType: "json",
        data: jsonBody,
        success: function(response) {
            console.log('Cập nhật khách hàng thành công:', response);
            alert('Cập nhật thông tin khách hàng thành công!');
            closePopup('edit-teller');  // Đóng popup sau khi cập nhật thành công
            getDataEmployee();  // Cập nhật lại danh sách khách hàng
        },
        error: function(xhr, status, error) {
            console.log("Lỗi khi cập nhật khách hàng:", error);
            alert('Có lỗi xảy ra, vui lòng thử lại!');
        }
    });
}

function deleteAccount(accountID) {
    $.ajax({
        url: "http://localhost:8080/accounts/"+ accountID,
        type: "DELETE",
        success: function(response) {
            console.log('Ok'); 
            getDataEmployee();
            getDataCustomer();
        },
        error: function(xhr, status, error) {
            console.log(error); 
        }
    });
}

function filterListTransactions() {
    const dataSearch = document.getElementById("transactionSearch").value.trim();
    // const transactionDate = document.getElementById("transactionDate").value.trim();
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/transactions",
        success: function (res) {
            console.log("API Response:", res);
            const tableBody = document.getElementById("transactionTableBody");
            tableBody.innerHTML = "";

            // Lọc giao dịch dựa trên dữ liệu nhập
            const filteredTransactions = res.filter((transaction) => {
                const matchesID = dataSearch
                    ? String(transaction.transactionID).includes(dataSearch)
                    : true;
                const matchesPhone = dataSearch
                    ? transaction.senderPhone.includes(dataSearch)
                    : true; 
                // const matchesDate = transactionDate
                //     ? transaction.transactionDate && transaction.transactionDate.includes(transactionDate)
                //     : true;
                return matchesID || matchesPhone;
            });

            // Hiển thị danh sách giao dịch đã lọc
            if (filteredTransactions.length > 0) {
                filteredTransactions.forEach((transaction) => {
                    addRowTransactions(transaction); // Sử dụng đúng định dạng addRowTransactions
                });
            } else {
                // Nếu không có kết quả, hiển thị thông báo
                const noDataRow = `
                    <tr>
                        <td colspan="8" style="text-align: center;">Không tìm thấy giao dịch nào phù hợp!</td>
                    </tr>`;
                tableBody.insertAdjacentHTML("beforeend", noDataRow);
            }
        },
        error: function (xhr, status, error) {
            console.log("Error fetching transactions:", error);
        },
    });
}

$(document).ready(function () {
    // thêm khách hàng
    $('.addCustomerModal').on('click', function (e) {
        e.preventDefault(); 
        createCustomerAccount();
    });
    // thêm nhân diên
    $('.addEmployeeModal').on('click', function (e) {
        e.preventDefault(); 
        createEmployeeAccount();
    });
    // lọc giao dịch
    $('.filter-transaction-btn').on('click', function (e) {
        e.preventDefault(); 
        filterListTransactions(); 
    });
    // đặt lại ds giao dịch
    $('.reset-transaction-list').on('click', function (e) {
        e.preventDefault(); 
        getDataTransactions(); 
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const currentUser = sessionStorage.getItem('currentUser');
    console.log(currentUser);
    
    if (!currentUser) {
        alert('Bạn chưa đăng nhập!');
        window.location.href = 'account.html'; 
        return;
    }
    const user = JSON.parse(currentUser);
    if (user.type !== 1) {
        alert('Bạn không được phép truy cập vào giao diện này!');
        window.location.href = 'account.html'; 
        return;
    }

    if (user.status == 0) {
        alert('Hiện tại tài khoản này không được phép hoạt động, vui lòng thử lại sau...');
        window.location.href = 'account.html'; 
        return;
    }

    document.querySelector('.user-name').textContent = `${user.accountName}`;
    // document.getElementById('account-balance').value = `${user.balance} VND`;
    
});