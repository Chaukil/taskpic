// index.js
document.addEventListener("DOMContentLoaded", function () {
    const notesContainer = document.getElementById("notesContainer");
    const addNoteBtn = document.getElementById("addNoteBtn");
    const addNoteModal = document.getElementById("addNoteModal");
    const closeModalBtn = document.getElementById("closeModalBtn");
    const noteForm = document.getElementById("noteForm");
    const searchInput = document.getElementById("searchInput");
    const filterSelect = document.getElementById("filterSelect");
    const emptyState = document.getElementById("emptyState");
    const confirmModal = document.getElementById("confirmModal");
    const cancelDeleteBtn = document.getElementById("cancelDeleteBtn");
    const confirmDeleteBtn = document.getElementById("confirmDeleteBtn");
    const modalTitle = document.getElementById("modalTitle");
    const submitNoteBtn = document.getElementById("submitNoteBtn");

    // Elements for View Note Modal
    const viewNoteModal = document.getElementById("viewNoteModal");
    const closeViewModalBtn = document.getElementById("closeViewModalBtn");
    const viewNoteTitle = document.getElementById("viewNoteTitle");
    const viewNoteContent = document.getElementById("viewNoteContent");
    const viewNoteTime = document.getElementById("viewNoteTime");
    const viewNoteTag = document.getElementById("viewNoteTag");
    const viewNoteStatus = document.getElementById("viewNoteStatus");
    const viewNoteActions = document.getElementById("viewNoteActions");

    // Nút và modal Quản lý Thẻ mới
    const manageTagsBtn = document.getElementById("manageTagsBtn");
    const manageTagsModal = document.getElementById("manageTagsModal");
    const closeManageTagsModalBtn = document.getElementById("closeManageTagsModalBtn");
    const newTagNameInput = document.getElementById("newTagName");
    const newTagIconInput = document.getElementById("newTagIcon");
    const newTagColorInput = document.getElementById("newTagColor");
    const addOrUpdateTagBtn = document.getElementById("addOrUpdateTagBtn");
    const currentTagsList = document.getElementById("currentTagsList");
    const noteTagsContainer = document.getElementById("noteTagsContainer");

    // Lấy các nút chức năng mới
    const completeAllBtn = document.getElementById("completeAllBtn");
    const resetAllBtn = document.getElementById("resetAllBtn");
    const newTagNameEnInput = document.getElementById("newTagNameEn");

    // NEW: Lấy container cho Toast Notifications
    const toastContainer = document.getElementById("toastContainer");
    const dateText = document.getElementById("dateText");
    const timeText = document.getElementById("timeText");

    const expectedDurationInput = document.getElementById("expectedDuration");
    const timeReportsBtn = document.getElementById("timeReportsBtn");
    const timeReportsModal = document.getElementById("timeReportsModal");
    const closeTimeReportsModalBtn = document.getElementById("closeTimeReportsModalBtn");

    // MỚI: Các phần tử cho Modal Cài đặt
    const settingsBtn = document.getElementById("settingsBtn");
    const settingsModal = document.getElementById("settingsModal");
    const closeSettingsModalBtn = document.getElementById("closeSettingsModalBtn");
    const noteColumnsSelect = document.getElementById("noteColumns");
    const backgroundColorInput = document.getElementById("backgroundColor");
    const languageSelect = document.getElementById("languageSelect");
    const appNameInput = document.getElementById("appNameInput");
    const saveSettingsBtn = document.getElementById("saveSettingsBtn");

    const tagManagementBtn = document.getElementById("tagManagementBtn");
    const tagManagementModal = document.getElementById("tagManagementModal");
    const closeTagModalBtn = document.getElementById("closeTagModalBtn");
    const tagInput = document.getElementById("tagInput");
    const addTagBtn = document.getElementById("addTagBtn");
    const tagList = document.getElementById("tagList");
    const noteTagSelect = document.getElementById("noteTag");

    const dayOfWeekSelect = document.getElementById("dayOfWeekSelect");
    const noteDayOfWeekSelect = document.getElementById("noteDayOfWeek");
    const exportExcelBtn = document.getElementById("exportExcelBtn");

    const notificationTimeBeforeSelect = document.getElementById("notificationTimeBefore");

    const scanQRBtn = document.getElementById("scanQRBtn");
    const qrScannerModal = document.getElementById("qrScannerModal");
    const closeQRScannerBtn = document.getElementById("closeQRScannerBtn");
    const qrImageUpload = document.getElementById("qrImageUpload");
    const uploadQRImageBtn = document.getElementById("uploadQRImageBtn");
    const pasteLinkBtn = document.getElementById("pasteLinkBtn");

    const qrGeneratorModal = document.getElementById("qrGeneratorModal");
    const closeQRGeneratorBtn = document.getElementById("closeQRGeneratorBtn");
    const downloadQRBtn = document.getElementById("downloadQRBtn");
    const copyQRLinkBtn = document.getElementById("copyQRLinkBtn");

    const addFromQRModal = document.getElementById("addFromQRModal");
    const closeAddFromQRBtn = document.getElementById("closeAddFromQRBtn");
    const addFromQRForm = document.getElementById("addFromQRForm");

    const userAvatar = document.getElementById('userAvatar');
    const userDropdown = document.getElementById('userDropdown');
    const logoutBtn = document.getElementById('logoutBtn');
    const userName = document.getElementById('userName');
    const userEmail = document.getElementById('userEmail');

    const profileModal = document.getElementById("profileModal");
    const profileBtn = document.getElementById("profileBtn");
    const closeProfileModalBtn = document.getElementById("closeProfileModalBtn");
    const profileNameInput = document.getElementById("profileName");
    const profileEmailInput = document.getElementById("profileEmail");
    const profileJoinedInput = document.getElementById("profileJoinedDate");
    const profileAvatarDisplay = document.getElementById("profileAvatarDisplay");
    const saveProfileBtn = document.getElementById("saveProfileBtn");
    const sendPasswordResetBtn = document.getElementById("sendPasswordResetBtn");

    const reportsMenu = document.getElementById('reportsMenu');
    const reportsBtn = document.getElementById('reportsBtn');
    const reportsBadge = document.getElementById('reportsBadge');

    const sendReportModal = document.getElementById('sendReportModal');
    const closeSendReportBtn = document.getElementById('closeSendReportBtn');
    const sendReportSubmitBtn = document.getElementById('sendReportSubmitBtn');

    const viewReportModal = document.getElementById('viewReportModal');
    const closeViewReportBtn = document.getElementById('closeViewReportBtn');
    const deleteReportBtn = document.getElementById('deleteReportBtn');
    const markAsReadBtn = document.getElementById('markAsReadBtn');

    const reportingDashboardModal = document.getElementById('reportingDashboardModal');
    const closeDashboardBtn = document.getElementById('closeDashboardBtn');
    const submittedReportsTableBody = document.getElementById('submittedReportsTableBody');
    const notSubmittedList = document.getElementById('notSubmittedList');

    let html5QrCode = null;
    let currentQRNoteData = null;
    let currentGeneratedNote = null;
    let receivedReports = [];
    let currentViewingReport = null;

    // Firebase Configuration (Đảm bảo thông tin này chính xác của bạn)
    const firebaseConfig = {
        apiKey: "AIzaSyCTzhIIIQLSU3y-kGQ6mkCfaKnyHVyt9P8",
        authDomain: "dashboardcc-82e85.firebaseapp.com",
        projectId: "dashboardcc-82e85",
        storageBucket: "dashboardcc-82e85.firebasestorage.app",
        messagingSenderId: "735822286212",
        appId: "1:735822286212:web:4e577342d679354564e1d1",
        measurementId: "G-23606N43Y8"
    };

    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    const db = firebase.firestore();
    const auth = firebase.auth();

    let currentUser = null;
    let notes = [];
    let tags = [];
    let currentSubTasks = [];
    let noteToDeleteId = null;
    let editingNoteKey = null;
    let editingTagId = null;
    let notificationInterval;
    let notifiedNotes = new Set();
    let overdueCheckInterval;
    let tagsLoaded = false;
    let notesLoaded = false;

    auth.onAuthStateChanged(async (user) => { // ⬅️ Thêm async
        if (!user) {
            window.location.href = 'login.html';
            return;
        }

        currentUser = user;
        console.log('✅ Authenticated as:', user.email);

        // ✅ GỌI HÀM MỚI TẠI ĐÂY
        await checkAndCreateUserDocument(user);

        initApp();
    });

    function initApp() {
        updateUserMenu();
        loadUserSettingsFromFirestore();
        startMainApp();
    }

    function updateUserMenu() {
    if (currentUser) {
        if (userName) userName.textContent = currentUser.displayName || 'User';
        if (userEmail) userEmail.textContent = currentUser.email;
        if (userAvatar && currentUser.photoURL) {
            userAvatar.innerHTML = `
                <img src="${currentUser.photoURL}" 
                     alt="Avatar" 
                     style="width: 40px; height: 40px; border-radius: 50%; object-fit: cover; cursor: pointer;">
            `;
        }
        
        // ✅ THÊM DÒNG NÀY: Hiện nút báo cáo ngay lập tức khi có user
        if (reportsMenu) reportsMenu.style.display = 'block';
    }
}

    async function loadUserSettingsFromFirestore() {
        if (!currentUser) return;
        try {
            const userDoc = await db.collection('users').doc(currentUser.uid).get();
            if (userDoc.exists) {
                const userData = userDoc.data();
                const settings = userData.settings || {};
                if (settings.language) {
                    localStorage.setItem('language', settings.language);
                    currentLanguage = settings.language;
                }
                if (settings.noteColumns) localStorage.setItem('noteColumns', settings.noteColumns);
                if (settings.backgroundColor) localStorage.setItem('backgroundColor', settings.backgroundColor);
                if (settings.notificationTimeBefore !== undefined) localStorage.setItem('notificationTimeBefore', settings.notificationTimeBefore);

                // Apply settings ngay lập tức
                loadSettings();
            }
        } catch (error) {
            console.error('Error loading user settings:', error);
        }
    }

    function startMainApp() {
        // === QUAN TRỌNG: Thêm .where() để lọc theo userId ===
        const notesCollection = db.collection('notes').where('userId', '==', currentUser.uid);
        const tagsCollection = db.collection('tags').where('userId', '==', currentUser.uid);

        // Load Notes
        notesCollection.orderBy('time').onSnapshot((snapshot) => {
            notes = [];
            snapshot.forEach((doc) => {
                const note = doc.data();
                note.id = doc.id;
                notes.push(note);
            });
            notesLoaded = true;

            if (tagsLoaded) {
                renderNotes();
                updateEmptyState();
                filterNotes();
                startOverdueCheckInterval();
            }
        }, (error) => {
            console.error("Error fetching notes:", error);
            // Nếu lỗi do thiếu index, nó sẽ hiện link trong console, bạn cần click vào link đó
            if (error.code === 'failed-precondition') {
                showToast('Vui lòng tạo Index trong Firebase Console (xem F12)', 'error');
            } else {
                showToast('Lỗi tải dữ liệu: ' + error.message, 'error');
            }
        });

        tagsCollection.orderBy('name').onSnapshot((snapshot) => {
            tags = [];
            snapshot.forEach((doc) => {
                const tag = doc.data();
                tag.id = doc.id;
                tags.push(tag);
            });
            tagsLoaded = true;

            renderTagOptions();
            renderFilterOptions();
            renderCurrentTagsList();

            if (notesLoaded) {
                renderNotes();
                updateEmptyState();
                filterNotes();
            }
        }, (error) => {
            console.error("Error fetching tags:", error);
        });

        // Load Settings ban đầu (từ localStorage trước khi load từ DB)
        loadSettings();
        loadReceivedReports();
    }

    // index.js

async function handleNoteSubmit(e) {
    e.preventDefault();

    const submitBtn = document.getElementById("submitNoteBtn");
    const originalText = submitBtn.textContent;
    
    // Hiệu ứng loading
    submitBtn.disabled = true;
    submitBtn.innerHTML = `<i class="fas fa-circle-notch fa-spin"></i> Đang lưu...`;

    const title = document.getElementById("noteTitle").value;
    const content = document.getElementById("noteContent").value;
    const time = document.getElementById("noteTime").value;
    const dayOfWeek = parseInt(document.getElementById("noteDayOfWeek").value);
    const expectedDuration = parseInt(document.getElementById("expectedDuration").value) || 30;
    const selectedTagRadio = document.querySelector('input[name="noteTag"]:checked');

    const subTasks = getSubTasksFromForm();

    let tagId = null;
    if (selectedTagRadio) {
        tagId = selectedTagRadio.value;
    } else if (tags.length > 0) {
        tagId = tags[0].id;
    } else {
        showToast('toastNoTagDefined', 'warning');
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
        return;
    }

    try {
        if (editingNoteKey) {
            // === CHẾ ĐỘ SỬA: GIỮ NGUYÊN TRẠNG THÁI ===
            
            // 1. Lấy dữ liệu note hiện tại để không bị mất các trường quan trọng
            const currentNote = notes.find(n => n.id === editingNoteKey);
            
            const updatedData = {
                title,
                content,
                tag: tagId,
                time,
                dayOfWeek,
                expectedDuration,
                subTasks,
                // ✅ QUAN TRỌNG: Giữ nguyên các trường trạng thái từ note cũ
                completed: currentNote.completed || false,
                actualDuration: currentNote.actualDuration || null,
                startTime: currentNote.startTime || null,
                endTime: currentNote.endTime || null,
                isOnTime: currentNote.isOnTime // Có thể là true/false/null
            };

            await db.collection('notes').doc(editingNoteKey).update(updatedData);
            showToast('toastNoteUpdated', 'success');
            
        } else {
            // === CHẾ ĐỘ THÊM MỚI ===
            const newNoteData = {
                userId: currentUser.uid,
                title,
                content,
                tag: tagId,
                time,
                dayOfWeek,
                expectedDuration,
                subTasks,
                actualDuration: null,
                startTime: null,
                endTime: null,
                isOnTime: null,
                completed: false
            };
            
            await db.collection('notes').add(newNoteData);
            showToast('toastNoteSaved', 'success');
        }
        
        closeAddNoteModal();
        
    } catch (error) {
        console.error("Error saving note: ", error);
        showToast('toastErrorSavingNote', 'error');
    } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
    }
}


    // === Cập nhật hàm handleAddOrUpdateTag để thêm userId ===
    async function handleAddOrUpdateTag() {
        const tagNameVi = newTagNameInput.value.trim();
        const tagNameEn = newTagNameEnInput.value.trim();
        const tagIcon = newTagIconInput.value.trim();
        const tagColor = newTagColorInput.value;

        if (!tagNameVi) {
            showToast('toastTagNameRequired', 'warning');
            return;
        }

        // Check duplicate (chỉ check trong tags của user hiện tại)
        const isDuplicate = tags.some(tag => {
            const existingNameVi = typeof tag.name === 'object' ? tag.name.vi : tag.name;
            return existingNameVi.toLowerCase() === tagNameVi.toLowerCase() && tag.id !== editingTagId;
        });

        if (isDuplicate) {
            showToast('toastTagExists', 'warning');
            return;
        }

        const tagData = {
            userId: currentUser.uid, // QUAN TRỌNG: Thêm userId
            name: {
                vi: tagNameVi,
                en: tagNameEn || tagNameVi
            },
            icon: tagIcon || '',
            color: tagColor || '#e0e0e0'
        };

        try {
            if (editingTagId) {
                delete tagData.userId;
                await db.collection('tags').doc(editingTagId).update(tagData);
                showToast('toastTagUpdated', 'success');
            } else {
                await db.collection('tags').add(tagData);
                showToast('toastTagAdded', 'success');
            }
            // Reset form
            newTagNameInput.value = '';
            newTagNameEnInput.value = '';
            newTagIconInput.value = '';
            newTagColorInput.value = '#4f46e5';
            addOrUpdateTagBtn.textContent = translations[currentLanguage].addTagBtn;
            editingTagId = null;
        } catch (error) {
            console.error("Error adding/updating tag: ", error);
            showToast('toastErrorTagSave', 'error');
        }
    }

    // === Các hàm xử lý xóa ===
    async function confirmDeleteNote() {
        if (noteToDeleteId) {
            try {
                await db.collection('notes').doc(noteToDeleteId).delete();
                showToast('toastNoteDeleted', 'error'); // Có thể sửa thành 'success' nếu muốn màu xanh
            } catch (error) {
                console.error("Error deleting note: ", error);
                showToast('toastErrorDeletingNote', 'error');
            }
            closeConfirmModal();
        }
    }

    // === Event Listeners ===
    addNoteBtn.addEventListener("click", () => openAddNoteModal());
    closeModalBtn.addEventListener("click", closeAddNoteModal);
    noteForm.addEventListener("submit", handleNoteSubmit);
    let searchTimeout;
    searchInput.addEventListener("input", () => {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => {
            filterNotes();
        }, 300);
    });
    filterSelect.addEventListener("change", filterNotes);
    cancelDeleteBtn.addEventListener("click", closeConfirmModal);
    confirmDeleteBtn.addEventListener("click", confirmDeleteNote);
    closeViewModalBtn.addEventListener("click", closeViewNoteModal);

    completeAllBtn.addEventListener("click", completeAllNotes);
    resetAllBtn.addEventListener("click", resetAllNotes);

    settingsBtn.addEventListener("click", openSettingsModal);
    closeSettingsModalBtn.addEventListener("click", closeSettingsModal);
    manageTagsBtn.addEventListener("click", openManageTagsModal);
    closeManageTagsModalBtn.addEventListener("click", closeManageTagsModal);
    addOrUpdateTagBtn.addEventListener("click", handleAddOrUpdateTag);
    saveSettingsBtn.addEventListener("click", saveSettings);

    dayOfWeekSelect.addEventListener("change", filterNotes);
    exportExcelBtn.addEventListener("click", exportToExcel);

    if (userAvatar) {
        userAvatar.addEventListener('click', () => {
            userDropdown.style.display = userDropdown.style.display === 'none' ? 'block' : 'none';
        });
    }

    document.getElementById('addSubTaskBtn').addEventListener('click', () => {
        addSubTaskInput();
    });

    document.getElementById('addQRSubTaskBtn').addEventListener('click', () => {
        addQRSubTaskInput();
    });

    document.addEventListener('click', (e) => {
        if (userAvatar && !userAvatar.contains(e.target) && !userDropdown.contains(e.target)) {
            userDropdown.style.display = 'none';
        }
    });

    if (logoutBtn) {
        logoutBtn.addEventListener('click', async () => {
            try {
                await firebase.auth().signOut();
                window.location.href = 'login.html';
            } catch (error) {
                console.error('Logout error:', error);
                showToast('Lỗi khi đăng xuất!', 'error');
            }
        });
    }

    if (profileBtn) {
        // Chuyển thành async để đợi lấy dữ liệu từ DB
        profileBtn.addEventListener("click", async () => {
            // Ẩn dropdown menu trước
            if (userDropdown) userDropdown.style.display = 'none';

            if (!currentUser) return;

            profileModal.classList.add("active");
            document.body.style.overflow = "hidden";

            // 1. Điền Email (Luôn có)
            profileEmailInput.value = currentUser.email;

            // 2. Xử lý hiển thị Tên (Ưu tiên lấy từ Firestore để chính xác nhất)
            try {
                // Hiện loading tạm thời hoặc tên cũ trong khi đợi
                profileNameInput.value = currentUser.displayName || "Đang tải...";

                // Lấy dữ liệu mới nhất từ Firestore
                const userDoc = await db.collection('users').doc(currentUser.uid).get();

                if (userDoc.exists) {
                    const userData = userDoc.data();
                    // Ưu tiên tên trong DB > tên trong Auth > Rỗng
                    profileNameInput.value = userData.name || currentUser.displayName || "";
                } else {
                    // Nếu không có trong DB, dùng tên Auth
                    profileNameInput.value = currentUser.displayName || "";
                }
            } catch (error) {
                console.error("Error fetching user profile:", error);
                profileNameInput.value = currentUser.displayName || "";
            }

            // 3. Format ngày tham gia
            if (currentUser.metadata && currentUser.metadata.creationTime) {
                const date = new Date(currentUser.metadata.creationTime);
                const lang = translations[currentLanguage];
                // Format ngày theo ngôn ngữ
                const locale = currentLanguage === 'vi' ? 'vi-VN' : 'en-US';
                profileJoinedInput.value = date.toLocaleDateString(locale);
            }

            // 4. Hiển thị Avatar
            if (currentUser.photoURL) {
                profileAvatarDisplay.innerHTML = `<img src="${currentUser.photoURL}" style="width: 100%; height: 100%; object-fit: cover;">`;
            } else {
                profileAvatarDisplay.innerHTML = `<i class="fas fa-user"></i>`;
            }
        });
    }


    // Đóng Modal Hồ sơ
    if (closeProfileModalBtn) {
        closeProfileModalBtn.addEventListener("click", () => {
            profileModal.classList.remove("active");
            document.body.style.overflow = "auto";
        });
    }

    // Lưu thay đổi Hồ sơ (Chỉ tên hiển thị)
    if (saveProfileBtn) {
        saveProfileBtn.addEventListener("click", async () => {
            const lang = translations[currentLanguage];
            const newName = profileNameInput.value.trim();

            if (!newName) {
                showToast("Tên không được để trống", "warning");
                return;
            }

            try {
                await currentUser.updateProfile({ displayName: newName });
                await db.collection('users').doc(currentUser.uid).update({ name: newName });

                updateUserMenu();

                showToast(lang.toastProfileUpdated, "success");
                profileModal.classList.remove("active");
                document.body.style.overflow = "auto";

            } catch (error) {
                console.error("Error updating profile:", error);
                showToast("Lỗi khi cập nhật hồ sơ: " + error.message, "error");
            }
        });
    }

    // Gửi email đổi mật khẩu
    if (sendPasswordResetBtn) {
        sendPasswordResetBtn.addEventListener("click", async () => {
            const lang = translations[currentLanguage]; // Lấy ngôn ngữ hiện tại
            if (!currentUser.email) return;

            try {
                await auth.sendPasswordResetEmail(currentUser.email);
                showToast(lang.toastResetEmailSent, "success");
            } catch (error) {
                console.error("Error sending password reset:", error);
                showToast(lang.toastResetEmailError + error.message, "error");
            }
        });
    }

    if (pasteLinkBtn) pasteLinkBtn.addEventListener("click", handlePasteLink);

    // === Tag Management Functions ===

    const translations = {
        'vi': {
            'appNameLabel': 'Tên ứng dụng:',
            'appNamePlaceholder': 'Ví dụ: Ghi Chú Của Tôi',
            'defaultAppName': 'Ghi chú của tôi',
            'searchInputPlaceholder': 'Tìm kiếm ghi chú...',
            'allNotesOption': 'Tất cả ghi chú',
            'completedNotesOption': 'Đã hoàn thành',
            'incompleteNotesOption': 'Chưa hoàn thành',
            'overdueNotesOption': 'Trễ giờ',
            'allDaysOption': 'Tất cả các ngày',
            'sunday': 'Chủ Nhật',
            'monday': 'Thứ Hai',
            'tuesday': 'Thứ Ba',
            'wednesday': 'Thứ Tư',
            'thursday': 'Thứ Năm',
            'friday': 'Thứ Sáu',
            'saturday': 'Thứ Bảy',
            'noteDayOfWeekLabel': 'Ngày trong tuần',
            'exportExcelBtn': '<i class="fas fa-file-excel"></i> Xuất Excel',
            'excelFileName': 'Ghi_Chu_Tuan',
            'excelSheetAll': 'Tất cả',
            'excelColTitle': 'Tiêu đề',
            'excelColContent': 'Nội dung',
            'excelColTime': 'Thời gian',
            'excelColTag': 'Thẻ',
            'excelColStatus': 'Trạng thái',
            'excelColDay': 'Ngày',
            'toastExcelExported': 'File Excel đã được xuất!',
            'toastNoNotesToExport': 'Không có ghi chú nào để xuất!',
            'addNoteBtn': '<i class="fas fa-plus"></i> Thêm mới',
            'completeAllBtn': '<i class="fas fa-check-double"></i> Hoàn thành tất cả',
            'resetAllBtn': '<i class="fas fa-redo"></i> Bắt đầu ngày mới',
            'emptyStateTitle': 'Không có ghi chú',
            'emptyStateText': 'Thêm ghi chú đầu tiên của bạn bằng cách nhấp vào nút "Thêm"',
            'newNoteModalTitle': 'Ghi chú mới',
            'editNoteModalTitle': 'Sửa ghi chú',
            'noteTitleLabel': 'Tiêu đề',
            'noteContentLabel': 'Nội dung',
            'noteTimeLabel': 'Thời gian',
            'noteTagLabel': 'Thẻ',
            'manageTagsBtn': '<i class="fas fa-tags"></i> Quản lý Thẻ',
            'saveNoteBtn': 'Lưu ghi chú',
            'updateNoteBtn': 'Cập nhật',
            'viewNoteModalTitlePlaceholder': '',
            'viewNoteTagLabel': 'Thẻ:',
            'viewNoteStatusLabel': 'Trạng thái:',
            'viewNoteTimeLabel': 'Thời gian:',
            'viewNoteContentLabel': 'Nội dung:',
            'completedStatus': 'Đã hoàn thành',
            'incompleteStatus': 'Chưa hoàn thành',
            'uncompleteBtn': 'Chưa hoàn thành',
            'confirmDeleteText': 'Bạn có chắc chắn muốn xóa ghi chú này không?',
            'cancelBtn': 'Hủy',
            'deleteBtnConfirm': 'Xóa',
            'manageTagsModalTitle': 'Quản lý Thẻ Ghi Chú',
            'newTagNameLabel': 'Tên Thẻ Mới/Sửa',
            'newTagIconLabel': 'Icon (Font Awesome class)',
            'newTagColorLabel': 'Màu Thẻ',
            'addTagBtn': 'Thêm Thẻ',
            'updateTagBtn': 'Cập nhật Thẻ',
            'currentTagsTitle': 'Các Thẻ Hiện Có:',
            'noTagsMessage': 'Chưa có thẻ nào. Hãy thêm một thẻ mới!',
            'settingsModalTitle': 'Cài đặt',
            'noteColumnsLabel': 'Số cột hiển thị ghi chú:',
            'column1': '1 cột',
            'column2': '2 cột',
            'column3': '3 cột',
            'column4': '4 cột',
            'backgroundColorLabel': 'Màu nền trang web:',
            'languageLabel': 'Ngôn ngữ:',
            'vietnameseLanguage': 'Tiếng Việt',
            'englishLanguage': 'English',
            'saveSettingsBtn': 'Lưu Cài đặt',
            'notificationTimeBeforeLabel': 'Thông báo trước (phút):',
            'notificationTimeBefore': 'Thông báo trước (phút):',
            'noNotification': 'Không thông báo',
            'minutes5': '5 phút',
            'minutes10': '10 phút',
            'minutes15': '15 phút',
            'minutes30': '30 phút',
            'minutes60': '60 phút',
            'notificationReminder': "Nhắc nhở: Đến giờ '{title}'",
            'toastNoteCompleted': 'Ghi chú đã hoàn thành!',
            'toastNoteReset': 'Ghi chú đã được đặt lại!',
            'toastAllNotesCompleted': 'Tất cả ghi chú đã được đánh dấu hoàn thành!',
            'toastAllNotesReset': 'Tất cả ghi chú đã được đặt lại!',
            'toastNoNotesToComplete': 'Tất cả ghi chú đã hoàn thành rồi!',
            'toastNoNotesToReset': 'Không có ghi chú nào cần đặt lại!',
            'toastNoteDeleted': 'Ghi chú đã bị xóa!',
            'toastErrorDeletingNote': 'Lỗi khi xóa ghi chú.',
            'toastNoteSaved': 'Ghi chú đã được thêm!',
            'toastNoteUpdated': 'Ghi chú đã được cập nhật!',
            'toastErrorSavingNote': 'Lỗi khi lưu ghi chú.',
            'toastTagNameRequired': 'Tên thẻ không được để trống!',
            'toastTagExists': 'Tên thẻ đã tồn tại!',
            'toastTagUpdated': 'Thẻ đã được cập nhật!',
            'toastTagAdded': 'Thẻ đã được thêm!',
            'toastErrorTagSave': 'Lỗi khi thêm/cập nhật thẻ.',
            'confirmDeleteTag': 'Bạn có chắc chắn muốn xóa thẻ này? Những ghi chú sử dụng thẻ này sẽ mất liên kết thẻ.',
            'toastTagDeleted': 'Thẻ đã được xóa và ghi chú liên quan đã được cập nhật!',
            'toastErrorDeletingTag': 'Lỗi khi xóa thẻ.',
            'toastErrorLoadingNotes': 'Lỗi khi tải ghi chú.',
            'toastErrorLoadingTags': 'Lỗi khi tải thẻ.',
            'toastEditingTag': 'Đang chỉnh sửa thẻ: ',
            'toastNoTagDefined': 'Chưa có thẻ nào được định nghĩa! Vui lòng thêm thẻ trước.',
            'toastSettingsSaved': 'Cài đặt đã được lưu!',
            'toastErrorCompletingNote': 'Lỗi khi hoàn thành ghi chú.',
            'toastErrorResettingNote': 'Lỗi khi đặt lại ghi chú.',
            'toastErrorCompletingAllNotes': 'Lỗi khi hoàn thành tất cả ghi chú.',
            'toastErrorResettingAllNotes': 'Lỗi khi đặt lại tất cả ghi chú.',
            'helpTextFontAwesome': 'Tìm icon tại: <a href="https://fontawesome.com/v5/search?m=free" target="_blank">Font Awesome Free</a> (chỉ copy class, ví dụ: `fas fa-plane`)',
            'helpTextColorPicker': 'Chọn màu nền cho thẻ.',
            'newTagNamePlaceholder': 'Ví dụ: Công việc',
            'newTagNameEnPlaceholder': 'Ví dụ: Work',
            'newTagIconPlaceholder': 'Ví dụ: fas fa-briefcase',
            'footerText': '&copy; 2025 Lập trình và phát triển web - Châu Kil',
            'expectedDurationLabel': 'Thời gian dự kiến (phút)',
            'timeReportsBtn': '<i class="fas fa-chart-line"></i> Báo cáo thời gian',
            'scanQRBtn': '<i class="fas fa-qrcode"></i> Quét QR',
            'qrScannerTitle': 'Quét mã QR ghi chú',
            'qrGeneratorTitle': 'Mã QR của ghi chú',
            'addFromQRTitle': 'Xác nhận thêm ghi chú',
            'timeReportsModalTitle': 'Báo cáo thời gian tuần này',
            'totalTasksText': 'Tổng số task',
            'onTimeTasksText': 'Hoàn thành đúng hạn',
            'lateTasksText': 'Hoàn thành trễ',
            'avgTimeText': 'Thời gian TB',
            'detailsTitle': 'Chi tiết các task trong tuần',
            'uploadQRImageBtn': '<i class="fas fa-image"></i> Chọn ảnh',
            'pasteLinkBtn': '<i class="fas fa-paste"></i> Nhập link',
            'downloadQRBtn': '<i class="fas fa-download"></i> Tải ảnh QR',
            'copyQRLinkBtn': '<i class="fas fa-link"></i> Sao chép link',
            'qrScanSuccess': 'Đã quét thành công!',
            'qrScanError': 'Không thể quét mã QR. Vui lòng thử lại.',
            'qrLinkCopied': 'Đã sao chép link!',
            'qrDownloaded': 'Đã tải ảnh QR thành công!',
            'invalidQRData': 'Dữ liệu không hợp lệ!',
            'cameraPermissionDenied': 'Vui lòng cho phép truy cập camera.',
            'clipboardError': 'Không thể đọc bộ nhớ tạm hoặc dữ liệu sai.',
            'expectedTime': 'Dự kiến',
            'actualTime': 'Thực tế',
            'savedTime': 'Tiết kiệm',
            'overtime': 'Vượt',
            'noTimeReports': 'Chưa có dữ liệu báo cáo',
            'qrConfirmMessage': 'Ghi chú được quét từ mã QR. Vui lòng xem lại thông tin:',
            'qrConfirmAddBtn': 'Xác nhận thêm',
            'undefinedTag': 'Không xác định',
            'helpExpectedDuration': 'Ước tính thời gian cần để hoàn thành (5, 10, 15, 30, 60 phút...)',
            'timeUnit': 'phút',
            'qrOtherOptions': 'Tùy chọn khác',
            'excelColExpected': 'Dự kiến (phút)',
            'excelColActual': 'Thực tế (phút)',
            'excelColPerformance': 'Hiệu suất',
            'performanceOnTime': 'Đúng giờ',
            'performanceLate': 'Trễ',
            'reportSchedule': 'Lịch',
            'reportCompleted': 'Xong',
            'menuProfile': 'Hồ sơ',
            'menuLogout': 'Đăng xuất',
            'profileModalTitle': 'Thông tin tài khoản',
            'labelProfileEmail': 'Email (Không thể thay đổi)',
            'labelProfileName': 'Tên hiển thị',
            'labelProfileJoined': 'Ngày tham gia',
            'labelSecurity': 'Bảo mật',
            'textSendResetBtn': 'Gửi email đổi mật khẩu',
            'helpTextReset': 'Chúng tôi sẽ gửi liên kết đổi mật khẩu đến email của bạn.',
            'saveProfileBtn': 'Lưu thay đổi',
            // Thông báo Toast
            'toastNameRequired': 'Tên không được để trống',
            'toastProfileUpdated': 'Cập nhật hồ sơ thành công!',
            'toastProfileUpdateError': 'Lỗi khi cập nhật hồ sơ: ',
            'confirmResetPassword': 'Gửi email đổi mật khẩu đến {email}?',
            'toastResetEmailSent': 'Đã gửi email! Vui lòng kiểm tra hộp thư.',
            'toastResetEmailError': 'Lỗi gửi email: ',
            'subTasksLabel': 'Công việc cần thực hiện',
            'addSubTask': 'Thêm công việc',
            'subTaskPlaceholder': 'Mô tả công việc...',
            'subTaskLinkPlaceholder': 'Đường dẫn (tùy chọn)',
            'copyLink': 'Copy',
            'linkCopied': 'Đã sao chép đường dẫn!',
            'linkCopyFailed': 'Không thể sao chép!',
            'noLink': 'Chưa có đường dẫn!',
            'subTaskUpdated': 'Đã cập nhật trạng thái!',
            'minOneSubTask': 'Phải có ít nhất 1 công việc!',
            'subTaskUpdateError': 'Lỗi khi cập nhật!',
            'generateQR': 'Tạo mã QR',
            'editBtn': 'Sửa',
            'deleteBtn': 'Xóa',
            'timeStatusCompleted': 'Đã hoàn thành',
            'timeStatusOverdueHours': 'Trễ {hours} giờ {minutes} phút',
            'timeStatusOverdueMinutes': 'Trễ {minutes} phút',
            'timeStatusNow': 'Sắp đến giờ (dưới 5 phút)',
            'timeStatusSoon': 'Sắp đến ({minutes} phút nữa)',
            'timeStatusUpcoming': 'Sắp đến ({minutes} phút nữa)',
            'timeStatusFutureHours': 'Còn {hours} giờ {minutes} phút',
            'timeStatusFutureMinutes': 'Còn {minutes} phút',
            'subTaskProgressLabel': 'Tiến độ công việc',
            'noNotesToCompleteOnDay': 'Không có ghi chú nào cần hoàn thành cho ngày này!',
            'completeAllSuccess': 'Đã hoàn thành tất cả ghi chú của {day}!',
            'completeAllError': 'Lỗi khi hoàn thành tất cả ghi chú.',

            'noNotesToResetOnDay': 'Không có ghi chú nào để đặt lại trong ngày này!',
            'resetAllSuccess': 'Đã đặt lại (Bắt đầu ngày mới) cho {day}!',
            'resetAllError': 'Lỗi khi đặt lại ghi chú.',
            'excelColSubTasks': 'Công việc con (Tiến độ)',
            'manageTagsShort': 'Quản lý thẻ',
            'reportsReceived': 'Báo cáo đã nhận',
            'noReports': 'Chưa có báo cáo nào',
            'sendReport': 'Gửi báo cáo',
            'reportPreviewTitle': 'Tóm tắt báo cáo tuần này',
            'totalTasks': 'Tổng task',
            'completedTasks': 'Hoàn thành',
            'onTimeTasks': 'Đúng hạn',
            'lateTasks': 'Trễ hạn',
            'recipientEmail': 'Email người nhận',
            'recipientEmailPlaceholder': 'manager@example.com',
            'reportMessage': 'Ghi chú (tùy chọn)',
            'reportMessagePlaceholder': 'Thêm ghi chú cho người nhận...',
            'sendReportBtn': 'Gửi báo cáo',
            'reportDetailTitle': 'Chi tiết báo cáo',
            'reportFrom': 'Từ',
            'reportSentDate': 'Ngày gửi',
            'reportNote': 'Ghi chú',
            'deleteReport': 'Xóa báo cáo',
            'markAsRead': 'Đánh dấu đã đọc',
            'statisticsTitle': 'Thống kê',
            'avgCompletionTime': 'Thời gian hoàn thành trung bình',
            'analysisByTag': 'Phân tích theo thẻ',
            'distributionByDay': 'Phân bố theo ngày',
            'tasksDone': 'task',
            'sendingReport': 'Đang gửi...',
            'reportSentSuccess': 'Đã gửi báo cáo thành công đến',
            'emailNotRegistered': 'Email này chưa đăng ký tài khoản trong hệ thống!',
            'cannotSendToSelf': 'Không thể gửi báo cáo cho chính mình!',
            'enterRecipientEmail': 'Vui lòng nhập email người nhận!',
            'invalidEmail': 'Email không hợp lệ!',
            'errorSendingReport': 'Lỗi khi gửi báo cáo',
            'reportDeleted': 'Đã xóa báo cáo!',
            'errorDeletingReport': 'Lỗi khi xóa báo cáo!',
            'markedAsRead': 'Đã đánh dấu đọc!',
            'confirmDeleteReport': 'Bạn có chắc chắn muốn xóa báo cáo này không?',
            'tasksCompleted': 'task hoàn thành',
            'justNow': 'Vừa xong',
            'minutesAgo': 'phút trước',
            'hoursAgo': 'giờ trước',
            'daysAgo': 'ngày trước',
            'sendReportToOthers': 'Gửi báo cáo này cho người khác',
            'onlyRegisteredUsers': 'Chỉ gửi được cho người dùng đã đăng ký trong hệ thống',
            'reportRecipients': 'Người nhận gợi ý',
            'avgTime': 'Thời gian TB',
            'completionRate': 'Tỷ lệ hoàn thành',
            'dashboardTitle': 'Bảng điều khiển Báo cáo',
            'dashboardWeeklySummary': 'Tổng hợp hiệu suất tuần này',
            'submittedReports': 'Đã nộp báo cáo',
            'employee': 'Người gửi',
            'onTimeRate': 'Tỷ lệ đúng hạn',
            'details': 'Chi tiết',
            'loadingData': 'Đang tải dữ liệu...',
            'notConfigured': 'Tài khoản của bạn chưa được cấu hình để quản lý.',
            'noReportsThisWeek': 'Chưa có báo cáo nào trong tuần này.',
            'minutesPerTask': 'phút/công việc',
        },
        'en': {
            'appNameLabel': 'App Name:',
            'appNamePlaceholder': 'Example: My Notes',
            'defaultAppName': 'My notes',
            'searchInputPlaceholder': 'Search notes...',
            'allNotesOption': 'All notes',
            'completedNotesOption': 'Completed',
            'incompleteNotesOption': 'Incomplete',
            'overdueNotesOption': 'Overdue',
            'allDaysOption': 'All days',
            'sunday': 'Sunday',
            'monday': 'Monday',
            'tuesday': 'Tuesday',
            'wednesday': 'Wednesday',
            'thursday': 'Thursday',
            'friday': 'Friday',
            'saturday': 'Saturday',
            'noteDayOfWeekLabel': 'Day of week',
            'exportExcelBtn': '<i class="fas fa-file-excel"></i> Export Excel',
            'excelFileName': 'Weekly_Notes',
            'excelSheetAll': 'All',
            'excelColTitle': 'Title',
            'excelColContent': 'Content',
            'excelColTime': 'Time',
            'excelColTag': 'Tag',
            'excelColStatus': 'Status',
            'excelColDay': 'Day',
            'toastExcelExported': 'Excel file exported!',
            'toastNoNotesToExport': 'No notes to export!',
            'addNoteBtn': '<i class="fas fa-plus"></i> Add new',
            'completeAllBtn': '<i class="fas fa-check-double"></i> Complete all',
            'resetAllBtn': '<i class="fas fa-redo"></i> Start new day',
            'emptyStateTitle': 'No notes available',
            'emptyStateText': 'Add your first note by clicking the "Add" button',
            'newNoteModalTitle': 'New Note',
            'editNoteModalTitle': 'Edit Note',
            'noteTitleLabel': 'Title',
            'noteContentLabel': 'Content',
            'noteTimeLabel': 'Time',
            'noteTagLabel': 'Tag',
            'manageTagsBtn': '<i class="fas fa-tags"></i> Manage Tags',
            'saveNoteBtn': 'Save Note',
            'updateNoteBtn': 'Update',
            'viewNoteModalTitlePlaceholder': '',
            'viewNoteTagLabel': 'Tag:',
            'viewNoteStatusLabel': 'Status:',
            'viewNoteTimeLabel': 'Time:',
            'viewNoteContentLabel': 'Content:',
            'completedStatus': 'Completed',
            'incompleteStatus': 'Incomplete',
            'uncompleteBtn': 'Mark as Incomplete',
            'confirmDeleteText': 'Are you sure you want to delete this note?',
            'cancelBtn': 'Cancel',
            'deleteBtnConfirm': 'Delete',
            'manageTagsModalTitle': 'Manage Note Tags',
            'newTagNameLabel': 'New/Edit Tag Name',
            'newTagIconLabel': 'Icon (Font Awesome class)',
            'newTagColorLabel': 'Tag Color',
            'addTagBtn': 'Add Tag',
            'updateTagBtn': 'Update Tag',
            'currentTagsTitle': 'Current Tags:',
            'noTagsMessage': 'No tags yet. Add a new one!',
            'settingsModalTitle': 'Settings',
            'noteColumnsLabel': 'Number of note columns:',
            'column1': '1 column',
            'column2': '2 columns',
            'column3': '3 columns',
            'column4': '4 columns',
            'backgroundColorLabel': 'Website background color:',
            'languageLabel': 'Language:',
            'vietnameseLanguage': 'Vietnamese',
            'englishLanguage': 'English',
            'saveSettingsBtn': 'Save Settings',
            'notificationTimeBeforeLabel': 'Notify before (minutes):',
            'notificationTimeBefore': 'Notify before (minutes):',
            'noNotification': 'No notification',
            'minutes5': '5 minutes',
            'minutes10': '10 minutes',
            'minutes15': '15 minutes',
            'minutes30': '30 minutes',
            'minutes60': '60 minutes',
            'notificationReminder': "Reminder: Time for '{title}'",
            'toastNoteCompleted': 'Note completed!',
            'toastNoteReset': 'Note reset!',
            'toastAllNotesCompleted': 'All notes marked as complete!',
            'toastAllNotesReset': 'All notes have been reset!',
            'toastNoNotesToComplete': 'All notes are already completed!',
            'toastNoNotesToReset': 'No notes to reset!',
            'toastNoteDeleted': 'Note deleted!',
            'toastErrorDeletingNote': 'Error deleting note.',
            'toastNoteSaved': 'Note added!',
            'toastNoteUpdated': 'Note updated!',
            'toastErrorSavingNote': 'Error saving note.',
            'toastTagNameRequired': 'Tag name cannot be empty!',
            'toastTagExists': 'Tag name already exists!',
            'toastTagUpdated': 'Tag updated!',
            'toastTagAdded': 'Tag added!',
            'toastErrorTagSave': 'Error adding/updating tag.',
            'confirmDeleteTag': 'Are you sure you want to delete this tag? Notes using this tag will lose their tag association.',
            'toastTagDeleted': 'Tag deleted and related notes updated!',
            'toastErrorDeletingTag': 'Error deleting tag.',
            'toastErrorLoadingNotes': 'Error loading notes.',
            'toastErrorLoadingTags': 'Error loading tags.',
            'toastEditingTag': 'Editing tag: ',
            'toastNoTagDefined': 'No tags defined yet! Please add a tag first.',
            'toastSettingsSaved': 'Settings saved!',
            'toastErrorCompletingNote': 'Error completing note.',
            'toastErrorResettingNote': 'Error resetting note.',
            'toastErrorCompletingAllNotes': 'Error completing all notes.',
            'toastErrorResettingAllNotes': 'Error resetting all notes.',
            'completeBtn': 'Complete',
            'helpTextFontAwesome': 'Find icons at: <a href="https://fontawesome.com/v5/search?m=free" target="_blank">Font Awesome Free</a> (copy class only, e.g., `fas fa-plane`)',
            'helpTextColorPicker': 'Select a background color for the tag.',
            'newTagNamePlaceholder': 'Example: Work',
            'newTagNameEnPlaceholder': 'Example: Work',
            'newTagIconPlaceholder': 'Example: fas fa-briefcase',
            'footerText': '&copy; 2025 Web Programming and Development - Chau Kil',
            'expectedDurationLabel': 'Expected Duration (minutes)',
            'timeReportsBtn': '<i class="fas fa-chart-line"></i> Time Reports',
            'scanQRBtn': '<i class="fas fa-qrcode"></i> Scan QR',
            'qrScannerTitle': 'Scan Note QR Code',
            'qrGeneratorTitle': 'Note QR Code',
            'addFromQRTitle': 'Confirm Add Note',
            'timeReportsModalTitle': 'This Week Time Reports',
            'totalTasksText': 'Total Tasks',
            'onTimeTasksText': 'On Time',
            'lateTasksText': 'Late',
            'avgTimeText': 'Avg Time',
            'detailsTitle': 'Weekly Task Details',
            'uploadQRImageBtn': '<i class="fas fa-image"></i> Choose Image',
            'pasteLinkBtn': '<i class="fas fa-paste"></i> Paste Link',
            'downloadQRBtn': '<i class="fas fa-download"></i> Download QR',
            'copyQRLinkBtn': '<i class="fas fa-link"></i> Copy Link',
            'qrScanSuccess': 'Scanned successfully!',
            'qrScanError': 'Cannot scan QR code. Please try again.',
            'qrLinkCopied': 'Link copied!',
            'qrDownloaded': 'QR image downloaded successfully!',
            'invalidQRData': 'Invalid data!',
            'cameraPermissionDenied': 'Please allow camera access.',
            'clipboardError': 'Cannot read clipboard or invalid data.',
            'expectedTime': 'Expected',
            'actualTime': 'Actual',
            'savedTime': 'Saved',
            'overtime': 'Over',
            'noTimeReports': 'No reports data',
            'qrConfirmMessage': 'Note scanned from QR code. Please review the information:',
            'qrConfirmAddBtn': 'Confirm Add',
            'undefinedTag': 'Undefined',
            'helpExpectedDuration': 'Estimated time to complete (5, 10, 15, 30, 60 minutes...)',
            'timeUnit': 'minutes',
            'qrOtherOptions': 'Other options',
            'excelColExpected': 'Expected (min)',
            'excelColActual': 'Actual (min)',
            'excelColPerformance': 'Performance',
            'performanceOnTime': 'On Time',
            'performanceLate': 'Late',
            'reportSchedule': 'Schedule',
            'reportCompleted': 'Done',
            'menuProfile': 'Profile',
            'menuLogout': 'Logout',
            'profileModalTitle': 'Account Information',
            'labelProfileEmail': 'Email (Cannot be changed)',
            'labelProfileName': 'Display Name',
            'labelProfileJoined': 'Joined Date',
            'labelSecurity': 'Security',
            'textSendResetBtn': 'Send Password Reset Email',
            'helpTextReset': 'We will send a password reset link to your email.',
            'saveProfileBtn': 'Save Changes',
            // Toast Messages
            'toastNameRequired': 'Display name cannot be empty',
            'toastProfileUpdated': 'Profile updated successfully!',
            'toastProfileUpdateError': 'Error updating profile: ',
            'confirmResetPassword': 'Send password reset email to {email}?',
            'toastResetEmailSent': 'Email sent! Please check your inbox.',
            'toastResetEmailError': 'Error sending email: ',
            'subTasksLabel': 'Tasks to Complete',
            'addSubTask': 'Add Task',
            'subTaskPlaceholder': 'Task description...',
            'subTaskLinkPlaceholder': 'Link (optional)',
            'copyLink': 'Copy',
            'linkCopied': 'Link copied!',
            'linkCopyFailed': 'Cannot copy!',
            'noLink': 'No link available!',
            'subTaskUpdated': 'Status updated!',
            'minOneSubTask': 'Must have at least 1 task!',
            'subTaskUpdateError': 'Update error!',
            'generateQR': 'Generate QR',
            'editBtn': 'Edit',
            'deleteBtn': 'Delete',
            'timeStatusCompleted': 'Completed',
            'timeStatusOverdueHours': '{hours}h {minutes}m overdue',
            'timeStatusOverdueMinutes': '{minutes}m overdue',
            'timeStatusNow': 'Starting soon (under 5 min)',
            'timeStatusSoon': 'Coming up in {minutes} min',
            'timeStatusUpcoming': 'Coming up in {minutes} min',
            'timeStatusFutureHours': '{hours}h {minutes}m remaining',
            'timeStatusFutureMinutes': '{minutes}m remaining',
            'subTaskProgressLabel': 'Sub-tasks Progress',
            'noNotesToCompleteOnDay': 'No notes to complete for this day!',
            'completeAllSuccess': 'All notes for {day} completed!',
            'completeAllError': 'Error completing all notes.',

            'noNotesToResetOnDay': 'No notes to reset for this day!',
            'confirmResetDay': 'Are you sure you want to reset {count} notes for {day}?',
            'resetAllSuccess': 'Reset (Start new day) for {day} successful!',
            'resetAllError': 'Error resetting notes.',
            'excelColSubTasks': 'Sub-tasks (Progress)',
            'manageTagsShort': 'Manage tag',
            'reportsReceived': 'Received Reports',
            'noReports': 'No reports yet',
            'sendReport': 'Send Report',
            'reportPreviewTitle': 'This Week Report Summary',
            'totalTasks': 'Total Tasks',
            'completedTasks': 'Completed',
            'onTimeTasks': 'On Time',
            'lateTasks': 'Late',
            'recipientEmail': 'Recipient Email',
            'recipientEmailPlaceholder': 'manager@example.com',
            'reportMessage': 'Note (optional)',
            'reportMessagePlaceholder': 'Add a note for the recipient...',
            'sendReportBtn': 'Send Report',
            'reportDetailTitle': 'Report Details',
            'reportFrom': 'From',
            'reportSentDate': 'Sent Date',
            'reportNote': 'Note',
            'deleteReport': 'Delete Report',
            'markAsRead': 'Mark as Read',
            'statisticsTitle': 'Statistics',
            'avgCompletionTime': 'Average Completion Time',
            'analysisByTag': 'Analysis by Tag',
            'distributionByDay': 'Distribution by Day',
            'tasksDone': 'tasks',
            'sendingReport': 'Sending...',
            'reportSentSuccess': 'Report sent successfully to',
            'emailNotRegistered': 'This email is not registered in the system!',
            'cannotSendToSelf': 'Cannot send report to yourself!',
            'enterRecipientEmail': 'Please enter recipient email!',
            'invalidEmail': 'Invalid email!',
            'errorSendingReport': 'Error sending report',
            'reportDeleted': 'Report deleted!',
            'errorDeletingReport': 'Error deleting report!',
            'markedAsRead': 'Marked as read!',
            'confirmDeleteReport': 'Are you sure you want to delete this report?',
            'tasksCompleted': 'tasks completed',
            'justNow': 'Just now',
            'minutesAgo': 'minutes ago',
            'hoursAgo': 'hours ago',
            'daysAgo': 'days ago',
            'sendReportToOthers': 'Send this report to others',
            'onlyRegisteredUsers': 'Only send to registered users in the system',
            'reportRecipients': 'Recent Recipients',
            'avgTime': 'Avg Time',
            'completionRate': 'Completion Rate',
            'dashboardTitle': 'Reporting Dashboard',
            'dashboardWeeklySummary': 'This Week Performance Summary',
            'submittedReports': 'Submitted Reports',
            'employee': 'Sender',
            'onTimeRate': 'On-Time Rate',
            'details': 'Details',
            'loadingData': 'Loading data...',
            'noReportsThisWeek': 'No reports submitted this week.',
            'minutesPerTask': 'min/task',
        }
    };

    let currentLanguage = localStorage.getItem('language') || 'vi'; // Mặc định là Tiếng Việt

    function applyTranslations() {
        const lang = translations[currentLanguage];

        // Helper functions để gán giá trị an toàn, tránh lỗi "null"
        const setText = (id, text) => {
            const el = document.getElementById(id);
            if (el) el.textContent = text;
        };
        const setHTML = (id, html) => {
            const el = document.getElementById(id);
            if (el) el.innerHTML = html;
        };
        const setPlaceholder = (id, text) => {
            const el = document.getElementById(id);
            if (el) el.placeholder = text;
        };
        const updateOption = (selectId, value, text) => {
            const opt = document.querySelector(`#${selectId} option[value="${value}"]`);
            if (opt) opt.textContent = text;
        };

        // --- HEADER & GENERAL ---
        const headerTitle = document.querySelector('.header h1');
        if (headerTitle) headerTitle.textContent = localStorage.getItem('appName') || lang.defaultAppName;

        // Slogan không có trong file HTML mới, nhưng để lại cho an toàn
        const headerSlogan = document.querySelector('.header p');
        if (headerSlogan) headerSlogan.textContent = lang.appSlogan;

        setPlaceholder('searchInput', lang.searchInputPlaceholder);

        const filterSelectAll = document.querySelector('#filterSelect option[value="all"]');
        if (filterSelectAll) filterSelectAll.textContent = lang.allNotesOption;

        const completedOption = document.querySelector('#filterSelect option[value="completed"]');
        if (completedOption) completedOption.textContent = lang.completedNotesOption;

        setHTML('helpTextIcon', lang.helpTextFontAwesome);
        setText('helpTextColor', lang.helpTextColorPicker);
        setHTML('footerText', lang.footerText);

        // --- BUTTONS ---
        setHTML('scanQRBtn', lang.scanQRBtn);
        setHTML('addNoteBtn', lang.addNoteBtn);
        setHTML('completeAllBtn', lang.completeAllBtn);
        setHTML('resetAllBtn', lang.resetAllBtn);
        setHTML('exportExcelBtn', lang.exportExcelBtn);
        setHTML('timeReportsBtn', lang.timeReportsBtn);

        // --- EMPTY STATE ---
        const emptyTitle = document.querySelector('#emptyState h3');
        if (emptyTitle) emptyTitle.textContent = lang.emptyStateTitle;
        const emptyText = document.querySelector('#emptyState p');
        if (emptyText) emptyText.textContent = lang.emptyStateText;

        // --- NOTE FORM ---
        const noteTitleLabel = document.querySelector('label[for="noteTitle"]');
        if (noteTitleLabel) noteTitleLabel.textContent = lang.noteTitleLabel;

        const noteContentLabel = document.querySelector('label[for="noteContent"]');
        if (noteContentLabel) noteContentLabel.textContent = lang.noteContentLabel;

        const noteTimeLabel = document.querySelector('label[for="noteTime"]');
        if (noteTimeLabel) noteTimeLabel.textContent = lang.noteTimeLabel;

        setText('notificationTimeBeforeLabel', lang.notificationTimeBeforeLabel);
        setText('noteDayOfWeekLabel', lang.noteDayOfWeekLabel);
        setText('expectedDurationLabel', lang.expectedDurationLabel);
        setText('helpExpectedDuration', lang.helpExpectedDuration);
        setText('subTasksLabel', lang.subTasksLabel);

        const addSubTaskBtn = document.getElementById('addSubTaskBtn');
        if (addSubTaskBtn) addSubTaskBtn.innerHTML = `<i class="fas fa-plus"></i> ${lang.addSubTask}`;

        // Cập nhật Label "Thẻ" một cách an toàn
        const noteTagLabelElements = document.querySelectorAll('.form-group label');
        noteTagLabelElements.forEach(label => {
            const span = label.querySelector('span');
            if (span && label.nextElementSibling && label.nextElementSibling.id === 'noteTagsContainer') {
                span.textContent = lang.noteTagLabel;
            }
        });

        // Cập nhật nút "Quản lý"
        const manageTagsBtn = document.getElementById('manageTagsBtn');
        if (manageTagsBtn) {
            const text = lang.manageTagsShort || 'Quản lý';
            manageTagsBtn.innerHTML = `<i class="fas fa-cog"></i> ${text}`;
        }

        // --- SELECT OPTIONS ---
        ['dayOfWeekSelect', 'noteDayOfWeek', 'qrNoteDayOfWeek'].forEach(id => {
            if (document.getElementById(id)) {
                if (id === 'dayOfWeekSelect') updateOption(id, 'all', lang.allDaysOption);
                updateOption(id, '0', lang.sunday); updateOption(id, '1', lang.monday); updateOption(id, '2', lang.tuesday);
                updateOption(id, '3', lang.wednesday); updateOption(id, '4', lang.thursday); updateOption(id, '5', lang.friday);
                updateOption(id, '6', lang.saturday);
            }
        });
        updateOption('notificationTimeBefore', '0', lang.noNotification); updateOption('notificationTimeBefore', '5', lang.minutes5);
        updateOption('notificationTimeBefore', '10', lang.minutes10); updateOption('notificationTimeBefore', '15', lang.minutes15);
        updateOption('notificationTimeBefore', '30', lang.minutes30); updateOption('notificationTimeBefore', '60', lang.minutes60);

        // --- SETTINGS MODAL ---
        const settingsTitle = document.querySelector('#settingsModal .modal-header .modal-title');
        if (settingsTitle) settingsTitle.textContent = lang.settingsModalTitle;
        setText('appNameLabel', lang.appNameLabel);
        setPlaceholder('appNameInput', lang.appNamePlaceholder);
        const noteColumnsLabel = document.querySelector('label[for="noteColumns"]');
        if (noteColumnsLabel) noteColumnsLabel.textContent = lang.noteColumnsLabel;
        updateOption('noteColumns', '1', lang.column1); updateOption('noteColumns', '2', lang.column2);
        updateOption('noteColumns', '3', lang.column3); updateOption('noteColumns', '4', lang.column4);
        const bgColorLabel = document.querySelector('label[for="backgroundColor"]');
        if (bgColorLabel) bgColorLabel.textContent = lang.backgroundColorLabel;
        const langLabel = document.querySelector('label[for="languageSelect"]');
        if (langLabel) langLabel.textContent = lang.languageLabel;
        updateOption('languageSelect', 'vi', lang.vietnameseLanguage);
        updateOption('languageSelect', 'en', lang.englishLanguage);
        setText('saveSettingsBtn', lang.saveSettingsBtn);

        // --- MANAGE TAGS MODAL ---
        const manageTagsTitle = document.querySelector('#manageTagsModal .modal-header .modal-title');
        if (manageTagsTitle) manageTagsTitle.textContent = lang.manageTagsModalTitle;
        const tagNameLabel = document.querySelector('label[for="newTagName"]');
        if (tagNameLabel) tagNameLabel.textContent = lang.newTagNameLabel;
        const tagNameEnLabel = document.querySelector('label[for="newTagNameEn"]');
        if (tagNameEnLabel) tagNameEnLabel.textContent = currentLanguage === 'vi' ? 'Tên Thẻ (Tiếng Anh)' : 'Tag Name (English)';
        const tagIconLabel = document.querySelector('label[for="newTagIcon"]');
        if (tagIconLabel) tagIconLabel.textContent = lang.newTagIconLabel;
        const tagColorLabel = document.querySelector('label[for="newTagColor"]');
        if (tagColorLabel) tagColorLabel.textContent = lang.newTagColorLabel;
        const currentTagsTitle = document.querySelector('#manageTagsModal h4');
        if (currentTagsTitle) currentTagsTitle.textContent = lang.currentTagsTitle;
        setPlaceholder('newTagName', lang.newTagNamePlaceholder);
        if (document.getElementById('newTagNameEn')) setPlaceholder('newTagNameEn', lang.newTagNameEnPlaceholder);
        setPlaceholder('newTagIcon', lang.newTagIconPlaceholder);

        // Cập nhật message trong Current Tags List
        const currentTagsList = document.getElementById('currentTagsList');
        if (currentTagsList && (currentTagsList.textContent.includes('Chưa có thẻ nào.') || currentTagsList.textContent.includes('No tags yet.'))) {
            currentTagsList.innerHTML = `<p>${lang.noTagsMessage}</p>`;
        }

        // --- VIEW NOTE MODAL ---
        const viewNoteLabels = document.querySelectorAll('#viewNoteModal .meta-item .form-label');
        if (viewNoteLabels.length >= 3) {
            viewNoteLabels[0].textContent = lang.viewNoteTagLabel;
            viewNoteLabels[1].textContent = lang.viewNoteStatusLabel;
            viewNoteLabels[2].textContent = lang.viewNoteTimeLabel;
        }
        const viewContentLabel = document.querySelector('#viewNoteContent')?.parentElement?.querySelector('.form-label');
        if (viewContentLabel) viewContentLabel.textContent = lang.viewNoteContentLabel;
        const viewSubTasksLabel = document.querySelector('#viewSubTasksGroup .form-label');
        if (viewSubTasksLabel) viewSubTasksLabel.textContent = lang.subTasksLabel;

        // --- CONFIRM DELETE MODAL ---
        const confirmText = document.querySelector('.confirmation-text');
        if (confirmText) confirmText.textContent = lang.confirmDeleteText;
        setText('cancelDeleteBtn', lang.cancelBtn);
        setText('confirmDeleteBtn', lang.deleteBtnConfirm);

        // --- QR MODALS ---
        setText('qrScannerTitle', lang.qrScannerTitle);
        setText('qrGeneratorTitle', lang.qrGeneratorTitle);
        setText('addFromQRTitle', lang.addFromQRTitle);
        setHTML('uploadQRImageBtn', lang.uploadQRImageBtn);
        setHTML('pasteLinkBtn', lang.pasteLinkBtn);
        setHTML('downloadQRBtn', lang.downloadQRBtn);
        setHTML('copyQRLinkBtn', lang.copyQRLinkBtn);
        setText('qrConfirmMessage', lang.qrConfirmMessage);
        setText('qrSubTasksLabel', lang.subTasksLabel);
        const addQRSubTaskBtn = document.getElementById('addQRSubTaskBtn');
        if (addQRSubTaskBtn) addQRSubTaskBtn.innerHTML = `<i class="fas fa-plus"></i> ${lang.addSubTask}`;
        setText('qrOtherOptionsText', lang.qrOtherOptions);
        const qrConfirmBtn = document.querySelector('#addFromQRModal button[type="submit"]');
        if (qrConfirmBtn) qrConfirmBtn.innerHTML = `<i class="fas fa-check"></i> ${lang.qrConfirmAddBtn}`;

        // QR Form labels
        const qrFormLabels = document.querySelectorAll('#addFromQRForm .form-label');
        if (qrFormLabels.length >= 5) {
            qrFormLabels[0].textContent = lang.noteTitleLabel;
            qrFormLabels[1].textContent = lang.noteDayOfWeekLabel;
            qrFormLabels[2].textContent = lang.noteContentLabel;
            qrFormLabels[3].textContent = lang.noteTimeLabel;
            qrFormLabels[4].textContent = lang.expectedDurationLabel;
            qrFormLabels[5].textContent = lang.noteTagLabel;
        }

        // Cập nhật placeholder cho QR sub-task inputs
        document.querySelectorAll('#qrSubTasksContainer .sub-task-text-input').forEach(input => {
            input.placeholder = lang.subTaskPlaceholder;
        });

        document.querySelectorAll('#qrSubTasksContainer .sub-task-link-input').forEach(input => {
            input.placeholder = lang.subTaskLinkPlaceholder;
        });

        // --- TIME REPORTS MODAL ---
        setText('timeReportsModalTitle', lang.timeReportsModalTitle);
        setText('totalTasksText', lang.totalTasksText);
        setText('onTimeTasksText', lang.onTimeTasksText);
        setText('lateTasksText', lang.lateTasksText);
        setText('avgTimeText', lang.avgTimeText);
        setText('detailsTitle', lang.detailsTitle);

        // --- PROFILE MODAL ---
        setHTML('profileBtn', `<i class="fas fa-user"></i> ${lang.menuProfile}`);
        setHTML('logoutBtn', `<i class="fas fa-sign-out-alt"></i> ${lang.menuLogout}`);
        setText('profileModalTitle', lang.profileModalTitle);
        setText('labelProfileEmail', lang.labelProfileEmail);
        setText('labelProfileName', lang.labelProfileName);
        setText('labelProfileJoined', lang.labelProfileJoined);
        setText('labelSecurity', lang.labelSecurity);
        setText('textSendResetBtn', lang.textSendResetBtn);
        setText('helpTextReset', lang.helpTextReset);
        setText('saveProfileBtn', lang.saveProfileBtn);

        // --- DYNAMIC ELEMENTS ---
        document.querySelectorAll('.sub-task-text-input').forEach(input => input.placeholder = lang.subTaskPlaceholder);
        document.querySelectorAll('.sub-task-link-input').forEach(input => input.placeholder = lang.subTaskLinkPlaceholder);
        document.querySelectorAll('.copy-link-btn').forEach(btn => {
            const icon = btn.querySelector('i');
            btn.innerHTML = '';
            if (icon) btn.appendChild(icon);
            btn.innerHTML += ` ${lang.copyLink}`;
        });

        // --- DYNAMIC BUTTON STATES ---
        if (document.getElementById('modalTitle')) document.getElementById('modalTitle').textContent = editingNoteKey ? lang.editNoteModalTitle : lang.newNoteModalTitle;
        if (document.getElementById('submitNoteBtn')) document.getElementById('submitNoteBtn').textContent = editingNoteKey ? lang.updateNoteBtn : lang.saveNoteBtn;
        if (document.getElementById('addOrUpdateTagBtn')) document.getElementById('addOrUpdateTagBtn').innerHTML = editingTagId ? lang.updateTagBtn : lang.addTagBtn;
        if (document.getElementById('sendReportFromTimeReportsBtn')) {
            document.getElementById('sendReportFromTimeReportsBtn').addEventListener('click', () => {
                closeTimeReportsModal(); // Đóng modal Time Reports
                openSendReportModal();   // Mở modal gửi báo cáo
            });
        }

        // ========================================
        // --- REPORTS SECTION ---
        // ========================================


        // Send Report Modal
        const sendReportTitle = document.querySelector('#sendReportModal .modal-title');
        if (sendReportTitle) sendReportTitle.textContent = lang.sendReport;

        const reportPreviewTitle = document.querySelector('#reportPreview h4');
        if (reportPreviewTitle) reportPreviewTitle.textContent = lang.reportPreviewTitle;

        // Preview Stats Labels
        const previewStatLabels = document.querySelectorAll('#reportPreview .stat-item label');
        if (previewStatLabels.length >= 4) {
            previewStatLabels[0].textContent = lang.totalTasks;
            previewStatLabels[1].textContent = lang.completedTasks;
            previewStatLabels[2].textContent = lang.onTimeTasks;
            previewStatLabels[3].textContent = lang.lateTasks;
        }

        // Send Report Form
        const recipientEmailLabel = document.querySelector('label[for="recipientEmail"]');
        if (recipientEmailLabel) {
            recipientEmailLabel.innerHTML = `<i class="fas fa-envelope"></i> ${lang.recipientEmail}`;
        }
        setPlaceholder('recipientEmail', lang.recipientEmailPlaceholder);

        const reportMessageLabel = document.querySelector('#sendReportModal label[for="reportMessage"]');
        if (reportMessageLabel) {
            reportMessageLabel.innerHTML = `<i class="fas fa-comment"></i> ${lang.reportMessage}`;
        }

        setPlaceholder('reportMessage', lang.reportMessagePlaceholder);

        const sendReportHelpText = document.querySelector('#sendReportModal .help-text');
        if (sendReportHelpText) {
            sendReportHelpText.innerHTML = `<i class="fas fa-info-circle"></i> ${lang.onlyRegisteredUsers}`;
        }

        const sendReportSubmitBtn = document.getElementById('sendReportSubmitBtn');
        if (sendReportSubmitBtn) {
            sendReportSubmitBtn.innerHTML = `<i class="fas fa-paper-plane"></i> ${lang.sendReportBtn}`;
        }

        // View Report Modal
        const viewReportTitle = document.querySelector('#viewReportModal .modal-title');
        if (viewReportTitle) viewReportTitle.textContent = lang.reportDetailTitle;

        setText('reportFromLabel', lang.reportFrom);
        setText('reportDateLabel', lang.reportSentDate);
        setText('reportNoteLabel', lang.reportNote);

        // Delete & Mark as Read Buttons
        const deleteReportBtn = document.getElementById('deleteReportBtn');
        if (deleteReportBtn) {
            deleteReportBtn.innerHTML = `<i class="fas fa-trash"></i> ${lang.deleteReport}`;
        }

        const markAsReadBtn = document.getElementById('markAsReadBtn');
        if (markAsReadBtn) {
            markAsReadBtn.innerHTML = `<i class="fas fa-check"></i> ${lang.markAsRead}`;
        }

        // Send Report Footer Button (in Time Reports Modal)
        const sendReportFromTimeReportsBtn = document.getElementById('sendReportFromTimeReportsBtn');
        if (sendReportFromTimeReportsBtn) {
            const btnText = sendReportFromTimeReportsBtn.querySelector('span');
            if (btnText) btnText.textContent = lang.sendReportToOthers;
        }

        const reportFooterHelp = document.querySelector('.report-actions-footer .help-text');
        if (reportFooterHelp) {
            reportFooterHelp.innerHTML = `<i class="fas fa-info-circle"></i> ${lang.onlyRegisteredUsers}`;
        }

        const dashboardTitle = document.getElementById('dashboardTitle');
        if (dashboardTitle) dashboardTitle.innerHTML = `<i class="fas fa-tachometer-alt"></i> ${lang.dashboardTitle}`;

        setText('dashboardSummaryText', lang.dashboardWeeklySummary);

        const submittedReportsTitle = document.getElementById('submittedReportsTitle');
        if (submittedReportsTitle) submittedReportsTitle.innerHTML = `<i class="fas fa-check-circle"></i> ${lang.submittedReports}`;

        setText('thEmployee', lang.employee);
        setText('thCompletionRate', lang.completionRate);
        setText('thOnTimeRate', lang.onTimeRate);
        setText('thAvgTime', lang.avgTime);
        setText('thDetails', lang.details);

        // --- RE-RENDER CHART (If open) ---
        if (timeReportsModal && timeReportsModal.classList.contains('active')) {
            generateTimeReports();
        }
    }

    async function handlePasteLink() {
        try {
            const text = await navigator.clipboard.readText();

            if (!text) {
                showToast('clipboardError', 'warning');
                return;
            }

            // Thử parse JSON
            const noteData = JSON.parse(text);

            // Validate dữ liệu cơ bản
            if (!noteData.title || !noteData.content) {
                showToast('invalidQRData', 'error');
                return;
            }

            // Nếu thành công, xử lý giống như quét QR thành công
            onScanSuccess(text, null);

        } catch (err) {
            console.error('Failed to read clipboard contents: ', err);
            showToast('clipboardError', 'error');
        }
    }

    function renderTagOptions(selectedTagId = null) {
        noteTagsContainer.innerHTML = '';
        tags.forEach(tag => {
            const label = document.createElement('label');
            label.className = 'tag-option';
            const tagName = getTagName(tag); // Sử dụng hàm getTagName
            label.innerHTML = `
            <input
                type="radio"
                name="noteTag"
                value="${tag.id}"
                class="tag-radio"
                ${selectedTagId === tag.id ? 'checked' : ''}
            />
            <span class="tag-label" style="--tag-custom-color: ${tag.color || '#e0e0e0'};">
                ${tag.icon ? `<i class="${tag.icon}"></i>` : ''} ${tagName}
            </span>
        `;
            noteTagsContainer.appendChild(label);
        });

        if (!selectedTagId && tags.length > 0) {
            const firstRadio = noteTagsContainer.querySelector('input[type="radio"]');
            if (firstRadio) {
                firstRadio.checked = true;
            }
        }
    }

    function renderFilterOptions() {
        const currentFilterValue = filterSelect.value;
        const lang = translations[currentLanguage];

        // Xóa tất cả options hiện tại
        filterSelect.innerHTML = '';

        // Thêm option "Tất cả ghi chú"
        const allOption = document.createElement('option');
        allOption.value = 'all';
        allOption.textContent = lang.allNotesOption;
        filterSelect.appendChild(allOption);

        // Thêm option "Chưa hoàn thành"
        const incompleteOption = document.createElement('option');
        incompleteOption.value = 'incomplete';
        incompleteOption.textContent = lang.incompleteNotesOption;
        filterSelect.appendChild(incompleteOption);

        // Thêm option "Đã hoàn thành"
        const completedOption = document.createElement('option');
        completedOption.value = 'completed';
        completedOption.textContent = lang.completedNotesOption;
        filterSelect.appendChild(completedOption);

        // Thêm option "Trễ giờ"
        const overdueOption = document.createElement('option');
        overdueOption.value = 'overdue';
        overdueOption.textContent = lang.overdueNotesOption;
        filterSelect.appendChild(overdueOption);

        // Thêm separator (optional - để tách biệt các tag)
        const separator = document.createElement('option');
        separator.disabled = true;
        separator.textContent = '─────────────';
        filterSelect.appendChild(separator);

        // Thêm các tag options
        tags.forEach(tag => {
            const option = document.createElement('option');
            option.value = tag.id;
            option.textContent = getTagName(tag);
            filterSelect.appendChild(option);
        });

        // Khôi phục giá trị đã chọn
        filterSelect.value = currentFilterValue;
    }

    function renderCurrentTagsList() {
        currentTagsList.innerHTML = '';
        const lang = translations[currentLanguage];

        if (tags.length === 0) {
            currentTagsList.innerHTML = `<p>${lang.noTagsMessage}</p>`;
            return;
        }

        tags.forEach(tag => {
            const tagItem = document.createElement('div');
            tagItem.className = 'tag-item';
            const tagColor = tag.color || '#e0e0e0';
            const tagTextColor = getContrastYIQ(tagColor);
            const tagName = getTagName(tag); // Sử dụng hàm getTagName

            tagItem.innerHTML = `
            <span class="tag-label" style="background-color: ${tagColor}; color: ${tagTextColor}; --tag-custom-color: ${tagColor};">
                ${tag.icon ? `<i class="${tag.icon}"></i>` : ''} ${tagName}
            </span>
            <div class="tag-actions">
                <button class="edit-tag-btn" data-id="${tag.id}"><i class="fas fa-edit"></i></button>
                <button class="delete-tag-btn" data-id="${tag.id}"><i class="fas fa-trash"></i></button>
            </div>
        `;
            currentTagsList.appendChild(tagItem);
        });

        document.querySelectorAll('.edit-tag-btn').forEach(btn => {
            btn.addEventListener('click', function () {
                editingTagId = this.getAttribute('data-id');
                const tagToEdit = tags.find(t => t.id === editingTagId);
                if (tagToEdit) {
                    // Xử lý tên thẻ có thể là object hoặc string
                    if (typeof tagToEdit.name === 'object') {
                        newTagNameInput.value = tagToEdit.name.vi || '';
                        newTagNameEnInput.value = tagToEdit.name.en || '';
                    } else {
                        newTagNameInput.value = tagToEdit.name;
                        newTagNameEnInput.value = '';
                    }
                    newTagIconInput.value = tagToEdit.icon || '';
                    newTagColorInput.value = tagToEdit.color || '#4f46e5';
                    addOrUpdateTagBtn.innerHTML = translations[currentLanguage].updateTagBtn;

                    // Hiển thị thông báo với tên thẻ
                    const tagName = getTagName(tagToEdit);
                    const message = translations[currentLanguage].toastEditingTag + tagName;
                    showToast(message, 'info'); // Truyền message trực tiếp thay vì key
                }
            });
        });

        document.querySelectorAll('.delete-tag-btn').forEach(btn => {
            btn.addEventListener('click', async function () {
                const tagIdToDelete = this.getAttribute('data-id');
                const lang = translations[currentLanguage];
                if (confirm(lang.confirmDeleteTag)) {
                    try {
                        const notesUsingThisTag = await db.collection('notes')
                            .where('userId', '==', currentUser.uid) // Quan trọng: Phải có userId
                            .where('tag', '==', tagIdToDelete)
                            .get();
                        const batch = db.batch();
                        notesUsingThisTag.forEach(doc => {
                            batch.update(doc.ref, { tag: null });
                        });
                        await batch.commit();

                        await db.collection('tags').doc(tagIdToDelete).delete();
                        showToast('toastTagDeleted', 'success');
                    } catch (error) {
                        console.error("Error deleting tag: ", error);
                        showToast('toastErrorDeletingTag', 'error');
                    }
                }
            });
        });
    }

    // Hàm tính toán màu chữ tương phản dựa trên màu nền (giữ nguyên)
    function getContrastYIQ(hexcolor) {
        if (!hexcolor || typeof hexcolor !== 'string') return '#000000'; // Default to black for invalid input

        hexcolor = hexcolor.startsWith('#') ? hexcolor.slice(1) : hexcolor;

        if (hexcolor.length === 3) {
            hexcolor = hexcolor[0] + hexcolor[0] + hexcolor[1] + hexcolor[1] + hexcolor[2] + hexcolor[2];
        }

        if (hexcolor.length !== 6) return '#000000';

        var r = parseInt(hexcolor.substr(0, 2), 16);
        var g = parseInt(hexcolor.substr(2, 2), 16);
        var b = parseInt(hexcolor.substr(4, 2), 16);
        var yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;
        return (yiq >= 128) ? '#000000' : '#ffffff';
    }

    function getDayName(dayNumber) {
        const lang = translations[currentLanguage];
        const days = [
            lang.sunday, lang.monday, lang.tuesday, lang.wednesday,
            lang.thursday, lang.friday, lang.saturday
        ];
        return days[dayNumber];
    }

    function openManageTagsModal() {
        manageTagsModal.classList.add("active");
        document.body.style.overflow = "hidden";
        newTagNameInput.value = '';
        newTagNameEnInput.value = '';

        newTagIconInput.value = '';
        newTagColorInput.value = '#4f46e5';
        addOrUpdateTagBtn.innerHTML = translations[currentLanguage].addTagBtn;
        editingTagId = null;
        renderCurrentTagsList();
    }

    function closeManageTagsModal() {
        manageTagsModal.classList.remove("active");
        document.body.style.overflow = "auto";
        newTagNameInput.value = '';
        newTagNameEnInput.value = '';
        newTagIconInput.value = '';
        newTagColorInput.value = '#4f46e5';
        addOrUpdateTagBtn.innerHTML = translations[currentLanguage].addTagBtn;
        editingTagId = null;
    }


    // === General Note Functions ===

    function sortNotesByTime(notesToSort) {
        return notesToSort.sort((a, b) => {
            const timeA = a.time.split(':').map(Number);
            const timeB = b.time.split(':').map(Number);

            if (timeA[0] !== timeB[0]) {
                return timeA[0] - timeB[0];
            }
            return timeA[1] - timeB[1];
        });
    }

    function getTagName(tag) {
        if (typeof tag.name === 'object') {
            return tag.name[currentLanguage] || tag.name.vi || tag.name;
        }
        return tag.name;
    }

    function renderNotes(notesToRender = notes) {
        notesContainer.innerHTML = "";

        if (tags.length === 0) {
            return;
        }

        const sortedNotes = sortNotesByTime([...notesToRender]);

        sortedNotes.forEach((note) => {
            const noteTagObject = tags.find(t => t.id === note.tag);
            const tagName = noteTagObject ? getTagName(noteTagObject) : translations[currentLanguage].undefinedTag;
            const tagIcon = noteTagObject ? noteTagObject.icon : '';
            const tagColor = noteTagObject ? (noteTagObject.color || '#e0e0e0') : '#e0e0e0';
            const tagTextColor = getContrastYIQ(tagColor); // Tính màu chữ tương phản
            let progressHTML = '';
            if (note.subTasks && note.subTasks.length > 0) {
                const progress = calculateProgress(note.subTasks);
                let progressAttr = '';

                if (progress === 0) {
                    progressAttr = 'data-progress="0"';
                } else if (progress === 100) {
                    progressAttr = 'data-progress="complete"';
                } else if (progress <= 33) {
                    progressAttr = 'data-progress="low"';
                } else if (progress <= 66) {
                    progressAttr = 'data-progress="medium"';
                } else {
                    progressAttr = 'data-progress="high"';
                }

                progressHTML = `
                <span class="note-progress" ${progressAttr}>
                    <i class="fas fa-tasks"></i> ${progress}%
                </span>
            `;
            }

            const timeStatus = getNoteTimeStatus(note);
            const timeTooltip = getTimeStatusText(note, timeStatus);
            const overdueClass = timeStatus === 'overdue' ? 'overdue' : '';
            const noteElement = document.createElement("div");
            noteElement.className = `note-card fade-in ${note.completed ? 'completed' : ''}`;
            noteElement.innerHTML = `
            <div class="note-content" data-id="${note.id}">
                <div class="note-header">
                    <h3 class="note-title">${note.title}</h3>
                    <div class="note-actions">
                            <button class="qr-btn" 
                                data-id="${note.id}" 
                                title="${translations[currentLanguage].generateQR || 'Tạo mã QR'}">
                            <i class="fas fa-qrcode"></i>
                        </button>
                        ${!note.completed ? `
                            <button class="complete-btn-header" 
                                    data-id="${note.id}" 
                                    title="${translations[currentLanguage].completeBtn || 'Hoàn thành'}">
                                <i class="fas fa-check"></i>
                            </button>
                        ` : ''}

                        <button class="edit-btn" 
                                data-id="${note.id}"
                                title="${translations[currentLanguage].editBtn || 'Sửa'}">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="delete-btn" 
                                data-id="${note.id}"
                                title="${translations[currentLanguage].deleteBtn || 'Xóa'}">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
                <p class="note-text">${note.content}</p>
                <div class="note-footer">
                    <span class="note-tag" style="background-color: ${tagColor}; color: ${tagTextColor}; --tag-custom-color: ${tagColor};">
                        ${tagIcon ? `<i class="${tagIcon}"></i>` : ''} ${tagName}
                    </span>
                    ${progressHTML}
                    <span class="note-date ${overdueClass}" 
                          data-status="${timeStatus}"
                          data-tooltip="${timeTooltip}">
                        ${note.time || '--:--'}
                    </span>
                </div>
            </div>
        `;
            notesContainer.appendChild(noteElement);
        });

        document.querySelectorAll(".delete-btn").forEach((btn) => {
            btn.addEventListener("click", function (event) {
                event.stopPropagation();
                noteToDeleteId = this.getAttribute("data-id");
                openConfirmModal();
            });
        });

        document.querySelectorAll(".edit-btn").forEach((btn) => {
            btn.addEventListener("click", function (event) {
                event.stopPropagation();
                editingNoteKey = this.getAttribute("data-id");
                const noteToEdit = notes.find(n => n.id === editingNoteKey);
                openAddNoteModal(noteToEdit);
            });
        });

        document.querySelectorAll(".complete-btn-header").forEach((button) => {
            button.addEventListener("click", async function (event) {
                event.stopPropagation();
                const noteId = this.getAttribute("data-id");
                const note = notes.find(n => n.id === noteId);

                if (note) {
                    const now = new Date();
                    const endTime = now.toISOString();
                    let actualDuration = null;
                    let isOnTime = null;

                    if (note.startTime) {
                        const start = new Date(note.startTime);
                        const end = new Date(endTime);
                        actualDuration = Math.round((end - start) / 60000);
                    } else {
                        const [hours, minutes] = note.time.split(':');
                        const scheduledTime = new Date();
                        scheduledTime.setHours(parseInt(hours), parseInt(minutes), 0, 0);

                        const diff = Math.round((now - scheduledTime) / 60000);
                        actualDuration = diff > 0 ? diff : 0; // ⬅️ Không cho phép số âm
                    }

                    if (note.expectedDuration && actualDuration) {
                        isOnTime = actualDuration <= note.expectedDuration;
                    }

                    try {
                        await db.collection('notes').doc(noteId).update({
                            completed: true,
                            endTime: endTime,
                            actualDuration: actualDuration,
                            isOnTime: note.expectedDuration ? actualDuration <= note.expectedDuration : null
                        });
                        showToast('toastNoteCompleted', 'success');
                    } catch (error) {
                        console.error("Error completing note: ", error);
                        showToast('toastErrorCompletingNote', 'error');
                    }
                }
            });
        });

        document.querySelectorAll(".qr-btn").forEach((btn) => {
            btn.addEventListener("click", function (event) {
                event.stopPropagation();
                const noteId = this.getAttribute("data-id");
                openQRGeneratorModal(noteId);
            });
        });

        document.querySelectorAll(".note-content").forEach((noteContentDiv) => {
            if (!noteContentDiv.dataset.hasClickListener) {
                noteContentDiv.addEventListener("click", function (event) {
                    if (event.target.closest('.edit-btn') || event.target.closest('.delete-btn') || event.target.closest('.complete-btn')) {
                        return;
                    }
                    const noteId = this.getAttribute("data-id");
                    const noteToView = notes.find(n => n.id === noteId);
                    openViewNoteModal(noteToView);
                });
                noteContentDiv.dataset.hasClickListener = true;
            }
        });

    }

    function addSubTaskInput(taskData = null) {
        const container = document.getElementById('subTasksContainer');
        const taskId = taskData?.id || Date.now().toString();
        const lang = translations[currentLanguage];

        const taskItem = document.createElement('div');
        taskItem.className = 'sub-task-item';
        taskItem.dataset.taskId = taskId;
        taskItem.dataset.completed = taskData?.completed || 'false';

        // **MỚI: HTML đơn giản hơn - không có checkbox và copy button**
        taskItem.innerHTML = `
        <div class="sub-task-content">
            <input type="text" 
                   class="sub-task-text-input" 
                   placeholder="${lang.subTaskPlaceholder}" 
                   value="${taskData?.text || ''}">
            <input type="url" 
                   class="sub-task-link-input" 
                   placeholder="${lang.subTaskLinkPlaceholder}" 
                   value="${taskData?.link || ''}">
        </div>
        <div class="sub-task-actions">
            <button type="button" class="sub-task-btn remove-sub-task-btn" title="${lang.deleteBtnConfirm}">
                <i class="fas fa-trash"></i>
            </button>
        </div>
    `;

        container.appendChild(taskItem);

        // **Event listener chỉ còn nút xóa**
        const removeBtn = taskItem.querySelector('.remove-sub-task-btn');
        removeBtn.addEventListener('click', () => {
            const totalSubTasks = container.querySelectorAll('.sub-task-item').length;
            if (totalSubTasks > 1) {
                taskItem.remove();
            } else {
                showToast(lang.minOneSubTask, 'warning');
            }
        });

        // **Auto focus vào input text của sub-task mới thêm**
        const textInput = taskItem.querySelector('.sub-task-text-input');
        if (!taskData) {
            setTimeout(() => textInput.focus(), 100);
        }
    }


    function getSubTasksFromForm() {
        const container = document.getElementById('subTasksContainer');
        const items = container.querySelectorAll('.sub-task-item');
        const subTasks = [];

        items.forEach(item => {
            const text = item.querySelector('.sub-task-text-input').value.trim();
            const link = item.querySelector('.sub-task-link-input').value.trim();

            const id = item.dataset.taskId;
            const completed = item.dataset.completed === 'true';

            // **MỚI: Chỉ thêm sub-task nếu có text (bỏ qua sub-task trống)**
            if (text) {
                subTasks.push({ id, text, link, completed });
            }
        });

        return subTasks;
    }

    // Hàm tính phần trăm hoàn thành
    function calculateProgress(subTasks) {
        if (!subTasks || subTasks.length === 0) return 0;
        const completed = subTasks.filter(task => task.completed).length;
        return Math.round((completed / subTasks.length) * 100);
    }

    function renderViewSubTasks(note) {
        const group = document.getElementById('viewSubTasksGroup');
        const list = document.getElementById('viewSubTasksList');
        const progressFill = document.getElementById('viewProgressFill');
        const progressText = document.getElementById('viewProgressText');
        const lang = translations[currentLanguage];

        if (!note.subTasks || note.subTasks.length === 0) {
            group.style.display = 'none';
            return;
        }

        group.style.display = 'block';
        list.innerHTML = '';

        const progress = calculateProgress(note.subTasks);
        progressFill.style.width = `${progress}%`;
        progressText.textContent = `${progress}%`;

        // **MỚI: Thêm data attribute để CSS áp dụng màu**
        if (progress <= 33) {
            progressFill.setAttribute('data-progress', 'low');
        } else if (progress <= 66) {
            progressFill.setAttribute('data-progress', 'medium');
        } else {
            progressFill.setAttribute('data-progress', 'high');
        }

        note.subTasks.forEach(task => {
            const item = document.createElement('div');
            item.className = `view-sub-task-item ${task.completed ? 'completed' : ''}`;

            item.innerHTML = `
            <input type="checkbox" 
                   class="view-sub-task-checkbox" 
                   data-task-id="${task.id}"
                   data-note-id="${note.id}"
                   ${task.completed ? 'checked' : ''}
                    ${note.completed ? 'disabled' : ''}>
            <span class="view-sub-task-text">${task.text}</span>
            ${task.link ? `
                <div class="view-sub-task-link">
                    <button class="copy-link-btn" data-link="${task.link}">
                        <i class="fas fa-copy"></i> ${lang.copyLink}
                    </button>
                </div>
            ` : ''}
        `;

            list.appendChild(item);

            const checkbox = item.querySelector('.view-sub-task-checkbox');
            checkbox.addEventListener('change', async (e) => {
                if (note.completed) {
                    e.preventDefault();
                    e.target.checked = task.completed; // Trả lại trạng thái cũ
                    showToast('Note đã hoàn thành — không thể chỉnh sửa sub-task!', 'warning');
                    return;
                }

                const noteId = e.target.dataset.noteId;
                const taskId = e.target.dataset.taskId;
                const completed = e.target.checked;

                await updateSubTaskStatus(noteId, taskId, completed);
            });

            if (task.link) {
                const copyBtn = item.querySelector('.copy-link-btn');
                copyBtn.addEventListener('click', () => {
                    navigator.clipboard.writeText(task.link)
                        .then(() => showToast(lang.linkCopied, 'success'))
                        .catch(() => showToast(lang.linkCopyFailed, 'error'));
                });
            }
        });
    }

    async function updateSubTaskStatus(noteId, taskId, completed) {
        const lang = translations[currentLanguage];

        try {
            const noteRef = db.collection('notes').doc(noteId);
            const noteDoc = await noteRef.get();
            const noteData = noteDoc.data();

            const updatedSubTasks = noteData.subTasks.map(task =>
                task.id === taskId ? { ...task, completed } : task
            );

            await noteRef.update({ subTasks: updatedSubTasks });

            // Cập nhật progress
            const progress = calculateProgress(updatedSubTasks);
            const progressFill = document.getElementById('viewProgressFill');
            const progressText = document.getElementById('viewProgressText');

            progressFill.style.width = `${progress}%`;
            progressText.textContent = `${progress}%`;

            // **MỚI: Cập nhật màu progress bar**
            if (progress <= 33) {
                progressFill.setAttribute('data-progress', 'low');
            } else if (progress <= 66) {
                progressFill.setAttribute('data-progress', 'medium');
            } else {
                progressFill.setAttribute('data-progress', 'high');
            }

            // Cập nhật class cho sub-task item
            const checkbox = document.querySelector(`[data-task-id="${taskId}"][data-note-id="${noteId}"]`);
            if (checkbox) {
                const subTaskItem = checkbox.closest('.view-sub-task-item');
                if (subTaskItem) {
                    if (completed) {
                        subTaskItem.classList.add('completed');
                    } else {
                        subTaskItem.classList.remove('completed');
                    }
                }
            }

            showToast(lang.subTaskUpdated, 'success');
        } catch (error) {
            console.error('Error updating sub-task:', error);
            showToast(lang.subTaskUpdateError, 'error');
        }
    }


    function setDefaultTime() {
        const now = new Date();
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        document.getElementById('noteTime').value = `${hours}:${minutes}`;
    }

    function openAddNoteModal(note = null) {
        addNoteModal.classList.add("active");
        document.body.style.overflow = "hidden";
        noteForm.reset();

        // **MỚI: Clear sub-tasks container**
        const subTasksContainer = document.getElementById('subTasksContainer');
        subTasksContainer.innerHTML = '';

        const lang = translations[currentLanguage];

        if (note) {
            // Chế độ Sửa
            modalTitle.textContent = lang.editNoteModalTitle;
            submitNoteBtn.textContent = lang.updateNoteBtn;

            document.getElementById("noteTitle").value = note.title;
            document.getElementById("noteContent").value = note.content;
            document.getElementById("noteTime").value = note.time;
            noteDayOfWeekSelect.value = note.dayOfWeek || new Date().getDay();
            document.getElementById("expectedDuration").value = note.expectedDuration || 30;

            // **MỚI: Load sub-tasks hoặc tạo 1 sub-task trống**
            if (note.subTasks && note.subTasks.length > 0) {
                note.subTasks.forEach(task => addSubTaskInput(task));
            } else {
                // Nếu không có sub-tasks, tạo 1 sub-task trống
                addSubTaskInput();
            }

            renderTagOptions(note.tag);
            editingNoteKey = note.id;
        } else {
            // Chế độ Thêm mới
            modalTitle.textContent = lang.newNoteModalTitle;
            submitNoteBtn.textContent = lang.saveNoteBtn;

            setDefaultTime();
            noteDayOfWeekSelect.value = new Date().getDay();

            // **MỚI: Tạo 1 sub-task trống mặc định**
            addSubTaskInput();

            renderTagOptions();
            editingNoteKey = null;
        }

        setTimeout(() => {
            document.getElementById("noteTitle").focus();
        }, 200);
    }

    function closeAddNoteModal() {
        addNoteModal.classList.remove("active");
        document.body.style.overflow = "auto";
        noteForm.reset();
        editingNoteKey = null;
    }

    scanQRBtn.addEventListener("click", openQRScannerModal);
    closeQRScannerBtn.addEventListener("click", closeQRScannerModal);
    uploadQRImageBtn.addEventListener("click", () => qrImageUpload.click());
    qrImageUpload.addEventListener("change", handleQRImageUpload);

    closeQRGeneratorBtn.addEventListener("click", closeQRGeneratorModal);
    downloadQRBtn.addEventListener("click", downloadQRCode);
    copyQRLinkBtn.addEventListener("click", copyQRLink);

    closeAddFromQRBtn.addEventListener("click", closeAddFromQRModal);
    addFromQRForm.addEventListener("submit", handleAddFromQR);

    // QR Scanner Functions
    function openQRScannerModal() {
        qrScannerModal.classList.add("active");
        document.body.style.overflow = "hidden";

        // Reset scan result display
        document.getElementById("qrScanResult").style.display = "none";

        startQRScanner();
    }

    function closeQRScannerModal() {
        qrScannerModal.classList.remove("active");
        document.body.style.overflow = "auto";
        stopQRScanner();
        document.getElementById("qrScanResult").style.display = "none";
    }

    function startQRScanner() {
        // Kiểm tra nếu scanner đang chạy, dừng trước khi khởi động lại
        if (html5QrCode && html5QrCode.getState() === Html5QrcodeScannerState.SCANNING) {
            stopQRScanner();
            return;
        }

        html5QrCode = new Html5Qrcode("qrReader");

        const config = {
            fps: 10,
            qrbox: { width: 250, height: 250 },
            aspectRatio: 1.0
        };

        html5QrCode.start(
            { facingMode: "environment" },
            config,
            onScanSuccess,
            onScanError
        ).catch(err => {
            console.error("Camera error:", err);
            showToast('cameraPermissionDenied', 'warning');
        });
    }

    function stopQRScanner() {
        if (html5QrCode) {
            try {
                // Kiểm tra trạng thái trước khi stop
                // Html5QrcodeScannerState.SCANNING = 2, PAUSED = 3
                if (html5QrCode.getState() === 2 || html5QrCode.getState() === 3) {
                    html5QrCode.stop()
                        .then(() => {
                            html5QrCode.clear();
                            html5QrCode = null;
                        })
                        .catch(err => {
                            html5QrCode = null;
                        });
                } else {
                    // Nếu không đang scan thì chỉ clear
                    html5QrCode.clear();
                    html5QrCode = null;
                }
            } catch (e) {
                console.log("Scanner state check failed, forcing clear.");
                html5QrCode = null;
            }
        }
    }


    function onScanSuccess(decodedText, decodedResult) {
        setTimeout(() => {
            stopQRScanner();
        }, 100);

        try {
            const noteData = JSON.parse(decodedText);

            // Validate data
            if (!noteData.title || !noteData.content) {
                showToast('invalidQRData', 'error');
                return;
            }

            currentQRNoteData = noteData;

            // Show success message
            document.getElementById("qrScanResult").style.display = "block";

            // Close scanner modal after 1 second
            setTimeout(() => {
                closeQRScannerModal();
                openAddFromQRModal(noteData);
            }, 1000);

        } catch (error) {
            console.error("Invalid QR data parsing:", error);
            showToast('invalidQRData', 'error');
        }
    }


    function onScanError(errorMessage) {
        // Ignore scan errors (they happen frequently during scanning)
        // console.log(errorMessage);
    }

    function handleQRImageUpload(event) {
        const file = event.target.files[0];
        if (!file) return;

        // Hàm helper để quét file
        const scanFile = () => {
            const fileScannerInstance = new Html5Qrcode("qrReader");
            fileScannerInstance.scanFile(file, true)
                .then(decodedText => {
                    // Gọi success
                    onScanSuccess(decodedText, null);
                    // Dọn dẹp instance tạm này
                    fileScannerInstance.clear();
                })
                .catch(err => {
                    showToast('qrScanError', 'error');
                    fileScannerInstance.clear();
                });
        };

        // Nếu camera chính đang chạy, dừng nó trước
        if (html5QrCode && (html5QrCode.getState() === 2 || html5QrCode.getState() === 3)) {
            html5QrCode.stop()
                .then(() => {
                    html5QrCode.clear();
                    html5QrCode = null;
                    scanFile(); // Quét file sau khi dừng camera
                })
                .catch(err => {
                    scanFile(); // Thử quét file dù lỗi dừng camera
                });
        } else {
            scanFile(); // Quét ngay nếu camera không chạy
        }

        // Reset input
        event.target.value = '';
    }


    // QR Generator Functions
    function openQRGeneratorModal(noteId) {
        const note = notes.find(n => n.id === noteId);
        if (!note) return;

        currentGeneratedNote = note;

        qrGeneratorModal.classList.add("active");
        document.body.style.overflow = "hidden";

        // Display note info
        const noteTag = tags.find(t => t.id === note.tag);
        const tagName = noteTag ? getTagName(noteTag) : translations[currentLanguage].undefinedTag;

        document.getElementById("qrNoteTitle").textContent = note.title;
        document.getElementById("qrNoteContent").textContent = note.content;
        document.getElementById("qrNoteTime").innerHTML = `<i class="fas fa-clock"></i> ${note.time}`;
        document.getElementById("qrNoteTag").innerHTML = `<i class="fas fa-tag"></i> ${tagName}`;

        // Generate QR Code
        generateQRCode(note);
    }

    function closeQRGeneratorModal() {
        qrGeneratorModal.classList.remove("active");
        document.body.style.overflow = "auto";
        currentGeneratedNote = null;
    }

    function ensureQRCodeLibrary() {
        return new Promise((resolve, reject) => {
            // Kiểm tra nếu đã có
            if (typeof QRCode !== 'undefined') {
                resolve();
                return;
            }

            // Đợi library load (có thể đang trong quá trình load)
            let attempts = 0;
            const maxAttempts = 40; // 20 giây

            const checkLibrary = setInterval(() => {
                attempts++;

                if (typeof QRCode !== 'undefined') {
                    clearInterval(checkLibrary);
                    resolve();
                } else if (attempts >= maxAttempts) {
                    clearInterval(checkLibrary);
                    reject(new Error('QRCode library failed to load after 20 seconds'));
                }
            }, 500);
        });
    }


    function generateQRCode(note) {
        const qrData = {
            title: note.title,
            content: note.content,
            time: note.time,
            dayOfWeek: note.dayOfWeek || 0,
            tag: note.tag,
            expectedDuration: note.expectedDuration || 30,
            subTasks: note.subTasks || [] // **MỚI: Thêm sub-tasks vào QR**
        };

        const qrDataString = JSON.stringify(qrData);

        const container = document.querySelector('.qr-code-display');
        container.innerHTML = '';

        try {
            if (typeof kjua === 'undefined') {
                showToast('Lỗi thư viện QR. Vui lòng tải lại trang.', 'error');
                return;
            }

            const qrCode = kjua({
                text: qrDataString,
                size: 200,
                fill: '#000000',
                back: '#FFFFFF',
                rounded: 0,
                quiet: 1,
                mode: 'plain',
                render: 'canvas'
            });

            qrCode.id = 'qrCodeCanvas';
            container.appendChild(qrCode);

        } catch (error) {
            showToast('qrScanError', 'error');
        }
    }

    // Hàm thêm sub-task vào QR form
    function addQRSubTaskInput(taskData = null) {
        const container = document.getElementById('qrSubTasksContainer');
        const taskId = taskData?.id || Date.now().toString();
        const lang = translations[currentLanguage];

        const taskItem = document.createElement('div');
        taskItem.className = 'sub-task-item';
        taskItem.dataset.taskId = taskId;
        taskItem.dataset.completed = taskData?.completed || 'false';

        taskItem.innerHTML = `
        <div class="sub-task-content">
            <input type="text" 
                   class="sub-task-text-input" 
                   placeholder="${lang.subTaskPlaceholder}" 
                   value="${taskData?.text || ''}">
            <input type="url" 
                   class="sub-task-link-input" 
                   placeholder="${lang.subTaskLinkPlaceholder}" 
                   value="${taskData?.link || ''}">
        </div>
        <div class="sub-task-actions">
            <button type="button" class="sub-task-btn remove-qr-sub-task-btn" title="${lang.deleteBtnConfirm}">
                <i class="fas fa-trash"></i>
            </button>
        </div>
    `;

        container.appendChild(taskItem);

        const removeBtn = taskItem.querySelector('.remove-qr-sub-task-btn');
        removeBtn.addEventListener('click', () => {
            const totalSubTasks = container.querySelectorAll('.sub-task-item').length;
            if (totalSubTasks > 1) {
                taskItem.remove();
            } else {
                showToast(lang.minOneSubTask, 'warning');
            }
        });

        const textInput = taskItem.querySelector('.sub-task-text-input');
        if (!taskData) {
            setTimeout(() => textInput.focus(), 100);
        }
    }

    // Hàm lấy sub-tasks từ QR form
    function getQRSubTasksFromForm() {
        const container = document.getElementById('qrSubTasksContainer');
        const items = container.querySelectorAll('.sub-task-item');
        const subTasks = [];

        items.forEach(item => {
            const text = item.querySelector('.sub-task-text-input').value.trim();
            const link = item.querySelector('.sub-task-link-input').value.trim();
            const id = item.dataset.taskId;
            const completed = item.dataset.completed === 'true';

            if (text) {
                subTasks.push({ id, text, link, completed });
            }
        });

        return subTasks;
    }

    function downloadQRCode() {
        // Kjua tạo ra element (canvas hoặc img) và append vào div
        // Chúng ta tìm element đó
        const canvas = document.getElementById("qrCodeCanvas");

        if (!canvas) {
            showToast('qrScanError', 'error');
            return;
        }

        try {
            // Tạo link download
            const link = document.createElement('a');
            const fileName = `QR_${currentGeneratedNote.title.replace(/[^a-z0-9]/gi, '_')}.png`;

            // Nếu kjua render ra canvas (như cấu hình ở trên)
            if (canvas.tagName === 'CANVAS') {
                link.href = canvas.toDataURL("image/png");
            } else if (canvas.tagName === 'IMG') {
                link.href = canvas.src;
            }

            link.download = fileName;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            showToast('qrDownloaded', 'success');

        } catch (error) {
            console.error('Error downloading QR code:', error);
            showToast('qrScanError', 'error');
        }
    }


    function copyQRLink() {
        if (!currentGeneratedNote) return;

        const qrData = {
            title: currentGeneratedNote.title,
            content: currentGeneratedNote.content,
            time: currentGeneratedNote.time,
            dayOfWeek: currentGeneratedNote.dayOfWeek || 0,
            tag: currentGeneratedNote.tag,
            expectedDuration: currentGeneratedNote.expectedDuration || 30,
            subTasks: currentGeneratedNote.subTasks || [] // **MỚI**
        };

        const qrDataString = JSON.stringify(qrData);

        navigator.clipboard.writeText(qrDataString).then(() => {
            showToast('qrLinkCopied', 'success');
        }).catch(err => {
            console.error('Could not copy:', err);
        });
    }

    // Hàm kiểm tra trạng thái thời gian của note
    function getNoteTimeStatus(note) {
        if (note.completed) {
            return 'completed';
        }

        const [noteHour, noteMinute] = note.time.split(':').map(Number);
        const now = new Date();
        const currentHour = now.getHours();
        const currentMinute = now.getMinutes();
        const currentTotalMinutes = currentHour * 60 + currentMinute;
        const noteTotalMinutes = noteHour * 60 + noteMinute;

        const diffMinutes = noteTotalMinutes - currentTotalMinutes;

        // Đã trễ
        if (diffMinutes < 0) {
            return 'overdue';
        }
        // Sắp đến (trong vòng 30 phút)
        else if (diffMinutes <= 30) {
            return 'upcoming';
        }
        // Chưa đến giờ
        else {
            return 'future';
        }
    }

    // Hàm lấy text tooltip theo trạng thái
    function getTimeStatusText(note, status) {
        const lang = translations[currentLanguage];

        if (status === 'completed') {
            return lang.timeStatusCompleted || 'Đã hoàn thành';
        }

        const [noteHour, noteMinute] = note.time.split(':').map(Number);
        const now = new Date();
        const currentHour = now.getHours();
        const currentMinute = now.getMinutes();
        const currentTotalMinutes = currentHour * 60 + currentMinute;
        const noteTotalMinutes = noteHour * 60 + noteMinute;
        const diffMinutes = noteTotalMinutes - currentTotalMinutes;

        if (status === 'overdue') {
            const overdueMinutes = Math.abs(diffMinutes);
            const hours = Math.floor(overdueMinutes / 60);
            const minutes = overdueMinutes % 60;

            if (hours > 0) {
                return (lang.timeStatusOverdueHours || 'Trễ {hours} giờ {minutes} phút')
                    .replace('{hours}', hours)
                    .replace('{minutes}', minutes);
            } else {
                return (lang.timeStatusOverdueMinutes || 'Trễ {minutes} phút')
                    .replace('{minutes}', minutes);
            }
        }

        if (status === 'upcoming') {
            if (diffMinutes <= 5) {
                return lang.timeStatusNow || 'Sắp đến giờ (trong 5 phút)';
            } else if (diffMinutes <= 15) {
                return (lang.timeStatusSoon || 'Sắp đến ({minutes} phút nữa)')
                    .replace('{minutes}', diffMinutes);
            } else {
                return (lang.timeStatusUpcoming || 'Sắp đến ({minutes} phút nữa)')
                    .replace('{minutes}', diffMinutes);
            }
        }

        if (status === 'future') {
            const hours = Math.floor(diffMinutes / 60);
            const minutes = diffMinutes % 60;

            if (hours > 0) {
                return (lang.timeStatusFutureHours || 'Còn {hours} giờ {minutes} phút')
                    .replace('{hours}', hours)
                    .replace('{minutes}', minutes);
            } else {
                return (lang.timeStatusFutureMinutes || 'Còn {minutes} phút')
                    .replace('{minutes}', minutes);
            }
        }

        return '';
    }

    function openAddFromQRModal(noteData) {
        addFromQRModal.classList.add("active");
        document.body.style.overflow = "hidden";

        // **Clear sub-tasks container trước**
        const qrSubTasksContainer = document.getElementById('qrSubTasksContainer');
        qrSubTasksContainer.innerHTML = '';

        // Populate form với dữ liệu từ QR
        document.getElementById("qrNoteTitleInput").value = noteData.title;
        document.getElementById("qrNoteContentInput").value = noteData.content;
        document.getElementById("qrNoteTimeInput").value = noteData.time || '';
        document.getElementById("qrNoteDayOfWeek").value = noteData.dayOfWeek || new Date().getDay();
        document.getElementById("qrExpectedDuration").value = noteData.expectedDuration || 30;

        // **MỚI: Load sub-tasks từ QR data**
        if (noteData.subTasks && noteData.subTasks.length > 0) {
            noteData.subTasks.forEach(task => addQRSubTaskInput(task));
        } else {
            // Nếu không có sub-tasks, tạo 1 sub-task trống
            addQRSubTaskInput();
        }

        // Render tag options
        renderQRTagOptions(noteData.tag);
    }


    function closeAddFromQRModal() {
        addFromQRModal.classList.remove("active");
        document.body.style.overflow = "auto";
        currentQRNoteData = null;
    }

    function renderQRTagOptions(selectedTagId = null) {
        const container = document.getElementById("qrNoteTagsContainer");
        container.innerHTML = '';

        tags.forEach(tag => {
            const label = document.createElement('label');
            label.className = 'tag-option';
            const tagName = getTagName(tag);
            label.innerHTML = `
            <input
                type="radio"
                name="qrNoteTag"
                value="${tag.id}"
                class="tag-radio"
                ${selectedTagId === tag.id ? 'checked' : ''}
            />
            <span class="tag-label" style="--tag-custom-color: ${tag.color || '#e0e0e0'};">
                ${tag.icon ? `<i class="${tag.icon}"></i>` : ''} ${tagName}
            </span>
        `;
            container.appendChild(label);
        });

        if (!selectedTagId && tags.length > 0) {
            const firstRadio = container.querySelector('input[type="radio"]');
            if (firstRadio) {
                firstRadio.checked = true;
            }
        }
    }

    async function handleAddFromQR(e) {
        e.preventDefault();

        const title = document.getElementById("qrNoteTitleInput").value;
        const content = document.getElementById("qrNoteContentInput").value;
        const time = document.getElementById("qrNoteTimeInput").value;
        const dayOfWeek = parseInt(document.getElementById("qrNoteDayOfWeek").value);
        const expectedDuration = parseInt(document.getElementById("qrExpectedDuration").value) || 30;
        const selectedTagRadio = document.querySelector('input[name="qrNoteTag"]:checked');

        // **MỚI: Lấy sub-tasks từ form**
        const subTasks = getQRSubTasksFromForm();

        let tagId = null;
        if (selectedTagRadio) {
            tagId = selectedTagRadio.value;
        } else if (tags.length > 0) {
            tagId = tags[0].id;
        } else {
            showToast('toastNoTagDefined', 'warning');
            return;
        }

        const newNoteData = {
            userId: currentUser.uid,
            title,
            content,
            tag: tagId,
            time: time,
            dayOfWeek: dayOfWeek,
            expectedDuration: expectedDuration,
            subTasks: subTasks, // **MỚI: Thêm sub-tasks**
            actualDuration: null,
            startTime: null,
            endTime: null,
            isOnTime: null,
            completed: false
        };

        try {
            await db.collection('notes').add(newNoteData);
            showToast('toastNoteSaved', 'success');
            closeAddFromQRModal();
        } catch (error) {
            console.error("Error saving note from QR: ", error);
            showToast('toastErrorSavingNote', 'error');
        }
    }

    function updateAllTimeTooltips() {
        document.querySelectorAll('.note-date').forEach(dateElement => {
            const noteId = dateElement.closest('.note-content').getAttribute('data-id');
            const note = notes.find(n => n.id === noteId);

            if (note) {
                const timeStatus = getNoteTimeStatus(note);
                const timeTooltip = getTimeStatusText(note, timeStatus);

                dateElement.setAttribute('data-status', timeStatus);

                // SỬA Ở ĐÂY: Dùng data-tooltip thay vì title
                dateElement.setAttribute('data-tooltip', timeTooltip);
                dateElement.removeAttribute('title'); // Xóa title cũ nếu có

                if (timeStatus === 'overdue') {
                    dateElement.classList.add('overdue');
                } else {
                    dateElement.classList.remove('overdue');
                }
            }
        });
    }


    // Cập nhật mỗi 30 giây
    setInterval(updateAllTimeTooltips, 30000);

    function openViewNoteModal(note) {
        viewNoteModal.classList.add("active");
        document.body.style.overflow = "hidden";
        viewNoteTitle.textContent = note.title;
        viewNoteContent.textContent = note.content;
        viewNoteTime.textContent = note.time;

        viewNoteTime.classList.remove('overdue', 'completed-time');

        if (note.completed) {
            viewNoteTime.classList.add('completed-time');
        } else if (isNoteOverdue(note)) {
            viewNoteTime.classList.add('overdue');
        }

        const viewNoteTagObject = tags.find(t => t.id === note.tag);
        const viewTagName = viewNoteTagObject ? getTagName(viewNoteTagObject) : translations[currentLanguage].undefinedTag;
        const viewTagIcon = viewNoteTagObject ? viewNoteTagObject.icon : '';
        const viewTagColor = viewNoteTagObject ? (viewNoteTagObject.color || '#e0e0e0') : '#e0e0e0';
        const viewTagTextColor = getContrastYIQ(viewTagColor);

        viewNoteTag.className = `view-content note-tag`;
        viewNoteTag.style.backgroundColor = viewTagColor;
        viewNoteTag.style.color = viewTagTextColor;
        viewNoteTag.style.setProperty('--tag-custom-color', viewTagColor);
        viewNoteTag.innerHTML = `${viewTagIcon ? `<i class="${viewTagIcon}"></i>` : ''} ${viewTagName}`;

        const lang = translations[currentLanguage];
        viewNoteStatus.textContent = note.completed ? lang.completedStatus : lang.incompleteStatus;
        viewNoteStatus.style.color = note.completed ? "#10b981" : "#ef4444";

        viewNoteActions.innerHTML = '';
        if (note.completed) {
            const uncompleteBtn = document.createElement('button');
            uncompleteBtn.className = 'uncomplete-btn';
            uncompleteBtn.textContent = lang.uncompleteBtn;
            uncompleteBtn.setAttribute('data-id', note.id);

            uncompleteBtn.addEventListener('click', function () {
                const noteId = this.getAttribute('data-id');
                db.collection('notes').doc(noteId).update({ completed: false })
                    .then(() => {
                        closeViewNoteModal();
                        showToast('toastNoteReset', 'info');
                    })
                    .catch((error) => {
                        console.error("Error uncompleting note: ", error);
                        showToast('toastErrorResettingNote', 'error');
                    });
            });
            viewNoteActions.appendChild(uncompleteBtn);
        }
        renderViewSubTasks(note);
    }


    function closeViewNoteModal() {
        viewNoteModal.classList.remove("active");
        document.body.style.overflow = "auto";
        viewNoteActions.innerHTML = '';
    }

    function openConfirmModal() {
        confirmModal.classList.add("active");
        document.body.style.overflow = "hidden";
    }

    function closeConfirmModal() {
        confirmModal.classList.remove("active");
        document.body.style.overflow = "auto";
        noteToDeleteId = null;
    }

    timeReportsBtn.addEventListener("click", openTimeReportsModal);
    closeTimeReportsModalBtn.addEventListener("click", closeTimeReportsModal);

    function openTimeReportsModal() {
        timeReportsModal.classList.add("active");
        document.body.style.overflow = "hidden";
        generateTimeReports();
    }

    function closeTimeReportsModal() {
        timeReportsModal.classList.remove("active");
        document.body.style.overflow = "auto";
    }

    function generateTimeReports() {
        const lang = translations[currentLanguage];

        // Lọc notes trong tuần này
        const now = new Date();
        const startOfWeek = new Date(now);
        startOfWeek.setDate(now.getDate() - now.getDay());
        startOfWeek.setHours(0, 0, 0, 0);

        const weeklyNotes = notes.filter(note => {
            if (!note.completed || !note.endTime) return false;
            const endDate = new Date(note.endTime);
            return endDate >= startOfWeek;
        });

        // Tính toán statistics
        const totalTasks = weeklyNotes.length;
        const onTimeTasks = weeklyNotes.filter(n => n.isOnTime === true).length;
        const lateTasks = weeklyNotes.filter(n => n.isOnTime === false).length;
        const notesWithDuration = weeklyNotes.filter(n => n.actualDuration && n.actualDuration > 0);
        const avgTime = notesWithDuration.length > 0
            ? Math.round(notesWithDuration.reduce((sum, n) => sum + n.actualDuration, 0) / notesWithDuration.length)
            : 0;

        // Update summary cards
        document.getElementById('totalTasksCount').textContent = totalTasks;
        document.getElementById('onTimeTasksCount').textContent = onTimeTasks;
        document.getElementById('lateTasksCount').textContent = lateTasks;
        document.getElementById('avgTimeValue').textContent = `${avgTime} ${lang.timeUnit}`;

        // Render detailed list
        const timeReportsList = document.getElementById('timeReportsList');
        timeReportsList.innerHTML = '';

        if (weeklyNotes.length === 0) {
            timeReportsList.innerHTML = `<p style="text-align: center; color: #6b7280;">${lang.noTimeReports}</p>`;
            return;
        }

        weeklyNotes.forEach(note => {
            const item = document.createElement('div');
            item.className = `time-report-item ${note.isOnTime ? 'on-time' : 'late'}`;

            const timeDiff = (note.expectedDuration || 0) - (note.actualDuration || 0);

            const diffText = timeDiff > 0
                ? `${lang.savedTime}: ${timeDiff} ${lang.timeUnit}`
                : `${lang.overtime}: ${Math.abs(timeDiff)} ${lang.timeUnit}`;

            // Format thời gian hoàn thành
            let completedAtStr = "--:--";
            if (note.endTime) {
                const endDate = new Date(note.endTime);
                const hours = String(endDate.getHours()).padStart(2, '0');
                const minutes = String(endDate.getMinutes()).padStart(2, '0');
                const day = String(endDate.getDate()).padStart(2, '0');
                const month = String(endDate.getMonth() + 1).padStart(2, '0');
                completedAtStr = `${hours}:${minutes} (${day}/${month})`;
            }

            const completionColor = note.isOnTime ? '#059669' : '#d97706';

            // **MỚI: Tính % hoàn thành sub-tasks**
            let subTaskProgressHTML = '';
            if (note.subTasks && note.subTasks.length > 0) {
                const progress = calculateProgress(note.subTasks);
                let progressClass = '';
                let progressIcon = '';

                if (progress === 100) {
                    progressClass = 'complete';
                    progressIcon = '✅';
                } else if (progress >= 67) {
                    progressClass = 'high';
                    progressIcon = '🟢';
                } else if (progress >= 34) {
                    progressClass = 'medium';
                    progressIcon = '🟡';
                } else {
                    progressClass = 'low';
                    progressIcon = '🔴';
                }

                subTaskProgressHTML = `
                <p style="margin-top: 5px;">
                    <span class="sub-task-progress ${progressClass}">
                        ${progressIcon} ${lang.subTaskProgressLabel || 'Tiến độ công việc'}: ${progress}% (${note.subTasks.filter(t => t.completed).length}/${note.subTasks.length})
                    </span>
                </p>
            `;
            }

            item.innerHTML = `
            <i class="fas ${note.isOnTime ? 'fa-check-circle' : 'fa-exclamation-circle'} status-icon"></i>
            <div class="note-info">
                <h5>${note.title}</h5>
                <p style="margin-bottom: 2px;">
                    <i class="far fa-clock"></i> ${lang.reportSchedule}: ${getDayName(note.dayOfWeek || 0)} - ${note.time}
                </p>
                <p style="color: ${completionColor}; font-weight: 600;">
                    <i class="fas fa-check-double"></i> ${lang.reportCompleted}: ${completedAtStr}
                </p>
                ${subTaskProgressHTML}
            </div>
            <div class="time-stats">
                <span>${lang.expectedTime}: ${note.expectedDuration || 0} ${lang.timeUnit}</span>
                <span>${lang.actualTime}: ${note.actualDuration || 0} ${lang.timeUnit}</span>
            </div>
            <div class="time-diff ${timeDiff > 0 ? 'positive' : 'negative'}">
                ${diffText}
            </div>
        `;

            timeReportsList.appendChild(item);
        });

        renderTimeReportsChart(weeklyNotes);
    }

    function renderTimeReportsChart(weeklyNotes) {
        // 1. Phá hủy instance chart cũ để tránh memory leak
        if (window.timeReportsChartInstance) {
            window.timeReportsChartInstance.destroy();
        }

        // 2. Lấy container và TẠO LẠI canvas mới (Đây là bước quan trọng nhất)
        const chartContainer = document.querySelector('.chart-container');
        if (!chartContainer) return;

        // Xóa canvas cũ và tạo mới để đảm bảo không bị lỗi cache
        chartContainer.innerHTML = '<canvas id="timeReportsChart"></canvas>';

        const ctx = document.getElementById('timeReportsChart');
        if (!ctx) return;

        // 3. Chuẩn bị dữ liệu mới
        const onTimeData = [0, 0, 0, 0, 0, 0, 0];
        const lateData = [0, 0, 0, 0, 0, 0, 0];

        weeklyNotes.forEach(note => {
            const day = note.dayOfWeek || 0;
            if (note.isOnTime) {
                onTimeData[day]++;
            } else {
                lateData[day]++;
            }
        });

        const lang = translations[currentLanguage];
        const dayLabels = [
            lang.sunday, lang.monday, lang.tuesday, lang.wednesday,
            lang.thursday, lang.friday, lang.saturday
        ];

        // 4. Vẽ biểu đồ mới trên canvas mới
        window.timeReportsChartInstance = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: dayLabels,
                datasets: [
                    {
                        label: lang.onTimeTasksText,
                        data: onTimeData,
                        backgroundColor: 'rgba(16, 185, 129, 0.8)',
                        borderColor: 'rgb(16, 185, 129)',
                        borderWidth: 1,
                        borderRadius: 5, // Bo góc cho đẹp
                    },
                    {
                        label: lang.lateTasksText,
                        data: lateData,
                        backgroundColor: 'rgba(239, 68, 68, 0.8)',
                        borderColor: 'rgb(239, 68, 68)',
                        borderWidth: 1,
                        borderRadius: 5, // Bo góc
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false, // Cho phép chart co giãn tốt hơn trong modal
                plugins: {
                    legend: {
                        position: 'top',
                    },
                    title: {
                        display: true,
                        text: lang.timeReportsModalTitle,
                        font: {
                            size: 16
                        }
                    }
                },
                scales: {
                    x: {
                        stacked: true, // Chồng 2 cột lên nhau
                    },
                    y: {
                        stacked: true, // Chồng 2 cột lên nhau
                        beginAtZero: true,
                        ticks: {
                            stepSize: 1 // Đảm bảo trục Y là số nguyên (1, 2, 3...)
                        }
                    }
                }
            }
        });
    }



    async function exportToExcel() {
        const lang = translations[currentLanguage];

        if (notes.length === 0) {
            showToast(lang.toastNoNotesToExport, 'info');
            return;
        }

        const workbook = new ExcelJS.Workbook();
        workbook.creator = 'Notes App';
        workbook.created = new Date();

        const dayColors = ['EF4444', 'F59E0B', 'EAB308', '10B981', '3B82F6', '6366F1', '8B5CF6'];
        const dayBgColors = ['FFFECACA', 'FFFED7AA', 'FFFEF3C7', 'FFD1FAE5', 'FFDBEAFE', 'FFE0E7FF', 'FFEDE9FE'];

        // ==========================================
        // HELPER: Format Sub-tasks text (CÓ LINK)
        // ==========================================
        const formatSubTasks = (subTasks) => {
            if (!subTasks || subTasks.length === 0) return '';

            const progress = calculateProgress(subTasks);
            const total = subTasks.length;
            const completed = subTasks.filter(t => t.completed).length;

            // Dòng 1: Tổng quan tiến độ
            let result = `[ ${progress}% ] (${completed}/${total})\n`;

            // Các dòng sau: List công việc + Link
            subTasks.forEach(task => {
                const check = task.completed ? '☑' : '☐';
                let line = `${check} ${task.text}`;

                // **MỚI: Thêm link nếu có**
                if (task.link && task.link.trim() !== '') {
                    line += ` [Link: ${task.link}]`;
                }

                result += `${line}\n`;
            });

            return result;
        };

        // ==========================================
        // 1. SHEET TỔNG HỢP
        // ==========================================
        const wsAll = workbook.addWorksheet(lang.excelSheetAll, {
            views: [{ state: 'frozen', xSplit: 0, ySplit: 1 }]
        });
        wsAll.properties.tabColor = { argb: 'FF4F46E5' };

        // Định nghĩa cột
        wsAll.columns = [
            { header: lang.excelColDay, key: 'day', width: 15 },
            { header: lang.excelColTitle, key: 'title', width: 25 },
            { header: lang.excelColContent, key: 'content', width: 35 },
            { header: lang.excelColSubTasks, key: 'subtasks', width: 45 }, // Tăng chiều rộng cột này
            { header: lang.excelColTime, key: 'time', width: 12 },
            { header: lang.excelColTag, key: 'tag', width: 15 },
            { header: lang.excelColStatus, key: 'status', width: 15 },
            { header: lang.excelColExpected, key: 'expected', width: 12 },
            { header: lang.excelColActual, key: 'actual', width: 12 },
            { header: lang.excelColPerformance, key: 'performance', width: 15 }
        ];

        // Style Header
        wsAll.getRow(1).height = 30;
        wsAll.getRow(1).eachCell((cell) => {
            cell.font = { name: 'Calibri', bold: true, color: { argb: 'FFFFFFFF' }, size: 12 };
            cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF4F46E5' } };
            cell.alignment = { horizontal: 'center', vertical: 'middle' };
            cell.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
        });

        // Thêm dữ liệu
        notes.forEach((note, index) => {
            const noteTag = tags.find(t => t.id === note.tag);
            const tagName = noteTag ? getTagName(noteTag) : lang.undefinedTag;
            const status = note.completed ? lang.completedStatus : lang.incompleteStatus;
            const dayName = getDayName(note.dayOfWeek || 0);

            const expected = note.expectedDuration ? note.expectedDuration : '';
            const actual = note.actualDuration ? note.actualDuration : '';
            let performance = '';
            if (note.completed && typeof note.isOnTime === 'boolean') {
                performance = note.isOnTime ? lang.performanceOnTime : lang.performanceLate;
            }

            const row = wsAll.addRow({
                day: dayName,
                title: note.title,
                content: note.content,
                subtasks: formatSubTasks(note.subTasks),
                time: note.time,
                tag: tagName,
                status: status,
                expected: expected,
                actual: actual,
                performance: performance
            });

            const rowIndex = index + 2;
            const rowObj = wsAll.getRow(rowIndex);

            // Tự động tăng chiều cao dòng
            const subTaskLines = note.subTasks ? note.subTasks.length + 1 : 1;
            rowObj.height = Math.max(25, subTaskLines * 15);

            const bgColor = rowIndex % 2 === 0 ? 'FFF8F9FA' : 'FFFFFFFF';
            const dayOfWeek = note.dayOfWeek || 0;

            rowObj.eachCell({ includeEmpty: false }, (cell, colNumber) => {
                cell.font = { name: 'Calibri', size: 11 };
                cell.border = { top: { style: 'thin', color: { argb: 'FFE5E7EB' } }, bottom: { style: 'thin', color: { argb: 'FFE5E7EB' } } };
                // Wrap text để hiển thị xuống dòng
                cell.alignment = { vertical: 'middle', horizontal: 'left', wrapText: true };
                cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: bgColor } };

                if (colNumber === 1) { // Ngày
                    cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: dayBgColors[dayOfWeek] } };
                    cell.font = { bold: true, underline: 'single', color: { argb: 'FF1F2937' } };
                    cell.alignment = { horizontal: 'center', vertical: 'middle' };
                    const targetSheetName = getDayName(dayOfWeek);
                    cell.value = { text: dayName, hyperlink: `#'${targetSheetName}'!A1`, tooltip: `Go to ${targetSheetName}` };
                }
                else if (colNumber === 7) { // Status
                    cell.font = { bold: true, color: { argb: note.completed ? 'FF059669' : 'FFDC2626' } };
                    cell.alignment = { horizontal: 'center', vertical: 'middle' };
                }
                else if (colNumber === 10 && performance) { // Performance
                    cell.fill = {
                        type: 'pattern',
                        pattern: 'solid',
                        fgColor: { argb: note.isOnTime ? 'FFD1FAE5' : 'FFFEE2E2' }
                    };
                    cell.font = {
                        bold: true,
                        color: { argb: note.isOnTime ? 'FF047857' : 'FFB91C1C' }
                    };
                    cell.alignment = { horizontal: 'center', vertical: 'middle' };
                }
                else if ([5, 8, 9].includes(colNumber)) { // Time, Actual, Expected
                    cell.alignment = { horizontal: 'center', vertical: 'middle' };
                }
            });
        });

        wsAll.autoFilter = { from: { row: 1, column: 1 }, to: { row: 1, column: 10 } };

        // ==========================================
        // 2. SHEET CHI TIẾT TỪNG NGÀY
        // ==========================================
        for (let i = 0; i < 7; i++) {
            const dayNotes = notes.filter(note => note.dayOfWeek === i);

            if (dayNotes.length > 0) {
                const dayName = getDayName(i);
                const ws = workbook.addWorksheet(dayName, { views: [{ state: 'frozen', xSplit: 0, ySplit: 1 }] });
                ws.properties.tabColor = { argb: `FF${dayColors[i]}` };

                ws.columns = [
                    { header: lang.excelColTitle, key: 'title', width: 30 },
                    { header: lang.excelColContent, key: 'content', width: 35 },
                    { header: lang.excelColSubTasks, key: 'subtasks', width: 45 }, // Tăng width
                    { header: lang.excelColTime, key: 'time', width: 12 },
                    { header: lang.excelColTag, key: 'tag', width: 15 },
                    { header: lang.excelColStatus, key: 'status', width: 15 },
                    { header: lang.excelColExpected, key: 'expected', width: 12 },
                    { header: lang.excelColActual, key: 'actual', width: 12 },
                    { header: lang.excelColPerformance, key: 'performance', width: 15 }
                ];

                ws.getRow(1).height = 30;
                ws.getRow(1).eachCell((cell) => {
                    cell.font = { name: 'Calibri', bold: true, color: { argb: 'FFFFFFFF' }, size: 12 };
                    cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: `FF${dayColors[i]}` } };
                    cell.alignment = { horizontal: 'center', vertical: 'middle' };
                });

                dayNotes.forEach((note, index) => {
                    const noteTag = tags.find(t => t.id === note.tag);
                    const tagName = noteTag ? getTagName(noteTag) : lang.undefinedTag;
                    const status = note.completed ? lang.completedStatus : lang.incompleteStatus;

                    const expected = note.expectedDuration ? note.expectedDuration : '';
                    const actual = note.actualDuration ? note.actualDuration : '';
                    let performance = '';
                    if (note.completed && typeof note.isOnTime === 'boolean') {
                        performance = note.isOnTime ? lang.performanceOnTime : lang.performanceLate;
                    }

                    const row = ws.addRow({
                        title: note.title,
                        content: note.content,
                        subtasks: formatSubTasks(note.subTasks),
                        time: note.time,
                        tag: tagName,
                        status: status,
                        expected: expected,
                        actual: actual,
                        performance: performance
                    });

                    const rowIndex = index + 2;
                    const rowObj = ws.getRow(rowIndex);
                    const subTaskLines = note.subTasks ? note.subTasks.length + 1 : 1;
                    rowObj.height = Math.max(25, subTaskLines * 15);

                    const bgColor = rowIndex % 2 === 0 ? dayBgColors[i] : 'FFFFFFFF';

                    rowObj.eachCell({ includeEmpty: false }, (cell, colNumber) => {
                        cell.font = { name: 'Calibri', size: 11 };
                        cell.border = { top: { style: 'thin', color: { argb: 'FFE5E7EB' } }, bottom: { style: 'thin', color: { argb: 'FFE5E7EB' } } };
                        cell.alignment = { vertical: 'middle', horizontal: 'left', wrapText: true };
                        cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: bgColor } };

                        if (colNumber === 6) { // Status
                            cell.font = { bold: true, color: { argb: note.completed ? 'FF059669' : 'FFDC2626' } };
                            cell.alignment = { horizontal: 'center', vertical: 'middle' };
                        }
                        else if (colNumber === 9 && performance) { // Performance
                            cell.fill = {
                                type: 'pattern',
                                pattern: 'solid',
                                fgColor: { argb: note.isOnTime ? 'FFD1FAE5' : 'FFFEE2E2' }
                            };
                            cell.font = {
                                bold: true,
                                color: { argb: note.isOnTime ? 'FF047857' : 'FFB91C1C' }
                            };
                            cell.alignment = { horizontal: 'center', vertical: 'middle' };
                        }
                        else if ([4, 7, 8].includes(colNumber)) { // Numbers
                            cell.alignment = { horizontal: 'center', vertical: 'middle' };
                        }
                    });
                });

                // Back link
                const backLinkCell = ws.getCell('A1');
                const originalValue = backLinkCell.value;
                backLinkCell.value = {
                    text: originalValue,
                    hyperlink: `#'${lang.excelSheetAll}'!A1`,
                    tooltip: `Back to ${lang.excelSheetAll}`
                };

                ws.autoFilter = { from: { row: 1, column: 1 }, to: { row: 1, column: 9 } };
            }
        }

        const buffer = await workbook.xlsx.writeBuffer();
        const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${lang.excelFileName}_${new Date().toISOString().split('T')[0]}.xlsx`;
        a.click();
        window.URL.revokeObjectURL(url);

        showToast(lang.toastExcelExported, 'success');
    }

    // HÀM MỚI: Kiểm tra và tạo document user nếu chưa tồn tại
    async function checkAndCreateUserDocument(user) {
        if (!user) return;

        const userDocRef = db.collection('users').doc(user.uid);

        try {
            const doc = await userDocRef.get();

            // Nếu document chưa tồn tại, hãy tạo nó
            if (!doc.exists) {
                console.warn(`User document for ${user.email} not found. Creating one now.`);

                const userData = {
                    name: user.displayName || 'New User',
                    email: user.email,
                    email_lowercase: user.email.toLowerCase(), // Quan trọng!
                    photoURL: user.photoURL || null,
                    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                    settings: {
                        language: 'vi',
                        theme: 'light',
                        noteColumns: 3,
                        backgroundColor: '#f8f9fa',
                        notificationTimeBefore: 5
                    }
                };

                await userDocRef.set(userData);
                showToast(`Chào mừng ${userData.name}! Đã tạo hồ sơ cho bạn.`, 'success');
            }
        } catch (error) {
            console.error("Error checking/creating user document:", error);
        }
    }

    let lastCheckedDate = new Date().getDate();

    function updateDateTime() {
        const now = new Date();
        const currentDate = now.getDate();

        // Nếu sang ngày mới
        if (currentDate !== lastCheckedDate) {
            notifiedNotes.clear(); // Reset danh sách đã thông báo
            lastCheckedDate = currentDate;
            console.log("New day detected, resetting notifications.");
        }

        // Format date theo ngôn ngữ
        const dateOptions = {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        };

        const locale = currentLanguage === 'vi' ? 'vi-VN' : 'en-US';
        const formattedDate = now.toLocaleDateString(locale, dateOptions);

        // Format time
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
        const formattedTime = `${hours}:${minutes}:${seconds}`;

        // Update DOM
        if (dateText) dateText.textContent = formattedDate;
        if (timeText) timeText.textContent = formattedTime;
    }

    // Cập nhật ngay lập tức
    updateDateTime();

    // Cập nhật mỗi giây
    setInterval(updateDateTime, 1000);

    // Cập nhật lại khi đổi ngôn ngữ
    function updateDateTimeLanguage() {
        updateDateTime();
    }

    function filterNotes() {
        const searchTerm = searchInput.value.toLowerCase();
        const filterValue = filterSelect.value;
        const dayFilter = dayOfWeekSelect.value; // MỚI

        let filteredNotes = notes;

        // Lọc theo từ khóa tìm kiếm
        if (searchTerm) {
            filteredNotes = filteredNotes.filter(
                (note) =>
                    note.title.toLowerCase().includes(searchTerm) ||
                    note.content.toLowerCase().includes(searchTerm)
            );
        }

        // MỚI: Lọc theo ngày trong tuần
        if (dayFilter !== "all") {
            const dayNumber = parseInt(dayFilter);
            filteredNotes = filteredNotes.filter(note => note.dayOfWeek === dayNumber);
        }

        // Lọc theo điều kiện
        if (filterValue !== "all") {
            if (filterValue === "completed") {
                filteredNotes = filteredNotes.filter(note => note.completed);
            } else if (filterValue === "incomplete") {
                filteredNotes = filteredNotes.filter(note => !note.completed);
            } else if (filterValue === "overdue") {
                filteredNotes = filteredNotes.filter(note => !note.completed && isNoteOverdue(note));
            } else {
                filteredNotes = filteredNotes.filter(
                    (note) => note.tag === filterValue
                );
            }
        }

        renderNotes(filteredNotes);
        updateEmptyState(filteredNotes);
        checkAndScheduleNotifications(filteredNotes);
    }

    function checkAndScheduleNotifications(notesList) {
        // Xóa interval cũ để tránh chạy chồng chéo
        if (notificationInterval) {
            clearInterval(notificationInterval);
        }

        // Lấy cài đặt thời gian thông báo
        // Đặt trong interval để nếu user đổi setting thì cập nhật ngay mà không cần reload

        notificationInterval = setInterval(() => {
            const notificationTimeBefore = parseInt(localStorage.getItem('notificationTimeBefore') || '5');

            // Nếu tắt thông báo (0 phút) thì dừng kiểm tra
            if (notificationTimeBefore === 0) return;

            const now = new Date();
            const currentDay = now.getDay(); // 0 (CN) - 6 (T7)

            notesList.forEach(note => {
                // 1. Bỏ qua nếu đã hoàn thành hoặc đã thông báo
                if (note.completed || notifiedNotes.has(note.id)) return;

                // 2. QUAN TRỌNG: Kiểm tra có đúng ngày hôm nay không
                // Lưu ý: note.dayOfWeek có thể là string hoặc number, nên parse ra số để so sánh
                if (parseInt(note.dayOfWeek) !== currentDay) return;

                // 3. Tính toán thời gian
                if (note.time) {
                    const [noteHour, noteMinute] = note.time.split(':').map(Number);

                    // Tạo đối tượng Date cho thời gian của ghi chú (trong ngày hôm nay)
                    const noteTimeDate = new Date();
                    noteTimeDate.setHours(noteHour, noteMinute, 0, 0);

                    // Tính khoảng cách thời gian (ms)
                    const diffMs = noteTimeDate - now;
                    const diffMinutes = diffMs / (1000 * 60);

                    // 4. Logic kiểm tra:
                    // - diffMinutes <= notificationTimeBefore: Đã đến lúc thông báo
                    // - diffMinutes > 0: Chưa quá giờ (chưa trễ)
                    if (diffMinutes <= notificationTimeBefore && diffMinutes > 0) {
                        const lang = translations[currentLanguage];
                        const message = lang.notificationReminder.replace('{title}', note.title);

                        // Hiển thị Toast (màu vàng cảnh báo, hiện lâu hơn chút - 10s)
                        showToast(message, 'warning', 10000);

                        // Phát âm thanh (Tùy chọn - xem phần 2 bên dưới)
                        playNotificationSound();

                        // Đánh dấu đã thông báo để không spam
                        notifiedNotes.add(note.id);
                    }
                }
            });
        }, 10000); // Kiểm tra mỗi 10 giây (nhanh hơn 30s để chính xác hơn)
    }

    function playNotificationSound() {
        // Tạo âm thanh "ding" nhẹ nhàng bằng AudioContext (không cần file mp3)
        try {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            if (!AudioContext) return;

            const ctx = new AudioContext();
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();

            osc.connect(gain);
            gain.connect(ctx.destination);

            osc.type = 'sine';
            osc.frequency.value = 800; // Tần số
            gain.gain.value = 0.3; // Âm lượng

            osc.start();

            // Tắt sau 0.5 giây
            setTimeout(() => {
                osc.stop();
                ctx.close();
            }, 2000);
        } catch (e) {
            console.error("Audio play failed", e);
        }
    }

    function updateEmptyState(notesToCheck = notes) {
        if (notesToCheck.length === 0) {
            emptyState.style.display = "block";
        } else {
            emptyState.style.display = "none";
        }
    }

    function isNoteOverdue(note) {
        if (note.completed) {
            return false;
        }

        const [noteHour, noteMinute] = note.time.split(':').map(Number);
        const now = new Date();
        const currentHour = now.getHours();
        const currentMinute = now.getMinutes();

        if (currentHour > noteHour) {
            return true;
        }
        if (currentHour === noteHour && currentMinute > noteMinute) {
            return true;
        }
        return false;
    }

    function updateOverdueStatus() {
        document.querySelectorAll('.note-card').forEach((noteCard) => {
            const noteId = noteCard.querySelector('.note-content').getAttribute('data-id');
            const note = notes.find(n => n.id === noteId);

            if (note) {
                const noteDateSpan = noteCard.querySelector('.note-date');
                if (noteDateSpan) {
                    if (isNoteOverdue(note)) {
                        noteDateSpan.classList.add('overdue');
                    } else {
                        noteDateSpan.classList.remove('overdue');
                    }
                }
            }
        });
    }

    function startOverdueCheckInterval() {
        if (overdueCheckInterval) {
            clearInterval(overdueCheckInterval);
        }
        overdueCheckInterval = setInterval(updateOverdueStatus, 60 * 1000);
    }

    async function completeAllNotes() {
        const lang = translations[currentLanguage]; // Lấy ngôn ngữ hiện tại

        // 1. Xác định ngày cần xử lý
        const selectedDayFilter = document.getElementById("dayOfWeekSelect").value;
        let targetDay;

        if (selectedDayFilter === "all") {
            targetDay = new Date().getDay();
        } else {
            targetDay = parseInt(selectedDayFilter);
        }

        // 2. Lọc các ghi chú thuộc ngày đó và CHƯA hoàn thành
        const notesToComplete = notes.filter(note =>
            note.dayOfWeek === targetDay && !note.completed
        );

        if (notesToComplete.length === 0) {
            showToast(lang.noNotesToCompleteOnDay, 'info');
            return;
        }

        // 3. Batch update
        const batch = db.batch();
        const now = new Date();
        const endTime = now.toISOString();

        notesToComplete.forEach(note => {
            const noteRef = db.collection('notes').doc(note.id);

            let actualDuration = null;
            let isOnTime = null;

            if (note.startTime) {
                const start = new Date(note.startTime);
                actualDuration = Math.round((now - start) / 60000);
            } else {
                const [hours, minutes] = note.time.split(':');
                const start = new Date();
                start.setHours(parseInt(hours), parseInt(minutes), 0, 0);
                let diff = Math.round((now - start) / 60000);
                actualDuration = diff > 0 ? diff : 0;
            }

            if (note.expectedDuration) {
                isOnTime = actualDuration <= note.expectedDuration;
            }

            batch.update(noteRef, {
                completed: true,
                endTime: endTime,
                actualDuration: actualDuration,
                isOnTime: isOnTime
            });
        });

        try {
            await batch.commit();
            const dayName = getDayName(targetDay);
            // Thay thế {day} bằng tên ngày thực tế
            showToast(lang.completeAllSuccess.replace('{day}', dayName), 'success');
        } catch (error) {
            console.error("Error completing all notes: ", error);
            showToast(lang.completeAllError, 'error');
        }
    }

    async function resetAllNotes() {
        const lang = translations[currentLanguage]; // Lấy ngôn ngữ hiện tại

        // 1. Xác định ngày cần xử lý
        const selectedDayFilter = document.getElementById("dayOfWeekSelect").value;
        let targetDay;

        if (selectedDayFilter === "all") {
            targetDay = new Date().getDay();
        } else {
            targetDay = parseInt(selectedDayFilter);
        }

        const dayName = getDayName(targetDay);

        // 2. Lọc các ghi chú thuộc ngày đó và ĐÃ hoàn thành
        const notesToReset = notes.filter(note =>
            note.dayOfWeek === targetDay && note.completed
        );

        if (notesToReset.length === 0) {
            showToast(lang.noNotesToResetOnDay, 'info');
            return;
        }

        // 3. Batch update
        const batch = db.batch();

        notesToReset.forEach(note => {
            const noteRef = db.collection('notes').doc(note.id);

            batch.update(noteRef, {
                completed: false,
                endTime: null,
                actualDuration: null,
                isOnTime: null,
                startTime: null
            });
        });

        try {
            await batch.commit();
            // Thay thế {day} bằng tên ngày
            showToast(lang.resetAllSuccess.replace('{day}', dayName), 'success');
        } catch (error) {
            console.error("Error resetting all notes: ", error);
            showToast(lang.resetAllError, 'error');
        }
    }

    function loadSettings() {
        // Load số cột
        const savedColumns = localStorage.getItem('noteColumns');
        if (savedColumns) {
            document.documentElement.style.setProperty('--notes-grid-columns', savedColumns);
            noteColumnsSelect.value = savedColumns;
        } else {
            // MỚI: Mặc định dựa trên kích thước màn hình
            let defaultColumns;
            if (window.innerWidth >= 1024) {
                defaultColumns = 3; // Desktop: 3 cột
            } else if (window.innerWidth >= 768) {
                defaultColumns = 2; // Tablet: 2 cột
            } else {
                defaultColumns = 1; // Mobile: 1 cột
            }
            document.documentElement.style.setProperty('--notes-grid-columns', defaultColumns);
            noteColumnsSelect.value = defaultColumns;
        }

        // Load màu nền
        const savedBackgroundColor = localStorage.getItem('backgroundColor');
        if (savedBackgroundColor) {
            document.documentElement.style.setProperty('--body-bg-color', savedBackgroundColor);
        } else {
            document.documentElement.style.setProperty('--body-bg-color', '#f8f9fa');
        }

        // Load ngôn ngữ
        const savedLanguage = localStorage.getItem('language');
        if (savedLanguage) {
            currentLanguage = savedLanguage;
        } else {
            currentLanguage = 'vi';
        }

        // Apply translations
        applyTranslations();

        // Load thời gian thông báo
        const savedNotificationTime = localStorage.getItem('notificationTimeBefore');
        if (savedNotificationTime !== null) {
            notificationTimeBeforeSelect.value = savedNotificationTime;
        } else {
            notificationTimeBeforeSelect.value = '5';
        }

        // Load tên ứng dụng
        const savedAppName = localStorage.getItem('appName');
        if (savedAppName) {
            document.querySelector('.header h1').textContent = savedAppName;
        } else {
            document.querySelector('.header h1').textContent = translations[currentLanguage].defaultAppName;
        }

        const today = new Date().getDay();
        dayOfWeekSelect.value = today.toString();
    }

    loadSettings();

    async function saveSettings() {
        const selectedColumns = noteColumnsSelect.value;
        const selectedBackgroundColor = backgroundColorInput.value;
        const selectedLanguage = languageSelect.value;
        const selectedAppName = appNameInput.value.trim();
        const selectedNotificationTime = notificationTimeBeforeSelect.value;

        // --- PHẦN 1: XỬ LÝ LOCAL (TỨC THÌ) ---

        // 1. Lưu vào localStorage
        localStorage.setItem('noteColumns', selectedColumns);
        localStorage.setItem('backgroundColor', selectedBackgroundColor);
        localStorage.setItem('language', selectedLanguage);
        localStorage.setItem('notificationTimeBefore', selectedNotificationTime);
        if (selectedAppName) {
            localStorage.setItem('appName', selectedAppName);
        } else {
            localStorage.removeItem('appName');
        }

        // 2. Áp dụng thay đổi giao diện NGAY LẬP TỨC
        document.documentElement.style.setProperty('--notes-grid-columns', selectedColumns);
        document.documentElement.style.setProperty('--body-bg-color', selectedBackgroundColor);

        const languageChanged = currentLanguage !== selectedLanguage;
        currentLanguage = selectedLanguage;
        applyTranslations();
        // updateDateTime(); // Không cần gọi cái này, nó tự chạy mỗi giây

        if (languageChanged) {
            renderFilterOptions();
            renderTagOptions();
            renderCurrentTagsList();
            filterNotes();
        }

        // 3. Đóng modal và báo thành công NGAY (Không chờ server)
        closeSettingsModal();
        showToast('toastSettingsSaved', 'success');

        // --- PHẦN 2: ĐỒNG BỘ SERVER (CHẠY NGẦM) ---
        if (currentUser) {
            const settingsData = {
                noteColumns: parseInt(selectedColumns),
                backgroundColor: selectedBackgroundColor,
                language: selectedLanguage,
                notificationTimeBefore: parseInt(selectedNotificationTime),
                appName: selectedAppName || null
            };

            // Không dùng 'await' để chặn giao diện, để nó chạy ngầm (Promise)
            db.collection('users').doc(currentUser.uid).set({
                settings: settingsData
            }, { merge: true }).catch(error => {
                // Chỉ log lỗi nếu thực sự có vấn đề, không làm phiền user
                console.error("Silent sync error:", error);
            });
        }
    }

    function loadNotes() { // Không còn async nữa
        const searchTerm = searchInput.value.toLowerCase();
        const filterValue = filterSelect.value;

        let filteredNotes = [...notes]; // Tạo bản sao để lọc, dùng biến 'notes' toàn cục

        if (searchTerm) {
            filteredNotes = filteredNotes.filter(
                (note) =>
                    note.title.toLowerCase().includes(searchTerm) ||
                    note.content.toLowerCase().includes(searchTerm) ||
                    (note.tag && tags.find(t => t.id === note.tag)?.name.toLowerCase().includes(searchTerm))
            );
        }

        if (filterValue !== "all") {
            if (filterValue === "completed") {
                filteredNotes = filteredNotes.filter(note => note.completed);
            } else {
                // Lọc theo tag ID
                filteredNotes = filteredNotes.filter(note => note.tag === filterValue);
            }
        }

        renderNotes(filteredNotes);
        updateEmptyState(filteredNotes);
        checkAndScheduleNotifications(filteredNotes); // Kiểm tra và lên lịch thông báo khi tải ghi chú
    }

    function openSettingsModal() {
        settingsModal.classList.add("active");
        document.body.style.overflow = "hidden";

        // MỚI: Tính toán giá trị mặc định cho số cột
        let defaultColumns;
        if (window.innerWidth >= 1024) {
            defaultColumns = 3;
        } else if (window.innerWidth >= 768) {
            defaultColumns = 2;
        } else {
            defaultColumns = 1;
        }

        // Tải các cài đặt hiện tại vào form khi mở
        noteColumnsSelect.value = localStorage.getItem('noteColumns') || defaultColumns;
        backgroundColorInput.value = localStorage.getItem('backgroundColor') || '#f8f9fa';
        languageSelect.value = localStorage.getItem('language') || 'vi';
        notificationTimeBeforeSelect.value = localStorage.getItem('notificationTimeBefore') || '5';

        // Load tên ứng dụng vào input
        const savedAppName = localStorage.getItem('appName');
        if (savedAppName) {
            appNameInput.value = savedAppName;
        } else {
            appNameInput.value = translations[currentLanguage].defaultAppName;
        }
    }

    function closeSettingsModal() {
        settingsModal.classList.remove("active");
        document.body.style.overflow = "auto";
    }

    function showToast(messageKey, type = 'info', duration = 3000) {
        // Kiểm tra xem messageKey có phải là một key trong translations không
        let message;
        if (translations[currentLanguage][messageKey]) {
            message = translations[currentLanguage][messageKey];
        } else {
            // Nếu không phải key, sử dụng trực tiếp làm message
            message = messageKey;
        }

        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.textContent = message;

        toastContainer.appendChild(toast);

        setTimeout(() => {
            toast.style.animation = 'fadeOut 0.5s forwards';
            setTimeout(() => {
                toast.remove();
            }, 500);
        }, duration);
    }

    window.addEventListener('resize', function () {
        // Chỉ cập nhật nếu chưa có setting được lưu
        if (!localStorage.getItem('noteColumns')) {
            let defaultColumns;
            if (window.innerWidth >= 1024) {
                defaultColumns = 3;
            } else if (window.innerWidth >= 768) {
                defaultColumns = 2;
            } else {
                defaultColumns = 1;
            }
            document.documentElement.style.setProperty('--notes-grid-columns', defaultColumns);
        }
    });

    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            // Update user info
            if (userName) userName.textContent = user.displayName || 'User';
            if (userEmail) userEmail.textContent = user.email;

            // Update avatar
            const avatarElement = document.querySelector('#userAvatar i');
            if (user.photoURL && avatarElement) {
                // Replace icon with actual image
                avatarElement.parentElement.innerHTML = `
                <img src="${user.photoURL}" 
                     alt="Avatar" 
                     style="width: 40px; height: 40px; border-radius: 50%; object-fit: cover; cursor: pointer;">
            `;
            }
        }
    });

    /* ==========================================
   REPORTS MANAGEMENT FUNCTIONS
   ========================================== */

    // index.js

function loadReceivedReports() {
    if (!currentUser) return;

    db.collection('reports')
        .where('toUserId', '==', currentUser.uid)
        .orderBy('createdAt', 'desc')
        .onSnapshot((snapshot) => {
            receivedReports = [];
            snapshot.forEach((doc) => {
                const report = doc.data();
                report.id = doc.id;
                receivedReports.push(report);
            });

            // ✅ LOGIC MỚI: CHỈ CẬP NHẬT BADGE (SỐ LƯỢNG)
            // Không can thiệp vào việc ẩn hiện nút reportsMenu nữa vì nó đã hiện sẵn rồi
            const unreadCount = receivedReports.filter(r => r.status === 'unread').length;

            if (reportsBadge) {
                reportsBadge.textContent = unreadCount;
                // Chỉ hiện chấm đỏ nếu có tin chưa đọc
                reportsBadge.style.display = unreadCount > 0 ? 'flex' : 'none';
            }
            
            // Nếu đang mở dashboard thì render lại để cập nhật dữ liệu mới nhất (real-time)
            if (reportingDashboardModal.classList.contains('active')) {
                 renderSubmittedReportsTable(receivedReports);
            }

        }, (error) => {
            console.error("Error loading reports:", error);
        });
}


    function formatReportDate(date) {
        const lang = translations[currentLanguage]; // ⬅️ THÊM DÒNG NÀY
        const now = new Date();
        const diffMs = now - date;
        const diffMins = Math.floor(diffMs / 60000);
        const diffHours = Math.floor(diffMs / 3600000);
        const diffDays = Math.floor(diffMs / 86400000);

        if (diffMins < 1) return lang.justNow;
        if (diffMins < 60) return `${diffMins} ${lang.minutesAgo}`;
        if (diffHours < 24) return `${diffHours} ${lang.hoursAgo}`;
        if (diffDays < 7) return `${diffDays} ${lang.daysAgo}`;

        const locale = currentLanguage === 'vi' ? 'vi-VN' : 'en-US';
        return date.toLocaleDateString(locale);
    }


    // Mở modal gửi báo cáo
    function openSendReportModal() {
        sendReportModal.classList.add('active');
        document.body.style.overflow = 'hidden';

        // Tính toán dữ liệu báo cáo
        const reportData = generateReportData();

        // Hiển thị preview
        document.getElementById('previewTotal').textContent = reportData.totalTasks;
        document.getElementById('previewCompleted').textContent = reportData.completedTasks;
        document.getElementById('previewOnTime').textContent = reportData.onTimeTasks;
        document.getElementById('previewLate').textContent = reportData.lateTasks;

        // Reset form
        document.getElementById('recipientEmail').value = '';
        document.getElementById('reportMessage').value = '';

        // Auto-focus vào ô email
        setTimeout(() => {
            document.getElementById('recipientEmail').focus();
        }, 300);
    }


    // Đóng modal gửi báo cáo
    function closeSendReportModal() {
        sendReportModal.classList.remove('active');
        document.body.style.overflow = 'auto';
        document.getElementById('recipientEmail').value = '';
        document.getElementById('reportMessage').value = '';
    }

    // Tạo dữ liệu báo cáo
    function generateReportData() {
        const now = new Date();
        const startOfWeek = new Date(now);
        startOfWeek.setDate(now.getDate() - now.getDay());
        startOfWeek.setHours(0, 0, 0, 0);

        const weeklyNotes = notes.filter(note => {
            if (!note.completed || !note.endTime) return false;
            const endDate = new Date(note.endTime);
            return endDate >= startOfWeek;
        });

        const totalTasks = weeklyNotes.length;
        const completedTasks = weeklyNotes.filter(n => n.completed).length;
        const onTimeTasks = weeklyNotes.filter(n => n.isOnTime === true).length;
        const lateTasks = weeklyNotes.filter(n => n.isOnTime === false).length;

        const notesWithDuration = weeklyNotes.filter(n => n.actualDuration && n.actualDuration > 0);
        const avgCompletionTime = notesWithDuration.length > 0
            ? Math.round(notesWithDuration.reduce((sum, n) => sum + n.actualDuration, 0) / notesWithDuration.length)
            : 0;

        // Tính theo tag
        const tasksByTag = {};
        weeklyNotes.forEach(note => {
            const tag = tags.find(t => t.id === note.tag);
            const tagName = tag ? getTagName(tag) : 'Khác';

            if (!tasksByTag[tagName]) {
                tasksByTag[tagName] = { total: 0, completed: 0, onTime: 0 };
            }

            tasksByTag[tagName].total++;
            if (note.completed) tasksByTag[tagName].completed++;
            if (note.isOnTime) tasksByTag[tagName].onTime++;
        });

        // Tính theo ngày
        const tasksByDay = {};
        for (let i = 0; i < 7; i++) {
            // Lọc các task của ngày i và lấy số lượng
            tasksByDay[i] = weeklyNotes.filter(n => n.dayOfWeek === i).length;
        }

        const endOfWeek = new Date(startOfWeek);
        endOfWeek.setDate(startOfWeek.getDate() + 6);

        return {
            totalTasks,
            completedTasks,
            onTimeTasks,
            lateTasks,
            avgCompletionTime,
            tasksByTag,
            tasksByDay,
            period: `${startOfWeek.toLocaleDateString('vi-VN')} - ${endOfWeek.toLocaleDateString('vi-VN')}`
        };
    }

    async function sendReport() {
        const recipientEmail = document.getElementById('recipientEmail').value.trim();
        const message = document.getElementById('reportMessage').value.trim();
        const submitBtn = document.getElementById('sendReportSubmitBtn');
        const lang = translations[currentLanguage]; // ⬅️ THÊM DÒNG NÀY

        if (!recipientEmail) {
            showToast(lang.enterRecipientEmail, 'warning');
            document.getElementById('recipientEmail').focus();
            return;
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(recipientEmail)) {
            showToast(lang.invalidEmail, 'error');
            document.getElementById('recipientEmail').focus();
            return;
        }

        // Hiển thị loading
        const originalHTML = submitBtn.innerHTML;
        submitBtn.disabled = true;
        submitBtn.innerHTML = `<i class="fas fa-circle-notch fa-spin"></i> ${lang.sendingReport}`;

        try {
            // Kiểm tra email có tồn tại trong hệ thống không
            const usersSnapshot = await db.collection('users')
                .where('email_lowercase', '==', recipientEmail.toLowerCase()) // ⬅️ TÌM TRÊN TRƯỜNG CHỮ THƯỜNG
                .limit(1)
                .get();

            if (usersSnapshot.empty) {
                showToast(`❌ ${lang.emailNotRegistered}`, 'error');
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalHTML;
                document.getElementById('recipientEmail').focus();
                return;
            }

            const recipientUser = usersSnapshot.docs[0].data();
            const recipientUserId = usersSnapshot.docs[0].id;

            // Không cho gửi cho chính mình
            if (recipientUserId === currentUser.uid) {
                showToast(`⚠️ ${lang.cannotSendToSelf}`, 'warning');
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalHTML;
                document.getElementById('recipientEmail').value = '';
                document.getElementById('recipientEmail').focus();
                return;
            }

            // Tạo báo cáo
            const reportData = generateReportData();

            const newReport = {
                fromUserId: currentUser.uid,
                fromUserName: currentUser.displayName || 'User',
                fromUserEmail: currentUser.email,
                toUserId: recipientUserId,
                toUserEmail: recipientEmail,
                toUserName: recipientUser.name || recipientUser.email,
                reportData: reportData,
                message: message || null,
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                status: 'unread'
            };

            await db.collection('reports').add(newReport);

            showToast(`✅ ${lang.reportSentSuccess} ${recipientUser.name || recipientEmail}!`, 'success');
            closeSendReportModal();

        } catch (error) {
            console.error('Error sending report:', error);
            showToast(`❌ ${lang.errorSendingReport}: ${error.message}`, 'error');
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalHTML;
        }
    }

    // index.js

    // THAY THẾ TOÀN BỘ HÀM NÀY
    async function openReportingDashboard() {
        const lang = translations[currentLanguage];
        reportingDashboardModal.classList.add('active');
        document.body.style.overflow = 'hidden';

        // Hiển thị loading ban đầu
        submittedReportsTableBody.innerHTML = `<tr><td colspan="5" style="text-align: center;">${lang.loadingData}</td></tr>`;

        try {
            // Lấy tất cả báo cáo đã gửi cho người dùng hiện tại
            const reportsSnapshot = await db.collection('reports')
                .where('toUserId', '==', currentUser.uid)
                .orderBy('createdAt', 'desc')
                .get();

            const allReceivedReports = [];
            reportsSnapshot.forEach(doc => {
                const report = doc.data();
                report.id = doc.id;
                allReceivedReports.push(report);
            });

            // Lọc các báo cáo trong tuần này
            const now = new Date();
            const startOfWeek = new Date(now);
            startOfWeek.setDate(now.getDate() - now.getDay());
            startOfWeek.setHours(0, 0, 0, 0);

            const weeklyReports = allReceivedReports.filter(report => {
                const reportDate = report.createdAt?.toDate?.();
                return reportDate && reportDate >= startOfWeek;
            });

            // Render bảng chỉ với các báo cáo trong tuần
            renderSubmittedReportsTable(weeklyReports);

        } catch (error) {
            console.error("Error opening reporting dashboard:", error);
            submittedReportsTableBody.innerHTML = `<tr><td colspan="5" style="text-align: center;">${lang.errorSendingReport}</td></tr>`;
        }
    }

    // index.js

    // THAY THẾ TOÀN BỘ HÀM NÀY
    function renderSubmittedReportsTable(reportsToRender) {
        submittedReportsTableBody.innerHTML = '';
        const lang = translations[currentLanguage];

        if (!reportsToRender || reportsToRender.length === 0) {
            submittedReportsTableBody.innerHTML = `<tr><td colspan="5" style="text-align: center;">${lang.noReportsThisWeek}</td></tr>`;
            return;
        }

        reportsToRender.forEach(report => {
            const data = report.reportData;
            const completionRate = data.totalTasks > 0 ? Math.round((data.completedTasks / data.totalTasks) * 100) : 0;
            const onTimeRate = data.completedTasks > 0 ? Math.round((data.onTimeTasks / data.completedTasks) * 100) : 0;

            const row = document.createElement('tr');
            row.innerHTML = `
            <td>
                <div class="user-info">${report.fromUserName}</div>
                <div class="user-email">${report.fromUserEmail}</div>
            </td>
            <td>
                <div style="display: flex; align-items: center; gap: 8px;">
                    <div class="completion-rate-bar">
                        <div class="completion-rate-fill" style="width: ${completionRate}%;"></div>
                    </div>
                    <span>${completionRate}%</span>
                </div>
            </td>
            <td style="color: ${onTimeRate >= 80 ? '#10b981' : '#f59e0b'}; font-weight: bold;">${onTimeRate}%</td>
            <td>${data.avgCompletionTime} ${lang.minutesPerTask}</td>
            <td>
                <button class="view-detail-btn">${lang.details}</button>
            </td>
        `;

            row.querySelector('.view-detail-btn').addEventListener('click', () => {
                openViewReportModal(report);
            });

            submittedReportsTableBody.appendChild(row);
        });
    }

    // Đóng Dashboard
    function closeReportingDashboard() {
        reportingDashboardModal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }

    // Thêm Event Listener cho nút đóng Dashboard
    if (closeDashboardBtn) {
        closeDashboardBtn.addEventListener('click', closeReportingDashboard);
    }

    function openViewReportModal(report) {
        currentViewingReport = report;
        viewReportModal.style.zIndex = "11000";
        viewReportModal.classList.add('active');
        document.body.style.overflow = 'hidden';

        // Hiển thị thông tin người gửi
        document.getElementById('reportFromName').textContent = report.fromUserName;
        document.getElementById('reportFromEmail').textContent = report.fromUserEmail;

        const reportDate = report.createdAt?.toDate?.() || new Date();
        const locale = currentLanguage === 'vi' ? 'vi-VN' : 'en-US';
        document.getElementById('reportDate').textContent = reportDate.toLocaleString(locale);

        // Hiển thị message nếu có
        if (report.message) {
            document.getElementById('reportMessageContent').style.display = 'block';
            document.getElementById('reportMessageText').textContent = report.message;
        } else {
            document.getElementById('reportMessageContent').style.display = 'none';
        }

        // Hiển thị chi tiết báo cáo
        renderReportDetails(report.reportData);

        // Đánh dấu đã đọc (nếu chưa đọc)
        if (report.status === 'unread') {
            db.collection('reports').doc(report.id).update({ status: 'read' }).catch(err => console.error("Error marking report as read:", err));
        }
    }

    // index.js

    // THAY THẾ TOÀN BỘ HÀM NÀY
    function renderReportDetails(reportData) {
        const detailsContainer = document.getElementById('reportDetailStats');
        const lang = translations[currentLanguage];

        // Tạo một mảng các ngày trong tuần để đảm bảo thứ tự đúng
        const daysOfWeekOrder = [0, 1, 2, 3, 4, 5, 6];

        detailsContainer.innerHTML = `
        <h4 style="margin-bottom: 10px;">📊 ${lang.statisticsTitle}: ${reportData.period}</h4>
        
        <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 15px; margin-bottom: 10px;">
            <div style="background: #dbeafe; padding: 10px; border-radius: 10px; text-align: center;">
                <i class="fas fa-tasks" style="font-size: 1.6rem; color: #3b82f6;"></i>
                <p style="font-size: 1.5rem; font-weight: bold; margin: 10px 0;">${reportData.totalTasks}</p>
                <p style="color: #666; font-size: 0.8rem;">${lang.totalTasks}</p>
            </div>
            <div style="background: #d1fae5; padding: 10px; border-radius: 10px; text-align: center;">
                <i class="fas fa-check-circle" style="font-size: 1.6rem; color: #10b981;"></i>
                <p style="font-size: 1.5rem; font-weight: bold; margin: 10px 0;">${reportData.completedTasks}</p>
                <p style="color: #666; font-size: 0.8rem;">${lang.completedTasks}</p>
            </div>
            <div style="background: #fef3c7; padding: 10px; border-radius: 10px; text-align: center;">
                <i class="fas fa-clock" style="font-size: 1.6rem; color: #f59e0b;"></i>
                <p style="font-size: 1.5rem; font-weight: bold; margin: 10px 0;">${reportData.onTimeTasks}</p>
                <p style="color: #666; font-size: 0.8rem;">${lang.onTimeTasks}</p>
            </div>
            <div style="background: #fee2e2; padding: 10px; border-radius: 10px; text-align: center;">
                <i class="fas fa-exclamation-circle" style="font-size: 1.6rem; color: #ef4444;"></i>
                <p style="font-size: 1.5rem; font-weight: bold; margin: 10px 0;">${reportData.lateTasks}</p>
                <p style="color: #666; font-size: 0.8rem;">${lang.lateTasks}</p>
            </div>
        </div>

        <div style="background: #f3f4f6; padding: 15px; border-radius: 10px; margin-bottom: 15px;">
            <p style="font-weight: 600; margin-bottom: 5px;">
                <i class="fas fa-hourglass-half"></i> ${lang.avgCompletionTime}
            </p>
            <p style="font-size: 1.1rem; color: #4f46e5; font-weight: bold;">${reportData.avgCompletionTime} ${lang.timeUnit}</p>
        </div>

        <h5 style="margin-bottom: 10px;"><i class="fas fa-tags"></i> ${lang.analysisByTag}:</h5>
        <div style="display: flex; flex-direction: column; gap: 8px;">
            ${Object.entries(reportData.tasksByTag).map(([tag, data]) => `
                <div style="background: white; padding: 8px; border-radius: 10px; display: flex; justify-content: space-between; align-items: center;">
                    <span style="font-weight: 500;">${tag}</span>
                    <span style="color: #666; font-size: 0.8rem;">
                        ${data.completed}/${data.total} ${lang.tasksDone} • ${data.onTime} ${lang.onTimeTasks.toLowerCase()}
                    </span>
                </div>
            `).join('')}
        </div>

        <h5 style="margin: 15px 0 10px;"><i class="fas fa-calendar-week"></i> ${lang.distributionByDay}:</h5>
        <div style="display: flex; flex-direction: column; gap: 8px;">
            ${daysOfWeekOrder.map(dayIndex => {
            const count = reportData.tasksByDay[dayIndex] || 0;
            return `
                <div style="background: white; padding: 6px; border-radius: 10px; display: flex; justify-content: space-between; align-items: center;">
                    <span style="font-weight: 400; font-size: 0.8rem;">${getDayName(dayIndex)}</span>
                    <span style="background: #667eea; color: white; padding: 4px 8px; border-radius: 15px; font-size: 0.8rem;">
                        ${count} ${lang.tasksDone}
                    </span>
                </div>
                `;
        }).join('')}
        </div>
    `;
    }

    function closeViewReportModal() {
        viewReportModal.classList.remove('active');
        setTimeout(() => {
            viewReportModal.style.zIndex = "";
        }, 300);
        if (!reportingDashboardModal.classList.contains('active')) {
            document.body.style.overflow = 'auto';
        }
        currentViewingReport = null;
    }

    async function deleteReport() {
        const lang = translations[currentLanguage]; // ⬅️ THÊM
        if (!currentViewingReport) return;

        if (!confirm(lang.confirmDeleteReport)) return;

        try {
            await db.collection('reports').doc(currentViewingReport.id).delete();
            showToast(lang.reportDeleted, 'success');
            closeViewReportModal();
        } catch (error) {
            console.error('Error deleting report:', error);
            showToast(lang.errorDeletingReport, 'error');
        }
    }

    async function markReportAsRead() {
        const lang = translations[currentLanguage]; // ⬅️ THÊM
        if (!currentViewingReport) return;

        try {
            await db.collection('reports').doc(currentViewingReport.id).update({
                status: 'read'
            });
            showToast(lang.markedAsRead, 'info');
        } catch (error) {
            console.error('Error marking as read:', error);
        }
    }

    // Toggle reports dropdown
    if (reportsBtn) {
        reportsBtn.addEventListener('click', () => {
            openReportingDashboard(); // ⬅️ Gọi hàm mở Dashboard
        });
    }

    // Send report modal
    if (closeSendReportBtn) {
        closeSendReportBtn.addEventListener('click', closeSendReportModal);
    }

    if (sendReportSubmitBtn) {
        sendReportSubmitBtn.addEventListener('click', sendReport);
    }

    // View report modal
    if (closeViewReportBtn) {
        closeViewReportBtn.addEventListener('click', closeViewReportModal);
    }

    if (deleteReportBtn) {
        deleteReportBtn.addEventListener('click', deleteReport);
    }

    if (markAsReadBtn) {
        markAsReadBtn.addEventListener('click', markReportAsRead);
    }


});


//'Shift + Alt + F - Format toàn bộ file'