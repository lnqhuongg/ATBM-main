// // Hiển thị form chuyển tiền khi nhấn nút "Chuyển tiền" bên ngoài form
// document.getElementById('transfer-button').addEventListener('click', function() {
//     document.getElementById('transfer-form').style.display = 'block';
//     document.getElementById('history-panel').style.display = 'none';
//     document.querySelector('.sidebar-right').style.display = 'block';
// });

// // Đóng form chuyển tiền khi nhấn nút "<<<"
// document.getElementById('close-transfer-form').addEventListener('click', function() {
//     document.getElementById('transfer-form').style.display = 'none';
//     document.querySelector('.sidebar-right').style.display = 'none';
// });

// // Hiển thị popup nhập mật khẩu khi nhấn nút "Chuyển tiền" trong form chuyển tiền
// document.getElementById('submit-transfer').addEventListener('click', function() {
//     document.getElementById('popup').classList.add('active');
// });

// // Đóng popup nhập mật khẩu khi nhấn nút "×"
// document.getElementById('close-popup').addEventListener('click', function() {
//     document.getElementById('popup').classList.remove('active');
// });

// // Xử lý sự kiện nhập mật khẩu
// const passwordInputs = document.querySelectorAll('.password-input .circle');
// passwordInputs.forEach((input, index) => {
//     input.addEventListener('input', function() {
//         if (input.value.length === 1 && index < passwordInputs.length - 1) {
//             passwordInputs[index + 1].focus();
//         }
//     });
// });

// // Xác nhận mật khẩu khi nhấn nút "Xác nhận"
// document.getElementById('confirm-password').addEventListener('click', function() {
//     let password = '';
//     passwordInputs.forEach(input => {
//         password += input.value;
//     });
//     if (password.length === 6) {
//         setTimeout(function() {
//             document.getElementById('otp-popup').classList.add('active');
//         }, 100); // Đảm bảo popup mật khẩu đóng trước khi mở popup OTP
//     } else {
//         alert('Please enter a 6-digit password.');
//     }
// });

// // Đóng popup OTP khi nhấn nút "×"
// document.getElementById('close-otp-popup').addEventListener('click', function() {
//     document.getElementById('otp-popup').classList.remove('active');
// });

// // Xác nhận OTP khi nhấn nút "Xác nhận"
// document.getElementById('confirm-otp').addEventListener('click', function() {
//     const otp = document.getElementById('otp').value;
//     if (otp.length === 6) {
//         alert('OTP confirmed!');
//         document.getElementById('otp-popup').classList.remove('active');
//     } else {
//         alert('Please enter a valid 6-digit OTP.');
//     }
// });

// //Từ ngày đến ngày trong lịch sử tìm kiếm
// document.getElementById('filter-history').addEventListener('click', function() {
//     const fromDate = document.getElementById('from-date').value;
//     const toDate = document.getElementById('to-date').value;
    
//     // Assuming you have a function to fetch and display the history
//     filterHistory(fromDate, toDate);
// });

// function filterHistory(fromDate, toDate) {
//     // Implement your logic to filter the history based on the dates
//     console.log(`Filtering history from ${fromDate} to ${toDate}`);
//     // Example: Fetch and display filtered history
// }

let accountList = [];


function addRowTransactions(data) {
    const tableBody = document.getElementById("transactionTableBody");
    const row = document.createElement("tr");

    const transactionIDCell = document.createElement("td");
    transactionIDCell.textContent = data.transactionID;

    const senderPhoneCell = document.createElement("td");
    senderPhoneCell.textContent = data.senderPhone;

    const senderNameCell = document.createElement("td");
    senderNameCell.textContent = data.senderName;

    const receiverPhoneCell = document.createElement("td");
    receiverPhoneCell.textContent = data.receiverPhone;

    const receiverNameCell = document.createElement("td");
    receiverNameCell.textContent = data.receiverName;

    const amountCell = document.createElement("td");
    amountCell.textContent = data.amount;

    const feeCell = document.createElement("td");
    feeCell.textContent = data.transactionFee = "Free";

    const dateCell = document.createElement("td");
    dateCell.textContent = data.transactionDate;

    row.appendChild(transactionIDCell);
    row.appendChild(senderPhoneCell);
    row.appendChild(senderNameCell);
    row.appendChild(receiverPhoneCell);
    row.appendChild(receiverNameCell);
    row.appendChild(amountCell);
    row.appendChild(feeCell);
    row.appendChild(dateCell);

    tableBody.appendChild(row);
}

// Khởi tạo DOMContentLoaded
document.addEventListener("DOMContentLoaded", function () {
    showSection("transactionHistory");
});

function getDataAccounts() {
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/accounts",
        success: function (res) {
            console.log("API Response:", res);
            accountList = res;
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
                    transactionFee: element.transactionFee,
                    gender: element.gender,
                    amount: element.amount,
                    transactionDate: element.transactionDate,
                });
            });
        },
    });
}

function showSection(sectionId) {
    const sections = document.querySelectorAll(".content-section");
    sections.forEach((section) => (section.style.display = "none"));
    document.getElementById(sectionId).style.display = "block";

    // Gọi các hàm lấy dữ liệu tương ứng với section
    if (sectionId === "transactionHistory") {
        getDataTransactions();
    } else {
        getDataAccounts();
    }
}

function getCurrentTransactionDate() {
    const now = new Date();

    // Format the date as "YYYY-MM-DD HH:mm:ss"
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

function processTopUp() {
    // Lấy thông tin người đăng nhập từ sessionStorage
    const currentUser = sessionStorage.getItem('currentUser');
    if (!currentUser) {
        alert('Bạn chưa đăng nhập!');
        return;
    }

    const user = JSON.parse(currentUser);

    // Lấy thông tin từ người đăng nhập (người chuyển tiền)
    const senderID = user.accountID; // Sử dụng accountID (senderid)
    const senderPhone = user.phone; 
    const senderName = user.accountName; 

    // Lấy thông tin từ form nhập liệu (người nhận tiền)
    const receiverPhone = document.getElementById('phoneNumber').value;
    const amount = parseFloat(document.getElementById('amount').value); // Chuyển sang kiểu số
    const message = document.getElementById('message').value;

    // Kiểm tra các giá trị nhập liệu
    if (!receiverPhone || !amount || !message) {
        alert('Vui lòng nhập đầy đủ thông tin!');
        return;
    }

    if (receiverPhone === senderPhone) {
        alert('Bạn không thể chuyển tiền cho chính mình!');
        return;
    }

    // Tìm người nhận trong danh sách tài khoản
    const receiverAccount = accountList.find(account => account.phone === receiverPhone);

    if (!receiverAccount) {
        alert('Số điện thoại người nhận không tồn tại trong hệ thống!');
        return;
    }

    const receiverID = receiverAccount.accountID;
    const receiverName = receiverAccount.receiverName; 
    const transactionDate = getCurrentTransactionDate();

    // Kiểm tra số dư của người chuyển tiền
    if (user.balance < amount) {
        alert('Số dư không đủ để thực hiện giao dịch!');
        return;
    }

    // Dữ liệu gửi đi
    const transactionData = {
        senderid: senderID,  // Sử dụng senderid
        senderPhone,
        senderName,
        receiverPhone,
        receiverid: receiverID, // Gửi thêm ID của người nhận
        receiverName: receiverName,
        amount,
        message,
        transactionDate: transactionDate,
    };

    console.log("Dữ liệu giao dịch:", transactionData);

    // Gửi yêu cầu tạo giao dịch
    makeTransactionRequest(transactionData, amount, senderID, receiverPhone);
}

function makeTransactionRequest(transactionData, amount, senderID, receiverPhone) {
    // Gửi yêu cầu tạo giao dịch
    $.ajax({
        type: "POST",
        url: "http://localhost:8080/transactions", 
        headers: { 'Accept': '*/*', 'Content-Type': 'application/json' },
        dataType: "json",
        data: JSON.stringify(transactionData), 
        success: function (res) {
            alert("Giao dịch thành công!");
            console.log("Transaction Response:", res);

            updateBalance(senderID, -amount);  // Trừ tiền của người chuyển

            // Cập nhật số dư cho người nhận tiền (tăng số dư)
            updateBalance(res.receiverid, amount);  // Cộng tiền cho người nhận (dùng receiverid từ giao dịch)

            // Thêm giao dịch vào bảng
            addRowTransactions({
                transactionID: res.transactionID,
                senderPhone: res.senderPhone,
                senderName: res.senderName,
                receiverPhone: res.receiverPhone,
                receiverName: res.receiverName,
                amount: res.amount,
                transactionDate: res.transactionDate,
                transactionFee: res.transactionFee,
            });
        },
        error: function (err) {
            console.error("Transaction Error:", err);
            alert("Giao dịch thất bại! Vui lòng thử lại.");
        },
    });
}

function updateBalance(accountID, amount) {
    // Cập nhật số dư cho tài khoản thông qua accountID
    $.ajax({
        url: `http://localhost:8080/accounts/${accountID}`,
        type: "GET",
        success: function(response) {
            let currentAmount = response.balance;

            // Tính toán số dư mới
            let updatedAmount = currentAmount + amount;

            // Dữ liệu để cập nhật
            const updateData = {
                balance: updatedAmount
            };

            // Cập nhật lại số dư vào cơ sở dữ liệu
            $.ajax({
                url: `http://localhost:8080/accounts/${accountID}`,
                type: "PUT",
                headers: { 'Accept': '*/*', 'Content-Type': 'application/json' },
                dataType: "json",
                data: JSON.stringify(updateData),
                success: function(response) {
                    console.log(`Cập nhật số dư thành công cho ${accountID}:`, response);
                },
                error: function(xhr, status, error) {
                    console.log("Lỗi khi cập nhật số dư:", error);
                    alert("Có lỗi xảy ra khi cập nhật số dư.");
                }
            });
        },
        error: function(xhr, status, error) {
            console.log("Lỗi khi lấy thông tin tài khoản:", error);
            alert("Có lỗi xảy ra khi lấy thông tin tài khoản.");
        }
    });
}



document.addEventListener('DOMContentLoaded', () => {
    const currentUser = sessionStorage.getItem('currentUser');
    console.log(currentUser);
    
    
    if (!currentUser) {
        alert('Bạn chưa đăng nhập!');
        window.location.href = 'account.html'; 
        return;
    }
    const user = JSON.parse(currentUser);
    if (user.type !== 2) {
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

function logout() {
    if (confirm('Bạn chắc chắn muốn đăng xuất?')) {
        window.location.href = "account.html";
    } else {
        return;
    }   
}

