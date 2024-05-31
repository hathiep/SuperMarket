// function getAllUser() {
//     fetch('http://localhost:8080/api/get_all_user')
//         .then(response => response.json())
//         .then(data => {
//             const danhsachChitiet = document.querySelector('.danhsach-chitiet');
//             danhsachChitiet.innerHTML = ''; // Xóa nội dung hiện tại của danh sách
//
//             // Duyệt qua mỗi customer và thêm vào danh sách
//             data.forEach(user => {
//                 const li = document.createElement('ul');
//                 li.classList.add('danhsach-item');
//                 li.innerHTML = `
//                     <li style="width:5%; text-align: center;">${user.id}</li>
//                     <li style="width:20%;">${user.name}</li>
//                     <li style="width:10%; text-align: center; height: 30px;">${user.dob}</li>
//                     <li style="width:15%; text-align: right;">${user.gender}</li>
//                     <li style="width:10%; text-align: right;">${user.address}</li>
//                     <li style="width:15%; margin-right: 1%; float:right; text-align:right;">
//                         <a class="lnkXem" name="btnXem${user.id}" data-id="${user.id}" title="Chi tiết" href="detail_customer.html?id=${user.id}">Chi tiết</a>
//                         <a class="lnkSua" name="btnSua${user.id}" data-id="${user.id}" title="Sửa" href="edit_customer.html?id=${user.id}">Sửa</a>
//                         <a class="lnkXoa" name="btnXoa${user.id}" data-id="${user.id}" title="Xoá" onclick="deleteCustomer(${user.id})">Xoá</a>
//                     </li>
//                 `;
//                 danhsachChitiet.appendChild(li);
//             });
//         })
//         .catch(error => console.error('Error fetching data:', error));
// }
function getAllUser() {
    fetch('http://localhost:8080/api/get_all_user')
        .then(response => response.json())
        .then(data => {
            const danhsachChitiet = document.querySelector('.danhsach-chitiet');
            danhsachChitiet.innerHTML = ''; // Xóa nội dung hiện tại của bảng

            // Duyệt qua mỗi customer và thêm vào bảng
            var stt = 1;
            data.forEach(user => {
                const row = document.createElement('tr');
                var gender = 'Khác';
                if(user.gender == 1) gender = 'Nam';
                else if(user.gender == 0) gender = 'Nữ';
                row.innerHTML = `
                    <td class="col col1 center">${stt}</td>
                    <td class="col col1 center">${user.id}</td>
                    <td class="col col3 left">${user.name}</td>
                    <td class="col col2 center">${user.dob}</td>
                    <td class="col col1 center">${gender}</td>
                    <td class="col col3 left">${user.address}</td>
                    <td class="col col1 center">${user.phone}</td>
                    <td class="col col2 center">
                        <a class="lnkXem" name="btnXem${user.id}" data-id="${user.id}" title="Chi tiết" href="detail_customer.html?id=${user.id}">Chi tiết</a>
                        <a class="lnkSua" name="btnSua${user.id}" data-id="${user.id}" title="Sửa" href="edit_customer.html?id=${user.id}">Sửa</a>
                        <a class="lnkXoa" name="btnXoa${user.id}" data-id="${user.id}" title="Xoá" onclick="deleteCustomer(${user.id})">Xoá</a>
                    </td>
                `;
                danhsachChitiet.appendChild(row);
                stt+= 1;
            });
        })
        .catch(error => console.error('Error fetching data:', error));
}
function validatePhoneNumber(phoneNumber) {
    // Biểu thức chính quy kiểm tra số điện thoại
    var phoneRegex = /^\d{10}$/;

    // Kiểm tra xem số điện thoại có khớp với biểu thức chính quy hay không
    return phoneRegex.test(phoneNumber);
}

// function getAllUser() {
//     fetch('http://localhost:8080/api/get_all_user')
//         .then(response => response.json())
//         .then(data => {
//             const danhsachChitiet = document.querySelector('.danhsach-chitiet');
//             danhsachChitiet.innerHTML = ''; // Xóa nội dung hiện tại của danh sách
//
//             // Duyệt qua mỗi customer và thêm vào danh sách
//             data.forEach(user => {
//                 const li = document.createElement('ul');
//                 li.classList.add('danhsach-item');
//                 li.innerHTML = `
//                     <li style="width:5%; text-align: center;">${user.id}</li>
//                     <li style="width:20%;">${user.name}</li>
//                     <li style="width:10%; text-align: center; height: 30px;">${user.dob}</li>
//                     <li style="width:15%; text-align: right;">${user.gender}</li>
//                     <li style="width:10%; text-align: right;">${user.address}</li>
//                     <li style="width:15%; margin-right: 1%; float:right; text-align:right;">
//                         <a class="lnkXem" name="btnXem${user.id}" data-id="${user.id}" title="Chi tiết" href="detail_customer.html?id=${user.id}">Chi tiết</a>
//                         <a class="lnkSua" name="btnSua${user.id}" data-id="${user.id}" title="Sửa" href="edit_customer.html?id=${user.id}">Sửa</a>
//                         <a class="lnkXoa" name="btnXoa${user.id}" data-id="${user.id}" title="Xoá" onclick="deleteCustomer(${user.id})">Xoá</a>
//                     </li>
//                 `;
//                 danhsachChitiet.appendChild(li);
//             });
//         })
//         .catch(error => console.error('Error fetching data:', error));
// }
function searchUser() {
    var keyword = document.getElementById("txtSearch").value;
    fetch('http://localhost:8080/api/user/search?keyword=' + keyword)
        .then(response => response.json())
        .then(data => {
            const danhsachChitiet = document.querySelector('.danhsach-chitiet');
            danhsachChitiet.innerHTML = ''; // Xóa nội dung hiện tại của bảng

            // Duyệt qua mỗi customer và thêm vào bảng
            var stt = 1;
            data.forEach(user => {
                const row = document.createElement('tr');
                var gender = 'Khác';
                if(user.gender == 1) gender = 'Nam';
                else if(user.gender == 0) gender = 'Nữ';
                row.innerHTML = `
                    <td class="col col1 center">${stt}</td>
                    <td class="col col1 center">${user.id}</td>
                    <td class="col col3 left">${user.name}</td>
                    <td class="col col2 center">${user.dob}</td>
                    <td class="col col2 center">${gender}</td>
                    <td class="col col3 left">${user.address}</td>
                    <td class="col col2 center">
                        <a class="lnkXem" name="btnXem${user.id}" data-id="${user.id}" title="Chi tiết" href="detail_customer.html?id=${user.id}">Chi tiết</a>
                        <a class="lnkSua" name="btnSua${user.id}" data-id="${user.id}" title="Sửa" href="edit_customer.html?id=${user.id}">Sửa</a>
                        <a class="lnkXoa" name="btnXoa${user.id}" data-id="${user.id}" title="Xoá" onclick="deleteCustomer(${user.id})">Xoá</a>
                    </td>
                `;
                danhsachChitiet.appendChild(row);
                stt+= 1;
            });
        })
        .catch(error => console.error('Error fetching data:', error));
}
function addUser() {
    var name = document.getElementById("input_name").value;
    var dob = document.getElementById("input_dob").value;
    var gender = document.getElementById("input_gender").value;
    var gd = 2;
    if(gender == 'Nam') gd = 1;
    else if(gender =='Nữ') gd = 0;
    var address = document.getElementById("input_address").value;
    var email = document.getElementById("input_email").value;
    var phone = document.getElementById("input_phone").value;

    if (name.length == "" || dob.length == "" || address.length == "" || email.length == "" || phone.length == "") {
        alert("Vui lòng điền đầy đủ thông tin!");
        return;
    }

    if (name.length > 255 || address.length > 255 || email.length > 255) {
        alert("Giá trị nhập vượt quá giới hạn cho phép (255 ký tự). Vui lòng nhập lại! ");
        return;
    }

    if (!validatePhoneNumber(phone)) {
        alert('Số điện thoại không hợp lệ! Vui lòng nhập 10 chữ số!');
        return; // Dừng hàm nếu có lỗi
    }

    var raw = {
        "name": name,
        "dob": dob,
        "gender": gd,
        "address": address,
        "email": email,
        "phone": phone
    };

    var requestOptions = {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(raw)
    };

    fetch('http://localhost:8080/api/add_customer', requestOptions)
        .then((response) => {
            if (!response.ok) {
                return response.json().then(errorData => {
                    throw new Error(errorData.message || 'Network response was not ok');
                });
            }
            return response.json();
        })
        .then(data => {
            console.log(data);
            alert('Thêm khách hàng thành công!');
            window.location.href = 'manage_customer.html';
        })
        .catch(error => {
            console.error(error.message);
            alert(error.message);
        });
}
function getDetailCustomer(id){

    fetch("http://localhost:8080/api/user?user_id=" + id)
        .then(response => response.json())
        .then(user => {
            var gender = 'Khác';
            if(user.gender == 1) gender = 'Nam';
            else if(user.gender == 0) gender = 'Nữ';
            document.getElementById("user_id").textContent = id;
            document.getElementById("input_name").value = user.name;
            document.getElementById("input_dob").value = user.dob;
            document.getElementById("input_gender").value = gender;
            document.getElementById("input_address").value = user.address;
            document.getElementById("input_email").value = user.email;
            document.getElementById("input_phone").value = user.phone;
        })
        .catch(error => console.error('Error:', error));

}

function editCustomer(){

    var id = document.getElementById("user_id").textContent;
    var name = document.getElementById("input_name").value;
    var dob = document.getElementById("input_dob").value;
    var gender = document.getElementById("input_gender").value;
    var gd = 2;
    if(gender == 'Nam') gd = 1;
    else if(gender =='Nữ') gd = 0;
    var address = document.getElementById("input_address").value;
    var email = document.getElementById("input_email").value;
    var phone = document.getElementById("input_phone").value;

    if (name.length == "" || dob.length == "" || address.length == "" || phone.length == "") {
        alert("Vui lòng điền đầy đủ thông tin!");
        return;
    }

    if (name.length > 255 || address.length > 255) {
        alert("Giá trị nhập vượt quá giới hạn cho phép (255 ký tự). Vui lòng nhập lại! ");
        return;
    }

    if (!validatePhoneNumber(phone)) {
        alert('Số điện thoại không hợp lệ! Vui lòng nhập 10 chữ số!');
        return; // Dừng hàm nếu có lỗi
    }

    var raw = {
        "id": id,
        "name": name,
        "dob": dob,
        "gender": gd,
        "address": address,
        "email": email,
        "phone": phone
    };

    var requestOptions = {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(raw)
    };

    fetch('http://localhost:8080/api/edit_customer', requestOptions)
        .then((response) => {
            if (!response.ok) {
                return response.json().then(errorData => {
                    throw new Error(errorData.message || 'Network response was not ok');
                });
            }
            return response.json();
        })
        .then(data => {
            console.log(data);
            alert('Sửa thông tin khách hàng thành công!');
            window.location.href = 'manage_customer.html';
        })
        .catch(error => {
            console.error(error.message);
            alert(error.message);
        });

}
function deleteCustomer(id) {
    // Hỏi người dùng xác nhận trước khi xóa
    const confirmation = confirm("Bạn có muốn xóa khách hàng có ID " + id + " không?");

    if (!confirmation) {
        console.log("Hủy bỏ xóa khách hàng.");
        return; // Không thực hiện xóa nếu người dùng hủy bỏ
    }

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    const urlencoded = new URLSearchParams();
    urlencoded.append("id", id);

    const requestOptions = {
        method: "DELETE",
        headers: myHeaders,
        body: urlencoded,
        redirect: "follow"
    };

    fetch('http://localhost:8080/api/delete_customer?id=' + id, requestOptions)
        .then((response) => response.text())
        .then((result) => {
            alert("Khách hàng có ID " + id + " đã được xóa thành công.");
            location.reload();
        })
        .catch((error) => console.error(error));
}