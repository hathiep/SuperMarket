var userData = JSON.parse(localStorage.getItem('currentUser'));

// Display user info
if (userData) {
    document.getElementById("user-info").innerHTML = `
                <p>${userData.name}</p>
            `;
} else {
    document.getElementById("user-info").innerHTML = "<p>Không có thông tin người dùng.</p>";
}
function Logout(){
    const confirmation = confirm("Bạn có muốn đăng xuất không?");

    if (!confirmation) {
        console.log("Hủy đăng xuất");
        return; // Không thực hiện xóa nếu người dùng hủy bỏ
    }
    window.location.href="login.html"
}

function Login(){
    document.getElementById("loginForm").addEventListener("submit", function(event) {
        event.preventDefault();
        var email = document.getElementById("email").value;
        var password = document.getElementById("password").value;
        var data = {
            "email": email,
            "password": password
        };

        fetch('http://localhost:8080/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                // Handle successful login
                document.getElementById("result").innerHTML = "Đăng nhập thành công! Chào mừng " + data.email;
                localStorage.setItem('currentUser', JSON.stringify(data));
                // Redirect to welcome page
                window.location.href = 'manage.html';
            })
            .catch(error => {
                // Handle error
                document.getElementById("result").innerHTML = "Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin đăng nhập.";
                console.error('Error:', error);
            });
    });
}

function Register(){
    document.getElementById("registerForm").addEventListener("submit", function(event) {
        event.preventDefault();
        var name = document.getElementById("name").value;
        var email = document.getElementById("email").value;
        var password = document.getElementById("password").value;
        var data = { "name": name, "email": email, "password": password };

        fetch('http://localhost:8080/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                // Handle successful registration
                document.getElementById("result").innerHTML = "Đăng ký thành công! Vui lòng đăng nhập.";
                // Redirect to login page after successful registration
                window.location.href = "login.html";
            })
            .catch(error => {
                // Handle error
                document.getElementById("result").innerHTML = "Đăng ký thất bại. Vui lòng kiểm tra lại thông tin đăng ký.";
                console.error('Error:', error);
            });
    });
}