document.addEventListener("DOMContentLoaded", () => {
    AOS.init({ duration: 800, once: true, disable: window.innerWidth < 768 });

    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;
    const logo = document.querySelector('.logo');

    // Function to update the theme
    function updateTheme() {
        const isDark = body.classList.contains('dark-theme');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
        updateLogoTheme();
    }

    // Function to update the logo for light/dark mode
    function updateLogoTheme() {
        if (body.classList.contains('dark-theme')) {
            logo.style.filter = "invert(1)"; // Light logo for dark mode
        } else {
            logo.style.filter = "invert(0)"; // Normal logo for light mode
        }
    }

    // Load theme from localStorage
    const savedTheme = localStorage.getItem('theme') || 'light';
    body.classList.toggle('dark-theme', savedTheme === 'dark');
    updateLogoTheme();

    // Add event listener for theme toggle button
    themeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-theme');
        updateTheme();
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
    updateSelection();

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
});

// Make entire project card clickable, except for buttons and links
document.querySelectorAll(".project-card").forEach((card) => {
    card.addEventListener("click", function (event) {
        // Prevent navigation if clicking inside a button or link
        if (!event.target.closest("a") && !event.target.closest("button")) {
            window.location.href = this.getAttribute("href");
        }
    });
});
