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
let isAuthenticating = false;

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
// LOGIN LOGIC
// ==========================================
loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const email = document.getElementById('loginEmail').value.trim();
    const password = document.getElementById('loginPassword').value;
    const rememberMe = document.getElementById('rememberMe').checked;
    
    if (!email || !password) {
        showError('Vui lòng nhập đầy đủ email và mật khẩu!', 'warning');
        return;
    }

    if (!validateEmail(email)) {
        showError('Email không hợp lệ!', 'error');
        return;
    }
    
    isAuthenticating = true; // Chặn auto redirect
    showLoading();
    hideError();
    
    try {
        const persistence = rememberMe ? firebase.auth.Auth.Persistence.LOCAL : firebase.auth.Auth.Persistence.SESSION;
        await auth.setPersistence(persistence);
        
        // ✅ GỌI THẲNG LỆNH ĐĂNG NHẬP (Bỏ qua bước check thủ công dễ gây lỗi)
        await auth.signInWithEmailAndPassword(email, password);
        
        showError('✅ Đăng nhập thành công!', 'success');
        setTimeout(() => { window.location.href = 'index.html'; }, 500);
        
    } catch (error) {
        isAuthenticating = false;
        hideLoading();
        
        // Firebase Auth sẽ tự động trả về lỗi chính xác
        if (error.code === 'auth/wrong-password' || error.code === 'auth/invalid-credential') {
            showError('❌ Thông tin đăng nhập không chính xác (Hoặc tài khoản này đăng ký bằng Google)!', 'error');
            document.getElementById('loginPassword').value = '';
        } else if (error.code === 'auth/user-not-found') {
            showError('❌ Tài khoản này chưa được đăng ký!', 'error');
        } else if (error.code === 'auth/too-many-requests') {
            showError('⚠️ Quá nhiều lần đăng nhập sai! Vui lòng thử lại sau 5 phút.', 'warning');
        } else {
            showError(`❌ Lỗi đăng nhập: ${getErrorMessage(error.code)}`, 'error');
        }
    }
});

// ==========================================
// REGISTER LOGIC
// ==========================================
registerForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const name = document.getElementById('registerName').value.trim();
    const email = document.getElementById('registerEmail').value.trim();
    const password = document.getElementById('registerPassword').value;
    const confirmPassword = document.getElementById('registerConfirmPassword').value;
    
    if (!name || !email || !password || !confirmPassword) {
        showError('Vui lòng điền đầy đủ thông tin!', 'warning');
        return;
    }
    if (name.length < 2) {
        showError('Tên phải có ít nhất 2 ký tự!', 'warning');
        return;
    }
    if (!validateEmail(email)) {
        showError('Email không hợp lệ!', 'error');
        return;
    }
    if (password !== confirmPassword) {
        showError('Mật khẩu xác nhận không khớp!', 'error');
        return;
    }
    if (password.length < 6) {
        showError('Mật khẩu phải có ít nhất 6 ký tự!', 'warning');
        return;
    }
    
    isAuthenticating = true; // Chặn auto redirect
    showLoading();
    hideError();
    
    try {
        // ✅ GỌI THẲNG LỆNH TẠO TÀI KHOẢN
        const userCredential = await auth.createUserWithEmailAndPassword(email, password);
        const user = userCredential.user;
        
        await user.updateProfile({ displayName: name });
        
        // LƯU VÀO FIRESTORE SAU KHI ĐÃ ĐĂNG KÝ THÀNH CÔNG
        await db.collection('users').doc(user.uid).set({
            name: name,
            email: email,
            email_lowercase: email.toLowerCase(),
            photoURL: null,
            providers: ['password'],
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            settings: {
                language: 'vi',
                theme: 'light',
                noteColumns: 3,
                backgroundColor: '#f8f9fa',
                notificationTimeBefore: 5
            }
        });
        
        showError('✅ Đăng ký thành công! Đang chuyển hướng...', 'success');
        setTimeout(() => { window.location.href = 'index.html'; }, 1500);
        
    } catch (error) {
        isAuthenticating = false;
        hideLoading();
        
        // Bắt lỗi email đã tồn tại trực tiếp từ Firebase
        if (error.code === 'auth/email-already-in-use') {
            showError('⚠️ Email này đã được sử dụng (Có thể đã đăng ký bằng Google)! Vui lòng đăng nhập.', 'warning');
        } else {
            showError(`❌ Lỗi đăng ký: ${getErrorMessage(error.code)}`, 'error');
        }
    }
});


// ==========================================
// GOOGLE SIGN-IN
// ==========================================
document.getElementById('googleLogin').addEventListener('click', async () => {
    isAuthenticating = true; // Chặn auto redirect
    showLoading();
    hideError();
    
    try {
        const provider = new firebase.auth.GoogleAuthProvider();
        provider.addScope('profile');
        provider.addScope('email');
        
        const result = await auth.signInWithPopup(provider);
        const user = result.user;
        
        // KIỂM TRA VÀ TẠO/CẬP NHẬT FIRESTORE DOC
        const userDocRef = db.collection('users').doc(user.uid);
        const userDoc = await userDocRef.get();
        
        if (!userDoc.exists) {
            await userDocRef.set({
                name: user.displayName || 'User',
                email: user.email,
                email_lowercase: user.email.toLowerCase(),
                photoURL: user.photoURL || null,
                providers: ['google.com'],
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                settings: {
                    language: 'vi',
                    theme: 'light',
                    noteColumns: 3,
                    backgroundColor: '#f8f9fa',
                    notificationTimeBefore: 5
                }
            });
        } else {
            const userData = userDoc.data();
            let providers = Array.isArray(userData.providers) ? userData.providers : 
                           (userData.provider ? (Array.isArray(userData.provider) ? userData.provider : [userData.provider]) : []);
            
            if (!providers.includes('google.com')) providers.push('google.com');
            
            await userDocRef.update({ 
                providers: providers,
                photoURL: user.photoURL || userData.photoURL || null,
                name: user.displayName || userData.name
            });
        }
        
        showError('✅ Đăng nhập thành công!', 'success');
        setTimeout(() => { window.location.href = 'index.html'; }, 1000);
        
    } catch (error) {
        isAuthenticating = false;
        hideLoading();
        if (error.code === 'auth/account-exists-with-different-credential') {
            showError('⚠️ Email này đã đăng ký bằng Email/Password. Vui lòng đăng nhập bằng mật khẩu.', 'warning');
        } else if (error.code === 'auth/popup-closed-by-user') {
            showError('⚠️ Bạn đã đóng cửa sổ đăng nhập!', 'warning');
        } else {
            showError(`❌ ${getErrorMessage(error.code)}`, 'error');
        }
    }
});

// ==========================================
// FORGOT PASSWORD
// ==========================================
document.getElementById('forgotPasswordLink').addEventListener('click', async (e) => {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value.trim();
    if (!email || !validateEmail(email)) {
        showError('Vui lòng nhập email hợp lệ vào ô Đăng nhập để reset mật khẩu!', 'warning');
        return;
    }
    
    showLoading();
    hideError();
    
    try {
        // ✅ GỌI THẲNG LỆNH GỬI EMAIL RESET
        await auth.sendPasswordResetEmail(email);
        showError('✅ Email reset mật khẩu đã được gửi! Kiểm tra hộp thư của bạn.', 'success');
    } catch (error) {
        if (error.code === 'auth/user-not-found') {
            showError('❌ Email này chưa được đăng ký!', 'error');
        } else {
            showError(`❌ Lỗi: ${getErrorMessage(error.code)}`, 'error');
        }
    } finally {
        hideLoading();
    }
});

// ==========================================
// HELPER FUNCTIONS
// ==========================================
function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

function showLoading() {
    const activeSubmitBtn = document.querySelector('.auth-form.active button[type="submit"]');
    const googleBtn = document.getElementById('googleLogin');

    if (activeSubmitBtn) {
        activeSubmitBtn.dataset.originalText = activeSubmitBtn.innerHTML;
        activeSubmitBtn.disabled = true;
        activeSubmitBtn.innerHTML = '<i class="fas fa-circle-notch fa-spin"></i> Đang xử lý...';
        activeSubmitBtn.style.opacity = '0.7';
        activeSubmitBtn.style.cursor = 'not-allowed';
    }

    if (googleBtn) {
        googleBtn.disabled = true;
        googleBtn.style.opacity = '0.6';
    }
}

function hideLoading() {
    // Tìm nút submit trong form đang hiển thị
    const activeSubmitBtn = document.querySelector('.auth-form.active button[type="submit"]');
    const googleBtn = document.getElementById('googleLogin');

    // Khôi phục nút Submit
    if (activeSubmitBtn) {
        activeSubmitBtn.disabled = false;
        // Lấy lại text gốc (Đăng nhập hoặc Đăng ký)
        if (activeSubmitBtn.dataset.originalText) {
            activeSubmitBtn.innerHTML = activeSubmitBtn.dataset.originalText;
        }
        activeSubmitBtn.style.opacity = '1';
        activeSubmitBtn.style.cursor = 'pointer';
    }

    // Khôi phục nút Google
    if (googleBtn) {
        googleBtn.disabled = false;
        googleBtn.style.opacity = '1';
    }
}

function showError(message, type = 'error') {
    errorMessage.textContent = message;
    errorMessage.className = 'error-message show';
    
    // ✅ MÀU SẮC THEO LOẠI
    const colors = {
        success: { bg: '#d1fae5', text: '#065f46' },
        warning: { bg: '#fef3c7', text: '#92400e' },
        error: { bg: '#fee2e2', text: '#b91c1c' },
        info: { bg: '#dbeafe', text: '#1e40af' }
    };
    
    const color = colors[type] || colors.error;
    errorMessage.style.background = color.bg;
    errorMessage.style.color = color.text;
    
    // ✅ TỰ ĐỘNG ẨN SAU 5 GIÂY (TRỪ SUCCESS)
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
        'auth/popup-blocked': 'Trình duyệt chặn popup! Vui lòng cho phép popup.',
        'auth/invalid-credential': 'Thông tin đăng nhập không hợp lệ!'
    };
    
    return errorMessages[errorCode] || 'Đã xảy ra lỗi! Vui lòng thử lại.';
}

// ==========================================
// CHECK IF USER IS ALREADY LOGGED IN
// ==========================================
auth.onAuthStateChanged((user) => {
    if (user && window.location.pathname.includes('login.html') && !isAuthenticating) {
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
