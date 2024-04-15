function saveMonthAndYearToSession() {
    var selectedMonth = document.getElementById("list-month").value;
    var selectedYear = document.getElementById("list-year").value;
    sessionStorage.setItem("selectedMonth", selectedMonth);
    sessionStorage.setItem("selectedYear", selectedYear);
    getAllRevenue();
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

async function getAllOrderByRevenue(id){
    try {
        var selectedYear = sessionStorage.getItem("selectedYear");
        var selectedMonth = sessionStorage.getItem("selectedMonth");
        var table_heading = "Danh sách tất cả đơn hàng đã mua ";
        if(selectedMonth == "0" || selectedMonth == "") selectedMonth = "0";
        else table_heading+= " tháng " + selectedMonth;
        if(selectedYear == "0"|| selectedYear == "") selectedYear = "0";
        else table_heading+= " năm " + selectedYear;
        document.getElementById("table-heading").textContent = table_heading;

        var apiUrl = "http://localhost:8080/api/statistic_detail?customer_id=" + id;
        if (selectedYear && selectedMonth) {
            apiUrl += "&year=" + selectedYear + "&month=" + selectedMonth;
        }
        const response = await fetch(apiUrl);
        const data = await response.json();
        var statisticTableBody  = document.getElementById("statistic_table_body");
        statisticTableBody.innerHTML = "";
        var stt = 1;
        var total = 0;
        document.getElementById("total_revenue_footer").textContent = total + " đ";
        for (const order of data) {
            var row = "<tr>";
            var quantity = await getQuantityItem(order.id);
            row += "<td class='col col1 center'>" + stt + "</td>";
            row += "<td class='col col1 center'>" + order.id + "</td>";
            row += "<td class='col col2 left'>" + order.date + "</td>";
            row += "<td class='col col2 center'>" + quantity + "</td>";
            row += "<td class='col col3 right'>" + order.total_cost + " đ" + "</td>";
            row += "<td class='col col3 left'>" + order.shipment + "</td>";
            row += "<td class='col col3 left'>" + order.payment + "</td>";
            row += "<td class='col col3 left'>" + order.status + "</td>";
            row += "<td class='col col2 center'><a class='lnkXem' href='detail_order.html?order_id=" + order.id + "'>Chi tiết</a></td>";
            row += "</tr>";
            statisticTableBody.innerHTML += row;
            stt+= 1;
            total= total + order.total_cost;
            document.getElementById("total_revenue_footer").textContent = total + " đ";
        }
    } catch (error) {
        console.error('Error fetching products:', error);
    }
}
async function getQuantityItem(id){
    try {
        var selectedYear = sessionStorage.getItem("selectedYear");
        var selectedMonth = sessionStorage.getItem("selectedMonth");
        if(selectedMonth == "") selectedMonth = 0;
        if(selectedYear == "") selectedYear = 0;
        var apiUrl = "http://localhost:8080/api/items/search?order_id=" + id;
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