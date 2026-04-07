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

    const timeReportPeriod = document.getElementById('timeReportPeriod');
    const specificWeek = document.getElementById('specificWeek');
    const specificMonth = document.getElementById('specificMonth');
    const specificYear = document.getElementById('specificYear');
    const refreshReportBtn = document.getElementById('refreshReportBtn');

    // Tìm đoạn khởi tạo Settings Modal, thêm listener

    const clearTranslationCacheBtn = document.getElementById('clearTranslationCacheBtn');
    if (clearTranslationCacheBtn) {
        clearTranslationCacheBtn.addEventListener('click', () => {
            clearCacheRequested = true;
            openConfirmModal('Bạn có chắc muốn xóa toàn bộ bộ nhớ dịch? Lần dịch tiếp theo sẽ chậm hơn.', 'clear_cache');
        });

    }




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
    let currentConfirmAction = null; // MỚI: Theo dõi loại hành động ('delete' hoặc 'complete_temp')
    let elementToAnimate = null;
    let tagToDeleteId = null;         // ✅ FIX: Khai báo biến xóa Tag
    let clearCacheRequested = false;
    let editingTagId = null;
    let notificationInterval;
    let notifiedNotes = new Set();
    let overdueCheckInterval;
    let tagsLoaded = false;
    let notesLoaded = false;

    function translateDynamicElement(element) {
        if (!element) return;
        if (currentLanguage !== 'vi' && window.autoTranslate) {
            window.autoTranslate.translateNew(element, currentLanguage);
        }
    }
    // ✅ FIX: Cập nhật text, xóa cache cũ và ép dịch ngay lập tức
    function setDynamicText(element, text) {
        if (!element) return;

        // 1. Nếu đang dùng tiếng Việt -> gán luôn
        if (currentLanguage === 'vi' || !window.autoTranslate) {
            element.textContent = text;
            return;
        }

        // 2. Nếu đã có trong Cache -> Gán bản dịch NGAY LẬP TỨC
        const cachedText = window.autoTranslate.getTranslationSync(text, currentLanguage);
        if (cachedText) {
            element.textContent = cachedText;
            return;
        }

        // 3. Nếu chưa có -> Gán tiếng Việt tạm, gọi API dịch ngầm
        element.textContent = text;
        if (window.autoTranslate.translatedElements) {
            window.autoTranslate.translatedElements.delete(element);
            element.removeAttribute('data-original-text');
            window.autoTranslate.translateElement(element, currentLanguage);
        }
    }


    function initApp() {
        updateUserMenu();
        loadUserSettingsFromFirestore();
        startMainApp();
    }

    async function linkGoogleWithPassword() {
        if (!currentUser) return;
        try {
            const userDoc = await db.collection('users').doc(currentUser.uid).get();
            const userData = userDoc.data();
            const providers = userData.provider ?
                (Array.isArray(userData.provider) ? userData.provider : [userData.provider]) : [];

            if (providers.includes('google') && providers.includes('password')) {
                return;
            }
        } catch (error) {
            console.error('Error checking account link:', error);
        }
    }

    auth.onAuthStateChanged(async (user) => {
        if (!user) {
            window.location.href = 'login.html';
            return;
        }
        currentUser = user;
        await checkAndCreateUserDocument(user);
        await linkGoogleWithPassword();
        initApp();
    });

    function updateUserMenu() {
        if (currentUser) {
            if (userName) userName.textContent = currentUser.displayName || 'User';
            if (userEmail) userEmail.textContent = currentUser.email;
            if (userAvatar && currentUser.photoURL) {
                userAvatar.innerHTML = `<img src="${currentUser.photoURL}" alt="Avatar" style="width: 40px; height: 40px; border-radius: 50%; object-fit: cover; cursor: pointer;">`;
            }
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

                loadSettings();
            }
        } catch (error) {
            console.error('Error loading user settings:', error);
        }
    }

    function startMainApp() {
        let notesListener = null;
        let tagsListener = null;

        function initNotesListener() {
            if (notesListener) notesListener(); // Tắt listener cũ

            const query = db.collection('notes').where('userId', '==', currentUser.uid);

            notesListener = query.onSnapshot((snapshot) => {
                notes = []; // Reset mảng

                snapshot.forEach((doc) => {
                    const noteData = doc.data();
                    noteData.id = doc.id;
                    notes.push(noteData);
                });

                notesLoaded = true;
                if (tagsLoaded) {
                    loadNotes(); // ✅ Gọi hàm loadNotes() để lọc và render
                }
            }, (error) => {
                showToast('Lỗi tải dữ liệu: ' + error.message, 'error');
            });
        }

        // Khi đổi kiểu lọc
        if (timeReportPeriod) {
            timeReportPeriod.addEventListener('change', () => {
                const value = timeReportPeriod.value;

                // Ẩn tất cả input cụ thể
                specificWeek.style.display = 'none';
                specificMonth.style.display = 'none';
                specificYear.style.display = 'none';

                // Hiện input tương ứng
                if (value === 'specific-week') specificWeek.style.display = 'block';
                if (value === 'specific-month') specificMonth.style.display = 'block';
                if (value === 'specific-year') specificYear.style.display = 'block';

                generateTimeReports();
            });
        }

        if (specificWeek) specificWeek.addEventListener('change', generateTimeReports);
        if (specificMonth) specificMonth.addEventListener('change', generateTimeReports);
        if (specificYear) specificYear.addEventListener('change', generateTimeReports);
        if (refreshReportBtn) refreshReportBtn.addEventListener('click', generateTimeReports);

        // Khi chọn tuần/tháng/năm cụ thể
        specificWeek.addEventListener('change', () => {
            timeReportPeriod.value = 'specific-week';
            generateTimeReports();
        });

        specificMonth.addEventListener('change', () => {
            timeReportPeriod.value = 'specific-month';
            generateTimeReports();
        });

        specificYear.addEventListener('change', () => {
            timeReportPeriod.value = 'specific-year';
            generateTimeReports();
        });

        // Nút làm mới
        refreshReportBtn.addEventListener('click', () => {
            generateTimeReports();
        });

        // === TAGS LISTENER ===
        tagsListener = db.collection('tags')
            .where('userId', '==', currentUser.uid)
            .orderBy('name')
            .onSnapshot((snapshot) => {
                tags = [];
                snapshot.forEach((doc) => {
                    const tagData = doc.data();
                    tagData.id = doc.id;
                    tags.push(tagData);
                });

                tagsLoaded = true;
                renderTagOptions();
                renderFilterOptions();
                renderCurrentTagsList();

                if (notesLoaded) {
                    // ✅ QUAN TRỌNG: Đổi từ applyClientSideFilters() thành loadNotes()
                    loadNotes();
                }
            });


        // === KHỞI TẠO LẦN ĐẦU ===
        initNotesListener();
        loadSettings();
        loadReceivedReports();

        filterSelect.addEventListener('change', loadNotes);
        dayOfWeekSelect.addEventListener('change', loadNotes);

        // === SEARCH (CHỈ LỌC CLIENT-SIDE) ===
        let searchTimeout;
        searchInput.removeEventListener('input', searchInput._searchHandler); // Xóa listener cũ
        searchInput._searchHandler = () => {
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(() => {
                // ✅ QUAN TRỌNG: Đổi từ applyClientSideFilters() thành loadNotes()
                loadNotes();
            }, 300);
        };
        searchInput.addEventListener('input', searchInput._searchHandler);

    }

    async function handleNoteSubmit(e) {
        e.preventDefault();

        const submitBtn = document.getElementById("submitNoteBtn");
        if (!submitBtn) return;

        const originalText = submitBtn.textContent;

        submitBtn.disabled = true;
        submitBtn.innerHTML = `<i class="fas fa-circle-notch fa-spin"></i> Đang lưu...`;

        const title = document.getElementById("noteTitle").value;
        const content = document.getElementById("noteContent").value;
        const time = document.getElementById("noteTime").value;

        // ✅ FIX: Kiểm tra dayCheckboxes tồn tại
        const dayCheckboxes = document.querySelectorAll('input[name="dayOfWeek"]:checked');

        if (!dayCheckboxes || dayCheckboxes.length === 0) {
            showToast('Vui lòng chọn ít nhất 1 ngày trong tuần!', 'warning');
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalText;
            return;
        }

        const selectedDays = Array.from(dayCheckboxes).map(cb => parseInt(cb.value));

        const expectedDuration = parseInt(document.getElementById("expectedDuration").value) || 30;
        const selectedTagRadio = document.querySelector('input[name="noteTag"]:checked');
        const isTemporaryTask = document.getElementById("isTemporaryTask")?.checked || false;

        const subTasks = getSubTasksFromForm();

        let tagId = null;
        if (selectedTagRadio) {
            tagId = selectedTagRadio.value;
        } else if (tags.length > 0) {
            tagId = tags[0].id;
        } else {
            showToast('toastNoTagDefined', 'warning');
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalText;
            return;
        }

        try {
            if (editingNoteKey) {
                // CHẾ ĐỘ SỬA
                const currentNote = notes.find(n => n.id === editingNoteKey);

                const updatedData = {
                    title,
                    content,
                    tag: tagId,
                    time,
                    dayOfWeek: currentNote.dayOfWeek,
                    expectedDuration,
                    subTasks,
                    isTemporaryTask,
                    completed: currentNote.completed || false,
                    actualDuration: currentNote.actualDuration || null,
                    startTime: currentNote.startTime || null,
                    endTime: currentNote.endTime || null,
                    isOnTime: currentNote.isOnTime
                };

                await db.collection('notes').doc(editingNoteKey).update(updatedData);
                showToast('toastNoteUpdated', 'success');

            } else {
                // CHẾ ĐỘ THÊM MỚI
                const batch = db.batch();

                selectedDays.forEach(dayOfWeek => {
                    const newNoteData = {
                        userId: currentUser.uid,
                        title,
                        content,
                        tag: tagId,
                        time,
                        dayOfWeek,
                        expectedDuration,
                        subTasks,
                        isTemporaryTask,
                        actualDuration: null,
                        startTime: null,
                        endTime: null,
                        isOnTime: null,
                        completed: false
                    };

                    const newDocRef = db.collection('notes').doc();
                    batch.set(newDocRef, newNoteData);
                });

                await batch.commit();

                if (selectedDays.length === 1) {
                    showToast('toastNoteSaved', 'success');
                } else {
                    showToast(`Đã tạo ${selectedDays.length} công việc cho các ngày đã chọn!`, 'success');
                }
            }

            closeAddNoteModal();

        } catch (error) {
            console.error('Error saving note:', error);
            showToast('toastErrorSavingNote', 'error');
        } finally {
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalText;
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
            addOrUpdateTagBtn.textContent = 'Thêm Thẻ';
            editingTagId = null;
        } catch (error) {
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
    searchInput.removeEventListener('input', searchInput._searchHandler); // Xóa listener cũ
    searchInput._searchHandler = () => {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => {
            loadNotes(); // ✅ ĐÚNG
        }, 300);
    };
    searchInput.addEventListener('input', searchInput._searchHandler);
    cancelDeleteBtn.addEventListener("click", closeConfirmModal);
    confirmDeleteBtn.addEventListener("click", async function () {
        // ✅ THAY ĐỔI: Kiểm tra xem có BẤT KỲ ID nào cần xử lý không
        if (!noteToDeleteId && !tagToDeleteId && !currentViewingReport && !clearCacheRequested) return;

        if (currentConfirmAction === 'delete') {
            try {
                await db.collection('notes').doc(noteToDeleteId).delete();
                showToast('Đã xóa công việc!', 'success');
            } catch (error) {
                showToast('Lỗi khi xóa công việc', 'error');
            }
            closeConfirmModal();

        } else if (currentConfirmAction === 'complete_temp') {
            if (elementToAnimate) {
                elementToAnimate.classList.add('deleting');
            }
            const idToDelete = noteToDeleteId;
            closeConfirmModal();

            setTimeout(async () => {
                try {
                    await db.collection('notes').doc(idToDelete).delete();
                    showToast('Đã xóa công việc tạm thời', 'success');
                } catch (error) {
                    showToast('Lỗi khi xóa', 'error');
                }
            }, 500);

        } else if (currentConfirmAction === 'delete_tag') {
            try {
                const notesUsingThisTag = await db.collection('notes')
                    .where('userId', '==', currentUser.uid)
                    .where('tag', '==', tagToDeleteId).get();

                const batch = db.batch();
                notesUsingThisTag.forEach(doc => { batch.update(doc.ref, { tag: null }); });
                await batch.commit();
                await db.collection('tags').doc(tagToDeleteId).delete();
                showToast('Thẻ đã được xóa!', 'success');
            } catch (error) {
                showToast('Lỗi khi xóa thẻ.', 'error');
            }
            closeConfirmModal();

        } else if (currentConfirmAction === 'delete_report') {
            try {
                await db.collection('reports').doc(currentViewingReport.id).delete();
                receivedReports = receivedReports.filter(r => r.id !== currentViewingReport.id);
                showToast('Đã xóa báo cáo!', 'success');
                closeViewReportModal();
            } catch (error) {
                showToast('Lỗi khi xóa báo cáo!', 'error');
            }
            closeConfirmModal();

        } else if (currentConfirmAction === 'clear_cache') {
            window.autoTranslate.clearCache();
            showToast('Đã xóa bộ nhớ dịch!', 'success');
            closeConfirmModal();
        }
    });



    closeViewModalBtn.addEventListener("click", closeViewNoteModal);

    completeAllBtn.addEventListener("click", completeAllNotes);
    resetAllBtn.addEventListener("click", resetAllNotes);

    settingsBtn.addEventListener("click", openSettingsModal);
    closeSettingsModalBtn.addEventListener("click", closeSettingsModal);
    manageTagsBtn.addEventListener("click", openManageTagsModal);
    closeManageTagsModalBtn.addEventListener("click", closeManageTagsModal);
    addOrUpdateTagBtn.addEventListener("click", handleAddOrUpdateTag);
    saveSettingsBtn.addEventListener("click", saveSettings);

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
            try { await firebase.auth().signOut(); window.location.href = 'login.html'; }
            catch (error) { showToast('Lỗi khi đăng xuất!', 'error'); }
        });
    }

    if (profileBtn) {
        profileBtn.addEventListener("click", async () => {
            if (userDropdown) userDropdown.style.display = 'none';
            if (!currentUser) return;

            profileModal.classList.add("active");
            document.body.style.overflow = "hidden";

            profileEmailInput.value = currentUser.email;

            try {
                const userDoc = await db.collection('users').doc(currentUser.uid).get();
                if (userDoc.exists) {
                    const userData = userDoc.data();
                    profileNameInput.value = userData.name || currentUser.displayName || "";

                    // ✅ KIỂM TRA PROVIDERS TỪ FIRESTORE (CHÍNH XÁC HƠN)
                    let providers = userData.providers || [];

                    // ✅ Xử lý trường hợp cũ (provider là string)
                    if (!Array.isArray(providers)) {
                        providers = [providers];
                    }

                    const hasPassword = providers.includes('password');
                    const hasGoogle = providers.includes('google.com');

                    // ✅ HIỂN THỊ/ẨN PHẦN TẠO MẬT KHẨU
                    const createPasswordSection = document.getElementById('createPasswordSection');
                    if (createPasswordSection) {
                        // Chỉ hiện khi CHƯA CÓ PASSWORD
                        createPasswordSection.style.display = hasPassword ? 'none' : 'block';
                    }

                    // ✅ HIỂN THỊ/ẨN PHẦN LIÊN KẾT GOOGLE (NẾU BẠN MUỐN)
                    const linkGoogleSection = document.getElementById('linkGoogleSection');
                    if (linkGoogleSection) {
                        // Chỉ hiện khi CHƯA CÓ GOOGLE
                        linkGoogleSection.style.display = hasGoogle ? 'none' : 'block';
                    }

                } else {
                    profileNameInput.value = currentUser.displayName || "";
                }
            } catch (error) {
                console.error("Error loading profile:", error);
                profileNameInput.value = currentUser.displayName || "";
            }

            if (currentUser.metadata && currentUser.metadata.creationTime) {
                const date = new Date(currentUser.metadata.creationTime);
                const locale = currentLanguage === 'vi' ? 'vi-VN' : 'en-US';
                profileJoinedInput.value = date.toLocaleDateString(locale);
            }

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


    if (saveProfileBtn) {
        saveProfileBtn.addEventListener("click", async () => {
            const newName = profileNameInput.value.trim();
            if (!newName) { showToast("Tên không được để trống", "warning"); return; }
            try {
                await currentUser.updateProfile({ displayName: newName });
                await db.collection('users').doc(currentUser.uid).update({ name: newName });
                updateUserMenu();
                showToast("Cập nhật hồ sơ thành công!", "success");
                profileModal.classList.remove("active");
                document.body.style.overflow = "auto";
            } catch (error) { showToast("Lỗi khi cập nhật hồ sơ: " + error.message, "error"); }
        });
    }

    if (sendPasswordResetBtn) {
        sendPasswordResetBtn.addEventListener("click", async () => {
            if (!currentUser.email) return;
            try {
                await auth.sendPasswordResetEmail(currentUser.email);
                showToast("Đã gửi email đổi mật khẩu! Vui lòng kiểm tra hộp thư.", "success");
            } catch (error) { showToast("Lỗi gửi email: " + error.message, "error"); }
        });
    }

    if (pasteLinkBtn) pasteLinkBtn.addEventListener("click", handlePasteLink);

    let currentLanguage = localStorage.getItem('language') || 'vi'; // Mặc định là Tiếng Việt

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
        filterSelect.innerHTML = '';

        const options = [
            { val: 'all', text: 'Tất cả công việc' },
            { val: 'incomplete', text: 'Chưa hoàn thành' },
            { val: 'completed', text: 'Đã hoàn thành' },
            { val: 'overdue', text: 'Trễ giờ' },
            { val: 'temporary', text: 'Công việc tạm thời' }
        ];

        options.forEach(opt => {
            const el = document.createElement('option');
            el.value = opt.val;
            el.textContent = opt.text;
            filterSelect.appendChild(el);
        });

        const separator = document.createElement('option');
        separator.disabled = true;
        separator.textContent = '─────────────';
        separator.setAttribute('data-no-translate', 'true'); // ✅ Không dịch separator
        filterSelect.appendChild(separator);

        tags.forEach(tag => {
            const option = document.createElement('option');
            option.value = tag.id;
            option.textContent = getTagName(tag);
            filterSelect.appendChild(option);
        });

        filterSelect.value = currentFilterValue || 'all';

        // ✅ THÊM: Dịch các option vừa tạo
        if (currentLanguage !== 'vi' && window.autoTranslate) {
            setTimeout(() => translateAllSelects(), 50);
        }
    }

    function renderCurrentTagsList() {
        currentTagsList.innerHTML = '';
        if (tags.length === 0) {
            currentTagsList.innerHTML = `<p>Chưa có thẻ nào. Hãy thêm một thẻ mới!</p>`;
            return;
        }

        tags.forEach(tag => {
            const tagItem = document.createElement('div');
            tagItem.className = 'tag-item';
            const tagColor = tag.color || '#e0e0e0';
            const tagTextColor = getContrastYIQ(tagColor);
            const tagName = getTagName(tag);

            tagItem.innerHTML = `
        <span class="tag-label" style="background-color: ${tagColor}; color: ${tagTextColor}; --tag-custom-color: ${tagColor};">
            ${tag.icon ? `<i class="${tag.icon}"></i>` : ''} ${tagName}
        </span>
        <div class="tag-actions">
            <button class="edit-tag-btn" data-id="${tag.id}"><i class="fas fa-edit"></i></button>
            <button class="delete-tag-btn" data-id="${tag.id}"><i class="fas fa-trash"></i></button>
        </div>`;
            currentTagsList.appendChild(tagItem);
        });

        document.querySelectorAll('.edit-tag-btn').forEach(btn => {
            btn.addEventListener('click', function () {
                editingTagId = this.getAttribute('data-id');
                const tagToEdit = tags.find(t => t.id === editingTagId);
                if (tagToEdit) {
                    newTagNameInput.value = tagToEdit.name.vi || tagToEdit.name || '';
                    newTagIconInput.value = tagToEdit.icon || '';
                    newTagColorInput.value = tagToEdit.color || '#4f46e5';
                    addOrUpdateTagBtn.innerHTML = 'Cập nhật thẻ';
                }
            });
        });

        document.querySelectorAll('.delete-tag-btn').forEach(btn => {
            btn.addEventListener('click', function () {
                tagToDeleteId = this.getAttribute('data-id');
                openConfirmModal('Bạn có chắc chắn muốn xóa thẻ này?', 'delete_tag');
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
        const days = ['Chủ Nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy'];
        return days[dayNumber];
    }


    function openManageTagsModal() {
        manageTagsModal.classList.add("active");
        document.body.style.overflow = "hidden";
        newTagNameInput.value = '';
        newTagIconInput.value = '';
        newTagColorInput.value = '#4f46e5';
        addOrUpdateTagBtn.innerHTML = 'Thêm Thẻ';
        editingTagId = null;
        renderCurrentTagsList();

        // Nếu có hàm dịch tự động thì gọi
        if (typeof translateDynamicElement === 'function') {
            translateDynamicElement(manageTagsModal);
        }
    }


    function closeManageTagsModal() {
        manageTagsModal.classList.remove("active");
        document.body.style.overflow = "auto";
        newTagNameInput.value = '';
        newTagNameEnInput.value = '';
        newTagIconInput.value = '';
        newTagColorInput.value = '#4f46e5';
        addOrUpdateTagBtn.innerHTML = 'Thêm Thẻ';
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
        if (tags.length === 0) return;
        const sortedNotes = sortNotesByTime([...notesToRender]);
        sortedNotes.forEach((note) => {
            const noteTagObject = tags.find(t => t.id === note.tag);
            const tagName = noteTagObject ? getTagName(noteTagObject) : 'Không xác định';
            const tagIcon = noteTagObject ? noteTagObject.icon : '';
            const tagColor = noteTagObject ? (noteTagObject.color || '#e0e0e0') : '#e0e0e0';
            const tagTextColor = getContrastYIQ(tagColor);
            let progressHTML = '';
            if (note.subTasks && note.subTasks.length > 0) {
                const progress = calculateProgress(note.subTasks);
                let progressAttr = progress === 0 ? 'data-progress="0"' : progress === 100 ? 'data-progress="complete"' : progress <= 33 ? 'data-progress="low"' : progress <= 66 ? 'data-progress="medium"' : 'data-progress="high"';
                progressHTML = `<span class="note-progress" ${progressAttr}><i class="fas fa-tasks"></i> ${progress}%</span>`;
            }
            const timeStatus = getNoteTimeStatus(note);
            const timeTooltip = getTimeStatusText(note, timeStatus);
            const overdueClass = timeStatus === 'overdue' ? 'overdue' : '';
            const noteElement = document.createElement("div");
            noteElement.className = `note-card fade-in ${note.completed ? 'completed' : ''}`;
            if (note.isTemporaryTask) noteElement.setAttribute('data-temporary', 'true');
            noteElement.innerHTML = `
        <div class="note-content" data-id="${note.id}">
            <div class="note-header">
                <h3 class="note-title">${note.title}</h3>
                <div class="note-actions">
                    <button class="qr-btn" data-id="${note.id}" title="Tạo mã QR"><i class="fas fa-qrcode"></i></button>
                    ${!note.completed ? `<button class="complete-btn-header" data-id="${note.id}" title="Hoàn thành"><i class="fas fa-check"></i></button>` : ''}
                    <button class="edit-btn" data-id="${note.id}" title="Sửa"><i class="fas fa-edit"></i></button>
                    <button class="delete-btn" data-id="${note.id}" title="Xóa"><i class="fas fa-trash"></i></button>
                </div>
            </div>
            <p class="note-text">${note.content}</p>
            <div class="note-footer">
                <span class="note-tag" style="background-color: ${tagColor}; color: ${tagTextColor}; --tag-custom-color: ${tagColor};">${tagIcon ? `<i class="${tagIcon}"></i>` : ''} ${tagName}</span>
                ${progressHTML}
                <span class="note-date ${overdueClass}" data-status="${timeStatus}" data-tooltip="${timeTooltip}">${note.time || '--:--'}</span>
            </div>
        </div>`;
            notesContainer.appendChild(noteElement);
            attachNoteEventListeners(noteElement, note.id);
        });
    }

    function addSubTaskInput(taskData = null) {
        const container = document.getElementById('subTasksContainer');

        // ✅ FIX: Kiểm tra container tồn tại
        if (!container) {
            console.error('subTasksContainer not found');
            return;
        }

        const taskId = taskData?.id || Date.now().toString();

        const taskItem = document.createElement('div');
        taskItem.className = 'sub-task-item';
        taskItem.dataset.taskId = taskId;
        taskItem.dataset.completed = taskData?.completed || 'false';

        taskItem.innerHTML = `
        <div class="sub-task-content">
            <input type="text" 
                   class="sub-task-text-input" 
                   placeholder="Mô tả công việc..." 
                   value="${taskData?.text || ''}">
            <input type="url" 
                   class="sub-task-link-input" 
                   placeholder="Đường dẫn (tùy chọn)" 
                   value="${taskData?.link || ''}">
        </div>
        <div class="sub-task-actions">
            <button type="button" class="sub-task-btn remove-sub-task-btn" title="Xóa">
                <i class="fas fa-trash"></i>
            </button>
        </div>
    `;

        container.appendChild(taskItem);

        // Event listener cho nút xóa
        const removeBtn = taskItem.querySelector('.remove-sub-task-btn');
        if (removeBtn) {
            removeBtn.addEventListener('click', () => {
                const totalSubTasks = container.querySelectorAll('.sub-task-item').length;
                if (totalSubTasks > 1) {
                    taskItem.remove();
                } else {
                    showToast('Cần ít nhất 1 công việc', 'warning');
                }
            });
        }

        // Auto focus
        if (!taskData) {
            const textInput = taskItem.querySelector('.sub-task-text-input');
            if (textInput) {
                setTimeout(() => textInput.focus(), 100);
            }
        }

        // Dịch nếu cần
        if (currentLanguage !== 'vi' && window.autoTranslate) {
            setTimeout(() => {
                window.autoTranslate.translateNew(taskItem, currentLanguage);
            }, 50);
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
        if (!note.subTasks || note.subTasks.length === 0) { group.style.display = 'none'; return; }
        group.style.display = 'block';
        list.innerHTML = '';
        const progress = calculateProgress(note.subTasks);
        progressFill.style.width = `${progress}%`;
        progressFill.textContent = `${progress}%`;
        if (progressText) progressText.style.display = 'none';
        progressFill.setAttribute('data-progress', progress === 0 ? '0' : progress <= 33 ? 'low' : progress <= 66 ? 'medium' : progress < 100 ? 'high' : 'complete');
        note.subTasks.forEach(task => {
            const item = document.createElement('div');
            item.className = `view-sub-task-item ${task.completed ? 'completed' : ''}`;
            item.innerHTML = `
        <input type="checkbox" class="view-sub-task-checkbox" data-task-id="${task.id}" data-note-id="${note.id}" ${task.completed ? 'checked' : ''} ${note.completed ? 'disabled' : ''}>
        <span class="view-sub-task-text">${task.text}</span>
        ${task.link ? `<div class="view-sub-task-link"><button class="copy-link-btn" data-link="${task.link}"><i class="fas fa-copy"></i> Copy</button></div>` : ''}`;
            list.appendChild(item);
            item.querySelector('.view-sub-task-checkbox').addEventListener('change', async (e) => {
                if (note.completed) { e.preventDefault(); e.target.checked = task.completed; showToast('Note đã hoàn thành, không thể sửa!', 'warning'); return; }
                await updateSubTaskStatus(note.id, task.id, e.target.checked);
            });
            if (task.link) {
                item.querySelector('.copy-link-btn').addEventListener('click', () => {
                    navigator.clipboard.writeText(task.link).then(() => showToast('Đã copy link!', 'success')).catch(() => showToast('Lỗi copy!', 'error'));
                });
            }
        });
        translateDynamicElement(group);
    }

    async function updateSubTaskStatus(noteId, taskId, completed) {
        try {
            const noteRef = db.collection('notes').doc(noteId);
            const noteDoc = await noteRef.get();
            const updatedSubTasks = noteDoc.data().subTasks.map(task => task.id === taskId ? { ...task, completed } : task);
            await noteRef.update({ subTasks: updatedSubTasks });
            const progress = calculateProgress(updatedSubTasks);
            const progressFill = document.getElementById('viewProgressFill');
            if (progressFill) {
                progressFill.style.width = `${progress}%`;
                progressFill.textContent = `${progress}%`;
                progressFill.setAttribute('data-progress', progress === 0 ? '0' : progress <= 33 ? 'low' : progress <= 66 ? 'medium' : progress < 100 ? 'high' : 'complete');
            }
            const checkbox = document.querySelector(`[data-task-id="${taskId}"][data-note-id="${noteId}"]`);
            if (checkbox) checkbox.closest('.view-sub-task-item')?.classList.toggle('completed', completed);
            showToast('Đã cập nhật trạng thái!', 'success');
        } catch (error) {
            showToast('Lỗi khi cập nhật!', 'error');
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

        const subTasksContainer = document.getElementById('subTasksContainer');
        if (subTasksContainer) {
            subTasksContainer.innerHTML = '';
        }

        const dayCheckboxes = document.querySelectorAll('input[name="dayOfWeek"]');
        if (dayCheckboxes && dayCheckboxes.length > 0) {
            dayCheckboxes.forEach(cb => {
                if (cb) cb.checked = false;
            });
        }

        if (note) {
            // ✅ FIX: Dùng setDynamicText để ép bộ dịch dịch lại
            setDynamicText(modalTitle, 'Sửa công việc');
            setDynamicText(submitNoteBtn, 'Cập nhật');

            document.getElementById("noteTitle").value = note.title || '';
            document.getElementById("noteContent").value = note.content || '';
            document.getElementById("noteTime").value = note.time || '';

            if (dayCheckboxes && dayCheckboxes.length > 0) {
                const dayCheckbox = document.querySelector(`input[name="dayOfWeek"][value="${note.dayOfWeek}"]`);
                if (dayCheckbox) {
                    dayCheckbox.checked = true;
                }
            }

            const expectedDurationInput = document.getElementById("expectedDuration");
            if (expectedDurationInput) {
                expectedDurationInput.value = note.expectedDuration || 30;
            }

            const isTempCheckbox = document.getElementById("isTemporaryTask");
            if (isTempCheckbox) {
                isTempCheckbox.checked = note ? (note.isTemporaryTask || false) : false;
            }

            if (note.subTasks && note.subTasks.length > 0) {
                note.subTasks.forEach(task => addSubTaskInput(task));
            } else {
                addSubTaskInput();
            }

            renderTagOptions(note.tag);
            editingNoteKey = note.id;

        } else {
            // ✅ FIX: Dùng setDynamicText để ép bộ dịch dịch lại
            setDynamicText(modalTitle, 'Công việc mới');
            setDynamicText(submitNoteBtn, 'Lưu công việc');
            setDefaultTime();

            if (dayCheckboxes && dayCheckboxes.length > 0) {
                const today = new Date().getDay();
                const todayCheckbox = document.querySelector(`input[name="dayOfWeek"][value="${today}"]`);
                if (todayCheckbox) {
                    todayCheckbox.checked = true;
                }
            }

            const isTempCheckbox = document.getElementById("isTemporaryTask");
            if (isTempCheckbox) {
                isTempCheckbox.checked = false;
            }

            addSubTaskInput();
            renderTagOptions();
            editingNoteKey = null;
        }

        setTimeout(() => {
            const titleInput = document.getElementById("noteTitle");
            if (titleInput) titleInput.focus();
        }, 200);

        if (currentLanguage !== 'vi' && window.autoTranslate) {
            window.autoTranslate.translateNew(addNoteModal, currentLanguage);
        }

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
        const tagName = noteTag ? getTagName(noteTag) : 'Không xác định';

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

        const taskItem = document.createElement('div');
        taskItem.className = 'sub-task-item';
        taskItem.dataset.taskId = taskId;
        taskItem.dataset.completed = taskData?.completed || 'false';

        // ✅ THAY ĐỔI: Dùng text trực tiếp
        taskItem.innerHTML = `
        <div class="sub-task-content">
            <input type="text" class="sub-task-text-input" 
                   placeholder="Mô tả công việc..." 
                   value="${taskData?.text || ''}">
            <input type="url" class="sub-task-link-input" 
                   placeholder="Đường dẫn (tùy chọn)" 
                   value="${taskData?.link || ''}">
        </div>
        <div class="sub-task-actions">
            <button type="button" class="sub-task-btn remove-qr-sub-task-btn" title="Xóa">
                <i class="fas fa-trash"></i>
            </button>
        </div>
    `;

        container.appendChild(taskItem);

        taskItem.querySelector('.remove-qr-sub-task-btn').addEventListener('click', () => {
            if (container.querySelectorAll('.sub-task-item').length > 1) {
                taskItem.remove();
            } else {
                showToast('Cần ít nhất 1 công việc', 'warning');
            }
        });

        if (!taskData) {
            setTimeout(() => taskItem.querySelector('.sub-task-text-input').focus(), 100);
        }

        // ✅ THÊM: Dịch tự động
        if (currentLanguage !== 'vi' && window.autoTranslate) {
            setTimeout(() => {
                window.autoTranslate.translateNew(taskItem, currentLanguage);
            }, 50);
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

    function getNoteTimeStatus(note) {
        if (note.completed) return 'completed';

        const now = new Date();
        const currentDay = now.getDay();
        const noteDay = parseInt(note.dayOfWeek || 0);

        if (isNoteOverdue(note)) return 'overdue';
        if (noteDay > currentDay) return 'future'; // Khác ngày (trong tương lai)

        // Cùng ngày hôm nay
        const [noteHour, noteMinute] = note.time.split(':').map(Number);
        const currentTotalMinutes = now.getHours() * 60 + now.getMinutes();
        const noteTotalMinutes = noteHour * 60 + noteMinute;
        const diffMinutes = noteTotalMinutes - currentTotalMinutes;

        if (diffMinutes <= 30 && diffMinutes > 0) return 'upcoming';
        return 'future';
    }

        function getTimeStatusText(note, status) {
        if (status === 'completed') return 'Đã hoàn thành';
        const now = new Date();
        const [noteHour, noteMinute] = note.time.split(':').map(Number);
        const diffMinutes = (noteHour * 60 + noteMinute) - (now.getHours() * 60 + now.getMinutes());

        const m = Math.abs(diffMinutes);
        const hours = Math.floor(m / 60);
        const mins = m % 60;

        if (status === 'overdue') {
            return m >= 60 ? `Trễ hạn: ${hours}h ${mins}m` : `Trễ hạn: ${m}m`;
        }
        if (status === 'upcoming') {
            return diffMinutes <= 5 ? 'Sắp đến giờ' : `Sắp đến: ${diffMinutes}m`;
        }
        if (status === 'future') {
            return diffMinutes >= 60 ? `Còn lại: ${hours}h ${mins}m` : `Còn lại: ${diffMinutes}m`;
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
            showToast('toastErrorSavingNote', 'error');
        }
    }

        // ✅ FIX: Thêm async để gọi dịch thuật
    async function updateAllTimeTooltips() {
        const dateElements = document.querySelectorAll('.note-date');
        
        for (const dateElement of dateElements) {
            const noteId = dateElement.closest('.note-content').getAttribute('data-id');
            const note = notes.find(n => n.id === noteId);

            if (note) {
                const timeStatus = getNoteTimeStatus(note);
                let timeTooltip = getTimeStatusText(note, timeStatus);

                // ✅ FIX: Dịch Tooltip ngay lập tức trước khi gán vào data-tooltip
                if (currentLanguage !== 'vi' && window.autoTranslate) {
                    timeTooltip = await window.autoTranslate.translateText(timeTooltip, currentLanguage);
                }

                dateElement.setAttribute('data-status', timeStatus);
                dateElement.setAttribute('data-tooltip', timeTooltip);
                dateElement.removeAttribute('title');

                if (timeStatus === 'overdue') {
                    dateElement.classList.add('overdue');
                } else {
                    dateElement.classList.remove('overdue');
                }
            }
        }
    }


    // Cập nhật mỗi 30 giây
    setInterval(updateAllTimeTooltips, 30000);

    function openViewNoteModal(note) {
        viewNoteModal.classList.add("active");
        document.body.style.overflow = "hidden";
        viewNoteTitle.textContent = note.title;
        viewNoteContent.textContent = note.content;
        viewNoteTime.textContent = `${note.time} ${getDayName(note.dayOfWeek || 0)}`;
        viewNoteTime.classList.remove('overdue', 'completed-time');
        if (note.completed) viewNoteTime.classList.add('completed-time');
        else if (isNoteOverdue(note)) viewNoteTime.classList.add('overdue');

        const viewNoteTagObject = tags.find(t => t.id === note.tag);
        const viewTagName = viewNoteTagObject ? getTagName(viewNoteTagObject) : 'Không xác định';
        const viewTagIcon = viewNoteTagObject ? viewNoteTagObject.icon : '';
        const viewTagColor = viewNoteTagObject ? (viewNoteTagObject.color || '#e0e0e0') : '#e0e0e0';

        viewNoteTag.className = `view-content note-tag`;
        viewNoteTag.style.backgroundColor = viewTagColor;
        viewNoteTag.style.color = getContrastYIQ(viewTagColor);
        viewNoteTag.style.setProperty('--tag-custom-color', viewTagColor);
        viewNoteTag.innerHTML = `${viewTagIcon ? `<i class="${viewTagIcon}"></i>` : ''} ${viewTagName}`;
        viewNoteStatus.textContent = note.completed ? 'Đã hoàn thành' : 'Chưa hoàn thành';
        viewNoteStatus.style.color = note.completed ? "#10b981" : "#ef4444";
        viewNoteActions.innerHTML = '';

        if (note.completed) {
            const uncompleteBtn = document.createElement('button');
            uncompleteBtn.className = 'uncomplete-btn';
            uncompleteBtn.textContent = 'Đánh dấu chưa hoàn thành';
            uncompleteBtn.setAttribute('data-id', note.id);
            uncompleteBtn.addEventListener('click', function () {
                db.collection('notes').doc(this.getAttribute('data-id')).update({ completed: false })
                    .then(() => { closeViewNoteModal(); showToast('Công việc đã được đặt lại!', 'info'); })
                    .catch(() => showToast('Lỗi khi đặt lại công việc.', 'error'));
            });
            viewNoteActions.appendChild(uncompleteBtn);
        }
        renderViewSubTasks(note);
        translateDynamicElement(viewNoteModal);
    }

    function closeViewNoteModal() {
        viewNoteModal.classList.remove("active");
        document.body.style.overflow = "auto";
        viewNoteActions.innerHTML = '';
    }

    function openConfirmModal(message, actionType) {
        currentConfirmAction = actionType;

        const confirmText = document.querySelector('.confirmation-text');
        const cancelBtn = document.getElementById('cancelDeleteBtn');
        const confirmBtn = document.getElementById('confirmDeleteBtn');

        // ✅ FIX: Dùng setDynamicText để ép bộ dịch dịch lại khi mở popup
        setDynamicText(confirmText, message);
        setDynamicText(cancelBtn, 'Hủy');
        setDynamicText(confirmBtn, 'Xóa');

        confirmModal.classList.add("active");
        document.body.style.overflow = "hidden";

                if (currentLanguage !== 'vi' && window.autoTranslate) {
            setTimeout(() => {
                window.autoTranslate.translateNew(confirmModal, currentLanguage);
            }, 50);
        }

    }



    function closeConfirmModal() {
        confirmModal.classList.remove("active");
        document.body.style.overflow = "auto";
        noteToDeleteId = null;
        tagToDeleteId = null;           // ✅ FIX: Xóa ID tag sau khi đóng
        clearCacheRequested = false;    // ✅ FIX: Reset trạng thái cache
        currentConfirmAction = null;
        elementToAnimate = null;
    }



    timeReportsBtn.addEventListener("click", openTimeReportsModal);
    closeTimeReportsModalBtn.addEventListener("click", closeTimeReportsModal);

    function openTimeReportsModal() {
        timeReportsModal.classList.add("active");
        document.body.style.overflow = "hidden";

        // Reset về tuần này mỗi khi mở
        timeReportPeriod.value = 'week';
        specificWeek.style.display = 'none';
        specificMonth.style.display = 'none';
        specificYear.style.display = 'none';

        setDefaultSpecificDates();
        generateTimeReports();
    }

    function closeTimeReportsModal() {
        timeReportsModal.classList.remove("active");
        document.body.style.overflow = "auto";
    }

        async function generateTimeReports() {
        const period = document.getElementById('timeReportPeriod').value;
        const { startDate, endDate, periodLabel } = getReportDateRange(period);
        const filteredNotes = notes.filter(note => note.completed && note.endTime && new Date(note.endTime) >= startDate && new Date(note.endTime) <= endDate);

        // ==========================================
        // ✅ FIX: Dịch các từ khóa tĩnh trước khi ghép với số
        // ==========================================
        let tPhut = 'phút', tTietKiem = 'Tiết kiệm:', tVuot = 'Vượt:', tDuKien = 'Dự kiến:', tThucTe = 'Thực tế:';
        let tLich = 'Lịch:', tXong = 'Xong:', tTienDo = 'Tiến độ:', tChuaCoDuLieu = 'Chưa có dữ liệu báo cáo';

        if (currentLanguage !== 'vi' && window.autoTranslate) {
            [tPhut, tTietKiem, tVuot, tDuKien, tThucTe, tLich, tXong, tTienDo, tChuaCoDuLieu] = await Promise.all([
                window.autoTranslate.translateText(tPhut, currentLanguage),
                window.autoTranslate.translateText(tTietKiem, currentLanguage),
                window.autoTranslate.translateText(tVuot, currentLanguage),
                window.autoTranslate.translateText(tDuKien, currentLanguage),
                window.autoTranslate.translateText(tThucTe, currentLanguage),
                window.autoTranslate.translateText(tLich, currentLanguage),
                window.autoTranslate.translateText(tXong, currentLanguage),
                window.autoTranslate.translateText(tTienDo, currentLanguage),
                window.autoTranslate.translateText(tChuaCoDuLieu, currentLanguage)
            ]);
        }

        document.getElementById('totalTasksCount').textContent = filteredNotes.length;
        document.getElementById('onTimeTasksCount').textContent = filteredNotes.filter(n => n.isOnTime === true).length;
        document.getElementById('lateTasksCount').textContent = filteredNotes.filter(n => n.isOnTime === false).length;
        
        const notesWithDuration = filteredNotes.filter(n => n.actualDuration && n.actualDuration > 0);
        const avgVal = notesWithDuration.length > 0 ? Math.round(notesWithDuration.reduce((sum, n) => sum + n.actualDuration, 0) / notesWithDuration.length) : 0;
        
        // ✅ FIX: Ghép chữ "phút" đã dịch
        document.getElementById('avgTimeValue').textContent = `${avgVal} ${tPhut}`; 
        
        setDynamicText(document.getElementById('timeReportsModalTitle'), `Báo cáo thời gian - ${periodLabel}`);

        const timeReportsList = document.getElementById('timeReportsList');
        timeReportsList.innerHTML = '';
        
        if (filteredNotes.length === 0) {
            timeReportsList.innerHTML = `<p style="text-align: center; color: #6b7280;">${tChuaCoDuLieu}</p>`;
        } else {
            filteredNotes.forEach(note => {
                const item = document.createElement('div');
                item.className = `time-report-item ${note.isOnTime ? 'on-time' : 'late'}`;
                
                const timeDiff = (note.expectedDuration || 0) - (note.actualDuration || 0);
                
                // ✅ FIX: Ghép các từ khóa đã dịch với số
                const diffText = timeDiff > 0 ? `${tTietKiem} ${timeDiff} ${tPhut}` : `${tVuot} ${Math.abs(timeDiff)} ${tPhut}`;
                
                const end = new Date(note.endTime);
                const completedAtStr = `${String(end.getHours()).padStart(2, '0')}:${String(end.getMinutes()).padStart(2, '0')} (${String(end.getDate()).padStart(2, '0')}/${String(end.getMonth() + 1).padStart(2, '0')})`;
                
                let subTaskProgressHTML = '';
                if (note.subTasks && note.subTasks.length > 0) {
                    const progress = calculateProgress(note.subTasks);
                    let progressClass = progress === 100 ? 'complete' : progress >= 67 ? 'high' : progress >= 34 ? 'medium' : 'low';
                    let progressIcon = progress === 100 ? '✅' : progress >= 67 ? '🟢' : progress >= 34 ? '🟡' : '🔴';
                    
                    // ✅ FIX: Ghép chữ "Tiến độ" đã dịch
                    subTaskProgressHTML = `<p style="margin-top: 5px;"><span class="sub-task-progress ${progressClass}">${progressIcon} ${tTienDo} ${progress}% (${note.subTasks.filter(t => t.completed).length}/${note.subTasks.length})</span></p>`;
                }
                
                item.innerHTML = `
            <i class="fas ${note.isOnTime ? 'fa-check-circle' : 'fa-exclamation-circle'} status-icon"></i>
            <div class="note-info">
                <h5>${note.title}</h5>
                <p style="margin-bottom: 2px;"><i class="far fa-clock"></i> ${tLich} <span>${getDayName(note.dayOfWeek || 0)}</span> - ${note.time}</p>
                <p style="color: ${note.isOnTime ? '#059669' : '#d97706'}; font-weight: 600;"><i class="fas fa-check-double"></i> ${tXong} ${completedAtStr}</p>
                ${subTaskProgressHTML}
            </div>
            <div class="time-stats">
                <span>${tDuKien} ${note.expectedDuration || 0} ${tPhut}</span>
                <span>${tThucTe} ${note.actualDuration || 0} ${tPhut}</span>
            </div>
            <div class="time-diff ${timeDiff > 0 ? 'positive' : 'negative'}">${diffText}</div>`;
                timeReportsList.appendChild(item);
            });
        }
        renderTimeReportsChart(filteredNotes);
        
        // Dịch nốt các thành phần còn lại (như Tiêu đề task, Ngày trong tuần...)
        translateDynamicElement(timeReportsList);
    }

    function getReportDateRange(period) {
        const now = new Date();
        let startDate, endDate, periodLabel;
        switch (period) {
            case 'week':
                startDate = new Date(now); startDate.setDate(now.getDate() - now.getDay()); startDate.setHours(0, 0, 0, 0);
                endDate = new Date(startDate); endDate.setDate(startDate.getDate() + 6); endDate.setHours(23, 59, 59, 999);
                periodLabel = `Tuần này (${startDate.toLocaleDateString('vi-VN')} - ${endDate.toLocaleDateString('vi-VN')})`;
                break;
            case 'month':
                startDate = new Date(now.getFullYear(), now.getMonth(), 1);
                endDate = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59, 999);
                periodLabel = `Tháng ${now.getMonth() + 1}/${now.getFullYear()}`;
                break;
            case 'year':
                startDate = new Date(now.getFullYear(), 0, 1);
                endDate = new Date(now.getFullYear(), 11, 31, 23, 59, 59, 999);
                periodLabel = `Năm ${now.getFullYear()}`;
                break;
            case 'all':
                startDate = new Date(2020, 0, 1); endDate = new Date(2100, 11, 31, 23, 59, 59, 999);
                periodLabel = 'Tất cả';
                break;
            case 'specific-week':
                if (specificWeek.value) {
                    const [year, week] = specificWeek.value.split('-W').map(Number);
                    startDate = getDateOfISOWeek(week, year);
                    endDate = new Date(startDate); endDate.setDate(startDate.getDate() + 6); endDate.setHours(23, 59, 59, 999);
                    periodLabel = `Tuần ${week}/${year}`;
                } else { startDate = new Date(); endDate = new Date(); periodLabel = 'Chọn tuần...'; }
                break;
            case 'specific-month':
                if (specificMonth.value) {
                    const [year, month] = specificMonth.value.split('-').map(Number);
                    startDate = new Date(year, month - 1, 1);
                    endDate = new Date(year, month, 0, 23, 59, 59, 999);
                    periodLabel = `Tháng ${month}/${year}`;
                } else { startDate = new Date(); endDate = new Date(); periodLabel = 'Chọn tháng...'; }
                break;
            case 'specific-year':
                const yearValue = parseInt(specificYear.value);
                if (yearValue) {
                    startDate = new Date(yearValue, 0, 1);
                    endDate = new Date(yearValue, 11, 31, 23, 59, 59, 999);
                    periodLabel = `Năm ${yearValue}`;
                } else { startDate = new Date(); endDate = new Date(); periodLabel = 'Chọn năm...'; }
                break;
        }
        return { startDate, endDate, periodLabel };
    }

    // Helper: Tính ngày đầu tuần theo ISO (Thứ Hai là đầu tuần)
    function getDateOfISOWeek(week, year) {
        const simple = new Date(year, 0, 1 + (week - 1) * 7);
        const dow = simple.getDay();
        const ISOweekStart = simple;
        if (dow <= 4) ISOweekStart.setDate(simple.getDate() - simple.getDay() + 1);
        else ISOweekStart.setDate(simple.getDate() + 8 - simple.getDay());
        return ISOweekStart;
    }

    function setDefaultSpecificDates() {
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');

        // Cài đặt năm
        specificYear.value = year;

        // Cài đặt tháng
        specificMonth.value = `${year}-${month}`;

        // Cài đặt tuần (Tính toán tuần ISO hiện tại)
        const firstDayOfYear = new Date(year, 0, 1);
        const pastDaysOfYear = (now - firstDayOfYear) / 86400000;
        const weekNumber = Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
        specificWeek.value = `${year}-W${String(weekNumber).padStart(2, '0')}`;
    }

    // ✅ FIX: Thêm async để chờ dịch chữ xong mới vẽ Chart
    async function renderTimeReportsChart(weeklyNotes) {
        if (window.timeReportsChartInstance) window.timeReportsChartInstance.destroy();
        const ctx = document.getElementById('timeReportsChart');
        if (!ctx) return;
        const onTimeData = [0, 0, 0, 0, 0, 0, 0];
        const lateData = [0, 0, 0, 0, 0, 0, 0];
        const timeDiffSum = [0, 0, 0, 0, 0, 0, 0];
        const taskCountPerDay = [0, 0, 0, 0, 0, 0, 0];
        const avgTimeDiffData = [0, 0, 0, 0, 0, 0, 0];
        weeklyNotes.forEach(note => {
            const day = note.dayOfWeek || 0;
            if (note.isOnTime) onTimeData[day]++; else lateData[day]++;
            timeDiffSum[day] += (note.expectedDuration || 0) - (note.actualDuration || 0);
            taskCountPerDay[day]++;
        });
        for (let i = 0; i < 7; i++) avgTimeDiffData[i] = taskCountPerDay[i] > 0 ? Math.round(timeDiffSum[i] / taskCountPerDay[i]) : 0;
        const stackedTasks = onTimeData.map((val, i) => val + lateData[i]);
        let maxTasks = Math.max(...stackedTasks, 1);
        let yMax = Math.ceil(maxTasks * 1.2);
        let yMin = 0;
        const hasNegativeDiff = avgTimeDiffData.some(v => v < 0);
        let maxAbsDiff = Math.max(...avgTimeDiffData.map(Math.abs), 1);
        let y1Max = Math.ceil(maxAbsDiff * 1.2);
        let y1Min = 0;
        if (hasNegativeDiff) { yMin = -yMax; y1Min = -y1Max; }

        // ==========================================
        // ✅ FIX: Dịch chữ trước khi đưa vào Chart.js
        // ==========================================
        let labels = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];
        let labelLine = 'TB Tiết kiệm/Vượt (phút)';
        let labelBar1 = 'Hoàn thành đúng hạn';
        let labelBar2 = 'Hoàn thành trễ';
        let yTitle = 'Số lượng Task';
        let y1Title = 'Phút (Tiết kiệm > 0 | Vượt < 0)';

        if (currentLanguage !== 'vi' && window.autoTranslate) {
            labels = await Promise.all(labels.map(l => window.autoTranslate.translateText(l, currentLanguage)));
            labelLine = await window.autoTranslate.translateText(labelLine, currentLanguage);
            labelBar1 = await window.autoTranslate.translateText(labelBar1, currentLanguage);
            labelBar2 = await window.autoTranslate.translateText(labelBar2, currentLanguage);
            yTitle = await window.autoTranslate.translateText(yTitle, currentLanguage);
            y1Title = await window.autoTranslate.translateText(y1Title, currentLanguage);
        }

        window.timeReportsChartInstance = new Chart(ctx, {
            data: {
                labels: labels, // Dùng mảng đã dịch
                datasets: [
                    { type: 'line', label: labelLine, data: avgTimeDiffData, borderColor: '#3b82f6', backgroundColor: '#3b82f6', borderWidth: 2, tension: 0.3, yAxisID: 'y1', order: 0 },
                    { type: 'bar', label: labelBar1, data: onTimeData, backgroundColor: 'rgba(16, 185, 129, 0.8)', borderColor: 'rgb(16, 185, 129)', borderWidth: 1, borderRadius: 5, yAxisID: 'y', order: 1 },
                    { type: 'bar', label: labelBar2, data: lateData, backgroundColor: 'rgba(239, 68, 68, 0.8)', borderColor: 'rgb(239, 68, 68)', borderWidth: 1, borderRadius: 5, yAxisID: 'y', order: 2 }
                ]
            },
            options: {
                responsive: true, maintainAspectRatio: false, interaction: { mode: 'index', intersect: false },
                scales: {
                    x: { stacked: true },
                    y: { type: 'linear', display: true, position: 'left', stacked: true, min: yMin, max: yMax, title: { display: true, text: yTitle, color: '#6b7280', font: { size: 11 } } },
                    y1: { type: 'linear', display: true, position: 'right', min: y1Min, max: y1Max, title: { display: true, text: y1Title, color: '#3b82f6', font: { size: 11 } }, grid: { drawOnChartArea: false } }
                }
            }
        });
    }


    async function exportToExcel() {
        if (notes.length === 0) { showToast('Không có công việc nào để xuất!', 'info'); return; }
        const workbook = new ExcelJS.Workbook();
        workbook.creator = 'Notes App';
        workbook.created = new Date();
        const dayColors = ['EF4444', 'F59E0B', 'EAB308', '10B981', '3B82F6', '6366F1', '8B5CF6'];
        const dayBgColors = ['FFFECACA', 'FFFED7AA', 'FFFEF3C7', 'FFD1FAE5', 'FFDBEAFE', 'FFE0E7FF', 'FFEDE9FE'];
        const formatSubTasks = (subTasks) => {
            if (!subTasks || subTasks.length === 0) return '';
            const progress = calculateProgress(subTasks);
            const total = subTasks.length;
            const completed = subTasks.filter(t => t.completed).length;
            let result = `[ ${progress}% ] (${completed}/${total})\n`;
            subTasks.forEach(task => { result += `${task.completed ? '☑' : '☐'} ${task.text}${task.link ? ` [Link: ${task.link}]` : ''}\n`; });
            return result;
        };
        const wsAll = workbook.addWorksheet('Tất cả', { views: [{ state: 'frozen', xSplit: 0, ySplit: 1 }] });
        wsAll.properties.tabColor = { argb: 'FF4F46E5' };
        wsAll.columns = [
            { header: 'Ngày', key: 'day', width: 15 }, { header: 'Tiêu đề', key: 'title', width: 25 }, { header: 'Nội dung', key: 'content', width: 35 },
            { header: 'Công việc con', key: 'subtasks', width: 45 }, { header: 'Thời gian', key: 'time', width: 12 }, { header: 'Thẻ', key: 'tag', width: 15 },
            { header: 'Trạng thái', key: 'status', width: 15 }, { header: 'Task tạm', key: 'temporary', width: 12 }, { header: 'Dự kiến (phút)', key: 'expected', width: 12 },
            { header: 'Thực tế (phút)', key: 'actual', width: 12 }, { header: 'Hiệu suất', key: 'performance', width: 15 }
        ];
        wsAll.getRow(1).height = 30;
        wsAll.getRow(1).eachCell((cell) => { cell.font = { name: 'Calibri', bold: true, color: { argb: 'FFFFFFFF' }, size: 12 }; cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF4F46E5' } }; cell.alignment = { horizontal: 'center', vertical: 'middle' }; cell.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }; });
        notes.forEach((note, index) => {
            const noteTag = tags.find(t => t.id === note.tag);
            const tagName = noteTag ? getTagName(noteTag) : 'Không xác định';
            const status = note.completed ? 'Đã hoàn thành' : 'Chưa hoàn thành';
            const dayName = getDayName(note.dayOfWeek || 0);
            let performance = '';
            if (note.completed && typeof note.isOnTime === 'boolean') performance = note.isOnTime ? 'Đúng giờ' : 'Trễ';
            wsAll.addRow({ day: dayName, title: note.title, content: note.content, subtasks: formatSubTasks(note.subTasks), time: note.time, tag: tagName, status: status, temporary: note.isTemporaryTask ? 'Có' : 'Không', expected: note.expectedDuration || '', actual: note.actualDuration || '', performance: performance });
            const rowIndex = index + 2; const rowObj = wsAll.getRow(rowIndex);
            rowObj.height = Math.max(25, (note.subTasks ? note.subTasks.length + 1 : 1) * 15);
            rowObj.eachCell({ includeEmpty: false }, (cell, colNumber) => {
                cell.font = { name: 'Calibri', size: 11 }; cell.border = { top: { style: 'thin', color: { argb: 'FFE5E7EB' } }, bottom: { style: 'thin', color: { argb: 'FFE5E7EB' } } }; cell.alignment = { vertical: 'middle', horizontal: 'left', wrapText: true }; cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: rowIndex % 2 === 0 ? 'FFF8F9FA' : 'FFFFFFFF' } };
                if (colNumber === 1) { cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: dayBgColors[note.dayOfWeek || 0] } }; cell.font = { bold: true, underline: 'single', color: { argb: 'FF1F2937' } }; cell.alignment = { horizontal: 'center', vertical: 'middle' }; cell.value = { text: dayName, hyperlink: `#'${getDayName(note.dayOfWeek || 0)}'!A1` }; }
                else if (colNumber === 7) { cell.font = { bold: true, color: { argb: note.completed ? 'FF059669' : 'FFDC2626' } }; cell.alignment = { horizontal: 'center', vertical: 'middle' }; }
                else if (colNumber === 8) { cell.alignment = { horizontal: 'center', vertical: 'middle' }; cell.font = { bold: note.isTemporaryTask, color: { argb: note.isTemporaryTask ? 'FFEF4444' : 'FF6B7280' }, size: 11 }; }
                else if (colNumber === 11 && performance) { cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: note.isOnTime ? 'FFD1FAE5' : 'FFFEE2E2' } }; cell.font = { bold: true, color: { argb: note.isOnTime ? 'FF047857' : 'FFB91C1C' } }; cell.alignment = { horizontal: 'center', vertical: 'middle' }; }
                else if ([5, 9, 10].includes(colNumber)) cell.alignment = { horizontal: 'center', vertical: 'middle' };
            });
        });
        wsAll.autoFilter = { from: { row: 1, column: 1 }, to: { row: 1, column: 11 } };

        for (let i = 0; i < 7; i++) {
            const dayNotes = notes.filter(note => note.dayOfWeek === i);
            if (dayNotes.length > 0) {
                const dayName = getDayName(i);
                const ws = workbook.addWorksheet(dayName, { views: [{ state: 'frozen', xSplit: 0, ySplit: 1 }] });
                ws.properties.tabColor = { argb: `FF${dayColors[i]}` };
                ws.columns = [
                    { header: 'Tiêu đề', key: 'title', width: 30 }, { header: 'Nội dung', key: 'content', width: 35 }, { header: 'Công việc con', key: 'subtasks', width: 45 },
                    { header: 'Thời gian', key: 'time', width: 12 }, { header: 'Thẻ', key: 'tag', width: 15 }, { header: 'Trạng thái', key: 'status', width: 15 },
                    { header: 'Task tạm', key: 'temporary', width: 12 }, { header: 'Dự kiến', key: 'expected', width: 12 }, { header: 'Thực tế', key: 'actual', width: 12 },
                    { header: 'Hiệu suất', key: 'performance', width: 15 }
                ];
                ws.getRow(1).height = 30;
                ws.getRow(1).eachCell((cell) => { cell.font = { name: 'Calibri', bold: true, color: { argb: 'FFFFFFFF' }, size: 12 }; cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: `FF${dayColors[i]}` } }; cell.alignment = { horizontal: 'center', vertical: 'middle' }; });
                dayNotes.forEach((note, index) => {
                    const noteTag = tags.find(t => t.id === note.tag);
                    const tagName = noteTag ? getTagName(noteTag) : 'Không xác định';
                    const status = note.completed ? 'Đã hoàn thành' : 'Chưa hoàn thành';
                    let performance = '';
                    if (note.completed && typeof note.isOnTime === 'boolean') performance = note.isOnTime ? 'Đúng giờ' : 'Trễ';
                    ws.addRow({ title: note.title, content: note.content, subtasks: formatSubTasks(note.subTasks), time: note.time, tag: tagName, status: status, temporary: note.isTemporaryTask ? 'Có' : 'Không', expected: note.expectedDuration || '', actual: note.actualDuration || '', performance: performance });
                    const rowIndex = index + 2; const rowObj = ws.getRow(rowIndex);
                    rowObj.height = Math.max(25, (note.subTasks ? note.subTasks.length + 1 : 1) * 15);
                    rowObj.eachCell({ includeEmpty: false }, (cell, colNumber) => {
                        cell.font = { name: 'Calibri', size: 11 }; cell.border = { top: { style: 'thin', color: { argb: 'FFE5E7EB' } }, bottom: { style: 'thin', color: { argb: 'FFE5E7EB' } } }; cell.alignment = { vertical: 'middle', horizontal: 'left', wrapText: true }; cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: rowIndex % 2 === 0 ? dayBgColors[i] : 'FFFFFFFF' } };
                        if (colNumber === 6) { cell.font = { bold: true, color: { argb: note.completed ? 'FF059669' : 'FFDC2626' } }; cell.alignment = { horizontal: 'center', vertical: 'middle' }; }
                        else if (colNumber === 7) { cell.alignment = { horizontal: 'center', vertical: 'middle' }; cell.font = { bold: note.isTemporaryTask, color: { argb: note.isTemporaryTask ? 'FFEF4444' : 'FF6B7280' }, size: 11 }; }
                        else if (colNumber === 10 && performance) { cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: note.isOnTime ? 'FFD1FAE5' : 'FFFEE2E2' } }; cell.font = { bold: true, color: { argb: note.isOnTime ? 'FF047857' : 'FFB91C1C' } }; cell.alignment = { horizontal: 'center', vertical: 'middle' }; }
                        else if ([4, 8, 9].includes(colNumber)) cell.alignment = { horizontal: 'center', vertical: 'middle' };
                    });
                });
                const backLinkCell = ws.getCell('A1');
                backLinkCell.value = { text: backLinkCell.value, hyperlink: `#'Tất cả'!A1` };
                ws.autoFilter = { from: { row: 1, column: 1 }, to: { row: 1, column: 10 } };
            }
        }
        const buffer = await workbook.xlsx.writeBuffer();
        const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a'); a.href = url; a.download = `Ghi_Chu_Tuan_${new Date().toISOString().split('T')[0]}.xlsx`; a.click(); window.URL.revokeObjectURL(url);
        showToast('File Excel đã được xuất!', 'success');
    }

    async function checkAndCreateUserDocument(user) {
        if (!user) return;
        const userDocRef = db.collection('users').doc(user.uid);
        try {
            const doc = await userDocRef.get();
            if (!doc.exists) {
                const userData = {
                    name: user.displayName || 'New User', email: user.email, email_lowercase: user.email.toLowerCase(), photoURL: user.photoURL || null, providers: ['password'], createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                    settings: { language: 'vi', theme: 'light', noteColumns: 3, backgroundColor: '#f8f9fa', notificationTimeBefore: 5 }
                };
                await userDocRef.set(userData);
                showToast(`Chào mừng ${userData.name}! Đã tạo hồ sơ cho bạn.`, 'success');
            } else {
                const userData = doc.data();
                let providers = Array.isArray(userData.providers) ? userData.providers : (userData.provider ? (Array.isArray(userData.provider) ? userData.provider : [userData.provider]) : ['password']);
                if (userData.provider) await userDocRef.update({ providers: providers, provider: firebase.firestore.FieldValue.delete() });
                else await userDocRef.update({ providers: providers });
            }
        } catch (error) { console.error("Error checking/creating user document:", error); }
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

    function checkAndScheduleNotifications(notesList) {
        if (notificationInterval) clearInterval(notificationInterval);
        notificationInterval = setInterval(() => {
            const notificationTimeBefore = parseInt(localStorage.getItem('notificationTimeBefore') || '5');
            if (notificationTimeBefore === 0) return;
            const now = new Date();
            const currentDay = now.getDay();
            notesList.forEach(note => {
                if (note.completed || notifiedNotes.has(note.id) || parseInt(note.dayOfWeek) !== currentDay) return;
                if (note.time) {
                    const [noteHour, noteMinute] = note.time.split(':').map(Number);
                    const noteTimeDate = new Date(); noteTimeDate.setHours(noteHour, noteMinute, 0, 0);
                    const diffMinutes = (noteTimeDate - now) / (1000 * 60);
                    if (diffMinutes <= notificationTimeBefore && diffMinutes > 0) {
                        showToast(`Nhắc nhở: Đến giờ '${note.title}'`, 'warning', 10000);
                        playNotificationSound();
                        notifiedNotes.add(note.id);
                    }
                }
            });
        }, 10000);
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
        if (note.completed) return false;

        const now = new Date();
        const currentDay = now.getDay();
        const currentHour = now.getHours();
        const currentMinute = now.getMinutes();

        const noteDay = parseInt(note.dayOfWeek || 0);
        const [noteHour, noteMinute] = note.time.split(':').map(Number);

        // Nếu ngày của note nhỏ hơn hôm nay -> Đã qua ngày -> Trễ
        if (noteDay < currentDay) return true;
        // Nếu ngày của note lớn hơn hôm nay -> Chưa tới ngày -> Không trễ
        if (noteDay > currentDay) return false;

        // Nếu cùng ngày hôm nay, mới so sánh giờ phút
        if (currentHour > noteHour) return true;
        if (currentHour === noteHour && currentMinute > noteMinute) return true;

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
        const selectedDayFilter = document.getElementById("dayOfWeekSelect").value;
        const targetDay = selectedDayFilter === "all" ? new Date().getDay() : parseInt(selectedDayFilter);
        const notesToComplete = notes.filter(note => note.dayOfWeek === targetDay && !note.completed);
        if (notesToComplete.length === 0) { showToast('Không có công việc nào cần hoàn thành cho ngày này!', 'info'); return; }
        const batch = db.batch();
        const now = new Date();
        const endTime = now.toISOString();
        notesToComplete.forEach(note => {
            const noteRef = db.collection('notes').doc(note.id);
            if (note.isTemporaryTask) { batch.delete(noteRef); return; }
            let actualDuration = null; let isOnTime = null;
            if (note.startTime) { actualDuration = Math.round((now - new Date(note.startTime)) / 60000); }
            else {
                const [hours, minutes] = note.time.split(':');
                const start = new Date(); start.setHours(parseInt(hours), parseInt(minutes), 0, 0);
                actualDuration = Math.max(0, Math.round((now - start) / 60000));
            }
            if (note.expectedDuration) isOnTime = actualDuration <= note.expectedDuration;
            batch.update(noteRef, { completed: true, endTime: endTime, actualDuration: actualDuration, isOnTime: isOnTime });
        });
        try {
            await batch.commit();
            showToast(`Đã hoàn thành tất cả công việc của ${getDayName(targetDay)}!`, 'success');
        } catch (error) { showToast('Lỗi khi hoàn thành tất cả công việc.', 'error'); }
    }

    async function resetAllNotes() {
        const selectedDayFilter = document.getElementById("dayOfWeekSelect").value;
        const targetDay = selectedDayFilter === "all" ? new Date().getDay() : parseInt(selectedDayFilter);
        const notesToReset = notes.filter(note => note.dayOfWeek === targetDay && note.completed);
        if (notesToReset.length === 0) { showToast('Không có công việc nào để đặt lại trong ngày này!', 'info'); return; }
        const batch = db.batch();
        notesToReset.forEach(note => { batch.update(db.collection('notes').doc(note.id), { completed: false, endTime: null, actualDuration: null, isOnTime: null, startTime: null }); });
        try {
            await batch.commit();
            showToast(`Đã đặt lại (Bắt đầu ngày mới) cho ${getDayName(targetDay)}!`, 'success');
        } catch (error) { showToast('Lỗi khi đặt lại công việc.', 'error'); }
    }

    function loadSettings() {
        const savedColumns = localStorage.getItem('noteColumns') || (window.innerWidth >= 1024 ? 3 : window.innerWidth >= 768 ? 2 : 1);
        document.documentElement.style.setProperty('--notes-grid-columns', savedColumns);
        noteColumnsSelect.value = savedColumns;

        const savedBackgroundColor = localStorage.getItem('backgroundColor') || '#f8f9fa';
        document.documentElement.style.setProperty('--body-bg-color', savedBackgroundColor);
        backgroundColorInput.value = savedBackgroundColor;

        currentLanguage = localStorage.getItem('language') || 'vi';
        languageSelect.value = currentLanguage;

        notificationTimeBeforeSelect.value = localStorage.getItem('notificationTimeBefore') || '5';
        document.querySelector('.header h1').textContent = localStorage.getItem('appName') || 'Quản lý công việc';

        if (currentLanguage !== 'vi' && window.autoTranslate) {
            setTimeout(async () => {
                await window.autoTranslate.autoTranslate(currentLanguage);
                await translateAllSelects(); // ✅ THÊM: Dịch select options
            }, 500);
        }
    }

    loadSettings();

    async function saveSettings() {
        const selectedColumns = noteColumnsSelect.value;
        const selectedBackgroundColor = backgroundColorInput.value;
        const selectedLanguage = languageSelect.value;
        const selectedAppName = appNameInput.value.trim();
        const selectedNotificationTime = notificationTimeBeforeSelect.value;

        // Lưu vào localStorage
        localStorage.setItem('noteColumns', selectedColumns);
        localStorage.setItem('backgroundColor', selectedBackgroundColor);
        localStorage.setItem('language', selectedLanguage);
        localStorage.setItem('notificationTimeBefore', selectedNotificationTime);
        if (selectedAppName) {
            localStorage.setItem('appName', selectedAppName);
            document.querySelector('.header h1').textContent = selectedAppName;
        } else {
            localStorage.removeItem('appName');
            document.querySelector('.header h1').textContent = 'Châu Chí Kil';
        }

        // Áp dụng thay đổi giao diện
        document.documentElement.style.setProperty('--notes-grid-columns', selectedColumns);
        document.documentElement.style.setProperty('--body-bg-color', selectedBackgroundColor);

        const languageChanged = currentLanguage !== selectedLanguage;

        // ✅ FIX: Đóng form và hiện thông báo NGAY LẬP TỨC, không bắt người dùng chờ
        closeSettingsModal();
        showToast('Đã lưu cài đặt!', 'success');

        if (languageChanged) {
            currentLanguage = selectedLanguage;

            if (selectedLanguage === 'vi') {
                window.location.reload();
                return;
            }

            showToast('Đang chuyển đổi ngôn ngữ...', 'info', 2000);

            renderFilterOptions();
            renderTagOptions();
            renderCurrentTagsList();
            loadNotes();

            // Quá trình dịch chạy ngầm
            await window.autoTranslate.autoTranslate(selectedLanguage);
            await translateAllSelects();

        } else {
            loadNotes();
        }

        // Đồng bộ lên Firestore
        if (currentUser) {
            const settingsData = {
                noteColumns: parseInt(selectedColumns),
                backgroundColor: selectedBackgroundColor,
                language: selectedLanguage,
                notificationTimeBefore: parseInt(selectedNotificationTime),
                appName: selectedAppName || null
            };

            db.collection('users').doc(currentUser.uid).set({
                settings: settingsData
            }, { merge: true }).catch(error => {
                console.error("Silent sync error:", error);
            });
        }
    }


    function loadNotes() {
        const searchTerm = searchInput.value.toLowerCase();
        const filterValue = filterSelect.value;
        const dayFilter = dayOfWeekSelect.value;

        let filteredNotes = [...notes];

        // 1. LỌC THEO NGÀY TRONG TUẦN
        if (dayFilter !== 'all') {
            filteredNotes = filteredNotes.filter(note => note.dayOfWeek === parseInt(dayFilter));
        }

        // 2. LỌC THEO TRẠNG THÁI VÀ THẺ
        if (filterValue !== "all") {
            if (filterValue === "completed") {
                filteredNotes = filteredNotes.filter(note => note.completed);
            } else if (filterValue === "incomplete") {
                filteredNotes = filteredNotes.filter(note => !note.completed);
            } else if (filterValue === "temporary") {
                filteredNotes = filteredNotes.filter(note => note.isTemporaryTask);
            } else if (filterValue === "overdue") {
                filteredNotes = filteredNotes.filter(note => !note.completed && isNoteOverdue(note));
            } else {
                // Lọc theo tag ID
                filteredNotes = filteredNotes.filter(note => note.tag === filterValue);
            }
        }

        // 3. LỌC THEO TÌM KIẾM (Search)
        if (searchTerm) {
            filteredNotes = filteredNotes.filter(note => {
                const matchTitle = note.title.toLowerCase().includes(searchTerm);
                const matchContent = note.content.toLowerCase().includes(searchTerm);
                const noteTag = tags.find(t => t.id === note.tag);
                const matchTag = noteTag && getTagName(noteTag).toLowerCase().includes(searchTerm);
                return matchTitle || matchContent || matchTag;
            });
        }

        // Render ra màn hình
        renderNotes(filteredNotes);
        updateEmptyState(filteredNotes);
        checkAndScheduleNotifications(filteredNotes);
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
            appNameInput.value = 'Công việc của tôi';
        }
    }

    function closeSettingsModal() {
        settingsModal.classList.remove("active");
        document.body.style.overflow = "auto";
    }

    function showToast(message, type = 'info', duration = 3000) {
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.textContent = message; // Hiển thị trực tiếp message Tiếng Việt

        toastContainer.appendChild(toast);

        setTimeout(() => {
            toast.style.animation = 'fadeOut 0.5s forwards';
            setTimeout(() => {
                toast.remove();
            }, 500);
        }, duration);

        // Gọi dịch tự động nếu đang không dùng Tiếng Việt
        translateDynamicElement(toast);
    }


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

    async function linkPasswordProvider(newPassword) {
        if (!currentUser) { showToast('Vui lòng đăng nhập trước!', 'error'); return false; }
        try {
            const signInMethods = await auth.fetchSignInMethodsForEmail(currentUser.email);
            if (signInMethods.includes('password')) { showToast('Tài khoản đã có mật khẩu rồi!', 'info'); return false; }
            const credential = firebase.auth.EmailAuthProvider.credential(currentUser.email, newPassword);
            await currentUser.linkWithCredential(credential);
            const userDocRef = db.collection('users').doc(currentUser.uid);
            const userDoc = await userDocRef.get();
            let providers = userDoc.data().providers || [];
            if (!providers.includes('password')) { providers.push('password'); await userDocRef.update({ providers: providers }); }
            showToast('Đã tạo mật khẩu thành công! Bạn có thể đăng nhập bằng email/password.', 'success');
            return true;
        } catch (error) {
            if (error.code === 'auth/weak-password') showToast('Mật khẩu quá yếu! Vui lòng dùng ít nhất 6 ký tự.', 'error');
            else if (error.code === 'auth/email-already-in-use') showToast('Email này đã có mật khẩu!', 'warning');
            else showToast('Lỗi tạo mật khẩu: ' + error.message, 'error');
            return false;
        }
    }

    const linkGoogleBtn = document.getElementById('linkGoogleBtn');
    if (linkGoogleBtn) {
        linkGoogleBtn.addEventListener('click', async () => {
            if (!currentUser) { showToast('Vui lòng đăng nhập trước!', 'error'); return; }
            try {
                linkGoogleBtn.disabled = true;
                linkGoogleBtn.innerHTML = `<i class="fas fa-circle-notch fa-spin"></i> Đang liên kết...`;
                const provider = new firebase.auth.GoogleAuthProvider();
                await currentUser.linkWithPopup(provider);
                const userDocRef = db.collection('users').doc(currentUser.uid);
                const userDoc = await userDocRef.get();
                let providers = userDoc.data().providers || [];
                if (!providers.includes('google.com')) { providers.push('google.com'); await userDocRef.update({ providers: providers }); }
                showToast('Đã liên kết với Google thành công!', 'success');
                document.getElementById('linkGoogleSection').style.display = 'none';
            } catch (error) {
                if (error.code === 'auth/credential-already-in-use') showToast('Tài khoản Google này đã được liên kết với người dùng khác!', 'warning');
                else if (error.code === 'auth/popup-closed-by-user') showToast('Bạn đã đóng cửa sổ xác thực!', 'warning');
                else showToast('Lỗi liên kết: ' + error.message, 'error');
            } finally {
                linkGoogleBtn.disabled = false;
                linkGoogleBtn.innerHTML = `<i class="fab fa-google"></i> Liên kết với Google`;
            }
        });
    }

    async function checkAndCreateUserDocument(user) {
        if (!user) return;

        const userDocRef = db.collection('users').doc(user.uid);

        try {
            const doc = await userDocRef.get();

            if (!doc.exists) {
                // ✅ Tạo mới nếu chưa có
                const userData = {
                    name: user.displayName || 'New User',
                    email: user.email,
                    email_lowercase: user.email.toLowerCase(),
                    photoURL: user.photoURL || null,
                    providers: ['password'], // ⬅️ Mặc định password
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
                showToast(`Chào mừng ${userData.name}!`, 'success');
            } else {
                // ✅ CHUẨN HÓA PROVIDERS (Chuyển đổi dữ liệu cũ)
                const userData = doc.data();

                let providers = [];
                if (Array.isArray(userData.providers)) {
                    providers = userData.providers;
                } else if (userData.provider) {
                    providers = Array.isArray(userData.provider)
                        ? userData.provider
                        : [userData.provider];

                    // ✅ Cập nhật lại Firestore với format mới
                    await userDocRef.update({
                        providers: providers,
                        provider: firebase.firestore.FieldValue.delete() // Xóa field cũ
                    });
                } else {
                    // Không có providers nào → Mặc định là password
                    providers = ['password'];
                    await userDocRef.update({ providers: providers });
                }
            }
        } catch (error) {
            console.error("Error checking/creating user document:", error);
        }
    }

    // ==========================================
    // EVENT: TẠO MẬT KHẨU TỪ GOOGLE ACCOUNT
    // ==========================================
    const createPasswordBtn = document.getElementById('createPasswordBtn');
    if (createPasswordBtn) {
        createPasswordBtn.addEventListener('click', async () => {
            const newPassword = document.getElementById('newPasswordInput').value;
            const confirmPassword = document.getElementById('confirmNewPasswordInput').value;

            if (!newPassword || !confirmPassword) {
                showToast('Vui lòng nhập đầy đủ mật khẩu!', 'warning');
                return;
            }

            if (newPassword.length < 6) {
                showToast('Mật khẩu phải có ít nhất 6 ký tự!', 'warning');
                document.getElementById('newPasswordInput').focus();
                return;
            }

            if (newPassword !== confirmPassword) {
                showToast('Mật khẩu xác nhận không khớp!', 'error');
                document.getElementById('confirmNewPasswordInput').focus();
                return;
            }

            // Disable button
            createPasswordBtn.disabled = true;
            createPasswordBtn.innerHTML = '<i class="fas fa-circle-notch fa-spin"></i> Đang tạo...';

            const success = await linkPasswordProvider(newPassword);

            if (success) {
                // Ẩn section tạo password
                document.getElementById('createPasswordSection').style.display = 'none';

                // Xóa input
                document.getElementById('newPasswordInput').value = '';
                document.getElementById('confirmNewPasswordInput').value = '';
            }

            // Re-enable button
            createPasswordBtn.disabled = false;
            createPasswordBtn.innerHTML = '<i class="fas fa-plus-circle"></i> Tạo mật khẩu';
        });
    }

    const selectAllBtn = document.getElementById('selectAllDaysBtn');
    if (selectAllBtn) {
        selectAllBtn.addEventListener('click', function () {
            const checkboxes = document.querySelectorAll('input[name="dayOfWeek"]');

            // ✅ FIX: Kiểm tra checkboxes tồn tại
            if (!checkboxes || checkboxes.length === 0) {
                console.error('Day checkboxes not found');
                return;
            }

            const allChecked = Array.from(checkboxes).every(cb => cb.checked);

            checkboxes.forEach(cb => {
                if (cb) cb.checked = !allChecked;
            });

            const text = allChecked ? 'Chọn tất cả' : 'Bỏ chọn tất cả';
            const icon = allChecked ? 'fas fa-check-double' : 'fas fa-times-circle';

            this.innerHTML = `<i class="${icon}"></i> ${text}`;

                    if (currentLanguage !== 'vi' && window.autoTranslate) {
            window.autoTranslate.translateNew(taskItem, currentLanguage);
        }

        });
    }

    /* ==========================================
   REPORTS MANAGEMENT FUNCTIONS
   ========================================== */
    function loadReceivedReports() {
        if (!currentUser) return;

        // ✅ CHỈ LOAD KHI MỞ DASHBOARD
        let reportsListener = null;

        // Hàm bật listener
        window.startReportsListener = () => {
            if (reportsListener) return; // Đã bật rồi thì thôi

            reportsListener = db.collection('reports')
                .where('toUserId', '==', currentUser.uid)
                .orderBy('createdAt', 'desc')
                .limit(20) // ✅ CHỈ LOAD 20 REPORTS MỚI NHẤT
                .onSnapshot((snapshot) => {
                    receivedReports = [];
                    snapshot.forEach((doc) => {
                        const report = doc.data();
                        report.id = doc.id;
                        receivedReports.push(report);
                    });

                    const unreadCount = receivedReports.filter(r => r.status === 'unread').length;
                    if (reportsBadge) {
                        reportsBadge.textContent = unreadCount;
                        reportsBadge.style.display = unreadCount > 0 ? 'flex' : 'none';
                    }

                    if (reportingDashboardModal.classList.contains('active')) {
                        const now = new Date();
                        const startOfWeek = new Date(now);
                        startOfWeek.setDate(now.getDate() - now.getDay());
                        startOfWeek.setHours(0, 0, 0, 0);

                        const weeklyReports = receivedReports.filter(report => {
                            const reportDate = report.createdAt?.toDate?.();
                            return reportDate && reportDate >= startOfWeek;
                        });

                        renderSubmittedReportsTable(weeklyReports);
                    }
                });
        };

        // Hàm tắt listener
        window.stopReportsListener = () => {
            if (reportsListener) {
                reportsListener();
                reportsListener = null;
            }
        };

        // ✅ BẬT LISTENER KHI MỞ DASHBOARD
        const originalOpenDashboard = openReportingDashboard;
        openReportingDashboard = function () {
            window.startReportsListener();
            originalOpenDashboard();
        };

        const originalCloseDashboard = closeReportingDashboard;
        closeReportingDashboard = function () {
            window.stopReportsListener();
            originalCloseDashboard();
        };
    }


    function formatReportDate(date) {
        const now = new Date();
        const diffMins = Math.floor((now - date) / 60000);
        const diffHours = Math.floor((now - date) / 3600000);
        const diffDays = Math.floor((now - date) / 86400000);
        if (diffMins < 1) return 'Vừa xong';
        if (diffMins < 60) return `${diffMins} phút trước`;
        if (diffHours < 24) return `${diffHours} giờ trước`;
        if (diffDays < 7) return `${diffDays} ngày trước`;
        return date.toLocaleDateString('vi-VN');
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
        if (!recipientEmail) { showToast('Vui lòng nhập email người nhận!', 'warning'); document.getElementById('recipientEmail').focus(); return; }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(recipientEmail)) { showToast('Email không hợp lệ!', 'error'); document.getElementById('recipientEmail').focus(); return; }
        const originalHTML = submitBtn.innerHTML;
        submitBtn.disabled = true; submitBtn.innerHTML = `<i class="fas fa-circle-notch fa-spin"></i> Đang gửi...`;
        try {
            const usersSnapshot = await db.collection('users').where('email_lowercase', '==', recipientEmail.toLowerCase()).limit(1).get();
            if (usersSnapshot.empty) { showToast(`❌ Email này chưa đăng ký tài khoản trong hệ thống!`, 'error'); submitBtn.disabled = false; submitBtn.innerHTML = originalHTML; document.getElementById('recipientEmail').focus(); return; }
            const recipientUser = usersSnapshot.docs[0].data();
            const recipientUserId = usersSnapshot.docs[0].id;
            if (recipientUserId === currentUser.uid) { showToast(`⚠️ Không thể gửi báo cáo cho chính mình!`, 'warning'); submitBtn.disabled = false; submitBtn.innerHTML = originalHTML; document.getElementById('recipientEmail').value = ''; document.getElementById('recipientEmail').focus(); return; }
            const newReport = { fromUserId: currentUser.uid, fromUserName: currentUser.displayName || 'User', fromUserEmail: currentUser.email, toUserId: recipientUserId, toUserEmail: recipientEmail, toUserName: recipientUser.name || recipientUser.email, reportData: generateReportData(), message: message || null, createdAt: firebase.firestore.FieldValue.serverTimestamp(), status: 'unread' };
            await db.collection('reports').add(newReport);
            showToast(`✅ Đã gửi báo cáo thành công đến ${recipientUser.name || recipientEmail}!`, 'success');
            closeSendReportModal();
        } catch (error) { showToast(`❌ Lỗi khi gửi báo cáo: ${error.message}`, 'error'); submitBtn.disabled = false; submitBtn.innerHTML = originalHTML; }
    }

    async function openReportingDashboard() {
        reportingDashboardModal.classList.add('active');
        document.body.style.overflow = 'hidden';
        submittedReportsTableBody.innerHTML = `<tr><td colspan="5" style="text-align: center;">Đang tải dữ liệu...</td></tr>`;
        const now = new Date();
        const startOfWeek = new Date(now); startOfWeek.setDate(now.getDate() - now.getDay()); startOfWeek.setHours(0, 0, 0, 0);
        const weeklyReports = receivedReports.filter(report => { const reportDate = report.createdAt?.toDate?.(); return reportDate && reportDate >= startOfWeek; });
        renderSubmittedReportsTable(weeklyReports);
    }

    function renderSubmittedReportsTable(reportsToRender) {
        submittedReportsTableBody.innerHTML = '';
        if (!reportsToRender || reportsToRender.length === 0) {
            submittedReportsTableBody.innerHTML = `<tr><td colspan="5" style="text-align: center;">Chưa có báo cáo nào trong tuần này.</td></tr>`;
            return;
        }
        reportsToRender.forEach(report => {
            const data = report.reportData;
            const completionRate = data.totalTasks > 0 ? Math.round((data.completedTasks / data.totalTasks) * 100) : 0;
            const onTimeRate = data.completedTasks > 0 ? Math.round((data.onTimeTasks / data.completedTasks) * 100) : 0;
            const row = document.createElement('tr');
            row.innerHTML = `
        <td><div class="user-info">${report.fromUserName}</div><div class="user-email">${report.fromUserEmail}</div></td>
        <td><div style="display: flex; align-items: center; gap: 8px;"><div class="completion-rate-bar"><div class="completion-rate-fill" style="width: ${completionRate}%;"></div></div><span>${completionRate}%</span></div></td>
        <td style="color: ${onTimeRate >= 80 ? '#10b981' : '#f59e0b'}; font-weight: bold;">${onTimeRate}%</td>
        <td>${data.avgCompletionTime} phút/công việc</td>
        <td><button class="view-detail-btn">Chi tiết</button></td>`;
            row.querySelector('.view-detail-btn').addEventListener('click', () => openViewReportModal(report));
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

    function renderReportDetails(reportData) {
        const detailsContainer = document.getElementById('reportDetailStats');
        const daysOfWeekOrder = [0, 1, 2, 3, 4, 5, 6];
        detailsContainer.innerHTML = `
    <h4 style="margin-bottom: 10px;">📊 Thống kê: ${reportData.period}</h4>
    <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 15px; margin-bottom: 10px;">
        <div style="background: #dbeafe; padding: 10px; border-radius: 10px; text-align: center;"><i class="fas fa-tasks" style="font-size: 1.6rem; color: #3b82f6;"></i><p style="font-size: 1.5rem; font-weight: bold; margin: 10px 0;">${reportData.totalTasks}</p><p style="color: #666; font-size: 0.8rem;">Tổng task</p></div>
        <div style="background: #d1fae5; padding: 10px; border-radius: 10px; text-align: center;"><i class="fas fa-check-circle" style="font-size: 1.6rem; color: #10b981;"></i><p style="font-size: 1.5rem; font-weight: bold; margin: 10px 0;">${reportData.completedTasks}</p><p style="color: #666; font-size: 0.8rem;">Hoàn thành</p></div>
        <div style="background: #fef3c7; padding: 10px; border-radius: 10px; text-align: center;"><i class="fas fa-clock" style="font-size: 1.6rem; color: #f59e0b;"></i><p style="font-size: 1.5rem; font-weight: bold; margin: 10px 0;">${reportData.onTimeTasks}</p><p style="color: #666; font-size: 0.8rem;">Đúng hạn</p></div>
        <div style="background: #fee2e2; padding: 10px; border-radius: 10px; text-align: center;"><i class="fas fa-exclamation-circle" style="font-size: 1.6rem; color: #ef4444;"></i><p style="font-size: 1.5rem; font-weight: bold; margin: 10px 0;">${reportData.lateTasks}</p><p style="color: #666; font-size: 0.8rem;">Trễ hạn</p></div>
    </div>
    <div style="background: #f3f4f6; padding: 15px; border-radius: 10px; margin-bottom: 15px;"><p style="font-weight: 600; margin-bottom: 5px;"><i class="fas fa-hourglass-half"></i> Thời gian hoàn thành trung bình</p><p style="font-size: 1.1rem; color: #4f46e5; font-weight: bold;">${reportData.avgCompletionTime} phút</p></div>
    <h5 style="margin-bottom: 10px;"><i class="fas fa-tags"></i> Phân tích theo thẻ:</h5>
    <div style="display: flex; flex-direction: column; gap: 8px;">
        ${Object.entries(reportData.tasksByTag).map(([tag, data]) => `<div style="background: white; padding: 8px; border-radius: 10px; display: flex; justify-content: space-between; align-items: center;"><span style="font-weight: 500;">${tag}</span><span style="color: #666; font-size: 0.8rem;">${data.completed}/${data.total} task • ${data.onTime} đúng hạn</span></div>`).join('')}
    </div>
    <h5 style="margin: 15px 0 10px;"><i class="fas fa-calendar-week"></i> Phân bố theo ngày:</h5>
    <div style="display: flex; flex-direction: column; gap: 8px;">
        ${daysOfWeekOrder.map(dayIndex => `<div style="background: white; padding: 6px; border-radius: 10px; display: flex; justify-content: space-between; align-items: center;"><span style="font-weight: 400; font-size: 0.8rem;">${getDayName(dayIndex)}</span><span style="background: #667eea; color: white; padding: 4px 8px; border-radius: 15px; font-size: 0.8rem;">${reportData.tasksByDay[dayIndex] || 0} task</span></div>`).join('')}
    </div>`;
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
        if (!currentViewingReport) return;
        openConfirmModal('Bạn có chắc chắn muốn xóa báo cáo này không?', 'delete_report');
    }



    async function markReportAsRead() {
        if (!currentViewingReport) return;
        try {
            await db.collection('reports').doc(currentViewingReport.id).update({ status: 'read' });
            const index = receivedReports.findIndex(r => r.id === currentViewingReport.id);
            if (index !== -1) receivedReports[index].status = 'read';
            showToast('Đã đánh dấu đọc!', 'info');
        } catch (error) { console.error('Error marking as read:', error); }
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

    // ==========================================
    // RENDER SINGLE NOTE (Không re-render toàn bộ)
    // ==========================================
    function renderSingleNote(note) {
        const existingCard = document.querySelector(`[data-id="${note.id}"]`)?.closest('.note-card');
        if (existingCard) {
            return; // Đã tồn tại thì không render lại
        }

        const noteTagObject = tags.find(t => t.id === note.tag);
        const tagName = noteTagObject ? getTagName(noteTagObject) : 'Không xác định';
        const tagIcon = noteTagObject ? noteTagObject.icon : '';
        const tagColor = noteTagObject ? (noteTagObject.color || '#e0e0e0') : '#e0e0e0';
        const tagTextColor = getContrastYIQ(tagColor);

        let progressHTML = '';
        if (note.subTasks?.length > 0) {
            const progress = calculateProgress(note.subTasks);
            let progressAttr = progress === 0 ? 'data-progress="0"' :
                progress === 100 ? 'data-progress="complete"' :
                    progress <= 33 ? 'data-progress="low"' :
                        progress <= 66 ? 'data-progress="medium"' : 'data-progress="high"';

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
        if (note.isTemporaryTask) noteElement.setAttribute('data-temporary', 'true');

        noteElement.innerHTML = `
        <div class="note-content" data-id="${note.id}">
            <div class="note-header">
                <h3 class="note-title">${note.title}</h3>
                <div class="note-actions">
                    <button class="qr-btn" data-id="${note.id}" title="Tạo mã QR">
                        <i class="fas fa-qrcode"></i>
                    </button>
                    ${!note.completed ? `
                        <button class="complete-btn-header" data-id="${note.id}" title="Hoàn thành">
                            <i class="fas fa-check"></i>
                        </button>
                    ` : ''}
                    <button class="edit-btn" data-id="${note.id}" title="Sửa">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="delete-btn" data-id="${note.id}" ttitle="Xóa">
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
                <span class="note-date ${overdueClass}" data-status="${timeStatus}" data-tooltip="${timeTooltip}">
                    ${note.time || '--:--'}
                </span>
            </div>
        </div>
    `;

        notesContainer.appendChild(noteElement);
        attachNoteEventListeners(noteElement, note.id);
        translateDynamicElement(noteElement);
    }

    function updateSingleNote(note) {
        const noteCard = document.querySelector(`[data-id="${note.id}"]`)?.closest('.note-card');
        if (!noteCard) { renderSingleNote(note); return; }
        noteCard.classList.toggle('completed', note.completed);
        const titleEl = noteCard.querySelector('.note-title');
        if (titleEl) titleEl.textContent = note.title;
        const contentEl = noteCard.querySelector('.note-text');
        if (contentEl) contentEl.textContent = note.content;
        if (note.subTasks?.length > 0) {
            const progress = calculateProgress(note.subTasks);
            const progressEl = noteCard.querySelector('.note-progress');
            if (progressEl) {
                progressEl.innerHTML = `<i class="fas fa-tasks"></i> ${progress}%`;
                progressEl.setAttribute('data-progress', progress === 0 ? '0' : progress === 100 ? 'complete' : progress <= 33 ? 'low' : progress <= 66 ? 'medium' : 'high');
            }
        }
        const timeStatus = getNoteTimeStatus(note);
        const timeTooltip = getTimeStatusText(note, timeStatus);
        const dateEl = noteCard.querySelector('.note-date');
        if (dateEl) {
            dateEl.className = `note-date ${timeStatus === 'overdue' ? 'overdue' : ''}`;
            dateEl.setAttribute('data-status', timeStatus);
            dateEl.setAttribute('data-tooltip', timeTooltip);
        }
        const completeBtn = noteCard.querySelector('.complete-btn-header');
        if (note.completed && completeBtn) { completeBtn.remove(); }
        else if (!note.completed && !completeBtn) {
            const actionsDiv = noteCard.querySelector('.note-actions');
            const qrBtn = actionsDiv.querySelector('.qr-btn');
            const newCompleteBtn = document.createElement('button');
            newCompleteBtn.className = 'complete-btn-header';
            newCompleteBtn.setAttribute('data-id', note.id);
            newCompleteBtn.title = 'Hoàn thành';
            newCompleteBtn.innerHTML = '<i class="fas fa-check"></i>';
            actionsDiv.insertBefore(newCompleteBtn, qrBtn.nextSibling);
            attachCompleteListener(newCompleteBtn);
        }
        translateDynamicElement(noteCard);
    }

    // ==========================================
    // REMOVE SINGLE NOTE
    // ==========================================
    function removeSingleNote(noteId) {
        const noteCard = document.querySelector(`[data-id="${noteId}"]`)?.closest('.note-card');
        if (noteCard) {
            noteCard.classList.add('deleting');
            setTimeout(() => noteCard.remove(), 500);
        }
    }

    // ==========================================
    // ATTACH EVENT LISTENERS CHO TỪNG NOTE
    // ==========================================
    function attachNoteEventListeners(noteElement, noteId) {
        // Delete button
        const deleteBtn = noteElement.querySelector('.delete-btn');
        if (deleteBtn) {
            deleteBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                noteToDeleteId = noteId;
                openConfirmModal('Bạn có chắc chắn muốn xóa công việc này không?', 'delete');
            });

        }

        // Edit button
        const editBtn = noteElement.querySelector('.edit-btn');
        if (editBtn) {
            editBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                const note = notes.find(n => n.id === noteId);
                openAddNoteModal(note);
            });
        }

        // Complete button
        const completeBtn = noteElement.querySelector('.complete-btn-header');
        if (completeBtn) {
            attachCompleteListener(completeBtn);
        }

        // QR button
        const qrBtn = noteElement.querySelector('.qr-btn');
        if (qrBtn) {
            qrBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                openQRGeneratorModal(noteId);
            });
        }

        // Click vào note để xem chi tiết
        const noteContent = noteElement.querySelector('.note-content');
        if (noteContent) {
            noteContent.addEventListener('click', (e) => {
                if (e.target.closest('.note-actions')) return;
                const note = notes.find(n => n.id === noteId);
                if (note) { // ✅ KIỂM TRA note tồn tại
                    openViewNoteModal(note);
                }
            });
        }
    }

    /**
 * Dịch tất cả các select options trong trang
 */
    async function translateAllSelects() {
        if (currentLanguage === 'vi' || !window.autoTranslate) return;

        const selects = document.querySelectorAll('select');

        for (const select of selects) {
            const options = select.querySelectorAll('option');

            for (const option of options) {
                if (option.hasAttribute('data-no-translate')) continue;
                if (option.disabled && !option.textContent.trim()) continue; // Bỏ qua separator

                await window.autoTranslate.translateElement(option, currentLanguage);
            }
        }
    }

    function attachCompleteListener(completeBtn) {
        completeBtn.addEventListener('click', async (e) => {
            e.stopPropagation();
            const noteId = completeBtn.getAttribute('data-id');
            const note = notes.find(n => n.id === noteId);

            if (!note) return;

            if (note.isTemporaryTask) {
                noteToDeleteId = noteId;
                elementToAnimate = completeBtn.closest('.note-card');
                openConfirmModal('Task này sẽ bị xóa vĩnh viễn sau khi hoàn thành. Tiếp tục?', 'complete_temp');
                return;
            }


            const now = new Date();
            const endTime = now.toISOString();
            let actualDuration = null;

            if (note.startTime) {
                const start = new Date(note.startTime);
                actualDuration = Math.round((now - start) / 60000);
            } else {
                const [hours, minutes] = note.time.split(':');
                const scheduledTime = new Date();
                scheduledTime.setHours(parseInt(hours), parseInt(minutes), 0, 0);
                const diff = Math.round((now - scheduledTime) / 60000);
                actualDuration = diff > 0 ? diff : 0;
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
                showToast('toastErrorCompletingNote', 'error');
            }
        });
    }



});


//'Shift + Alt + F - Format toàn bộ file'