document.addEventListener("DOMContentLoaded", () => {
    let rentButtons = document.querySelectorAll(".rent-button");
    rentButtons.forEach(button => {
        button.addEventListener("click", () => {
            alert("Investment Process Coming Soon!");
        });
    });
});