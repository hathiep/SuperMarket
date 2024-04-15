function getDetailOrder(id){

    fetch("http://localhost:8080/api/order?id=" + id)
        .then(response => response.json())
        .then(async order => {
            var user = await getCustomerById(order.customer_id);
            document.getElementById("order_id").textContent = id;
            document.getElementById("input_idkh").value = order.customer_id;
            document.getElementById("input_name").value = user.name;
            document.getElementById("input_date").value = order.date;
            document.getElementById("input_shipment").value = order.shipment;
            document.getElementById("input_payment").value = order.payment;
            document.getElementById("input_status").value = order.status;
        })
        .catch(error => console.error('Error:', error));

}
async function getAllRevenue() {
    try {
        var selectedYear = sessionStorage.getItem("selectedYear");
        var selectedMonth = sessionStorage.getItem("selectedMonth");
        var time = "";
        if(selectedMonth == "0" || selectedMonth == "") selectedMonth = "0";
        else time+= " tháng " + selectedMonth;
        if(selectedYear == "0"|| selectedYear == "") selectedYear = "0";
        else time+= " năm " + selectedYear;

        var apiUrl = "http://localhost:8080/api/statistic?";
        if (selectedYear && selectedMonth) {
            apiUrl += "year=" + selectedYear + "&month=" + selectedMonth;
        }
        const response = await fetch(apiUrl);
        const data = await response.json();
        var heading = "Danh sách tất cả khách hàng đã mua";
        var length = 0;
        for (const entry of data) length+= 1;
        if(length == 0) heading = "Không có khách hàng nào mua hàng";
        document.getElementById("table-heading").textContent = heading + time;
        var statisticTableBody  = document.getElementById("statistic_table_body");
        statisticTableBody.innerHTML = "";
        var stt = 1;
        var total = 0;
        document.getElementById("total_revenue_footer").textContent = total + " đ";
        for (const entry of data) {
            var row = "<tr>";
            var user_x = await getCustomerById(entry.customer_id);
            var quantity = await getQuantityOrder(entry.customer_id);
            row += "<td class='col col1 center'>" + stt + "</td>";
            row += "<td class='col col2 center'>" + entry.customer_id + "</td>";
            row += "<td class='col col3 left'>" + user_x.name + "</td>";
            row += "<td class='col col2 center'>" + user_x.dob + "</td>";
            row += "<td class='col col2 center'>" + user_x.gender + "</td>";
            row += "<td class='col col4 left'>" + user_x.address + "</td>";
            row += "<td class='col col2 center'>" + quantity + "</td>";
            row += "<td class='col col2 right'>" + entry.total_revenue + " đ" + "</td>";
            row += "<td class='col col2 center'><a class='lnkXem' href='detail_statistic.html?customer_id=" + entry.customer_id + "'>Chi tiết</a></td>";
            row += "</tr>";
            statisticTableBody.innerHTML += row;
            stt+= 1;
            total= total + entry.total_revenue;
            document.getElementById("total_revenue_footer").textContent = total + " đ";
        }
    } catch (error) {
        console.error('Error fetching products:', error);
    }
}
async function getQuantityOrder(id){
    try {
        var selectedYear = sessionStorage.getItem("selectedYear");
        var selectedMonth = sessionStorage.getItem("selectedMonth");
        if(selectedMonth == "") selectedMonth = 0;
        if(selectedYear == "") selectedYear = 0;
        var apiUrl = "http://localhost:8080/api/statistic_detail?customer_id=" + id;
        if (selectedYear && selectedMonth) {
            apiUrl += "&year=" + selectedYear + "&month=" + selectedMonth;
        }
        const response = await fetch(apiUrl);
        const data = await response.json();
        var quantity = 0;
        for (const entry of data) quantity+= 1;
        return quantity;
    }
    catch (error) {
        console.error('Error fetching products:', error);
    }
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
            var row = "<tr>";
            row += "<td class='col col1 center'>" + stt + "</td>";
            row += "<td class='col col1 center'>" + item.id + "</td>";
            row += "<td class='col col3 left'>" + "</td>";
            row += "<td class='col col1 center'>" + "</td>";
            row += "<td class='col col2 center'>" + "</td>";
            row += "<td class='col col1 right'>" + item.quantity + "</td>";
            row += "<td class='col col2 right'>" + item.price + " đ" + "</td>";
            row += "<td class='col col2 right'>" + item.quantity * item.price + " đ" + "</td>";
            row += "<td class='col col1 center'><a class='lnkXem' href='detail_product.html?product_id=" + item.product_id + "'>Chi tiết</a></td>";
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