// Header
document.addEventListener('DOMContentLoaded', () => {
    let userData = JSON.parse(localStorage.getItem('currentUser'));
    let cartItems = JSON.parse(sessionStorage.getItem('cart')) || [];

    var label_cart = "Giỏ hàng (" + cartItems.length + ")";
    document.getElementById("label-cart").textContent = label_cart;

    if (userData != null) {
        document.getElementById("label-profile").textContent = `${userData.name}`;
    } else {
        document.getElementById("label-profile").textContent = "Đăng nhập";
        document.getElementById("icon-profile").href = "/Supermarket/src/main/resources/templates/html/login.html";
    }

    const navLinks = document.querySelectorAll('nav a[data]');

    navLinks.forEach(link => {
        link.addEventListener('click', function (event) {
            event.preventDefault(); // Ngăn chặn hành động mặc định của liên kết
            const category = link.getAttribute('data');
            sessionStorage.setItem('selectedCategory', category);
            window.location.href = "home.html"; // Điều hướng trang

            // Cập nhật class 'selected'
            navLinks.forEach(link => link.classList.remove('selected'));
            link.classList.add('selected');
        });
    });

    const searchForm = document.getElementById('search-form');
    searchForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const keyword = document.getElementById('search-input').value;
        sessionStorage.setItem('keyword', JSON.stringify(keyword));
        window.location.href = "home.html";
    });

    const categories = document.querySelectorAll('nav a');
    categories.forEach(category => {
        category.addEventListener('click', () => {
            categories.forEach(c => c.classList.remove('selected'));
            category.classList.add('selected');
        });
    });
});


function formatPrice(price) {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}
// Footer
document.addEventListener('DOMContentLoaded', () => {
    fetch('footer.html')
        .then(response => response.text())
        .then(html => {
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');
            const footer = doc.querySelector('footer');
            document.querySelector('.custom-footer').appendChild(footer);
        });
});
