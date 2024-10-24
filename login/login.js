document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.querySelector('form');
    
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        const validUsername = 'user';
        const validPassword = 'password123';

        if (username === validUsername && password === validPassword) {
            window.location.href = '../index/index.html';
        } else {
            alert('Invalid username or password');
        }
    });
});
