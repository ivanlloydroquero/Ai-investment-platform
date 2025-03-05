// script.js
document.addEventListener('DOMContentLoaded', () => {
    const amountButtons = document.querySelectorAll('.amount-btn');
    const channelButtons = document.querySelectorAll('.channel-btn');
    const form = document.getElementById('rechargeForm');
    const balanceElement = document.getElementById('balance');
    const paymentRedirect = document.getElementById('paymentRedirect');

    // Amount and channel selection (unchanged from previous version)
    amountButtons.forEach(button => {
        button.addEventListener('click', () => {
            amountButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            button.style.transform = 'scale(1.05)';
            setTimeout(() => button.style.transform = 'scale(1)', 200);
        });
    });

    channelButtons.forEach(button => {
        button.addEventListener('click', () => {
            channelButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            button.style.transform = 'scale(1.05)';
            setTimeout(() => button.style.transform = 'scale(1)', 200);
        });
    });

    // Form submission with payment gateway integration
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

        showLoading();

        try {
            if (paymentMethod === 'maya') {
                // Integrate with Maya Checkout API
                const mayaResponse = await initiateMayaPayment(selectedAmount);
                if (mayaResponse.checkoutUrl) {
                    redirectToPayment(mayaResponse.checkoutUrl);
                }
            } else if (paymentMethod === 'gcash') {
                // Integrate with PayMongo for GCash
                const gcashResponse = await initiateGcashPayment(selectedAmount);
                if (gcashResponse.checkoutUrl) {
                    redirectToPayment(gcashResponse.checkoutUrl);
                }
            }
        } catch (error) {
            hideLoading();
            alert(`Payment initiation failed: ${error.message}`);
        }
    });

    // Placeholder functions for API calls (replace with actual API credentials and endpoints)
    async function initiateMayaPayment(amount) {
        // Example Maya Checkout integration (you'll need API keys from Maya Business)
        const response = await fetch('https://api.maya.ph/checkout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer YOUR_MAYA_API_KEY' // Replace with your Maya API key
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
        // Example PayMongo integration for GCash (you'll need PayMongo API keys)
        const response = await fetch('https://api.paymongo.com/v1/sources', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer YOUR_PAYMONGO_SECRET_KEY' // Replace with your PayMongo secret key
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
            checkoutUrl: data.data.attributes.redirect.success // Adjust based on PayMongo response structure
        };
    }

    function redirectToPayment(checkoutUrl) {
        hideLoading();
        paymentRedirect.style.display = 'block';
        paymentRedirect.innerHTML = `<p>Redirecting to payment page...</p><a href="${checkoutUrl}" target="_blank">Click here to proceed with payment</a>`;
        
        // Automatically redirect after 3 seconds
        setTimeout(() => {
            window.location.href = checkoutUrl;
        }, 3000);
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

    // Webhook or callback handler (optional, for when payment is completed)
    window.addEventListener('message', (event) => {
        if (event.origin === 'https://api.maya.ph' || event.origin === 'https://api.paymongo.com') {
            if (event.data.status === 'success') {
                showSuccessMessage();
            } else {
                alert('Payment failed. Please try again.');
            }
        }
    });
});