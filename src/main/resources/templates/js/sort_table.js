function makeSortable() {
    const table = document.querySelector('.sort-table');
    const headers = table.querySelectorAll('.table-header');

    headers.forEach((header, index) => {
        header.addEventListener('click', () => {
            // Xác định thứ tự sắp xếp và cột được chọn
            const isAscending = header.classList.contains('asc');
            const columnIndex = index;

            // Sắp xếp bảng
            sortTableByColumn(table, columnIndex, isAscending);

            // Đổi thứ tự sắp xếp và cập nhật lớp CSS trên tiêu đề cột
            headers.forEach((h) => {
                h.classList.remove('asc', 'desc');
            });
            header.classList.toggle(isAscending ? 'desc' : 'asc');
        });
    });
}

function sortTableByColumn(table, column, asc = true) {
    const dirModifier = asc ? 1 : -1;
    const tBody = table.tBodies[0];
    const rows = Array.from(tBody.querySelectorAll("tr"));

    // Sắp xếp các hàng theo giá trị của cột được chỉ định
    const sortedRows = rows.sort((a, b) => {
        const aVal = a.cells[column].textContent.trim();
        const bVal = b.cells[column].textContent.trim();
        return aVal.localeCompare(bVal, undefined, { numeric: true }) * dirModifier;
    });

    // Xóa các hàng hiện tại khỏi bảng
    while (tBody.firstChild) {
        tBody.removeChild(tBody.firstChild);
    }

    // Thêm các hàng đã sắp xếp trở lại vào bảng
    tBody.append(...sortedRows);
}

makeSortable();

