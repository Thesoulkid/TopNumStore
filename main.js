const loginForm = document.getElementById('login-form');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const loginContainer = document.getElementById('login-container');

// Admin and User credentials
const adminUsername = 'admin';
const adminPassword = 'adminpass';
const userUsername = 'user';
const userPassword = 'user123';

// Login Logic
loginForm.addEventListener('submit', (e) => {
  e.preventDefault();  // Prevent form submission
  
  const username = usernameInput.value.trim();
  const password = passwordInput.value.trim();

  if (username === adminUsername && password === adminPassword) {
    // Open Admin page in new tab
    window.open('YesWeAreTopNumStoreOwnersSOULxHENEX.html', '_blank');
    // Clear login fields after successful login
    usernameInput.value = '';
    passwordInput.value = '';
  } 
  else if (username === userUsername && password === userPassword) {
    // Open User page in new tab
    window.open('user.html', '_blank');
    // Clear login fields after successful login
    usernameInput.value = '';
    passwordInput.value = '';
  } else {
    // Invalid credentials
    document.getElementById('login-error').style.display = 'block';
  }
});
