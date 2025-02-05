document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.getElementById('registerForm');
    const message = document.getElementById('message');

    // Check if user is already registered
    if (localStorage.getItem('isRegistered') === 'true') {
        window.location.href = './loginPage.html'; // Redirect to login page if already registered
    }

    registerForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const username = document.getElementById('username').value.trim();
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirmPassword').value;

        // Validate passwords
        if (password !== confirmPassword) {
            message.textContent = 'Passwords do not match!';
            message.style.color = 'red';
            return;
        }

        // Save user data in local storage
        const userData = {
            username,
            email,
            password,
        };
        localStorage.setItem('userData', JSON.stringify(userData));
        localStorage.setItem('isRegistered', 'true');

        // Show success message
        message.textContent = 'Registration successful! Please refresh to login.';
        message.style.color = 'green';

        // Reset form
        registerForm.reset();
    });
});
