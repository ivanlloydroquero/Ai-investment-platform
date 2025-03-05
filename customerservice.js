// script.js (add to the existing script, or create for customerservice.html)

// Handle back button navigation
window.goBack = function() {
    window.history.back(); // Navigate back to the previous page (e.g., index.html)
};

// Initialize Telegram Web App (basic integration for demonstration)
document.addEventListener('DOMContentLoaded', () => {
    // Basic Telegram bot interaction (you’ll need to configure a real bot via BotFather)
    const telegramLink = document.querySelector('.telegram-link');
    telegramLink.addEventListener('click', (e) => {
        e.preventDefault();
        alert('Opening Voltalia Support Bot on Telegram. Please ensure you have the Telegram app installed or visit the link in your browser.');
        window.open('https://t.me/VoltaliaSupportBot', '_blank');
    });

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

    // Basic Telegram bot interaction (placeholder for real integration)
    // You’ll need to implement a full Telegram bot using BotFather and a service like respond.io, Mava, or Userlike for advanced integration
    function initTelegramBot() {
        if (window.Telegram && window.Telegram.WebApp) {
            const telegram = window.Telegram.WebApp;
            telegram.ready();
            telegram.expand(); // Ensure full-screen mode for Telegram Web App

            // Example: Handle messages or buttons (you’ll need to configure your bot for real functionality)
            telegram.onEvent('message', (event) => {
                console.log('Telegram message received:', event);
                // Add logic to handle messages (e.g., AI responses, escalation)
            });
        } else {
            console.log('Telegram Web App not available. Ensure the user is accessing via Telegram.');
        }
    }

    // Call Telegram initialization (only works if accessed via Telegram)
    initTelegramBot();
});