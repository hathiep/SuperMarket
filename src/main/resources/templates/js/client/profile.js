const userData = JSON.parse(localStorage.getItem('currentUser'));
var gender = 'Khác';
if(userData.gender == 1) gender = 'Nam';
else if(userData.gender == 0) gender = 'Nữ';
document.getElementById("title").textContent = userData.name;
document.getElementById("input_name").value = userData.name;
document.getElementById("input_dob").value = userData.dob;
document.getElementById("input_gender").value = gender;
document.getElementById("input_address").value = userData.address;
document.getElementById("input_email").value = userData.email;
document.getElementById("input_phone").value = userData.phone;

// JavaScript mới để xử lý sự kiện khi click vào các mục menu
const menuItems = document.querySelectorAll('.menu-item');
menuItems.forEach(item => {
    item.addEventListener('click', function() {
        // Xóa lớp active khỏi tất cả các mục menu
        menuItems.forEach(menuItem => {
            menuItem.classList.remove('active');
        });
        // Thêm lớp active vào mục menu được chọn
        this.classList.add('active');

        const target = this.getAttribute('data-target');
        const infoSections = document.querySelectorAll('.info');
        infoSections.forEach(section => {
            if (section.classList.contains(target)) {
                section.style.display = 'block';
            } else {
                section.style.display = 'none';
            }
        });

        // Nếu mục được chọn là "Danh sách đơn hàng", gọi hàm loadOrders
        if (target === 'order-list') {
            loadOrders();
        }
    });
});

function editCustomer(){
    var id = userData.id;
    var name = document.getElementById("input_name").value;
    var dob = document.getElementById("input_dob").value;
    var gender = document.getElementById("input_gender").value;
    var gd = 2;
    if(gender == 'Nam') gd = 1;
    else if(gender =='Nữ') gd = 0;
    var address = document.getElementById("input_address").value;
    var email = userData.email;
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
            alert('Sửa thông tin thành công!');
            localStorage.setItem('currentUser', JSON.stringify(data));
            location.reload();
        })
        .catch(error => {
            console.error(error.message);
            alert(error.message);
        });

}

async function loadOrders() {
    fetch(`http://localhost:8080/api/statistic_detail?customer_id=${userData.id}&startDate=0&endDate=0`)
        .then(response => response.json())
        .then(async data => {
            const orderListContainer = document.querySelector('.order-list');
            orderListContainer.innerHTML = ''; // Xóa nội dung cũ nếu có
            if (data.length === 0) {
                orderListContainer.innerHTML = '<p>Không có đơn hàng nào.</p>';
            } else {
                for (const order of data) {
                    var total_cost = await getOrderTotalCost(order.id);
                    var status = getStatus(order.shipment, order.payment);
                    const orderCard = document.createElement('div');

                    orderCard.className = 'order-card';
                    if (status == 'Đã hoàn thành') {
                        orderCard.classList.add('completed');
                    }

                    orderCard.innerHTML = `
                            <h3>Order ID: ${order.id}</h3>
                            <p>Ngày đặt: ${order.date}</p>
                            <p>Tổng số tiền: ${total_cost} đ</p>
                            <p>Trạng thái: ${status}</p>
                        `;

                    orderListContainer.appendChild(orderCard);

                    orderCard.addEventListener('click', async function() {
                        await createPopupContent(order);
                        document.getElementById('popup-overlay').style.display = 'flex';
                    });
                }

            }
        })
        .catch(error => {
            console.error('Error fetching orders:', error);
            alert('Có lỗi xảy ra khi tải danh sách đơn hàng.');
        });
}
async function getOrderTotalCost(orderId) {
    try {
        const response = await fetch("http://localhost:8080/api/item/get-order-totalcost?order_id=" + orderId);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error:', error);
        return null;
    }
}

// Function to create the popup content
async function createPopupContent(order) {
    const shipmentStatus = getShipment(order.shipment);
    const paymentStatus = getPayment(order.payment);
    const status = getStatus(order.shipment, order.payment);

    const content = `
        <h3>Order ID: ${order.id}</h3>
        <p>Ngày đặt: ${order.date}</p>
        <p>Trạng thái giao hàng: ${shipmentStatus}</p>
        <p>Trạng thái thanh toán: ${paymentStatus}</p>
        <p>Trạng thái đơn hàng: ${status}</p>
        <h4>Danh sách sản phẩm trong đơn hàng:</h4>
        <div style="max-height: 400px; overflow:auto; position: relative;">
        <table class="sort-table" id="item_table" style="width: 100%">
            <thead style="position: sticky; top: 0;">
            <tr>
                <th class="table-header col col1 center">STT</th>
                <th class="table-header col col7 center">Tên sản phẩm</th>
                <th class="col col2 center">Ảnh</th>
                <th class="table-header col col3 center">Danh mục</th>
                <th class="table-header col col2 center">Số lượng</th>
                <th class="table-header col col2 center">Đơn giá</th>
                <th class="table-header col col5 center">Thành tiền</th>
                <th class="col col8 center">Thao tác</th>
            </tr>
            </thead>
            <tbody id="item_table_body"></tbody>
            <tfoot id="item_table_foot" style="position: sticky; bottom: 0;">
            <tr>
                <td colspan="6" class="col left">Tổng thanh toán:</td>
                <td id="total_cost_footer" class="col col5 right"></td>
                <td class="col col8"></td>
            </tr>
            </tfoot>
        </table>
    </div>
    `;
    document.getElementById('popup-content').innerHTML = content;
    getAllItemByOrderId(order.id);
}

// Event listener for order cards
function addOrderCardEventListeners(order) {
    const orderCards = document.querySelectorAll('.order-card');
    orderCards.forEach(card => {
        card.addEventListener('click', async function() {
            const orderId = this.querySelector('h3').textContent.split(': ')[1];
            const order = await fetchOrderDetails(orderId); // Fetch full order details
            await createPopupContent(order);
            document.getElementById('popup-overlay').style.display = 'flex';
        });
    });
}

// Function to fetch full order details
async function fetchOrderDetails(orderId) {
    try {
        const response = await fetch(`http://localhost:8080/api/orders/${orderId}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching order details:', error);
        return {};
    }
}

// Close button event listener
document.getElementById('close-btn').addEventListener('click', function() {
    document.getElementById('popup-overlay').style.display = 'none';
});

async function getAllItemByOrderId(id){
    try {
        var apiUrl = "http://localhost:8080/api/items/search?order_id=" + id;
        const response = await fetch(apiUrl);
        const data = await response.json();
        var itemTableBody  = document.getElementById("item_table_body");
        itemTableBody.innerHTML = "";
        var stt = 1;
        var total = 0;
        var quantity = 0;
        document.getElementById("total_cost_footer").textContent = total + " đ";
        for (const item of data) {
            const product = await fetchProductInfo(item.product_id);
            console.log(product);
            var row = "<tr>";
            row += "<td class='col col1 center'>" + stt + "</td>";
            row += "<td class='col col7 left'>" + product.name + "</td>";
            row += `<td class='col col2 center'><img style="height: 50px; width: auto" src="${product.image}" alt="${product.name}"></td>`;
            row += "<td class='col col3 center'>" + product.category +  "</td>";
            row += "<td class='col col2 right'>" + item.quantity + "</td>";
            row += "<td class='col col2 right'>" + item.price + " đ" + "</td>";
            row += "<td class='col col5 right'>" + item.quantity * item.price + " đ" + "</td>";
            row += "<td class='col col8 center'><a class='lnkXem' href='/Supermarket/src/main/resources/templates/html/client/product-detail.html?id=" + item.product_id + "'>Chi tiết</a></td>";
            row += "</tr>";
            itemTableBody.innerHTML += row;
            stt+= 1;
            quantity+= item.quantity;
            total+= item.quantity * item.price;
            document.getElementById("total_cost_footer").textContent = total + " đ";
        }
    } catch (error) {
        console.error('Error fetching products:', error);
    }
}

async function fetchProductInfo(productId) {
    try {
        let response = await fetch(`http://localhost:8080/products/getById?id=${productId}`);
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        let product = await response.json();
        return product;
    } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
    }
}

function validatePhoneNumber(phoneNumber) {
    // Biểu thức chính quy kiểm tra số điện thoại
    var phoneRegex = /^\d{10}$/;

    // Kiểm tra xem số điện thoại có khớp với biểu thức chính quy hay không
    return phoneRegex.test(phoneNumber);
}

function getShipment(i){
    if(i == 0) return 'Đang đóng gói';
    if(i == 1) return 'Đang vận chuyển';
    return 'Đã giao hàng';
}
function getPayment(i){
    if(i == 0) return 'Chưa thanh toán';
    return 'Đã thanh toán';
}
function getStatus(a, b){
    if(a == 2 && b == 1) return 'Đã hoàn thành';
    return 'Đang xử lý';
}

document.querySelector('.menu-item[data-target="logout"]').addEventListener('click', function() {
    document.getElementById('logout-popup-overlay').style.display = 'flex';
});

document.getElementById('confirm-logout-btn').addEventListener('click', function() {
    // Xóa user từ session
    localStorage.removeItem('currentUser');
    // Điều hướng đến trang login
    window.location.href = '/Supermarket/src/main/resources/templates/html/login.html';
});

document.getElementById('cancel-logout-btn').addEventListener('click', function() {
    document.getElementById('logout-popup-overlay').style.display = 'none';
});