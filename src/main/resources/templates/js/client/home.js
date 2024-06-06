document.addEventListener('DOMContentLoaded', function () {

    // Existing fetchProducts function
    async function fetchProducts(url) {
        try {
            let response = await fetch(url);
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            let products = await response.json();
            displayProducts(products);
        } catch (error) {
            console.error('There has been a problem with your fetch operation:', error);
        }
    }

    function displayProducts(products) {
        const container = document.getElementById('product-container');
        container.innerHTML = '';
        products.forEach(product => {
            const productCard = document.createElement('div');
            productCard.className = 'product-card';
            productCard.setAttribute('data-id', product.id);
            let quantityStatus;
            if (product.quantity === 0) {
                quantityStatus = "Hết hàng";
            } else if (product.quantity < 5) {
                quantityStatus = "Sắp hết hàng";
            } else {
                quantityStatus = "Còn hàng";
            }
            productCard.innerHTML = `
                    <img src="${product.image}" alt="${product.name}">
                    <div class="product-info">
                        <h2>${product.name}</h2>
                        <p>${formatPrice(product.price)}đ</p>
                    </div>
                    <button class="add-to-cart">
                        <p>${quantityStatus}</p>
                    </button>
                `;
            productCard.addEventListener('click', () => {
                window.location.href = `product-detail.html?id=${product.id}`;
            });
            container.appendChild(productCard);
        });
    }

    // Fetch all products or by category on page load
    const selectedCategory = localStorage.getItem('selectedCategory');
    let url;
    if (selectedCategory) {
        url = `http://localhost:8080/products/getByCategory?category=${selectedCategory}`;
        localStorage.removeItem('selectedCategory'); // Clear the stored category after use
    } else {
        url = "http://localhost:8080/products/getAll";
    }
    const keyword_session = JSON.parse(localStorage.getItem('keyword'));
    if (keyword_session) {
        url = `http://localhost:8080/products/search?keyword=${keyword_session}`;
        localStorage.setItem('keyword', JSON.stringify(""));
    }
    fetchProducts(url);

    // Khôi phục trạng thái đã chọn khi trang được tải lại
    const navLinks = document.querySelectorAll('nav a[data]');
    if (selectedCategory) {
        navLinks.forEach(link => {
            if (link.getAttribute('data') === selectedCategory) {
                link.classList.add('selected');
            } else {
                link.classList.remove('selected');
            }
        });
        // Remove 'selected' class from 'Trang chủ'
        document.querySelector('nav a[href="home.html"]').classList.remove('selected');
    }

    // Add event listener for sorting
    document.getElementById('sort-price').addEventListener('change', function() {
        const selectedOption = this.value;
        let sortedProducts;
        fetch(url)
            .then(response => response.json())
            .then(products => {
                if (selectedOption === 'low-to-high') {
                    sortedProducts = products.sort((a, b) => a.price - b.price);
                } else if (selectedOption === 'high-to-low') {
                    sortedProducts = products.sort((a, b) => b.price - a.price);
                } else {
                    sortedProducts = products; // No sorting
                }
                displayProducts(sortedProducts);
            })
            .catch(error => console.error('Error fetching products for sorting:', error));
    });

});

function formatPrice(price) {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}