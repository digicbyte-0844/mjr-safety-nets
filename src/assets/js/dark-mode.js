// Dark Mode Toggle Logic (Modified for Nav Integration)
document.addEventListener('DOMContentLoaded', () => {
    // Look for the toggle button in Navbar
    const toggleBtn = document.getElementById('theme-toggle-nav');

    if (!toggleBtn) return; // Exit if not found

    // Check Preference
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme === 'dark') {
        document.body.setAttribute('data-theme', 'dark');
        toggleBtn.innerHTML = '<i class="fas fa-sun"></i>';
    }

    // Toggle Function
    toggleBtn.addEventListener('click', () => {
        const isDark = document.body.getAttribute('data-theme') === 'dark';

        if (isDark) {
            document.body.removeAttribute('data-theme');
            localStorage.setItem('theme', 'light');
            toggleBtn.innerHTML = '<i class="fas fa-moon"></i>';
        } else {
            document.body.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
            toggleBtn.innerHTML = '<i class="fas fa-sun"></i>';
        }
    });

    // Hover effect (Optional since it is in Nav now)
    toggleBtn.addEventListener('mouseenter', () => toggleBtn.style.transform = 'rotate(15deg)');
    toggleBtn.addEventListener('mouseleave', () => toggleBtn.style.transform = 'rotate(0deg)');
});
