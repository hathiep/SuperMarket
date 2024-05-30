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
                    return response.json().then(errorData => {
                        throw new Error(errorData.message || 'Network response was not ok');
                    });
                }
                return response.json();
            })
            .then(data => {
                localStorage.setItem('currentUser', JSON.stringify(data));
                // Handle successful login
                if(data.role == 0){
                    window.location.href = 'client/home.html';
                }
                else {
                    // Redirect to welcome page
                    window.location.href = 'server/manage.html';
                }
            })
            .catch(error => {
                // Handle error
                document.getElementById("result").innerHTML = error.message;
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
                    return response.json().then(errorData => {
                        throw new Error(errorData.message || 'Network response was not ok');
                    });
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
                document.getElementById("result").innerHTML = error.message;
            });
    });
}