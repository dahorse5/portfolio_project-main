document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const message = document.getElementById('message');

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const username = document.getElementById('username').value.trim();
        const password = document.getElementById('userpassword').value;

        const userData = JSON.parse(localStorage.getItem('userData'));

        if (userData && username === userData.username && password === userData.password) {
            message.textContent = 'Login successful!';
            message.style.color = 'green';
            // Redirect to dashboard or other page
            setTimeout(() => {
                window.location.href = './dashboard.html'; // Replace with your destination page
            }, 1000);
        } else {
            message.textContent = 'Invalid username or password!';
            message.style.color = 'red';
        }
    });
});
