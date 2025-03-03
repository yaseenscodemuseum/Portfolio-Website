AOS.init({ duration: 800, once: true });

// Theme Management
const themeToggle = document.getElementById('themeToggle');
const body = document.body;

const savedTheme = localStorage.getItem('theme') || 'light';
body.classList.toggle('dark-theme', savedTheme === 'dark');

themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-theme');
    localStorage.setItem('theme', body.classList.contains('dark-theme') ? 'dark' : 'light');
});

// Function to highlight the correct nav-item based on the current page
function updateSelection() {
    const currentPath = window.location.pathname.split("/").pop() || "index.html"; // Default to index.html if empty

    document.querySelectorAll('.nav-item').forEach((item) => {
        const href = item.getAttribute('href');

        // Check if the href matches the current page
        if (href === currentPath) {
            item.classList.add('selected');
        } else {
            item.classList.remove('selected');
        }
    });
}

// Run the function on page load to highlight the correct nav-item
document.addEventListener('DOMContentLoaded', updateSelection);

// Smooth scrolling for internal links
document.querySelectorAll('.nav-item[href^="#"]').forEach((item) => {
    item.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(item.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});
