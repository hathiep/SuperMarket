document.addEventListener('DOMContentLoaded', () => {
    const selectedItems = JSON.parse(localStorage.getItem('selectedItems')) || [];
    const container = document.getElementById('selected-items-container');
    let total_cost = 0;

    // Tạo một mảng các Promise cho tất cả các yêu cầu fetch
    const fetchPromises = selectedItems.map(item => {
        return fetch(`http://localhost:8080/products/getById?id=${item.productId}`)
            .then(response => response.json())
            .then(product => {
                // Hiển thị thông tin sản phẩm đã chọn
                const selectedProductHTML = `
                    <div class="cart-item" data-product-id="${product.id}">
                        <img class="product-info product-image" src="${product.image}" alt="${product.name}">
                        <h3 class="product-info product-name">${product.name}</h3>
                        <p class="product-info product-category">${product.category}</p>
                        <p class="product-info product-price">Đơn giá: ${formatPrice(product.price)}đ</p>
                        <p class="product-info product-quantity">Số lượng: ${item.quantity}</p>
                    </div>
                `;
                container.insertAdjacentHTML('beforeend', selectedProductHTML);
                // Cộng dồn giá trị vào total_cost
                total_cost += (product.price * item.quantity);
            })
            .catch(error => {
                console.error('Error fetching product:', error);
                // Xử lý lỗi khi không thể lấy được thông tin sản phẩm từ API
                container.innerHTML = '<p>Có lỗi xảy ra khi lấy thông tin sản phẩm</p>';
            });
    });

    // Sử dụng Promise.all để đợi tất cả các yêu cầu fetch hoàn thành
    Promise.all(fetchPromises).then(() => {
        // Hiển thị tổng chi phí sau khi tất cả sản phẩm đã được tải về và tính toán xong
        const totalPurchaseHTML = `
            <div class="purchase" id="total">
                <h2 id="label">Tổng thanh toán:</h2>
                <h3 id="total-cost">${formatPrice(total_cost)} đ</h3>
                <button class="control-btn confirm-btn" id="button-confirm" onClick="saveOrder()">Đặt hàng</button>
            </div>
        `;
        container.insertAdjacentHTML('beforeend', totalPurchaseHTML);
    });
});

function saveOrder(){
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser) {
        alert("Vui lòng đăng nhập trước khi đặt hàng!");
        return;
    }

    const order = {
        customer_id: currentUser.id,
        date: new Date().toISOString().split('T')[0], // Format the date as YYYY-MM-DD
        shipment: 0, // Assuming a static shipment ID, you can modify this as needed
        payment: 0, // Assuming a static payment ID, you can modify this as needed
    };

    // Tạo đơn hàng mới
    fetch('http://localhost:8080/api/order/create', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(order)
    })
        .then(response => response.json())
        .then(data => {
            console.log('Order saved successfully:', data);

            // Lưu các mục hàng của đơn hàng
            const orderItems = JSON.parse(localStorage.getItem('selectedItems')) || [];
            const orderId = data.id; // Lấy ID của đơn hàng vừa tạo

            const itemPromises = orderItems.map(item => {
                const orderItem = {
                    order_id: orderId,
                    product_id: item.productId,
                    price: item.price, // Giá của sản phẩm đã lưu trên session
                    quantity: item.quantity // Số lượng mua của sản phẩm đã lưu trên session
                };

                // Tạo một mục hàng mới
                return fetch('http://localhost:8080/api/item/create', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(orderItem)
                });
            });

            // Chờ tất cả các yêu cầu POST hoàn thành
            Promise.all(itemPromises)
                .then(() => {
                    alert('Đặt hàng thành công. Đơn hàng sẽ được giao đến bạn trong thời gian sớm nhất!');
                    // Xóa các mục hàng đã đặt khỏi session storage
                    let cart = JSON.parse(localStorage.getItem('cart' + currentUser.id)) || [];
                    orderItems.forEach(orderedItem => {
                        cart = cart.filter(cartItem => cartItem.productId !== orderedItem.productId);
                    });
                    localStorage.setItem('cart' + currentUser.id, JSON.stringify(cart));
                    // Bạn có thể chuyển hướng người dùng hoặc làm bất kỳ điều gì khác cần thiết ở đây
                    window.location.href = 'home.html';
                })
                .catch(error => {
                    console.error('Error saving order items:', error);
                    alert('There was an error placing your order. Please try again.');
                });
        })
        .catch(error => {
            console.error('Error saving order:', error);
            alert('There was an error placing your order. Please try again.');
        });
}