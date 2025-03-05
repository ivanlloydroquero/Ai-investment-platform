document.addEventListener("DOMContentLoaded", function () {
    setupFilters();
    setupViewButtons();
});

function setupFilters() {
    const buttons = document.querySelectorAll(".filter-btn");
    const orders = document.querySelectorAll(".order-item");

    buttons.forEach((button) => {
        button.addEventListener("click", function () {
            const filter = this.getAttribute("data-filter");

            buttons.forEach((btn) => btn.classList.remove("active"));
            this.classList.add("active");

            orders.forEach((order) => {
                if (filter === "all" || order.getAttribute("data-status") === filter) {
                    order.style.display = "block";
                } else {
                    order.style.display = "none";
                }
            });
        });
    });
}

function setupViewButtons() {
    const viewButtons = document.querySelectorAll(".view-btn");

    viewButtons.forEach((button) => {
        button.addEventListener("click", function () {
            alert("Order details coming soon...");
        });
    });
}