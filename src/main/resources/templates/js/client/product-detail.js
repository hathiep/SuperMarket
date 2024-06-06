// JavaScript for fetching product details and handling quantity controls
function getProductIdFromURL() {
    const params = new URLSearchParams(window.location.search);
    return params.get('id');
}

async function fetchProductDetails(productId) {
    try {
        let response = await fetch(`http://localhost:8080/products/getById?id=${productId}`);
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        let product = await response.json();
        document.getElementById("title").textContent = product.name;
        displayProductDetails(product);
    } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
    }
}

function displayProductDetails(product) {
    const container = document.getElementById('product-detail-container');
    let quantityStatus, color = '#28a745', btn_text = ' Thêm vào giỏ hàng', outOfStock = false;

    if (product.quantity === 0) {
        quantityStatus = "Hết hàng";
        btn_text = " Hết hàng";
        color = '#d9534f';
        outOfStock = true;
    } else if (product.quantity < 5) {
        quantityStatus = "Sắp hết hàng";
    } else {
        quantityStatus = "Còn hàng";
    }

    container.innerHTML = `
    <div class="product-detail">
        <img src="${product.image}" alt="${product.name}">
        <div class="product-info">
            <h2>${product.name}</h2>
            <table>
                <tr class="table-row">
                    <td class="product-info-label">Giá bán</td>
                    <td class="product-info-value"><span class="price">${formatPrice(product.price)}đ</span></td>
                </tr>
                <tr class="table-row">
                    <td class="product-info-label">Thể loại</td>
                    <td class="product-info-value"><span class="quantity">${product.category}</span></td>
                </tr>
                <tr class="table-row">
                    <td class="product-info-label">Tình trạng</td>
                    <td class="product-info-value"><span class="quantity">${quantityStatus}</span></td>
                </tr>
                <tr class="table-row">
                    <td class="product-info-label">Số lượng</td>
                    <td class="product-info-value">
                        <div class="quantity-controls">
                            <button class="quantity-btn decrease-btn" onclick="decreaseQuantity()">-</button>
                            <input type="text" id="quantity-input" class="quantity-input" value="1" min="1" max="${product.quantity}" readonly>
                            <button class="quantity-btn increase-btn" onclick="increaseQuantity()">+</button>
                        </div>
                    </td>
                </tr>
            </table>
            <button class="add-to-cart" onclick="addToCart(${outOfStock})" style="background: ${color};">
                <i class="fas fa-shopping-cart"></i> ${btn_text}
            </button>
        </div>
    </div>
    <div class="product-description">
        <h3>Mô tả sản phẩm</h3>
        <p>${product.des}</p>
        <img src="${product.image}" alt="${product.name}">
    </div>
    `;
}



function formatPrice(price) {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

function decreaseQuantity() {
    const quantityInput = document.getElementById('quantity-input');
    let quantity = parseInt(quantityInput.value);
    if (quantity > 1) {
        quantity--;
        quantityInput.value = quantity;
    }
}

function increaseQuantity() {
    const quantityInput = document.getElementById('quantity-input');
    let quantity = parseInt(quantityInput.value);
    const maxQuantity = parseInt(quantityInput.getAttribute('max'));
    if (quantity < maxQuantity) {
        quantity++;
        quantityInput.value = quantity;
    }
    else {
        alert('Đã đạt giới hạn số lượng sản phẩm có sẵn');
    }
}

function addToCart(outOfStock) {
    if (outOfStock) {
        alert("Sản phẩm tạm hết hàng. Vui lòng chọn sản phẩm khác.");
        return;
    }
    const productId = getProductIdFromURL();
    const quantityInput = document.getElementById('quantity-input');
    const quantity = parseInt(quantityInput.value);

    let userData = JSON.parse(localStorage.getItem('currentUser'));
    // Lấy danh sách sản phẩm trong giỏ hàng từ session storage
    let cartItems = JSON.parse(localStorage.getItem('cart' + userData.id)) || [];

    // Tạo một timestamp mới cho mục được thêm vào
    const timestamp = Date.now();

    // Kiểm tra xem sản phẩm đã tồn tại trong giỏ hàng chưa
    const existingItemIndex = cartItems.findIndex(item => item.productId === productId);

    if (existingItemIndex !== -1) {
        // Nếu sản phẩm đã tồn tại, cộng số lượng mới vào số lượng đã lưu
        cartItems[existingItemIndex].quantity += quantity;
    } else {
        // Nếu sản phẩm chưa tồn tại, thêm sản phẩm mới vào danh sách
        cartItems.unshift({ productId: productId, quantity: quantity, timestamp: timestamp });
    }

    // Cập nhật session storage với danh sách sản phẩm mới
    localStorage.setItem('cart' + userData.id, JSON.stringify(cartItems));

    // Thông báo cho người dùng rằng sản phẩm đã được thêm vào giỏ hàng thành công (nếu cần)
    alert('Đã thêm sản phẩm vào giỏ hàng thành công!');

    location.reload();
}




document.addEventListener('DOMContentLoaded', () => {
    const productId = getProductIdFromURL();
    if (productId) {
        fetchProductDetails(productId);
    }
});