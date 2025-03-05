// script.js (add to the existing script, or create for rewards.html)

// Handle back button navigation
window.goBack = function() {
    window.history.back(); // Navigate back to the previous page (e.g., index.html)
};

// Handle reward redemption
window.redeemReward = function(rewardType, pointsRequired) {
    const userPointsElement = document.getElementById('userPoints');
    let userPoints = parseInt(userPointsElement.textContent);

    if (userPoints >= pointsRequired) {
        if (confirm(`Confirm redemption of ${rewardType} for ${pointsRequired} points? AI will verify and process this transaction.`)) {
            userPoints -= pointsRequired;
            userPointsElement.textContent = userPoints;
            updateProgressBar(userPoints);
            showSuccessMessage(rewardType, pointsRequired);
            updateAiRecommendation(userPoints);
        }
    } else {
        alert('Insufficient points. Earn more points to redeem this reward.');
    }
};

// Update progress bar based on points
function updateProgressBar(points) {
    const progressBar = document.querySelector('.progress-bar');
    const maxPoints = 2000;
    progressBar.value = points;
    progressBar.max = maxPoints;
}

// Show success message for reward redemption
function showSuccessMessage(rewardType, points) {
    const success = document.createElement('div');
    success.className = 'success-message';
    success.textContent = `Successfully redeemed ${rewardType} for ${points} points! AI has verified the transaction.`;
    success.style.animation = 'fadeIn 0.5s ease-in-out';
    const rewardsSection = document.querySelector('.rewards-section.rewards-options');
    rewardsSection.appendChild(success);
    
    setTimeout(() => success.remove(), 3000);
}

// AI Recommendation for rewards
function updateAiRecommendation(points) {
    const aiRecommendation = document.getElementById('aiRecommendation');
    if (points < 500) {
        aiRecommendation.textContent = 'AI recommends: Earn more points for Cashback!';
        aiRecommendation.dataset.tooltip = 'Earn 500 points for ₱50 cashback – AI predicts high value.';
    } else if (points < 1000) {
        aiRecommendation.textContent = 'AI recommends: Redeem Cashback for immediate value!';
        aiRecommendation.dataset.tooltip = 'Redeem 500 points for ₱50 cashback – AI optimizes for quick returns.';
    } else if (points < 2000) {
        aiRecommendation.textContent = 'AI recommends: Redeem Gift Card for enhanced benefits!';
        aiRecommendation.dataset.tooltip = 'Redeem 1,000 points for ₱100 gift card – AI suggests long-term value.';
    } else {
        aiRecommendation.textContent = 'AI recommends: Redeem VIP Access for premium benefits!';
        aiRecommendation.dataset.tooltip = 'Redeem 2,000 points for VIP investment plan – AI predicts maximum ROI.';
    }
}

// Initialize AI recommendation
document.addEventListener('DOMContentLoaded', () => {
    updateAiRecommendation(1500); // Initial points from HTML

    // 3D Particle Animation for AI Theme
    const canvas = document.getElementById('particleCanvas');
    const ctx = canvas.getContext('2d');

    canvas.width = canvas.parentElement.offsetWidth;
    canvas.height = canvas.parentElement.offsetHeight;

    const particles = [];
    const particleCount = 100; // Optimized for performance and visual richness

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.z = Math.random() * 150; // Increased depth for more pronounced 3D
            this.radius = Math.random() * 4 + 1;
            this.speedX = Math.random() * 2 - 1;
            this.speedY = Math.random() * 2 - 1;
            this.speedZ = Math.random() * 0.5 - 0.25;
            this.color = `rgba(255, 255, 255, ${Math.random() * 0.6 + 0.2})`;
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
            ctx.shadowBlur = 15;
            ctx.shadowColor = 'rgba(255, 255, 255, 0.6)';
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

    // Resize canvas on window resize
    window.addEventListener('resize', () => {
        canvas.width = canvas.parentElement.offsetWidth;
        canvas.height = canvas.parentElement.offsetHeight;
    });
});