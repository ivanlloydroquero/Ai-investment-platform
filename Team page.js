// Function to copy text to clipboard
function copyToClipboard(id) {
    var text = document.getElementById(id);
    navigator.clipboard.writeText(text.value || text.innerText);
    alert("Copied to clipboard: " + text.value);
}