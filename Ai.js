document.addEventListener("DOMContentLoaded", function () {
    let marquee = document.querySelector(".real-time-withdrawals");

    // Generate 1,000 fake withdrawals with hidden phone numbers
    function generateWithdrawals(count) {
        let withdrawals = [];
        for (let i = 0; i < count; i++) {
            let randomPhone = `09${Math.floor(10_000_000 + Math.random() * 89_999_999)}`; // Random PH number
            let hiddenPhone = randomPhone.slice(0, 4) + "****" + randomPhone.slice(8); // Hide middle digits
            let amount = `₱${(Math.floor(Math.random() * 95) + 5) * 100}`; // Random amount (₱500 - ₱10,000)
            withdrawals.push({ phone: hiddenPhone, amount: amount });
        }
        return withdrawals;
    }

    let withdrawals = generateWithdrawals(1000);

    function updateWithdrawals() {
        let displayedWithdrawals = withdrawals.slice(0, 10); // Show 10 at a time
        let content = displayedWithdrawals.map(w => `${w.phone} withdrew ${w.amount}`).join(" • ");
        marquee.innerHTML = content;
    }

    // Rotate withdrawals dynamically every 3 seconds
    setInterval(() => {
        withdrawals.push(withdrawals.shift()); // Move first entry to end
        updateWithdrawals();
    }, 3000);

    updateWithdrawals(); // Initial load
});

// Notify button functionality
document.querySelector(".notify-btn").addEventListener("click", function () {
    alert("🔔 Notifications feature coming soon!");
});
document.addEventListener('DOMContentLoaded', () => {
    const amountButtons = document.querySelectorAll('.amount-btn');
    const channelButtons = document.querySelectorAll('.channel-btn');
    const form = document.getElementById('rechargeForm');
    const balanceElement = document.getElementById('balance');
    const paymentRedirect = document.getElementById('paymentRedirect');

    // Amount selection with click handling
    amountButtons.forEach(button => {
        button.addEventListener('click', () => {
            amountButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            button.style.transform = 'scale(1.05)';
            setTimeout(() => button.style.transform = 'scale(1)', 200);
        });
    });

    // Channel selection with click handling
    channelButtons.forEach(button => {
        button.addEventListener('click', () => {
            channelButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            button.style.transform = 'scale(1.05)';
            setTimeout(() => button.style.transform = 'scale(1)', 200);
        });
    });

    // Form submission with payment gateway integration and confirmation
    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const selectedAmount = document.querySelector('.amount-btn.active')?.dataset.amount;
        const selectedChannel = document.querySelector('.channel-btn.active')?.dataset.channel;
        const paymentMethod = document.querySelector('input[name="paymentMethod"]:checked').value;

        if (!selectedAmount || parseInt(selectedAmount) < 250) {
            alert('Please select a recharge amount of at least ₱250');
            return;
        }

        if (!selectedChannel) {
            alert('Please select a payment channel');
            return;
        }

        // Show confirmation dialog before proceeding
        if (confirm(`Proceed with ₱${selectedAmount} recharge using ${paymentMethod} via Channel ${selectedChannel}?`)) {
            showLoading();

            try {
                if (paymentMethod === 'maya') {
                    const mayaResponse = await initiateMayaPayment(selectedAmount);
                    if (mayaResponse.checkoutUrl) {
                        redirectToPayment(mayaResponse.checkoutUrl);
                    }
                } else if (paymentMethod === 'gcash') {
                    const gcashResponse = await initiateGcashPayment(selectedAmount);
                    if (gcashResponse.checkoutUrl) {
                        redirectToPayment(gcashResponse.checkoutUrl);
                    }
                }
            } catch (error) {
                hideLoading();
                alert(`Payment initiation failed: ${error.message}`);
            }
        }
    });

    // Placeholder functions for API calls (replace with actual API credentials and endpoints)
    async function initiateMayaPayment(amount) {
        const response = await fetch('https://api.maya.ph/checkout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer YOUR_MAYA_API_KEY'
            },
            body: JSON.stringify({
                amount: amount,
                currency: 'PHP',
                redirect: {
                    success: 'https://yourwebsite.com/success',
                    fail: 'https://yourwebsite.com/fail'
                }
            })
        });
        return await response.json();
    }

    async function initiateGcashPayment(amount) {
        const response = await fetch('https://api.paymongo.com/v1/sources', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer YOUR_PAYMONGO_SECRET_KEY'
            },
            body: JSON.stringify({
                data: {
                    attributes: {
                        amount: amount,
                        currency: 'PHP',
                        type: 'gcash',
                        redirect: {
                            success: 'https://yourwebsite.com/success',
                            fail: 'https://yourwebsite.com/fail'
                        }
                    }
                }
            })
        });
        const data = await response.json();
        return {
            checkoutUrl: data.data.attributes.redirect.success
        };
    }

    function redirectToPayment(checkoutUrl) {
        hideLoading();
        paymentRedirect.style.display = 'block';
        paymentRedirect.innerHTML = `<p>Redirecting to payment page...</p><a href="${checkoutUrl}" target="_blank" onclick="handlePaymentRedirect(event)">Proceed to Payment</a>`;
    }

    function handlePaymentRedirect(event) {
        event.preventDefault();
        const url = event.target.href;
        window.location.href = url;
    }

    function showLoading() {
        const loading = document.createElement('div');
        loading.className = 'loading';
        loading.textContent = 'Processing...';
        form.appendChild(loading);
    }

    function hideLoading() {
        const loading = document.querySelector('.loading');
        if (loading) loading.remove();
    }

    function showSuccessMessage() {
        const success = document.createElement('div');
        success.className = 'success-message';
        success.textContent = 'Recharge successful! Balance updated.';
        form.appendChild(success);
        
        setTimeout(() => {
            success.remove();
            updateBalance(parseFloat(document.querySelector('.amount-btn.active')?.dataset.amount || 0));
        }, 3000);
    }

    function updateBalance(amount) {
        const currentBalance = parseFloat(balanceElement.textContent);
        const newBalance = currentBalance + amount;
        balanceElement.textContent = newBalance.toFixed(2);
        balanceElement.style.color = '#28a745';
        setTimeout(() => balanceElement.style.color = '#333', 1000);
    }

    // Optional: Keep modal functions if used elsewhere in the app
    window.closeModal = function() {
        const modal = document.getElementById('modal');
        modal.style.display = 'none';
    };
});
// script.js (add to the existing script)

// Handle investment button clicks
window.handleInvestment = function(plan, amount) {
    if (confirm(`Invest ₱${amount} in the ${plan.toUpperCase()} Plan?`)) {
        // Navigate to an investment page (e.g., invest.html) or open a modal/form
        window.location.href = `invest.html?plan=${plan}&amount=${amount}`;
        // Alternatively, open a modal:
        /*
        const modal = document.getElementById('modal');
        const modalTitle = document.getElementById('modalTitle');
        const modalContent = document.getElementById('modalContent');
        
        modalTitle.textContent = `Invest in ${plan.toUpperCase()} Plan`;
        modalContent.innerHTML = `
            <p>Investment: ₱${amount}</p>
            <p>Proceed with AI-optimized investment?</p>
            <button onclick="processInvestment('${plan}', ${amount})">Confirm Investment</button>
            <button onclick="closeModal()">Cancel</button>
        `;
        modal.style.display = 'block';
        */
    }
};

// Process investment (placeholder function if using modal)
window.processInvestment = function(plan, amount) {
    alert(`Investment of ₱${amount} in ${plan.toUpperCase()} confirmed! Check your account for details.`);
    closeModal();
};

// Slider navigation
let slideIndex = 0;

window.slidePrev = function() {
    const slides = document.querySelectorAll('.slide');
    slideIndex = (slideIndex - 1 + slides.length) % slides.length;
    updateSlider();
};

window.slideNext = function() {
    const slides = document.querySelectorAll('.slide');
    slideIndex = (slideIndex + 1) % slides.length;
    updateSlider();
};

function updateSlider() {
    const slides = document.querySelectorAll('.slide');
    const slider = document.querySelector('.investment-slider');
    const slideWidth = slides[0].offsetWidth + 20; // Include gap
    slider.style.transform = `translateX(-${slideIndex * slideWidth}px)`;
}

// Auto-slide (optional, uncomment if desired)
// setInterval(slideNext, 5000); // Change slide every 5 seconds

// Initialize slider on load
document.addEventListener('DOMContentLoaded', () => {
    updateSlider();
});