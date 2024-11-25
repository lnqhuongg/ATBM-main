document.getElementById('register-link').addEventListener('click', function(event) {
    event.preventDefault();
    document.getElementById('login-box').style.display = 'none';
    document.getElementById('register-box').style.display = 'block';
});

document.getElementById('login-link').addEventListener('click', function(event) {
    event.preventDefault();
    document.getElementById('register-box').style.display = 'none';
    document.getElementById('login-box').style.display = 'block';
});

function validateGmail(email) {
    const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;

    if (gmailRegex.test(email)) {
        return true;
    } else {
        return false;
    }
}

function validateRegisterForm(phone, email, pin, password, confirmPassword) {
    // let isValid = true;

    // Validate email
    const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    if (!gmailRegex.test(email)) {
        alert("Email không hợp lệ! Vui lòng nhập email có định dạng @gmail.com.");
        // isValid = false;
        return false;
    }

    // Validate số điện thoại
    const phoneRegex = /^(0|\+84)[0-9]{9}$/;
    if (!phoneRegex.test(phone)) {
        alert("Số điện thoại không hợp lệ! Vui lòng nhập số bắt đầu bằng 0 hoặc +84 và có đúng 10 chữ số.");
        // isValid = false;
        return false;
    }

    // Validate mã PIN
    const pinRegex = /^[0-9]{6}$/; // Mã PIN có đúng 6 chữ số
    if (!pinRegex.test(pin)) {
        alert("Mã PIN không hợp lệ! Vui lòng nhập mã PIN gồm đúng 6 chữ số.");
        // isValid = false;
        return false;
    }

    // Validate password và confirm password
    if (password !== confirmPassword) {
        alert("Mật khẩu và Xác nhận mật khẩu không khớp!");
        // isValid = false;
        return false;
    }

    return true;
}

$("#login-form").submit(function(e) {
    e.preventDefault();
    var email = $('#login-form input[name="login-email"]').val().trim();
    var password = $('#login-form input[name="login-password"]').val().trim();
    
    var myData = {
        "email": email,
        "password": password,
    }
    console.log(myData);
    var jsonBody =  JSON.stringify(myData);

    if (validateGmail(email)) {
        $.ajax({
            type: "POST",
            url: "http://localhost:8080/accounts/login",
            headers: { 'Accept': '*/*', 'Content-Type': 'application/json'},
            dataType: "json",
            data: jsonBody,
            success: function(response) {
                console.log(response);
                    if(response.type == 3) {
                        console.log('Đăng nhập thành công'); 
                        alert('Đăng nhập tài khoản thành công!');
                        window.location.href = "Client.html";
                        sessionStorage.setItem('currentUser', JSON.stringify(response)); 
                    } else if (response.type == 1) {
                        console.log('Đăng nhập thành công'); 
                        alert('Đăng nhập tài khoản thành công!');
                        window.location.href = "admin.html";
                        sessionStorage.setItem('currentUser', JSON.stringify(response)); 
                    } else if (response.type == 2) {
                        console.log('Đăng nhập thành công'); 
                        alert('Đăng nhập tài khoản thành công!');
                        window.location.href = "Teller.html";
                        sessionStorage.setItem('currentUser', JSON.stringify(response)); 
                    }
            },
            error: function(xhr, status, error) {
                if (xhr.status === 401) { // Nếu backend trả về HTTP 401
                    alert('Có lỗi xảy ra, vui lòng thử lại sau!');
                } else {
                    alert('Sai thông tin đăng nhập, vui lòng kiểm tra lại!');
                }
                console.log('Error:', error);
            }
        });
    } else {
        alert('Vui lòng nhập đúng định dạng email (...@gmail.com)')
    }
});

$("#register-form").submit(function(e) {
    e.preventDefault();
    var accountName = $('#register-form input[name="register-accountName"]').val().trim();
    var phone = $('#register-form input[name="register-phone"]').val().trim();
    var email = $('#register-form input[name="register-email"]').val().trim();
    var address = $('#register-form input[name="register-address"]').val().trim();
    var pin = $('#register-form input[name="register-pin"]').val().trim();
    var password = $('#register-form input[name="register-password"]').val().trim();
    var confirmPassword = $('#register-form input[name="register-confirm-password"]').val().trim();
    var gender = $('#register-form input[name="gender-select"]').val();

    var myData = {
        "accountName": accountName,
        "email": email,
        "password": password,
        "phone": phone,
        "address": address,
        "pin": pin,
        "confirmPassword": confirmPassword,
        "gender": gender,
        "type": 3,
        "status": 1,
    }

    console.log(myData);
    var jsonBody =  JSON.stringify(myData);

    if (validateRegisterForm(phone, email, pin, password, confirmPassword)) {
        $.ajax({
            url: "http://localhost:8080/accounts",
            type: "POST",
            headers: { 'Accept': '*/*', 'Content-Type': 'application/json'},
            dataType: "json",
            data: jsonBody,
            success: function(response) {
                console.log('Ok'); 
                alert('Tạo tài khoản thành công!'); 
                window.location.href = "account.html";
            },
            error: function(xhr, status, error) {
                if (xhr.status === 401) { // Nếu backend trả về HTTP 401
                    alert('Có lỗi xảy ra, vui lòng thử lại sau!');
                } else {
                    alert('Sai thông tin đăng nhập, vui lòng kiểm tra lại!');
                }
                console.log('Error:', error);
            }
        });
    }
});


