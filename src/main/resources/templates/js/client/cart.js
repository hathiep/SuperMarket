let userData = JSON.parse(localStorage.getItem('currentUser'));
document.addEventListener('DOMContentLoaded', () => {
    // Lấy danh sách sản phẩm từ localStorage
    let cartItems = JSON.parse(localStorage.getItem('cart'  + userData.id)) || [];

    // Sắp xếp danh sách sản phẩm theo thứ tự gần nhất đến lâu nhất
    cartItems.sort((a, b) => {
        return b.timestamp - a.timestamp; // Sử dụng timestamp để sắp xếp
    });

    document.getElementById('total').style.display = "none";

    // Kiểm tra nếu giỏ hàng không có sản phẩm
    if (cartItems.length === 0) {
        document.getElementById('controls').style.display = "none";
        document.getElementById('cart-items-container').innerHTML = '<h3 style="margin-left: 20px">Giỏ hàng của bạn đang trống</h3>';
        return;
    }
    document.getElementById('controls').style.display = "block";

    // Hiển thị danh sách sản phẩm trong giỏ hàng
    const container = document.getElementById('cart-items-container');

    // Lặp qua từng sản phẩm trong giỏ hàng
    cartItems.forEach(item => {
        // Gọi API để lấy thông tin sản phẩm dựa trên ID
        fetch(`http://localhost:8080/products/getById?id=${item.productId}`)
            .then(response => response.json())
            .then(product => {
                // Lấy giá của sản phẩm từ product và chuyển đổi sang kiểu integer
                const price = parseInt(product.price);

                // Hiển thị thông tin sản phẩm trong giỏ hàng
                const cartItemHTML = `
                        <div class="cart-item" data-product-id="${product.id}" data-product-price="${price}">
                            <input type="checkbox" class="check-box" onchange="updateTotalCost()">
                            <img class="product-info product-image" src="${product.image}" alt="${product.name}">
                            <h3 class="product-info product-name">${product.name}</h3>
                            <p class="product-info product-category">${product.category}</p>
                            <p class="product-info product-price">${formatPrice(price)}đ</p>
                            <div class="product-info quantity-controls">
                                <button class="quantity-btn decrease-btn" onclick="decreaseQuantity('quantity-input${product.id}')">-</button>
                                <input type="text" id="quantity-input${product.id}" class="quantity-input" value="${item.quantity}" min="1" max="${product.quantity}" readonly onchange="updateTotalCost()">
                                <button class="quantity-btn increase-btn" onclick="increaseQuantity('quantity-input${product.id}')">+</button>
                            </div>
                            <button class="product-info remove-btn" onclick="removeCartItem('${product.id}')">Xoá</button>
                        </div>
                    `;
                container.insertAdjacentHTML('beforeend', cartItemHTML);
            })
            .catch(error => {
                console.error('Error fetching product:', error);
                // Xử lý lỗi khi không thể lấy được thông tin sản phẩm từ API
                container.innerHTML = '<p>Có lỗi xảy ra khi lấy thông tin sản phẩm</p>';
            });
    });

});


function decreaseQuantity(quantity_input) {
    const quantityInput = document.getElementById(quantity_input);
    let quantity = parseInt(quantityInput.value);
    if (quantity > 1) {
        quantity--;
        quantityInput.value = quantity;
    }
    updateTotalCost(); // Gọi hàm updateTotalCost() sau khi giảm số lượng
}

function increaseQuantity(quantity_input) {
    const quantityInput = document.getElementById(quantity_input);
    let quantity = parseInt(quantityInput.value);
    const maxQuantity = parseInt(quantityInput.getAttribute('max'));
    if (quantity < maxQuantity) {
        quantity++;
        quantityInput.value = quantity;
    }
    updateTotalCost(); // Gọi hàm updateTotalCost() sau khi tăng số lượng
}

function removeCartItem(productId) {
    // Confirm deletion with an alert
    const confirmation = confirm("Bạn có chắc chắn muốn xoá sản phẩm này khỏi giỏ hàng?");
    if (!confirmation) {
        return; // If user cancels, do nothing
    }

    // Xóa sản phẩm khỏi localStorage
    let cartItems = JSON.parse(localStorage.getItem('cart' + userData.id));
    cartItems = cartItems.filter(item => item.productId !== productId);
    localStorage.setItem('cart' + userData.id, JSON.stringify(cartItems));

    // Xóa sản phẩm khỏi DOM
    const cartItemElement = document.querySelector(`.cart-item[data-product-id="${productId}"]`);
    if (cartItemElement) {
        cartItemElement.remove();
    }

    // Hiển thị thông báo xoá thành công
    alert("Đã xoá sản phẩm khỏi giỏ hàng.");

    // Kiểm tra nếu giỏ hàng trống sau khi xoá
    if (cartItems.length === 0) {
        document.getElementById('cart-items-container').innerHTML = '<h3>Giỏ hàng của bạn đang trống</h3>';
    }

    updateTotalCost(); // Gọi hàm updateTotalCost() sau khi xoá sản phẩm
}

function selectAll() {
    const selectButton = document.getElementById("button-select");
    const checkboxes = document.querySelectorAll('.check-box');

    // Kiểm tra trạng thái hiện tại của nút
    if (selectButton.textContent === "Chọn tất cả") {
        // Nếu nút hiện đang là "Chọn tất cả", thay đổi nút thành "Bỏ chọn tất cả" và chọn tất cả các checkbox
        selectButton.textContent = "Bỏ chọn tất cả";
        checkboxes.forEach(checkbox => {
            checkbox.checked = true;
        });
    } else {
        // Ngược lại, nếu nút hiện đang là "Bỏ chọn tất cả", thay đổi nút thành "Chọn tất cả" và bỏ chọn tất cả các checkbox
        selectButton.textContent = "Chọn tất cả";
        checkboxes.forEach(checkbox => {
            checkbox.checked = false;
        });
    }
    updateTotalCost(); // Gọi hàm updateTotalCost() sau khi thay đổi trạng thái checkbox
}

function deleteAll() {
    const confirmation = confirm("Bạn có chắc chắn muốn xoá tất cả sản phẩm khỏi giỏ hàng?");
    if (!confirmation) {
        return; // If user cancels, do nothing
    }
    let cartItems = null;
    localStorage.setItem('cart' + userData.id, JSON.stringify(cartItems));
    document.getElementById('cart-items-container').innerHTML = '<p>Giỏ hàng của bạn đã được xoá.</p>';
    document.getElementById('cart-items-container')
    updateTotalCost();
    location.reload();
}

function updateTotalCost() {
    const checkboxes = document.querySelectorAll('.check-box');
    let newTotalCost = 0;

    checkboxes.forEach(checkbox => {
        if (checkbox.checked) {
            const cartItem = checkbox.closest('.cart-item');
            const priceElement = cartItem.querySelector('.product-price');
            const price = parseInt(priceElement.innerText.replace(/[.đ]/g, '')); // Loại bỏ dấu chấm và ký tự "đ" từ giá
            const quantityInput = cartItem.querySelector('.quantity-input');
            const quantity = parseInt(quantityInput.value);
            newTotalCost += price * quantity;
        }
    });

    if (newTotalCost === 0) {
        document.getElementById('total').style.display = "none";
    }
    else document.getElementById('total').style.display = "flex";

    // Định dạng giá trị mới theo formatPrice và hiển thị tổng giá trị
    const formattedTotalCost = formatPrice(newTotalCost);
    document.getElementById('total-cost').textContent = formattedTotalCost + "đ";
}

function purchase() {
    const checkboxes = document.querySelectorAll('.check-box');
    const selectedItems = [];

    checkboxes.forEach(checkbox => {
        if (checkbox.checked) {
            const cartItem = checkbox.closest('.cart-item');
            const productId = cartItem.getAttribute('data-product-id');
            const price = parseInt(cartItem.getAttribute('data-product-price')); // Lấy giá từ card-item
            const quantityInput = cartItem.querySelector('.quantity-input');
            const quantity = parseInt(quantityInput.value);
            selectedItems.push({ productId, price, quantity }); // Lưu giá vào selectedItems
        }
    });

    // Lưu danh sách sản phẩm được chọn vào session
    localStorage.setItem('selectedItems', JSON.stringify(selectedItems));

    // Redirect đến trang purchase.html
    window.location.href = 'purchase.html';
}