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
// ==========================================
// LOGIN - SỬA LẠI LOGIC KIỂM TRA
// ==========================================
loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const email = document.getElementById('loginEmail').value.trim();
    const password = document.getElementById('loginPassword').value;
    const rememberMe = document.getElementById('rememberMe').checked;
    
    if (!email || !password) {
        showError('Vui lòng nhập đầy đủ email và mật khẩu!');
        return;
    }

    if (!validateEmail(email)) {
        showError('Email không hợp lệ!');
        document.getElementById('loginEmail').focus();
        return;
    }
    
    showLoading();
    hideError();
    
    try {
        const persistence = rememberMe 
            ? firebase.auth.Auth.Persistence.LOCAL 
            : firebase.auth.Auth.Persistence.SESSION;
        
        await auth.setPersistence(persistence);
        
        // ✅ BƯỚC 1: Kiểm tra email có tồn tại không
        const signInMethods = await auth.fetchSignInMethodsForEmail(email);
        
        if (signInMethods.length === 0) {
            showError('❌ Email này chưa được đăng ký! Vui lòng đăng ký trước.', 'error');
            hideLoading();
            return;
        }

        // ✅ BƯỚC 2: Kiểm tra xem có password method không
        const hasPassword = signInMethods.includes('password');
        const hasGoogle = signInMethods.includes('google.com');

        // ✅ BƯỚC 3: Xử lý các trường hợp
        if (!hasPassword && hasGoogle) {
            // TH1: Chỉ có Google, chưa tạo password
            showError('⚠️ Tài khoản này chỉ có thể đăng nhập bằng Google. Vui lòng đăng nhập Google trước, sau đó vào Hồ sơ để tạo mật khẩu.', 'warning');
            hideLoading();
            return;
        }

        // ✅ BƯỚC 4: Thử đăng nhập bằng password
        await auth.signInWithEmailAndPassword(email, password);
        
        showError('✅ Đăng nhập thành công! Đang chuyển hướng...', 'success');
        
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 1000);
        
    } catch (error) {
        hideLoading();

        switch(error.code) {
            case 'auth/wrong-password':
                showError('❌ Mật khẩu không chính xác! Vui lòng thử lại hoặc nhấn "Quên mật khẩu".', 'error');
                document.getElementById('loginPassword').value = '';
                document.getElementById('loginPassword').focus();
                break;
                
            case 'auth/user-not-found':
                showError('❌ Tài khoản này chưa được đăng ký! Vui lòng đăng ký trước.', 'error');
                break;
                
            case 'auth/invalid-email':
                showError('❌ Email không hợp lệ!', 'error');
                document.getElementById('loginEmail').focus();
                break;
                
            case 'auth/user-disabled':
                showError('❌ Tài khoản này đã bị vô hiệu hóa. Vui lòng liên hệ hỗ trợ.', 'error');
                break;
                
            case 'auth/too-many-requests':
                showError('⚠️ Quá nhiều lần đăng nhập sai! Vui lòng thử lại sau 5 phút hoặc đặt lại mật khẩu.', 'warning');
                break;
                
            case 'auth/network-request-failed':
                showError('❌ Lỗi kết nối mạng! Vui lòng kiểm tra internet.', 'error');
                break;
                
            case 'auth/invalid-credential':
                showError('❌ Thông tin đăng nhập không hợp lệ! Vui lòng kiểm tra lại email và mật khẩu.', 'error');
                break;
                
            default:
                showError(`❌ Lỗi đăng nhập: ${getErrorMessage(error.code)}`, 'error');
        }
    }
});


// ==========================================
// REGISTER
// ==========================================
registerForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const name = document.getElementById('registerName').value.trim();
    const email = document.getElementById('registerEmail').value.trim();
    const password = document.getElementById('registerPassword').value;
    const confirmPassword = document.getElementById('registerConfirmPassword').value;
    
    // ✅ VALIDATION (giữ nguyên code cũ)
    if (!name || !email || !password || !confirmPassword) {
        showError('Vui lòng điền đầy đủ thông tin!');
        return;
    }

    if (name.length < 2) {
        showError('Tên phải có ít nhất 2 ký tự!');
        document.getElementById('registerName').focus();
        return;
    }

    if (!validateEmail(email)) {
        showError('Email không hợp lệ!');
        document.getElementById('registerEmail').focus();
        return;
    }
    
    if (password !== confirmPassword) {
        showError('Mật khẩu xác nhận không khớp!');
        document.getElementById('registerConfirmPassword').focus();
        return;
    }
    
    if (password.length < 6) {
        showError('Mật khẩu phải có ít nhất 6 ký tự!');
        document.getElementById('registerPassword').focus();
        return;
    }
    
    showLoading();
    hideError();
    
    try {
        // ✅ KIỂM TRA EMAIL TỒN TẠI
        const signInMethods = await auth.fetchSignInMethodsForEmail(email);
        
        if (signInMethods.length > 0) {
            if (signInMethods.includes('google.com')) {
                // ✅ ĐÃ CÓ GOOGLE → CHO PHÉP THÊM PASSWORD
                showError('⚠️ Email này đã đăng ký bằng Google! Bạn vẫn có thể tạo mật khẩu. Hãy đăng nhập bằng Google trước, sau đó vào Cài đặt để tạo mật khẩu.', 'warning');
            } else {
                showError('⚠️ Email này đã được đăng ký! Vui lòng đăng nhập hoặc sử dụng email khác.', 'warning');
            }
            hideLoading();
            return;
        }

        // ✅ TẠO TÀI KHOẢN MỚI
        const userCredential = await auth.createUserWithEmailAndPassword(email, password);
        const user = userCredential.user;
        
        await user.updateProfile({
            displayName: name
        });
        
        // ✅ TẠO USER DOCUMENT VỚI PROVIDERS ARRAY
        await db.collection('users').doc(user.uid).set({
            name: name,
            email: email,
            email_lowercase: email.toLowerCase(),
            photoURL: null,
            providers: ['password'], // ⬅️ LƯU DẠNG ARRAY
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
        
        showError('✅ Đăng ký thành công! Email xác thực đã được gửi. Đang chuyển hướng...', 'success');
        
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 2000);
        
    } catch (error) {
        hideLoading();

        switch(error.code) {
            case 'auth/email-already-in-use':
                showError('⚠️ Email này đã được sử dụng! Vui lòng đăng nhập hoặc dùng email khác.', 'warning');
                break;
                
            case 'auth/invalid-email':
                showError('❌ Email không hợp lệ!', 'error');
                break;
                
            case 'auth/weak-password':
                showError('❌ Mật khẩu quá yếu! Vui lòng dùng ít nhất 6 ký tự.', 'error');
                break;
                
            case 'auth/network-request-failed':
                showError('❌ Lỗi kết nối mạng! Vui lòng kiểm tra internet.', 'error');
                break;
                
            default:
                showError(`❌ Lỗi đăng ký: ${getErrorMessage(error.code)}`, 'error');
        }
    }
});

// ==========================================
// GOOGLE SIGN-IN (HỖ TRỢ LINK VỚI PASSWORD)
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
        
        // ✅ BƯỚC 1: KIỂM TRA CÁC PHƯƠNG THỨC ĐĂNG NHẬP CỦA EMAIL
        const signInMethods = await auth.fetchSignInMethodsForEmail(user.email);
        
        // ✅ BƯỚC 2: XỬ LÝ LINK VỚI PASSWORD (NẾU ĐÃ CÓ)
        if (signInMethods.includes('password') && !signInMethods.includes('google.com')) {
            try {
                // ✅ TẠO GOOGLE CREDENTIAL
                const credential = firebase.auth.GoogleAuthProvider.credential(
                    result.credential.idToken,
                    result.credential.accessToken
                );
                
                // ✅ LINK CREDENTIAL VỚI ACCOUNT HIỆN TẠI
                await user.linkWithCredential(credential);
                
                showError('✅ Đã liên kết tài khoản Google với Email/Password! Bạn có thể dùng cả 2 cách đăng nhập.', 'success');
            } catch (linkError) {
                // ✅ NẾU LINK THẤT BẠI (RẤT ÍT KHI XẢY RA)
                if (linkError.code === 'auth/credential-already-in-use') {
                    // Credential đã được dùng bởi user khác (edge case)
                    showError('⚠️ Đăng nhập thành công nhưng không thể liên kết do xung đột tài khoản.', 'warning');
                } else {
                    // Các lỗi khác
                    showError('⚠️ Đăng nhập thành công nhưng chưa liên kết được với password.', 'warning');
                }
            }
        }
        
        // ✅ BƯỚC 3: CẬP NHẬT/TẠO USER DOCUMENT TRONG FIRESTORE
        const userDocRef = db.collection('users').doc(user.uid);
        const userDoc = await userDocRef.get();
        
        if (!userDoc.exists) {
            // ✅ TRƯỜNG HỢP 1: USER MỚI HOÀN TOÀN (LẦN ĐẦU ĐĂNG NHẬP GOOGLE)
            await userDocRef.set({
                name: user.displayName || 'User',
                email: user.email,
                email_lowercase: user.email.toLowerCase(),
                photoURL: user.photoURL || null,
                providers: ['google.com'], // ⬅️ LƯU DẠNG ARRAY
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
            // ✅ TRƯỜNG HỢP 2: USER ĐÃ TỒN TẠI (CẬP NHẬT PROVIDERS)
            const userData = userDoc.data();
            let providers = [];
            
            // ✅ XỬ LÝ PROVIDERS CŨ (CHUYỂN ĐỔI TỪ STRING SANG ARRAY)
            if (userData.providers && Array.isArray(userData.providers)) {
                // Đã là array rồi
                providers = userData.providers;
            } else if (userData.provider) {
                // Format cũ: provider (string) → chuyển sang providers (array)
                if (Array.isArray(userData.provider)) {
                    providers = userData.provider;
                } else {
                    providers = [userData.provider];
                }
            }
            
            // ✅ THÊM 'google.com' NẾU CHƯA CÓ
            if (!providers.includes('google.com')) {
                providers.push('google.com');
            }
            
            // ✅ CẬP NHẬT FIRESTORE
            await userDocRef.update({ 
                providers: providers,
                photoURL: user.photoURL || userData.photoURL || null,
                name: user.displayName || userData.name
            });
        }
        
        // ✅ BƯỚC 4: HIỂN thị THÔNG BÁO THÀNH CÔNG
        showError('✅ Đăng nhập thành công! Đang chuyển hướng...', 'success');
        
        // ✅ BƯỚC 5: CHUYỂN HƯỚNG SAU 1 GIÂY
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 1000);
        
    } catch (error) {
        hideLoading();
        
        // ✅ XỬ LÝ CÁC LOẠI LỖI ĐẶC BIỆT
        
        // LỖI 1: ACCOUNT ĐÃ TỒN TẠI VỚI PROVIDER KHÁC (RẤT QUAN TRỌNG)
        if (error.code === 'auth/account-exists-with-different-credential') {
            showError('⚠️ Email này đã đăng ký bằng Email/Password. Vui lòng đăng nhập bằng mật khẩu trước, sau đó vào Hồ sơ để liên kết với Google.', 'warning');
            return;
        }
        
        // LỖI 2: CREDENTIAL ĐÃ ĐƯỢC SỬ DỤNG BỞI USER KHÁC
        if (error.code === 'auth/credential-already-in-use') {
            showError('✅ Đăng nhập thành công!', 'success');
            setTimeout(() => window.location.href = 'index.html', 1000);
            return;
        }
        
        // LỖI 3: USER ĐÓNG POPUP
        if (error.code === 'auth/popup-closed-by-user') {
            showError('⚠️ Bạn đã đóng cửa sổ đăng nhập!', 'warning');
            return;
        }
        
        // LỖI 4: TRÌNH DUYỆT CHẶN POPUP
        if (error.code === 'auth/popup-blocked') {
            showError('❌ Trình duyệt chặn popup! Vui lòng cho phép popup cho trang này.', 'error');
            return;
        }
        
        // LỖI 5: HỦY YÊU CẦU POPUP
        if (error.code === 'auth/cancelled-popup-request') {
            hideLoading();
            return;
        }
        
        // LỖI 6: CÁC LỖI KHÁC
        showError(`❌ ${getErrorMessage(error.code)}`, 'error');
    }
});

// ==========================================
// FORGOT PASSWORD
// ==========================================
document.getElementById('forgotPasswordLink').addEventListener('click', async (e) => {
    e.preventDefault();
    
    const email = document.getElementById('loginEmail').value.trim();
    
    if (!email) {
        showError('Vui lòng nhập email để reset mật khẩu!', 'warning');
        document.getElementById('loginEmail').focus();
        return;
    }

    if (!validateEmail(email)) {
        showError('Email không hợp lệ!', 'error');
        document.getElementById('loginEmail').focus();
        return;
    }
    
    showLoading();
    hideError();
    
    try {
        const signInMethods = await auth.fetchSignInMethodsForEmail(email);
        
        if (signInMethods.length === 0) {
            showError('❌ Email này chưa được đăng ký!', 'error');
            hideLoading();
            return;
        }

        if (signInMethods.includes('google.com') && !signInMethods.includes('password')) {
            showError('⚠️ Tài khoản này chỉ đăng nhập bằng Google, không cần mật khẩu!', 'warning');
            hideLoading();
            return;
        }

        await auth.sendPasswordResetEmail(email);
        showError('✅ Email reset mật khẩu đã được gửi! Kiểm tra hộp thư của bạn.', 'success');
    } catch (error) {
        
        if (error.code === 'auth/user-not-found') {
            showError('❌ Không tìm thấy tài khoản với email này!', 'error');
        } else {
            showError(`❌ ${getErrorMessage(error.code)}`, 'error');
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
