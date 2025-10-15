// -------------------------
// Show/Hide Forms
// -------------------------
function showLogin() {
    hideAllForms();
    document.getElementById('login-form').classList.add('active');
}

function showSignup() {
    hideAllForms();
    document.getElementById('signup-form').classList.add('active');
}

function showForgotPassword() {
    hideAllForms();
    document.getElementById('forgot-password-form').classList.add('active');
}

function hideAllForms() {
    document.querySelectorAll('.auth-form').forEach(form => form.classList.remove('active'));
}

// -------------------------
// Toggle Password Visibility
// -------------------------
function togglePassword(inputId, iconId) {
    const input = document.getElementById(inputId);
    const icon = document.getElementById(iconId);

    if (input.type === 'password') {
        input.type = 'text';
        icon.textContent = '🙈'; // eye-closed emoji
    } else {
        input.type = 'password';
        icon.textContent = '👁️'; // eye-open emoji
    }
}

// -------------------------
// Password Validation
// -------------------------
function validatePassword() {
    const password = document.getElementById('signup-password').value;
    const requirements = {
        length: password.length >= 8,
        uppercase: /[A-Z]/.test(password),
        lowercase: /[a-z]/.test(password),
        number: /[0-9]/.test(password),
        special: /[@$!%*?&#]/.test(password)
    };

    Object.keys(requirements).forEach(req => {
        const el = document.getElementById(`req-${req}`);
        if (requirements[req]) el.classList.add('valid');
        else el.classList.remove('valid');
    });

    const strengthFill = document.getElementById('strength-fill');
    const strengthText = document.getElementById('strength-text');
    const validCount = Object.values(requirements).filter(Boolean).length;
    const percentage = (validCount / 5) * 100;

    strengthFill.style.width = `${percentage}%`;

    if (validCount <= 2) {
        strengthFill.style.background = '#ff4444';
        strengthText.textContent = 'Weak password';
    } else if (validCount <= 4) {
        strengthFill.style.background = '#ffa500';
        strengthText.textContent = 'Medium strength';
    } else {
        strengthFill.style.background = '#00ff88';
        strengthText.textContent = 'Strong password';
    }

    return Object.values(requirements).every(Boolean);
}

// -------------------------
// Handle Login
// -------------------------
function handleLogin(event) {
    event.preventDefault();
    const email = document.getElementById('login-email').value.trim();
    const password = document.getElementById('login-password').value;
    const rememberMe = document.getElementById('remember-me').checked;

    document.getElementById('login-email-error').textContent = '';
    document.getElementById('login-password-error').textContent = '';

    const demo = { email: 'admin@firedept.com', password: 'FireDept@2024', name: 'Demo Admin' };
    const users = JSON.parse(sessionStorage.getItem('users') || '[]');

    if (email === demo.email && password === demo.password) {
        return loginSuccess(demo, rememberMe);
    }

    const user = users.find(u => u.email === email && u.password === password);
    if (user) return loginSuccess(user, rememberMe);

    if (users.some(u => u.email === email))
        document.getElementById('login-password-error').textContent = 'Incorrect password';
    else document.getElementById('login-email-error').textContent = 'Email not registered';
}

function loginSuccess(user, rememberMe) {
    sessionStorage.setItem('currentUser', JSON.stringify(user));
    if (rememberMe) localStorage.setItem('rememberedUser', user.email);

    showSuccessModal('Login Successful', `Welcome, ${user.name}!`);
    setTimeout(() => showMainContent(), 1500);
}

// -------------------------
// Handle Signup
// -------------------------
function handleSignup(event) {
    event.preventDefault();
    document.querySelectorAll('.error-message').forEach(e => e.textContent = '');

    const name = document.getElementById('signup-name').value.trim();
    const email = document.getElementById('signup-email').value.trim();
    const dept = document.getElementById('signup-department').value.trim();
    const phone = document.getElementById('signup-phone').value.trim();
    const password = document.getElementById('signup-password').value;
    const confirmPassword = document.getElementById('signup-confirm-password').value;
    const terms = document.getElementById('terms').checked;

    let valid = true;

    if (name.length < 3) {
        document.getElementById('signup-name-error').textContent = 'Enter full name';
        valid = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        document.getElementById('signup-email-error').textContent = 'Invalid email';
        valid = false;
    }

    const deptRegex = /^FD-\d{4}-\d{3}$/;
    if (!deptRegex.test(dept)) {
        document.getElementById('signup-department-error').textContent = 'Format: FD-YYYY-XXX';
        valid = false;
    }

    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(phone)) {
        document.getElementById('signup-phone-error').textContent = 'Invalid phone';
        valid = false;
    }

    if (!validatePassword()) {
        document.getElementById('signup-password-error').textContent = 'Weak password';
        valid = false;
    }

    if (password !== confirmPassword) {
        document.getElementById('signup-confirm-error').textContent = 'Passwords don’t match';
        valid = false;
    }

    if (!terms) {
        alert('Accept Terms and Privacy Policy');
        valid = false;
    }

    if (!valid) return;

    const users = JSON.parse(sessionStorage.getItem('users') || '[]');
    if (users.some(u => u.email === email)) {
        document.getElementById('signup-email-error').textContent = 'Email already registered';
        return;
    }

    users.push({ name, email, department: dept, phone, password });
    sessionStorage.setItem('users', JSON.stringify(users));

    showSuccessModal('Signup Complete', 'You can now log in.');
    setTimeout(showLogin, 2000);
}

// -------------------------
// Forgot Password
// -------------------------
function handleForgotPassword(event) {
    event.preventDefault();
    const email = document.getElementById('forgot-email').value.trim();
    const users = JSON.parse(sessionStorage.getItem('users') || '[]');
    const error = document.getElementById('forgot-email-error');
    error.textContent = '';

    if (!users.some(u => u.email === email) && email !== 'admin@firedept.com') {
        error.textContent = 'Email not found';
        return;
    }

    showSuccessModal('Reset Email Sent', 'Password reset instructions sent.');
    setTimeout(showLogin, 2000);
}

// -------------------------
// Modals
// -------------------------
function showSuccessModal(title, message) {
    document.getElementById('success-title').textContent = title;
    document.getElementById('success-message').textContent = message;
    document.getElementById('success-modal').classList.add('active');
}

function closeSuccessModal() {
    document.getElementById('success-modal').classList.remove('active');
}
