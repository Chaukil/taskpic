// auth.js - Simplified version (chỉ Email & Google)

const firebaseConfig = {
    apiKey: "AIzaSyCTzhIIIQLSU3y-kGQ6mkCfaKnyHVyt9P8",
    authDomain: "dashboardcc-82e85.firebaseapp.com",
    projectId: "dashboardcc-82e85",
    storageBucket: "dashboardcc-82e85.firebasestorage.app",
    messagingSenderId: "735822286212",
    appId: "1:735822286212:web:4e577342d679354564e1d1",
    measurementId: "G-23606N43Y8"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

// DOM Elements
const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');
const errorMessage = document.getElementById('errorMessage');
const loadingSpinner = document.getElementById('loadingSpinner');
const mfaSection = document.getElementById('mfaSection');

// ==========================================
// AUTH TABS SWITCHING
// ==========================================
document.querySelectorAll('.auth-tab').forEach(tab => {
    tab.addEventListener('click', function() {
        const targetTab = this.getAttribute('data-tab');
        
        document.querySelectorAll('.auth-tab').forEach(t => t.classList.remove('active'));
        this.classList.add('active');
        
        document.querySelectorAll('.auth-form').forEach(f => f.classList.remove('active'));
        document.getElementById(`${targetTab}Form`).classList.add('active');
        
        hideError();
    });
});

// ==========================================
// TOGGLE PASSWORD VISIBILITY
// ==========================================
document.querySelectorAll('.toggle-password').forEach(btn => {
    btn.addEventListener('click', function() {
        const targetId = this.getAttribute('data-target');
        const input = document.getElementById(targetId);
        const icon = this.querySelector('i');
        
        if (input.type === 'password') {
            input.type = 'text';
            icon.classList.remove('fa-eye');
            icon.classList.add('fa-eye-slash');
        } else {
            input.type = 'password';
            icon.classList.remove('fa-eye-slash');
            icon.classList.add('fa-eye');
        }
    });
});

// ==========================================
// LOGIN
// ==========================================
loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    const rememberMe = document.getElementById('rememberMe').checked;
    
    showLoading();
    hideError();
    
    try {
        const persistence = rememberMe 
            ? firebase.auth.Auth.Persistence.LOCAL 
            : firebase.auth.Auth.Persistence.SESSION;
        
        await auth.setPersistence(persistence);
        await auth.signInWithEmailAndPassword(email, password);
        
        window.location.href = 'index.html';
        
    } catch (error) {
        console.error('Login error:', error);
        showError(getErrorMessage(error.code));
    } finally {
        hideLoading();
    }
});

// ==========================================
// REGISTER
// ==========================================
registerForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const name = document.getElementById('registerName').value;
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;
    const confirmPassword = document.getElementById('registerConfirmPassword').value;
    
    if (password !== confirmPassword) {
        showError('Mật khẩu xác nhận không khớp!');
        return;
    }
    
    if (password.length < 6) {
        showError('Mật khẩu phải có ít nhất 6 ký tự!');
        return;
    }
    
    showLoading();
    hideError();
    
    try {
        const userCredential = await auth.createUserWithEmailAndPassword(email, password);
        const user = userCredential.user;
        
        await user.updateProfile({
            displayName: name
        });
        
        await db.collection('users').doc(user.uid).set({
            name: name,
            email: email,
            photoURL: null,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            settings: {
                language: 'vi',
                theme: 'light',
                noteColumns: 3,
                backgroundColor: '#f8f9fa',
                notificationTimeBefore: 5
            }
        });
        
        await user.sendEmailVerification();
        
        showError('Đăng ký thành công! Email xác thực đã được gửi.', 'success');
        
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 2000);
        
    } catch (error) {
        console.error('Registration error:', error);
        showError(getErrorMessage(error.code));
        hideLoading();
    }
});

// ==========================================
// GOOGLE SIGN-IN
// ==========================================
document.getElementById('googleLogin').addEventListener('click', async () => {
    showLoading();
    hideError();
    
    try {
        const provider = new firebase.auth.GoogleAuthProvider();
        provider.addScope('profile');
        provider.addScope('email');
        
        const result = await auth.signInWithPopup(provider);
        const user = result.user;
        
        // Check if user document exists
        const userDoc = await db.collection('users').doc(user.uid).get();
        
        if (!userDoc.exists) {
            // Create new user document for Google sign-in users
            await db.collection('users').doc(user.uid).set({
                name: user.displayName || 'User',
                email: user.email,
                photoURL: user.photoURL || null,
                provider: 'google',
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                settings: {
                    language: 'vi',
                    theme: 'light',
                    noteColumns: 3,
                    backgroundColor: '#f8f9fa',
                    notificationTimeBefore: 5
                }
            });
        }
        
        window.location.href = 'index.html';
        
    } catch (error) {
        console.error('Google login error:', error);
        
        if (error.code === 'auth/popup-closed-by-user') {
            showError('Bạn đã đóng cửa sổ đăng nhập!');
        } else if (error.code === 'auth/popup-blocked') {
            showError('Trình duyệt chặn popup! Vui lòng cho phép popup cho trang này.');
        } else if (error.code === 'auth/cancelled-popup-request') {
            // User cancelled, do nothing
            hideLoading();
            return;
        } else {
            showError(getErrorMessage(error.code));
        }
        
        hideLoading();
    }
});

// ==========================================
// FORGOT PASSWORD
// ==========================================
document.getElementById('forgotPasswordLink').addEventListener('click', async (e) => {
    e.preventDefault();
    
    const email = document.getElementById('loginEmail').value;
    
    if (!email) {
        showError('Vui lòng nhập email để reset mật khẩu!');
        return;
    }
    
    showLoading();
    hideError();
    
    try {
        await auth.sendPasswordResetEmail(email);
        showError('Email reset mật khẩu đã được gửi! Kiểm tra hộp thư của bạn.', 'success');
    } catch (error) {
        console.error('Reset password error:', error);
        showError(getErrorMessage(error.code));
    } finally {
        hideLoading();
    }
});

// ==========================================
// HELPER FUNCTIONS
// ==========================================
function showLoading() {
    loadingSpinner.classList.add('show');
    
    // Disable all buttons
    document.querySelectorAll('button[type="submit"], .social-btn, .google-login-btn').forEach(btn => {
        btn.disabled = true;
    });
}

function hideLoading() {
    loadingSpinner.classList.remove('show');
    
    // Enable all buttons
    document.querySelectorAll('button[type="submit"], .social-btn, .google-login-btn').forEach(btn => {
        btn.disabled = false;
    });
}

function showError(message, type = 'error') {
    errorMessage.textContent = message;
    errorMessage.className = 'error-message show';
    
    if (type === 'success') {
        errorMessage.style.background = '#d1fae5';
        errorMessage.style.color = '#065f46';
    } else {
        errorMessage.style.background = '#fee2e2';
        errorMessage.style.color = '#b91c1c';
    }
    
    // Auto hide after 5 seconds
    setTimeout(() => {
        if (type !== 'success') {
            hideError();
        }
    }, 5000);
}

function hideError() {
    errorMessage.classList.remove('show');
}

function getErrorMessage(errorCode) {
    const errorMessages = {
        'auth/email-already-in-use': 'Email này đã được sử dụng!',
        'auth/invalid-email': 'Email không hợp lệ!',
        'auth/operation-not-allowed': 'Phương thức đăng nhập này chưa được kích hoạt!',
        'auth/weak-password': 'Mật khẩu quá yếu! Vui lòng dùng mật khẩu mạnh hơn (ít nhất 6 ký tự).',
        'auth/user-disabled': 'Tài khoản này đã bị vô hiệu hóa!',
        'auth/user-not-found': 'Không tìm thấy tài khoản với email này!',
        'auth/wrong-password': 'Mật khẩu không chính xác!',
        'auth/too-many-requests': 'Quá nhiều yêu cầu! Vui lòng thử lại sau vài phút.',
        'auth/network-request-failed': 'Lỗi kết nối mạng! Kiểm tra internet của bạn.',
        'auth/popup-closed-by-user': 'Bạn đã đóng cửa sổ đăng nhập!',
        'auth/cancelled-popup-request': 'Yêu cầu đăng nhập đã bị hủy.',
        'auth/popup-blocked': 'Trình duyệt chặn popup! Vui lòng cho phép popup.'
    };
    
    return errorMessages[errorCode] || 'Đã xảy ra lỗi! Vui lòng thử lại.';
}

// ==========================================
// CHECK IF USER IS ALREADY LOGGED IN
// ==========================================
auth.onAuthStateChanged((user) => {
    if (user && window.location.pathname.includes('login.html')) {
        window.location.href = 'index.html';
    }
});

// ==========================================
// HANDLE ENTER KEY IN FORMS
// ==========================================
document.querySelectorAll('.form-input').forEach(input => {
    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const form = input.closest('form');
            if (form) {
                form.dispatchEvent(new Event('submit'));
            }
        }
    });
});
