document.addEventListener("DOMContentLoaded", function() {
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                scrollToTarget(target);
            }
        });
    });

    // Animate skills when the page loads
    animateSkills();
});

function scrollToTarget(target) {
    const startPosition = window.pageYOffset;
    const targetPosition = target.getBoundingClientRect().top + startPosition;
    const distance = targetPosition - startPosition;
    const duration = 800; // Adjust as needed

    let start = null;
    function step(timestamp) {
        if (!start) start = timestamp;
        const progress = timestamp - start;
        window.scrollTo(0, easeInOutQuad(progress, startPosition, distance, duration));
        if (progress < duration) {
            window.requestAnimationFrame(step);
        }
    }
    window.requestAnimationFrame(step);
}

function easeInOutQuad(t, b, c, d) {
    t /= d / 2;
    if (t < 1) return c / 2 * t * t + b;
    t--;
    return -c / 2 * (t * (t - 2) - 1) + b;
}

function animateSkills() {
    const skillBars = document.querySelectorAll('.skill-progress');
    skillBars.forEach(bar => {
        const width = bar.dataset.percent; // Get percentage from data attribute
        bar.style.width = '0%'; // Set initial width to 0%
        bar.innerText = width; // Display percentage text
        setTimeout(() => {
            bar.style.width = width; // Animate to the specified width
        }, 500);
    });
}
