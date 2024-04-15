function LoginRegister(){
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
                if(data.role == 0){
                    document.getElementById("result").innerHTML = "Bạn không có quyền truy cập. Vui lòng thử lại!";
                }
                else {
                    localStorage.setItem('currentUser', JSON.stringify(data));
                    // Redirect to welcome page
                    window.location.href = 'manage.html';
                }
            })
            .catch(error => {
                // Handle error
                document.getElementById("result").innerHTML = "Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin !";
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
                document.getElementById("result").innerHTML = "Đăng ký thành công. Vui lòng đăng nhập!";
                // Redirect to login page after successful registration
                window.location.href = "login.html";
            })
            .catch(error => {
                // Handle error
                document.getElementById("result").innerHTML = "Đăng ký thất bại. Vui lòng kiểm tra lại thông tin!";
                console.error('Error:', error);
            });
    });
}