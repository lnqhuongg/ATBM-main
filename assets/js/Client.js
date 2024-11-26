//Popup
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




// Hiển thị form chuyển tiền khi nhấn nút "Chuyển tiền" bên ngoài form
document.getElementById('transfer-button').addEventListener('click', function() {
    document.getElementById('transfer-form').style.display = 'block';
    document.getElementById('history-panel').style.display = 'block';
    document.querySelector('.sidebar-right').style.display = 'block';
    getDataTransactions();
});

// Đóng form chuyển tiền khi nhấn nút "<<<"
document.getElementById('close-transfer-form').addEventListener('click', function() {
    document.getElementById('transfer-form').style.display = 'none';
    document.querySelector('.sidebar-right').style.display = 'none';
});

// Hiển thị popup nhập mật khẩu khi nhấn nút "Chuyển tiền" trong form chuyển tiền
document.getElementById('submit-transfer').addEventListener('click', function() {
    document.getElementById('popup').classList.add('active');
});

// // Đóng popup nhập mật khẩu khi nhấn nút "×"
// document.getElementById('close-popup').addEventListener('click', function() {
//     document.getElementById('popup').classList.remove('active');
// });

// Xử lý sự kiện nhập mật khẩu
// const passwordInputs = document.querySelectorAll('.password-input .circle');
// passwordInputs.forEach((input, index) => {
//     input.addEventListener('input', function() {
//         if (input.value.length === 1 && index < passwordInputs.length - 1) {
//             passwordInputs[index + 1].focus();
//         }
//     });
// });

// Xác nhận mật khẩu khi nhấn nút "Xác nhận"
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

// Đóng popup OTP khi nhấn nút "×"
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

//Code table Lịch sử chuyển khoản
// document.addEventListener("DOMContentLoaded", function() {
//     document.getElementById("transfer-button").addEventListener("click", function() {
//         document.getElementById("history-panel").style.display = "block";
//     });

//     getDataTransactions();
// });

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

    const messageCell = document.createElement("td");
    messageCell.textContent = data.message;

    row.appendChild(transactionIDCell);
    row.appendChild(senderPhoneCell);
    row.appendChild(senderNameCell);
    row.appendChild(receiverPhoneCell);
    row.appendChild(receiverNameCell);
    row.appendChild(amountCell);
    row.appendChild(feeCell);
    row.appendChild(dateCell);
    row.appendChild(messageCell);

    tableBody.appendChild(row);
}

// Khởi tạo DOMContentLoaded
document.addEventListener("DOMContentLoaded", function () {
    showSection("transactionHistory");
});

// function getDataTransactions() {
//     $.ajax({
//         type: "GET",
//         url: "http://localhost:8080/transactions",
//         success: function (res) {
//             console.log("API Response:", res);
//             const tableBody = document.getElementById("transactionTableBody");
//             tableBody.innerHTML = "";

//             res.forEach(element => {
//                 addRowTransactions({
//                     transactionID: element.transactionID,
//                     receiverPhone: element.receiverPhone,
//                     receiverName: element.receiverName,
//                     transactionFee: element.transactionFee,
//                     amount: element.amount,
//                     gender: element.gender,
//                     transactionDate: element.transactionDate,
//                     message: element.message,
//                 });
//             });
//         },
//     });
// }

function getDataTransactions() {
    // Lấy thông tin người dùng đang đăng nhập
    const currentUser = sessionStorage.getItem('currentUser');
    if (!currentUser) {
        alert('Bạn chưa đăng nhập!');
        return;
    }
    
    const user = JSON.parse(currentUser);
    const userID = user.accountID; // Lấy accountID của người dùng đang đăng nhập

    $.ajax({
        type: "GET",
        url: "http://localhost:8080/transactions",
        success: function (res) {
            console.log("API Response:", res);
            const tableBody = document.getElementById("transactionTableBody");
            tableBody.innerHTML = "";  // Xóa các giao dịch cũ trong bảng

            // Lọc các giao dịch của người dùng (người chuyển hoặc người nhận)
            const filteredTransactions = res.filter(transaction => {
                return transaction.senderid === userID || transaction.receiverid === userID;
            });

            // Hiển thị các giao dịch đã lọc
            filteredTransactions.forEach(element => {
                addRowTransactions({
                    transactionID: element.transactionID,
                    senderPhone: element.senderPhone,
                    senderName: element.senderName,
                    receiverPhone: element.receiverPhone,
                    receiverName: element.receiverName,
                    transactionFee: element.transactionFee,
                    amount: element.amount,
                    transactionDate: element.transactionDate,
                    message: element.message,
                });
            });
        },
    });
}


function showSection(sectionId) {
    const sections = document.querySelectorAll('.content-section');
    sections.forEach(section => section.style.display = 'none');
    document.getElementById(sectionId).style.display = 'block';
}

// function showClient(clientId) {
//     $.ajax({
//         type: "GET",
//         url: "http://localhost:8080/accounts",
//         success: function (res) {
//             console.log("API Response:", res);
//         },
//     });
// }

document.addEventListener('DOMContentLoaded', () => {
    const currentUser = sessionStorage.getItem('currentUser');
    console.log(currentUser);
    
    if (!currentUser) {
        alert('Bạn chưa đăng nhập!');
        window.location.href = 'account.html'; 
        return;
    }
    const user = JSON.parse(currentUser);
    if (user.type !== 3) {
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
    function formatCurrency(amount) {
        return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + ' VND';
    }

    const formattedBalance = formatCurrency(user.balance);
    document.getElementById('account-balance').value = formattedBalance;
    getDataAccounts();
});

function logout() {
    if (confirm('Bạn chắc chắn muốn đăng xuất?')) {
        window.location.href = "account.html";
    } else {
        return;
    }
    
}

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

function editInfo(idForm) {
    showPopup(idForm);
}

// function transferMoney() {

//     var phoneReceiver = 
//     var amount = 
//     var message = 

// }

// function UpdateEmployeeAccount(employeeId){
//     // Lấy thông tin từ form chỉnh sửa
//     var accountName = $('#tellerEditForm input[name="employee-name"]').val();
//     var address = $('#tellerEditForm input[name="employee-address"]').val();
//     var phone = $('#tellerEditForm input[name="employee-phone"]').val();
//     var email = $('#tellerEditForm input[name="employee-email"]').val();
//     var password = $('#tellerEditForm input[name="employee-password"]').val();
//     var pin = $('#tellerEditForm input[name="employee-pin"]').val();
//     var gender = $('#tellerEditForm select[name="gender-select"]').val();  
//     var status = $('#tellerEditForm select[name="status-select"]').val();
//     var type = $('#tellerEditForm select[name="position-select"]').val();
    
//     var myData = {
//         "accountName": accountName,
//         "address": address,
//         "phone": phone,
//         "email": email,
//         "password": password,
//         "pin": pin,
//         "gender": gender === "true",  
//         "status": status,
//         "type": type,
//     };

//     // Chuyển đối tượng thành JSON
//     var jsonBody = JSON.stringify(myData);

//     // Gửi yêu cầu PUT lên API để cập nhật thông tin khách hàng
//     $.ajax({
//         url: "http://localhost:8080/accounts/" + employeeId,
//         type: "PUT",
//         headers: { 'Accept': '*/*', 'Content-Type': 'application/json' },
//         dataType: "json",
//         data: jsonBody,
//         success: function(response) {
//             console.log('Cập nhật khách hàng thành công:', response);
//             alert('Cập nhật thông tin khách hàng thành công!');
//             closePopup('edit-teller');  // Đóng popup sau khi cập nhật thành công
//             getDataEmployee();  // Cập nhật lại danh sách khách hàng
//         },
//         error: function(xhr, status, error) {
//             console.log("Lỗi khi cập nhật khách hàng:", error);
//             alert('Có lỗi xảy ra, vui lòng thử lại!');
//         }
//     });
// }

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

    const receiverID = receiverAccount.accountID; // Lấy ID của người nhận

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
        amount,
        message,
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

            // Cập nhật số dư cho người chuyển tiền (giảm số dư)
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
function DecryptMessage(transactionID,EncryptedMessage){
    var RSAPrivateKey = sessionStorage.getItem('RSAPrivateKey');
    $.ajax({
        type: "POST",
        url: "http://localhost:8080/transactions/"+transactionID+"/decrypt", 
        headers: { 'Accept': '*/*', 'Content-Type': 'application/json' ,'rsaKeyBase64':RSAPrivateKey},
        dataType: "json",
        data: EncryptedMessage, 
        success: function (res) {
            alert("Giải mã Thành công!");
            console.log("Transaction Response:", res);

        },
        error: function (err) {
            console.error("Transaction Error:", err);
            alert("Giao dịch thất bại! Vui lòng thử lại.");
        },
    });
}
function SetupAccountKeys(accountID){
    $.ajax({
        type: "POST",
        url: "http://localhost:8080/account/"+accountID+"/generateKey", 
        success: function (res) {
            alert("Khỏi tạo khóa thành công!");
            console.log("Key Response:", res);
            sessionStorage.setItem('RSAPrivateKey', res); // Set key vào session
        },
        error: function (err) {
            console.error("Transaction Error:", err);
            alert("Giao dịch thất bại! Vui lòng thử lại.");
        },
    });
}
function UploadKey() {
    const fileInput = document.getElementById("fileInput");

    if (!fileInput.files.length) {
      alert("Please select a file first.");
      return;
    }

    const file = fileInput.files[0];
    const reader = new FileReader();

    reader.onload = function (event) {
      const content = event.target.result;
      sessionStorage.setItem("RSAPrivateKey", content);
      alert("Key uploaded and saved to sessionStorage.");
    };

    reader.onerror = function () {
      alert("Failed to read the file.");
    };

    reader.readAsText(file);
  }

  // Download the key stored in sessionStorage as a text file
  function SaveKey() {
    const key = sessionStorage.getItem("RSAPrivateKey");

    if (!key) {
      alert("No key found in sessionStorage.");
      return;
    }

    // Create a Blob and trigger a download
    const blob = new Blob([key], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "RSAPrivateKey.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    alert("Key downloaded successfully.");
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