document.addEventListener("DOMContentLoaded", function () {
    setupButtons();
    simulateBalanceUpdate();
});

function setupButtons() {
    document.getElementById("rechargeBtn").addEventListener("click", function () {
        alert("Redirecting to Recharge Page...");
        window.location.href = "recharge.html"; 
    });

    document.getElementById("withdrawBtn").addEventListener("click", function () {
        alert("Redirecting to Withdraw Page...");
        window.location.href = "withdraw.html"; 
    });

    document.getElementById("accountBtn").addEventListener("click", function () {
        alert("Redirecting to Account Page...");
        window.location.href = "account.html"; 
    });
}

function simulateBalanceUpdate() {
    let balanceElement = document.getElementById("balance");
    let balance = 0.00;

    setInterval(() => {
        balance += (Math.random() * 10).toFixed(2);
        balanceElement.innerText = `₱${balance.toFixed(2)}`;
    }, 5000);
}
// script.js (add to the existing script)

// Handle menu item clicks
window.handleMenuClick = function(action) {
    switch (action) {
        case 'myBill':
            window.location.href = 'mybill.html';
            break;
        case 'customerService':
            window.location.href = 'customerservice.html';
            break;
        case 'aboutUs':
            window.location.href = 'aboutus.html';
            break;
        case 'changePassword':
            window.location.href = 'changepassword.html';
            break;
        case 'gift':
            window.location.href = 'gift.html';
            break;
        case 'agreement':
            window.location.href = 'agreement.html';
            break;
        default:
            alert('Invalid menu action.');
    }
};

// Particle Animation for AI Theme
document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('particleCanvas');
    const ctx = canvas.getContext('2d');

    canvas.width = canvas.parentElement.offsetWidth;
    canvas.height = canvas.parentElement.offsetHeight;

    const particles = [];
    const particleCount = 50;

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.radius = Math.random() * 2 + 1;
            this.speedX = Math.random() * 2 - 1;
            this.speedY = Math.random() * 2 - 1;
            this.color = `rgba(255, 255, 255, ${Math.random() * 0.5 + 0.2})`;
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;

            if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
            if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
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

    // Resize canvas on window resize
    window.addEventListener('resize', () => {
        canvas.width = canvas.parentElement.offsetWidth;
        canvas.height = canvas.parentElement.offsetHeight;
    });

    // Optional: Play a subtle sound on hover (uncomment and add audio file)
    /*
    const menuItems = document.querySelectorAll('.menu-item');
    const hoverSound = new Audio('path/to/hover-sound.mp3'); // Add a subtle AI sound

    menuItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            hoverSound.play().catch(e => console.log('Sound play error:', e));
        });
    });
    */
});