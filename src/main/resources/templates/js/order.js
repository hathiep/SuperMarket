function getDetailOrder(id){

    fetch("http://localhost:8080/api/order?id=" + id)
        .then(response => response.json())
        .then(async order => {
            var user = await getCustomerById(order.customer_id);
            document.getElementById("order_id").textContent = id;
            document.getElementById("input_idkh").value = order.customer_id;
            document.getElementById("input_name").value = user.name;
            document.getElementById("input_date").value = order.date;
            document.getElementById("input_shipment").value = getShipment(order.shipment);
            document.getElementById("input_payment").value = getPayment(order.payment);
            document.getElementById("input_status").value = getStatus(order.shipment, order.payment);
        })
        .catch(error => console.error('Error:', error));

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
async function getCustomerById(id) {
    try {
        const response = await fetch("http://localhost:8080/api/user?user_id=" + id);
        const user = await response.json();
        return user;
    } catch (error) {
        console.error('Error:', error);
        return null;
    }
}

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
            row += "<td class='col col1 center'>" + item.id + "</td>";
            row += "<td class='col col7 left'>" + product.name + "</td>";
            row += `<td class='col col2 center'><img style="height: 50px; width: auto" src="${product.image}" alt="${product.name}"></td>`;
            row += "<td class='col col3 center'>" + product.category +  "</td>";
            row += "<td class='col col2 right'>" + item.quantity + "</td>";
            row += "<td class='col col2 right'>" + item.price + " đ" + "</td>";
            row += "<td class='col col5 right'>" + item.quantity * item.price + " đ" + "</td>";
            row += "<td class='col col8 center'><a class='lnkXem' target=\"_blank\" href='/Supermarket/src/main/resources/templates/html/client/product-detail.html?id=" + item.product_id + "'>Chi tiết</a></td>";
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