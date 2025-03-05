// script.js (add to the existing script, or create for withdraw.html)

// Handle withdraw form submission
document.addEventListener('DOMContentLoaded', () => {
    const withdrawForm = document.getElementById('withdrawForm');
    const withdrawAmount = document.getElementById('withdrawAmount');
    const aiSuggestion = document.getElementById('aiSuggestion');
    const validationMessage = document.getElementById('validationMessage');
    const balanceElement = document.getElementById('balance');
    const paymentMethod = document.getElementById('paymentMethod');

    // AI Suggestion for optimal withdrawal
    let currentBalance = parseFloat(balanceElement.textContent);
    function updateAiSuggestion() {
        const suggestedAmount = Math.min(currentBalance * 0.1, 500); // Suggest 10% of balance or max ₱500
        aiSuggestion.textContent = `AI suggests: ₱${suggestedAmount.toFixed(2)} for optimal balance`;
        aiSuggestion.dataset.tooltip = `Click for AI analysis: Predicted ROI +${(suggestedAmount * 0.025).toFixed(2)} in 7 days`;
    }
    updateAiSuggestion();

    // Real-time validation and AI feedback
    withdrawAmount.addEventListener('input', () => {
        const amount = parseFloat(withdrawAmount.value) || 0;
        const message = validationMessage;
        withdrawAmount.style.borderColor = '#28a745';

        if (amount < 100) {
            withdrawAmount.style.borderColor = '#dc3545';
            message.textContent = 'Minimum withdrawal is ₱100. AI recommends adjusting.';
            message.classList.add('visible');
        } else if (amount > currentBalance) {
            withdrawAmount.style.borderColor = '#dc3545';
            message.textContent = 'Insufficient balance. AI suggests a lower amount.';
            message.classList.add('visible');
        } else {
            message.textContent = '';
            message.classList.remove('visible');
            updateAiSuggestion();
        }
    });

    // AI Suggestion Tooltip
    aiSuggestion.addEventListener('click', () => {
        alert(`AI Analysis: Withdrawing ₱${parseFloat(aiSuggestion.textContent.split('₱')[1])} could yield a +${(parseFloat(aiSuggestion.textContent.split('₱')[1]) * 0.025).toFixed(2)} ROI in 7 days.`);
    });

    // Form submission with confirmation and AI verification
    withdrawForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const amount = parseFloat(withdrawAmount.value);
        const method = paymentMethod.value;

        if (amount < 100 || amount > currentBalance) {
            alert('Invalid withdrawal amount. Please enter an amount between ₱100 and your balance.');
            return;
        }

        if (confirm(`Confirm withdrawal of ₱${amount} using ${method}? AI will verify and optimize this transaction.`)) {
            showLoading();
            setTimeout(() => {
                hideLoading();
                showSuccessMessage(amount, method);
                currentBalance -= amount;
                balanceElement.textContent = currentBalance.toFixed(2);
                withdrawForm.reset();
                updateAiSuggestion();
            }, 2000); // Simulate AI processing time with verification
        }
    });

    // Voice Input for Withdrawal Amount
    function startVoiceInput() {
        const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
        recognition.lang = 'en-US';
        recognition.interimResults = false;

        recognition.onstart = () => {
            withdrawAmount.placeholder = 'Listening for amount...';
            withdrawAmount.disabled = true;
            const voiceBtn = document.querySelector('.voice-btn');
            voiceBtn.style.color = '#ff6b6b';
            voiceBtn.style.transform = 'scale(1.2)';
            voiceBtn.style.boxShadow = '0 0 20px rgba(255, 107, 107, 0.8)';
            voiceBtn.style.animation = 'pulseMic 2s infinite ease-in-out';
        };

        recognition.onresult = (event) => {
            const speechResult = event.results[0][0].transcript;
            const amount = parseFloat(speechResult.replace(/[^\d.]/g, '')) || 0;
            withdrawAmount.value = amount;
            withdrawAmount.dispatchEvent(new Event('input')); // Trigger validation
            withdrawAmount.placeholder = 'Enter amount (min ₱100)';
            withdrawAmount.disabled = false;
            const voiceBtn = document.querySelector('.voice-btn');
            voiceBtn.style.color = '#e0f7ff';
            voiceBtn.style.transform = 'scale(1)';
            voiceBtn.style.boxShadow = 'none';
            voiceBtn.style.animation = 'none';
        };

        recognition.onerror = (error) => {
            alert('Voice recognition failed. Please try typing the amount or check your microphone.');
            withdrawAmount.placeholder = 'Enter amount (min ₱100)';
            withdrawAmount.disabled = false;
            const voiceBtn = document.querySelector('.voice-btn');
            voiceBtn.style.color = '#e0f7ff';
            voiceBtn.style.transform = 'scale(1)';
            voiceBtn.style.boxShadow = 'none';
            voiceBtn.style.animation = 'none';
        };

        recognition.onend = () => {
            withdrawAmount.placeholder = 'Enter amount (min ₱100)';
            withdrawAmount.disabled = false;
            const voiceBtn = document.querySelector('.voice-btn');
            voiceBtn.style.color = '#e0f7ff';
            voiceBtn.style.transform = 'scale(1)';
            voiceBtn.style.boxShadow = 'none';
            voiceBtn.style.animation = 'none';
        };

        recognition.start();
    }

    // 3D Particle Animation for AI Theme
    const canvas = document.getElementById('particleCanvas');
    const ctx = canvas.getContext('2d');

    canvas.width = canvas.parentElement.offsetWidth;
    canvas.height = canvas.parentElement.offsetHeight;

    const particles = [];
    const particleCount = 120; // Further increased for a richer 3D effect

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.z = Math.random() * 150; // Increased depth for more pronounced 3D effect
            this.radius = Math.random() * 5 + 1;
            this.speedX = Math.random() * 2.5 - 1.25;
            this.speedY = Math.random() * 2.5 - 1.25;
            this.speedZ = Math.random() * 0.75 - 0.375;
            this.color = `rgba(255, 255, 255, ${Math.random() * 0.7 + 0.2})`;
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            this.z += this.speedZ;

            if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
            if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
            if (this.z < 0 || this.z > 150) this.speedZ *= -1;

            // Scale radius based on z-depth for 3D effect
            this.radius = Math.max(1, this.radius * (1 + this.z / 150));
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.fill();
            ctx.closePath();
        }
    }

    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }

    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });
        requestAnimationFrame(animateParticles);
    }

    animateParticles();

    // Resize canvas on window resize with performance optimization
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            canvas.width = canvas.parentElement.offsetWidth;
            canvas.height = canvas.parentElement.offsetHeight;
        }, 250); // Debounce resize for performance
    });

    // AI Analytics Modal
    window.showAnalytics = function() {
        const modal = document.getElementById('analyticsModal');
        const ctxChart = document.getElementById('analyticsChart').getContext('2d');

        // Sample data for Chart.js with AI enhancements
        const chart = new Chart(ctxChart, {
            type: 'line',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
                datasets: [{
                    label: 'Balance Trend (AI Forecast)',
                    data: [4000, 4500, 5000, 4800, 5200],
                    borderColor: '#28a745',
                    backgroundColor: 'rgba(40, 167, 69, 0.2)',
                    fill: true,
                    tension: 0.4,
                    pointBackgroundColor: '#28a745',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: '#28a745'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: false,
                        title: { display: true, text: 'Balance (₱)', color: 'white' },
                        ticks: { color: 'white', font: { weight: 'bold' } },
                        grid: { color: 'rgba(255, 255, 255, 0.1)' }
                    },
                    x: {
                        title: { display: true, text: 'Month', color: 'white' },
                        ticks: { color: 'white', font: { weight: 'bold' } },
                        grid: { color: 'rgba(255, 255, 255, 0.1)' }
                    }
                },
                plugins: {
                    legend: { labels: { color: 'white', font: { weight: 'bold' } } },
                    tooltip: {
                        backgroundColor: 'rgba(0, 0, 0, 0.9)',
                        titleColor: '#e0f7ff',
                        bodyColor: '#bbdefb',
                        borderColor: '#28a745',
                        borderWidth: 2
                    }
                },
                animation: {
                    duration: 1000,
                    easing: 'easeInOutQuad'
                }
            }
        });

        modal.style.display = 'block';
    };

    window.closeAnalyticsModal = function() {
        const modal = document.getElementById('analyticsModal');
        modal.style.display = 'none';
    };

    // Loading and Success Messages
    function showLoading() {
        const loading = document.createElement('div');
        loading.className = 'loading';
        loading.textContent = 'Processing with AI Intelligence...';
        loading.style.animation = 'pulse 2s infinite ease-in-out';
        withdrawForm.appendChild(loading);
    }

    function hideLoading() {
        const loading = document.querySelector('.loading');
        if (loading) loading.remove();
    }

    function showSuccessMessage(amount, method) {
        const success = document.createElement('div');
        success.className = 'success-message';
        success.innerHTML = `Withdrawal of <span class="amount">₱${amount}</span> via ${method} successful! AI has optimized and verified the transaction.`;
        success.style.animation = 'fadeIn 0.5s ease-in, pulse 2s infinite ease-in-out';
        withdrawForm.appendChild(success);
        
        setTimeout(() => success.remove(), 4000);
    }

    // Withdraw History Modal
    window.showHistory = function() {
        const modal = document.getElementById('modal');
        const modalTitle = document.getElementById('modalTitle');
        const modalContent = document.getElementById('modalContent');

        modalTitle.textContent = 'Withdraw History';
        modalContent.innerHTML = `
            <div class="history-list">
                <div class="history-item">
                    <p>Transaction ID: WD123456</p>
                    <p>Date: March 2, 2025</p>
                    <p>Amount: <span class="amount">₱500</span></p>
                    <p>Status: Completed</p>
                </div>
                <div class="history-item">
                    <p>Transaction ID: WD123457</p>
                    <p>Date: Feb 28, 2025</p>
                    <p>Amount: <span class="amount">₱300</span></p>
                    <p>Status: Completed</p>
                </div>
            </div>
        `;
        modal.style.display = 'block';
    };

    window.closeModal = function() {
        const modal = document.getElementById('modal');
        modal.style.display = 'none';
    };
});