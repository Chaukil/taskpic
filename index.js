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

    let html5QrCode = null;
    let currentQRNoteData = null;
    let currentGeneratedNote = null;

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
    const notesCollection = db.collection('notes');
    const tagsCollection = db.collection('tags');

    let notes = [];
    let tags = [];
    let noteToDeleteId = null;
    let editingNoteKey = null;
    let editingTagId = null;

    let editingNoteId = null;
    let deletingNoteId = null;
    let deletingTagId = null;

    let notificationInterval; // Biến để lưu trữ interval của thông báo
    let notifiedNotes = new Set();

    let overdueCheckInterval;

    notesCollection.orderBy('time').onSnapshot((snapshot) => {
        notes = [];
        snapshot.forEach((doc) => {
            const note = doc.data();
            note.id = doc.id;
            notes.push(note);
        });
        notesLoaded = true;

        // Render notes nếu cả tags và notes đã load
        if (tagsLoaded) {
            renderNotes();
            updateEmptyState();
            filterNotes();
            startOverdueCheckInterval();
        }
    }, (error) => {
        console.error("Error fetching notes from Firestore: ", error);
        showToast('toastErrorLoadingNotes', 'error');
    });

    let tagsLoaded = false;
    let notesLoaded = false;

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

        // Render notes nếu cả tags và notes đã load
        if (notesLoaded) {
            renderNotes();
            updateEmptyState();
            filterNotes();
        }
    }, (error) => {
        console.error("Error fetching tags from Firestore: ", error);
        showToast('toastErrorLoadingTags', 'error');
    });

    // === Event Listeners ===
    addNoteBtn.addEventListener("click", () => openAddNoteModal());
    closeModalBtn.addEventListener("click", closeAddNoteModal);
    noteForm.addEventListener("submit", handleNoteSubmit);
    searchInput.addEventListener("input", filterNotes);
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

    // === Tag Management Functions ===

    const translations = {
        'vi': {
            'appNameLabel': 'Tên ứng dụng:',
            'appNamePlaceholder': 'Ví dụ: Ghi Chú Của Tôi',
            'defaultAppName': 'Ghi chú của tôi',
            'appSlogan': 'Lưu trữ ghi chú của bạn một cách phong cách',
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
            'performanceLate': 'Trễ'
        },
        'en': {
            'appNameLabel': 'App Name:',
            'appNamePlaceholder': 'Example: My Notes',
            'defaultAppName': 'My notes',
            'appSlogan': 'Store your notes in style',
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
            'performanceLate': 'Late'
        }
    };

    let currentLanguage = localStorage.getItem('language') || 'vi'; // Mặc định là Tiếng Việt

    function applyTranslations() {
        const lang = translations[currentLanguage];

        // Header
        const savedAppName = localStorage.getItem('appName');
        if (savedAppName) {
            document.querySelector('.header h1').textContent = savedAppName;
        } else {
            document.querySelector('.header h1').textContent = lang.defaultAppName;
        }

        document.querySelector('.header p').textContent = lang.appSlogan;
        document.getElementById('searchInput').placeholder = lang.searchInputPlaceholder;
        document.querySelector('#filterSelect option[value="all"]').textContent = lang.allNotesOption;
        document.getElementById('helpTextIcon').innerHTML = lang.helpTextFontAwesome;
        document.getElementById('helpTextColor').textContent = lang.helpTextColorPicker;
        document.getElementById('footerText').innerHTML = lang.footerText;
        document.getElementById('scanQRBtn').innerHTML = lang.scanQRBtn;
        document.getElementById('qrScannerTitle').textContent = lang.qrScannerTitle;
        document.getElementById('qrGeneratorTitle').textContent = lang.qrGeneratorTitle;
        document.getElementById('addFromQRTitle').textContent = lang.addFromQRTitle;
        document.getElementById('uploadQRImageBtn').innerHTML = lang.uploadQRImageBtn;
        document.getElementById('downloadQRBtn').innerHTML = lang.downloadQRBtn;
        document.getElementById('copyQRLinkBtn').innerHTML = lang.copyQRLinkBtn;


        let completedOption = document.querySelector('#filterSelect option[value="completed"]');
        if (completedOption) {
            completedOption.textContent = lang.completedNotesOption;
        }
        document.getElementById('addNoteBtn').innerHTML = lang.addNoteBtn;
        document.getElementById('completeAllBtn').innerHTML = lang.completeAllBtn;
        document.getElementById('resetAllBtn').innerHTML = lang.resetAllBtn;

        // Trạng thái rỗng (Empty State)
        document.querySelector('#emptyState h3').textContent = lang.emptyStateTitle;
        document.querySelector('#emptyState p').textContent = lang.emptyStateText;

        // Modal Thêm/Sửa Ghi chú
        document.querySelector('label[for="noteTitle"]').textContent = lang.noteTitleLabel;
        document.querySelector('label[for="noteContent"]').textContent = lang.noteContentLabel;
        document.querySelector('label[for="noteTime"]').textContent = lang.noteTimeLabel;


        document.getElementById('notificationTimeBeforeLabel').textContent = lang.notificationTimeBeforeLabel;
        document.querySelector('#notificationTimeBefore option[value="0"]').textContent = lang.noNotification;
        document.querySelector('#notificationTimeBefore option[value="5"]').textContent = lang.minutes5;
        document.querySelector('#notificationTimeBefore option[value="10"]').textContent = lang.minutes10;
        document.querySelector('#notificationTimeBefore option[value="15"]').textContent = lang.minutes15;
        document.querySelector('#notificationTimeBefore option[value="30"]').textContent = lang.minutes30;
        document.querySelector('#notificationTimeBefore option[value="60"]').textContent = lang.minutes60;

        document.querySelector('#dayOfWeekSelect option[value="all"]').textContent = lang.allDaysOption;
        document.querySelector('#dayOfWeekSelect option[value="0"]').textContent = lang.sunday;
        document.querySelector('#dayOfWeekSelect option[value="1"]').textContent = lang.monday;
        document.querySelector('#dayOfWeekSelect option[value="2"]').textContent = lang.tuesday;
        document.querySelector('#dayOfWeekSelect option[value="3"]').textContent = lang.wednesday;
        document.querySelector('#dayOfWeekSelect option[value="4"]').textContent = lang.thursday;
        document.querySelector('#dayOfWeekSelect option[value="5"]').textContent = lang.friday;
        document.querySelector('#dayOfWeekSelect option[value="6"]').textContent = lang.saturday;

        // Note Form - Day of Week
        document.getElementById('noteDayOfWeekLabel').textContent = lang.noteDayOfWeekLabel;
        document.querySelector('#noteDayOfWeek option[value="0"]').textContent = lang.sunday;
        document.querySelector('#noteDayOfWeek option[value="1"]').textContent = lang.monday;
        document.querySelector('#noteDayOfWeek option[value="2"]').textContent = lang.tuesday;
        document.querySelector('#noteDayOfWeek option[value="3"]').textContent = lang.wednesday;
        document.querySelector('#noteDayOfWeek option[value="4"]').textContent = lang.thursday;
        document.querySelector('#noteDayOfWeek option[value="5"]').textContent = lang.friday;
        document.querySelector('#noteDayOfWeek option[value="6"]').textContent = lang.saturday;
        const durationLabel = document.getElementById('expectedDurationLabel');
        if (durationLabel) durationLabel.textContent = lang.expectedDurationLabel;
        const durationHelp = document.getElementById('helpExpectedDuration');
        if (durationHelp) durationHelp.textContent = lang.helpExpectedDuration;

        // Export Excel Button
        document.getElementById('exportExcelBtn').innerHTML = lang.exportExcelBtn;
        const noteTagLabelElements = document.querySelectorAll('.form-group label');
        noteTagLabelElements.forEach(label => {
            if (label.nextElementSibling && label.nextElementSibling.id === 'noteTagsContainer') {
                label.textContent = lang.noteTagLabel;
            }
        });

        document.getElementById('manageTagsBtn').innerHTML = lang.manageTagsBtn;

        // Modal Xem Ghi chú
        const viewNoteLabels = document.querySelectorAll('#viewNoteModal .meta-item .form-label');
        if (viewNoteLabels[0]) viewNoteLabels[0].textContent = lang.viewNoteTagLabel;
        if (viewNoteLabels[1]) viewNoteLabels[1].textContent = lang.viewNoteStatusLabel;
        if (viewNoteLabels[2]) viewNoteLabels[2].textContent = lang.viewNoteTimeLabel;

        const contentLabel = document.querySelector('#viewNoteModal .form-group .form-label');
        if (contentLabel) contentLabel.textContent = lang.viewNoteContentLabel;

        // Modal Xác nhận
        document.querySelector('.confirmation-text').textContent = lang.confirmDeleteText;
        document.getElementById('cancelDeleteBtn').textContent = lang.cancelBtn;
        document.getElementById('confirmDeleteBtn').textContent = lang.deleteBtnConfirm;

        // Modal Quản lý Thẻ
        document.querySelector('#manageTagsModal .modal-header .modal-title').textContent = lang.manageTagsModalTitle;
        document.querySelector('label[for="newTagName"]').textContent = lang.newTagNameLabel;

        // Thêm label cho input tiếng Anh
        const tagNameEnLabel = document.querySelector('label[for="newTagNameEn"]');
        if (tagNameEnLabel) {
            if (currentLanguage === 'vi') {
                tagNameEnLabel.textContent = 'Tên Thẻ (Tiếng Anh)';
            } else {
                tagNameEnLabel.textContent = 'Tag Name (English)';
            }
        }

        document.querySelector('label[for="newTagIcon"]').textContent = lang.newTagIconLabel;
        document.querySelector('label[for="newTagColor"]').textContent = lang.newTagColorLabel;

        const currentTagsTitle = document.querySelector('#manageTagsModal h4');
        if (currentTagsTitle) currentTagsTitle.textContent = lang.currentTagsTitle;

        if (currentTagsList.textContent.includes('Chưa có thẻ nào.') || currentTagsList.textContent.includes('No tags yet.')) {
            currentTagsList.innerHTML = `<p>${lang.noTagsMessage}</p>`;
        }

        // Modal Cài đặt
        document.querySelector('#settingsModal .modal-header .modal-title').textContent = lang.settingsModalTitle;
        document.getElementById('appNameLabel').textContent = lang.appNameLabel;
        appNameInput.placeholder = lang.appNamePlaceholder;
        document.querySelector('label[for="noteColumns"]').textContent = lang.noteColumnsLabel;
        document.querySelector('#noteColumns option[value="1"]').textContent = lang.column1;
        document.querySelector('#noteColumns option[value="2"]').textContent = lang.column2;
        document.querySelector('#noteColumns option[value="3"]').textContent = lang.column3;
        document.querySelector('#noteColumns option[value="4"]').textContent = lang.column4;
        document.querySelector('label[for="backgroundColor"]').textContent = lang.backgroundColorLabel;
        document.querySelector('label[for="languageSelect"]').textContent = lang.languageLabel;
        document.querySelector('#languageSelect option[value="vi"]').textContent = lang.vietnameseLanguage;
        document.querySelector('#languageSelect option[value="en"]').textContent = lang.englishLanguage;
        document.getElementById('saveSettingsBtn').textContent = lang.saveSettingsBtn;
        document.getElementById('notificationTimeBeforeLabel').textContent = lang.notificationTimeBeforeLabel;

        // Cập nhật các văn bản nút động
        document.getElementById('modalTitle').textContent = editingNoteKey ? lang.editNoteModalTitle : lang.newNoteModalTitle;
        document.getElementById('submitNoteBtn').textContent = editingNoteKey ? lang.updateNoteBtn : lang.saveNoteBtn;
        document.getElementById('addOrUpdateTagBtn').innerHTML = editingTagId ? lang.updateTagBtn : lang.addTagBtn;

        // Cập nhật placeholder cho các input
        newTagNameInput.placeholder = lang.newTagNamePlaceholder;
        if (newTagNameEnInput) {
            newTagNameEnInput.placeholder = lang.newTagNameEnPlaceholder;
        }
        newTagIconInput.placeholder = lang.newTagIconPlaceholder;

        document.getElementById('timeReportsBtn').innerHTML = lang.timeReportsBtn;
        document.getElementById('scanQRBtn').innerHTML = lang.scanQRBtn;

        // Modal Báo cáo
        document.getElementById('timeReportsModalTitle').textContent = lang.timeReportsModalTitle;
        document.getElementById('totalTasksText').textContent = lang.totalTasksText;
        document.getElementById('onTimeTasksText').textContent = lang.onTimeTasksText;
        document.getElementById('lateTasksText').textContent = lang.lateTasksText;
        document.getElementById('avgTimeText').textContent = lang.avgTimeText;
        document.getElementById('detailsTitle').textContent = lang.detailsTitle;

        // Modal QR
        document.getElementById('qrScannerTitle').textContent = lang.qrScannerTitle;
        document.getElementById('qrGeneratorTitle').textContent = lang.qrGeneratorTitle;
        document.getElementById('addFromQRTitle').textContent = lang.addFromQRTitle;
        document.getElementById('uploadQRImageBtn').innerHTML = lang.uploadQRImageBtn;
        if (document.getElementById('pasteLinkBtn'))
            document.getElementById('pasteLinkBtn').innerHTML = lang.pasteLinkBtn;
        document.getElementById('downloadQRBtn').innerHTML = lang.downloadQRBtn;
        document.getElementById('copyQRLinkBtn').innerHTML = lang.copyQRLinkBtn;

        // Re-render chart if modal is open to update labels
        if (timeReportsModal.classList.contains('active')) {
            generateTimeReports();
        }

        const qrConfirmMsg = document.querySelector('#addFromQRModal .modal-body > p');
        if (qrConfirmMsg) {
            qrConfirmMsg.textContent = lang.qrConfirmMessage;
        }

        const qrConfirmBtn = document.querySelector('#addFromQRModal button[type="submit"]');
        if (qrConfirmBtn) {
            qrConfirmBtn.innerHTML = `<i class="fas fa-check"></i> ${lang.qrConfirmAddBtn}`;
        }

        // QR Day of week labels
        const qrDayOfWeekSelect = document.getElementById('qrNoteDayOfWeek');
        if (qrDayOfWeekSelect) {
            qrDayOfWeekSelect.querySelector('option[value="0"]').textContent = lang.sunday;
            qrDayOfWeekSelect.querySelector('option[value="1"]').textContent = lang.monday;
            qrDayOfWeekSelect.querySelector('option[value="2"]').textContent = lang.tuesday;
            qrDayOfWeekSelect.querySelector('option[value="3"]').textContent = lang.wednesday;
            qrDayOfWeekSelect.querySelector('option[value="4"]').textContent = lang.thursday;
            qrDayOfWeekSelect.querySelector('option[value="5"]').textContent = lang.friday;
            qrDayOfWeekSelect.querySelector('option[value="6"]').textContent = lang.saturday;
        }

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

        const qrOtherOptionsText = document.getElementById('qrOtherOptionsText');
        if (qrOtherOptionsText) {
            qrOtherOptionsText.textContent = lang.qrOtherOptions;
        }
    }

    if (pasteLinkBtn) pasteLinkBtn.addEventListener("click", handlePasteLink);

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
                        const notesUsingThisTag = await notesCollection.where('tag', '==', tagIdToDelete).get();
                        const batch = db.batch();
                        notesUsingThisTag.forEach(doc => {
                            batch.update(doc.ref, { tag: null });
                        });
                        await batch.commit();

                        await tagsCollection.doc(tagIdToDelete).delete();
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

    async function handleAddOrUpdateTag() {
        const tagNameVi = newTagNameInput.value.trim();
        const tagNameEn = newTagNameEnInput.value.trim();
        const tagIcon = newTagIconInput.value.trim();
        const tagColor = newTagColorInput.value;

        if (!tagNameVi) {
            showToast('toastTagNameRequired', 'warning');
            return;
        }

        const isDuplicate = tags.some(tag => {
            const existingNameVi = typeof tag.name === 'object' ? tag.name.vi : tag.name;
            return existingNameVi.toLowerCase() === tagNameVi.toLowerCase() && tag.id !== editingTagId;
        });

        if (isDuplicate) {
            showToast('toastTagExists', 'warning');
            return;
        }

        const tagData = {
            name: {
                vi: tagNameVi,
                en: tagNameEn || tagNameVi
            },
            icon: tagIcon || '',
            color: tagColor || '#e0e0e0'
        };

        try {
            if (editingTagId) {
                await tagsCollection.doc(editingTagId).update(tagData);
                showToast('toastTagUpdated', 'success');
            } else {
                await tagsCollection.add(tagData);
                showToast('toastTagAdded', 'success');
            }
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

    // Áp dụng màu nền và màu chữ tương phản cho thẻ hiển thị trong note card
    function renderNotes(notesToRender = notes) {
        notesContainer.innerHTML = "";

        if (tags.length === 0) {
            console.log("Tags not loaded yet, waiting...");
            return; // Thoát và đợi tags snapshot trigger lại renderNotes
        }

        const sortedNotes = sortNotesByTime([...notesToRender]);

        sortedNotes.forEach((note) => {
            const noteTagObject = tags.find(t => t.id === note.tag);
            const tagName = noteTagObject ? getTagName(noteTagObject) : translations[currentLanguage].undefinedTag;
            const tagIcon = noteTagObject ? noteTagObject.icon : '';
            const tagColor = noteTagObject ? (noteTagObject.color || '#e0e0e0') : '#e0e0e0';
            const tagTextColor = getContrastYIQ(tagColor); // Tính màu chữ tương phản

            const noteElement = document.createElement("div");
            noteElement.className = `note-card fade-in ${note.completed ? 'completed' : ''}`;
            noteElement.innerHTML = `
<div class="note-content" data-id="${note.id}">
    <div class="note-header">
        <h3 class="note-title">${note.title}</h3>
        <div class="note-actions">
            <button class="qr-btn" data-id="${note.id}" title="Tạo mã QR">
                <i class="fas fa-qrcode"></i>
            </button>
            <button class="edit-btn" data-id="${note.id}">
                <i class="fas fa-edit"></i>
            </button>
            <button class="delete-btn" data-id="${note.id}">
                <i class="fas fa-trash"></i>
            </button>
        </div>
    </div>
    <p class="note-text">${note.content}</p>
    <div class="note-footer">
        <span class="note-tag" style="background-color: ${tagColor}; color: ${tagTextColor}; --tag-custom-color: ${tagColor};">
            ${tagIcon ? `<i class="${tagIcon}"></i>` : ''} ${tagName}
        </span>
        ${!note.completed ? `<button class="complete-btn" data-id="${note.id}">${translations[currentLanguage].completeBtn || 'Hoàn thành'}</button>` : ''}
        <span class="note-date ${isNoteOverdue(note) ? 'overdue' : ''}">${note.time || '--:--'}</span>
    </div>
</div>`;
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

        document.querySelectorAll(".complete-btn").forEach((button) => {
            button.addEventListener("click", async function (event) {
                event.stopPropagation();
                const noteId = this.getAttribute("data-id");
                const note = notes.find(n => n.id === noteId);

                if (note) {
                    const now = new Date();
                    const endTime = now.toISOString();

                    // Tính actual duration (nếu có startTime)
                    let actualDuration = null;
                    let isOnTime = null;

                    if (note.startTime) {
                        const start = new Date(note.startTime);
                        const end = new Date(endTime);
                        actualDuration = Math.round((end - start) / 60000); // Convert to minutes
                    } else {
                        // Nếu không có startTime, giả sử bắt đầu từ thời gian trong note
                        const [hours, minutes] = note.time.split(':');
                        const start = new Date();
                        start.setHours(parseInt(hours), parseInt(minutes), 0, 0);
                        actualDuration = Math.round((now - start) / 60000);
                    }

                    // So sánh với expected duration
                    if (note.expectedDuration && actualDuration) {
                        isOnTime = actualDuration <= note.expectedDuration;
                    }

                    try {
                        await notesCollection.doc(noteId).update({
                            completed: true,
                            endTime: endTime,
                            actualDuration: actualDuration,
                            isOnTime: isOnTime
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

    // getTagIcon và getTagName giữ nguyên

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

        // Lấy ngôn ngữ hiện tại
        const lang = translations[currentLanguage];

        if (note) {
            // Chế độ Sửa
            modalTitle.textContent = lang.editNoteModalTitle; // Sử dụng biến lang
            submitNoteBtn.textContent = lang.updateNoteBtn;   // Sử dụng biến lang

            document.getElementById("noteTitle").value = note.title;
            document.getElementById("noteContent").value = note.content;
            document.getElementById("noteTime").value = note.time;
            noteDayOfWeekSelect.value = note.dayOfWeek || new Date().getDay();
            document.getElementById("expectedDuration").value = note.expectedDuration || 30; // Load thời gian dự kiến

            renderTagOptions(note.tag);
            editingNoteKey = note.id;
        } else {
            // Chế độ Thêm mới
            modalTitle.textContent = lang.newNoteModalTitle;
            submitNoteBtn.textContent = lang.saveNoteBtn;

            setDefaultTime();
            noteDayOfWeekSelect.value = new Date().getDay();
            renderTagOptions();
            editingNoteKey = null;
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
            console.log("Scanner already running, stopping first...");
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
                            console.warn("Warning stopping scanner:", err);
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
        console.log(`QR Code detected: ${decodedText}`);

        // 1. Dừng scanner ngay lập tức nếu đang chạy
        // Sử dụng setTimeout để tách luồng, tránh xung đột UI
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
                    console.error("Error scanning file:", err);
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
                    console.error("Error stopping camera:", err);
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
                console.log('QRCode library already loaded');
                resolve();
                return;
            }

            // Đợi library load (có thể đang trong quá trình load)
            let attempts = 0;
            const maxAttempts = 40; // 20 giây

            const checkLibrary = setInterval(() => {
                attempts++;
                console.log(`Checking QRCode library... attempt ${attempts}`);

                if (typeof QRCode !== 'undefined') {
                    console.log('QRCode library loaded successfully');
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
            expectedDuration: note.expectedDuration || 30
        };

        const qrDataString = JSON.stringify(qrData);

        // Lấy container thay vì canvas cũ
        const container = document.querySelector('.qr-code-display');
        container.innerHTML = ''; // Xóa nội dung cũ

        try {
            // Kiểm tra kjua đã load chưa
            if (typeof kjua === 'undefined') {
                console.error('kjua library not loaded');
                showToast('Lỗi thư viện QR. Vui lòng tải lại trang.', 'error');
                return;
            }

            const qrCode = kjua({
                text: qrDataString,
                size: 200,
                fill: '#000000',
                back: '#FFFFFF', // Nền trắng
                rounded: 0,
                quiet: 1, // Vùng đệm trắng xung quanh
                mode: 'plain',
                render: 'canvas' // Render ra thẻ canvas để dễ download
            });

            // Gán ID để hàm download tìm thấy
            qrCode.id = 'qrCodeCanvas';

            // Thêm vào DOM
            container.appendChild(qrCode);

            console.log('QR Code generated with kjua');
        } catch (error) {
            console.error('Error generating QR:', error);
            showToast('qrScanError', 'error');
        }
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
            expectedDuration: currentGeneratedNote.expectedDuration || 30
        };

        const qrDataString = JSON.stringify(qrData);

        // Copy to clipboard
        navigator.clipboard.writeText(qrDataString).then(() => {
            showToast('qrLinkCopied', 'success');
        }).catch(err => {
            console.error('Could not copy:', err);
        });
    }

    // Add from QR Functions
    function openAddFromQRModal(noteData) {
        addFromQRModal.classList.add("active");
        document.body.style.overflow = "hidden";

        // Populate form with scanned data
        document.getElementById("qrNoteTitleInput").value = noteData.title;
        document.getElementById("qrNoteContentInput").value = noteData.content;
        document.getElementById("qrNoteTimeInput").value = noteData.time || '';
        document.getElementById("qrNoteDayOfWeek").value = noteData.dayOfWeek || new Date().getDay();
        document.getElementById("qrExpectedDuration").value = noteData.expectedDuration || 30;

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
            title,
            content,
            tag: tagId,
            time: time,
            dayOfWeek: dayOfWeek,
            expectedDuration: expectedDuration,
            actualDuration: null,
            startTime: null,
            endTime: null,
            isOnTime: null,
            completed: false
        };

        try {
            await notesCollection.add(newNoteData);
            showToast('toastNoteSaved', 'success');
            closeAddFromQRModal();
        } catch (error) {
            console.error("Error saving note from QR: ", error);
            showToast('toastErrorSavingNote', 'error');
        }
    }

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
                notesCollection.doc(noteId).update({ completed: false })
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
        startOfWeek.setDate(now.getDate() - now.getDay()); // Chủ nhật
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
        const avgTime = totalTasks > 0
            ? Math.round(weeklyNotes.reduce((sum, n) => sum + (n.actualDuration || 0), 0) / totalTasks)
            : 0;

        // Update summary cards
        document.getElementById('totalTasksCount').textContent = totalTasks;
        document.getElementById('onTimeTasksCount').textContent = onTimeTasks;
        document.getElementById('lateTasksCount').textContent = lateTasks;

        // SỬA Ở ĐÂY: Dùng lang.timeUnit thay vì chữ "phút" cứng
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

            // SỬA Ở ĐÂY: Dùng lang.timeUnit
            const diffText = timeDiff > 0
                ? `${lang.savedTime}: ${timeDiff} ${lang.timeUnit}`
                : `${lang.overtime}: ${Math.abs(timeDiff)} ${lang.timeUnit}`;

            item.innerHTML = `
        <i class="fas ${note.isOnTime ? 'fa-check-circle' : 'fa-exclamation-circle'} status-icon"></i>
        <div class="note-info">
            <h5>${note.title}</h5>
            <p>${getDayName(note.dayOfWeek || 0)} - ${note.time}</p>
        </div>
        <div class="time-stats">
            <!-- SỬA Ở ĐÂY: Dùng lang.timeUnit -->
            <span>${lang.expectedTime}: ${note.expectedDuration || 0} ${lang.timeUnit}</span>
            <span>${lang.actualTime}: ${note.actualDuration || 0} ${lang.timeUnit}</span>
        </div>
        <div class="time-diff ${timeDiff > 0 ? 'positive' : 'negative'}">
            ${diffText}
        </div>
    `;

            timeReportsList.appendChild(item);
        });

        // Render chart (giữ nguyên logic cũ)
        renderTimeReportsChart(weeklyNotes);
    }


    function renderTimeReportsChart(weeklyNotes) {
        // Cần thêm Chart.js CDN vào HTML
        // <script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js"></script>

        const ctx = document.getElementById('timeReportsChart');
        if (!ctx) return;

        // Nhóm theo ngày
        const dayData = [0, 0, 0, 0, 0, 0, 0]; // 7 ngày
        const onTimeData = [0, 0, 0, 0, 0, 0, 0];
        const lateData = [0, 0, 0, 0, 0, 0, 0];

        weeklyNotes.forEach(note => {
            const day = note.dayOfWeek || 0;
            dayData[day]++;
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

        // Destroy previous chart if exists
        if (window.timeReportsChartInstance) {
            window.timeReportsChartInstance.destroy();
        }

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
                        borderWidth: 1
                    },
                    {
                        label: lang.lateTasksText,
                        data: lateData,
                        backgroundColor: 'rgba(239, 68, 68, 0.8)',
                        borderColor: 'rgb(239, 68, 68)',
                        borderWidth: 1
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    legend: {
                        position: 'top',
                    },
                    title: {
                        display: true,
                        text: lang.timeReportsModalTitle
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            stepSize: 1
                        }
                    }
                }
            }
        });
    }

    // Cập nhật handleNoteSubmit để lưu expected duration
    async function handleNoteSubmit(e) {
        e.preventDefault();

        const title = document.getElementById("noteTitle").value;
        const content = document.getElementById("noteContent").value;
        const time = document.getElementById("noteTime").value;
        const dayOfWeek = parseInt(noteDayOfWeekSelect.value);
        const expectedDuration = parseInt(expectedDurationInput.value) || 30; // Mặc định 30 phút
        const selectedTagRadio = document.querySelector('input[name="noteTag"]:checked');

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
            title,
            content,
            tag: tagId,
            time: time,
            dayOfWeek: dayOfWeek,
            expectedDuration: expectedDuration, // MỚI
            actualDuration: null, // Sẽ được cập nhật khi complete
            startTime: null,
            endTime: null,
            isOnTime: null,
            completed: false
        };

        const updateNoteData = {
            title,
            content,
            tag: tagId,
            time: time,
            dayOfWeek: dayOfWeek,
            expectedDuration: expectedDuration, // MỚI
        };

        try {
            if (editingNoteKey) {
                await notesCollection.doc(editingNoteKey).update(updateNoteData);
                showToast('toastNoteUpdated', 'success');
            } else {
                await notesCollection.add(newNoteData);
                showToast('toastNoteSaved', 'success');
            }
        } catch (error) {
            console.error("Error saving note: ", error);
            showToast('toastErrorSavingNote', 'error');
        }

        closeAddNoteModal();
    }


    async function confirmDeleteNote() {
        if (noteToDeleteId) {
            try {
                await notesCollection.doc(noteToDeleteId).delete();
                showToast('toastNoteDeleted', 'error');
            } catch (error) {
                console.error("Error deleting note: ", error);
                showToast('toastErrorDeletingNote', 'error');
            }
            closeConfirmModal();
        }
    }

        async function exportToExcel() {
        const lang = translations[currentLanguage];

        if (notes.length === 0) {
            showToast('toastNoNotesToExport', 'info');
            return;
        }

        const workbook = new ExcelJS.Workbook();
        workbook.creator = 'Notes App';
        workbook.created = new Date();

        const dayColors = ['EF4444', 'F59E0B', 'EAB308', '10B981', '3B82F6', '6366F1', '8B5CF6'];
        const dayBgColors = ['FFFECACA', 'FFFED7AA', 'FFFEF3C7', 'FFD1FAE5', 'FFDBEAFE', 'FFE0E7FF', 'FFEDE9FE'];

        // ==========================================
        // 1. SHEET TỔNG HỢP ("TẤT CẢ")
        // ==========================================
        const wsAll = workbook.addWorksheet(lang.excelSheetAll, {
            views: [{ state: 'frozen', xSplit: 0, ySplit: 1 }]
        });
        wsAll.properties.tabColor = { argb: 'FF4F46E5' };

        // Định nghĩa cột (Thêm 3 cột mới cuối cùng)
        wsAll.columns = [
            { header: lang.excelColDay, key: 'day', width: 15 },
            { header: lang.excelColTitle, key: 'title', width: 30 },
            { header: lang.excelColContent, key: 'content', width: 40 },
            { header: lang.excelColTime, key: 'time', width: 12 },
            { header: lang.excelColTag, key: 'tag', width: 15 },
            { header: lang.excelColStatus, key: 'status', width: 18 },
            { header: lang.excelColExpected, key: 'expected', width: 15 },
            { header: lang.excelColActual, key: 'actual', width: 15 },
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
            
            // Xử lý dữ liệu mới
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
                time: note.time,
                tag: tagName,
                status: status,
                expected: expected,
                actual: actual,
                performance: performance
            });

            const rowIndex = index + 2;
            const rowObj = wsAll.getRow(rowIndex);
            rowObj.height = 25;
            const bgColor = rowIndex % 2 === 0 ? 'FFF8F9FA' : 'FFFFFFFF';
            const dayOfWeek = note.dayOfWeek || 0;

            // Style từng cell
            rowObj.eachCell({ includeEmpty: false }, (cell, colNumber) => {
                cell.font = { name: 'Calibri', size: 11 };
                cell.border = { top: { style: 'thin', color: { argb: 'FFE5E7EB' } }, bottom: { style: 'thin', color: { argb: 'FFE5E7EB' } } };
                cell.alignment = { vertical: 'middle', horizontal: 'left' };
                cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: bgColor } };

                // Cột 1: Ngày (Link & Màu nền)
                if (colNumber === 1) {
                    cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: dayBgColors[dayOfWeek] } };
                    cell.font = { bold: true, underline: 'single', color: { argb: 'FF1F2937' } };
                    cell.alignment = { horizontal: 'center', vertical: 'middle' };
                    const targetSheetName = getDayName(dayOfWeek);
                    cell.value = { text: dayName, hyperlink: `#'${targetSheetName}'!A1`, tooltip: `Go to ${targetSheetName}` };
                }
                // Cột 4, 7, 8: Các cột số liệu canh giữa
                else if ([4, 7, 8].includes(colNumber)) {
                    cell.alignment = { horizontal: 'center', vertical: 'middle' };
                }
                // Cột 6: Trạng thái (Màu chữ)
                else if (colNumber === 6) {
                    cell.font = { bold: true, color: { argb: note.completed ? 'FF059669' : 'FFDC2626' } };
                    cell.alignment = { horizontal: 'center', vertical: 'middle' };
                }
                // Cột 9: Hiệu suất (Tô màu nền)
                else if (colNumber === 9 && performance) {
                    cell.fill = { 
                        type: 'pattern', 
                        pattern: 'solid', 
                        fgColor: { argb: note.isOnTime ? 'FFD1FAE5' : 'FFFEE2E2' } // Xanh nhẹ hoặc Đỏ nhẹ
                    };
                    cell.font = { 
                        bold: true, 
                        color: { argb: note.isOnTime ? 'FF047857' : 'FFB91C1C' } // Chữ đậm màu
                    };
                    cell.alignment = { horizontal: 'center', vertical: 'middle' };
                }
            });
        });

        wsAll.autoFilter = { from: { row: 1, column: 1 }, to: { row: 1, column: 9 } };

        // ==========================================
        // 2. SHEET CHI TIẾT TỪNG NGÀY
        // ==========================================
        for (let i = 0; i < 7; i++) {
            const dayNotes = notes.filter(note => note.dayOfWeek === i);

            if (dayNotes.length > 0) {
                const dayName = getDayName(i);
                const ws = workbook.addWorksheet(dayName, { views: [{ state: 'frozen', xSplit: 0, ySplit: 1 }] });
                ws.properties.tabColor = { argb: `FF${dayColors[i]}` };

                // Cột cho sheet ngày (Bỏ cột 'Ngày', giữ lại các cột khác)
                ws.columns = [
                    { header: lang.excelColTitle, key: 'title', width: 30 },
                    { header: lang.excelColContent, key: 'content', width: 40 },
                    { header: lang.excelColTime, key: 'time', width: 12 },
                    { header: lang.excelColTag, key: 'tag', width: 15 },
                    { header: lang.excelColStatus, key: 'status', width: 18 },
                    { header: lang.excelColExpected, key: 'expected', width: 15 },
                    { header: lang.excelColActual, key: 'actual', width: 15 },
                    { header: lang.excelColPerformance, key: 'performance', width: 15 }
                ];

                // Header Style
                ws.getRow(1).height = 30;
                ws.getRow(1).eachCell((cell) => {
                    cell.font = { name: 'Calibri', bold: true, color: { argb: 'FFFFFFFF' }, size: 12 };
                    cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: `FF${dayColors[i]}` } };
                    cell.alignment = { horizontal: 'center', vertical: 'middle' };
                });

                // Data
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
                        time: note.time,
                        tag: tagName,
                        status: status,
                        expected: expected,
                        actual: actual,
                        performance: performance
                    });

                    const rowIndex = index + 2;
                    const rowObj = ws.getRow(rowIndex);
                    rowObj.height = 25;
                    const bgColor = rowIndex % 2 === 0 ? dayBgColors[i] : 'FFFFFFFF';

                    rowObj.eachCell({ includeEmpty: false }, (cell, colNumber) => {
                        cell.font = { name: 'Calibri', size: 11 };
                        cell.border = { top: { style: 'thin', color: { argb: 'FFE5E7EB' } }, bottom: { style: 'thin', color: { argb: 'FFE5E7EB' } } };
                        cell.alignment = { vertical: 'middle', horizontal: 'left' };
                        cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: bgColor } };

                        // Cột 3, 6, 7: Số liệu canh giữa
                        if ([3, 6, 7].includes(colNumber)) {
                            cell.alignment = { horizontal: 'center', vertical: 'middle' };
                        }
                        // Cột 5: Trạng thái
                        else if (colNumber === 5) {
                            cell.font = { bold: true, color: { argb: note.completed ? 'FF059669' : 'FFDC2626' } };
                            cell.alignment = { horizontal: 'center', vertical: 'middle' };
                        }
                        // Cột 8: Hiệu suất
                        else if (colNumber === 8 && performance) {
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
                    });
                });

                // Link quay về trang chủ tại A1
                const backLinkCell = ws.getCell('A1');
                const originalValue = backLinkCell.value;
                backLinkCell.value = {
                    text: originalValue,
                    hyperlink: `#'${lang.excelSheetAll}'!A1`,
                    tooltip: `Back to ${lang.excelSheetAll}`
                };
                
                ws.autoFilter = { from: { row: 1, column: 1 }, to: { row: 1, column: 8 } };
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

        showToast('toastExcelExported', 'success');
    }

    function updateDateTime() {
        const now = new Date();

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

    // Notification Logic
    function checkAndScheduleNotifications(notes) {
        // Xóa các interval cũ để tránh trùng lặp
        if (notificationInterval) {
            clearInterval(notificationInterval);
        }

        const notificationTimeBefore = parseInt(localStorage.getItem('notificationTimeBefore') || '5'); // Lấy thời gian thông báo trước từ cài đặt (mặc định 5 phút)
        if (notificationTimeBefore === 0) {
            console.log("Thông báo đã bị tắt.");
            notifiedNotes.clear(); // Xóa các ghi chú đã thông báo nếu tắt thông báo
            return; // Nếu cài đặt là 0 phút, không cần kiểm tra thông báo
        }

        notificationInterval = setInterval(() => {
            const now = new Date();
            notes.forEach(note => {
                // Kiểm tra nếu ghi chú có noteTime, chưa hoàn thành và chưa được thông báo
                if (note.time && !note.completed && !notifiedNotes.has(note.id)) {
                    // Giả sử note.time là định dạng "HH:MM".
                    // Nếu bạn lưu thêm thông tin ngày trong note.time (ví dụ: "YYYY-MM-DDTHH:MM"),
                    // bạn cần điều chỉnh cách parse string này thành Date object.
                    // Ví dụ: note.time có thể là "14:50" (chỉ giờ)
                    // Hoặc bạn có thể lưu riêng noteDate và noteTime trong Firebase
                    const [noteHour, noteMinute] = note.time.split(':').map(Number);

                    // Lấy ngày hiện tại
                    const today = new Date();
                    const noteDateTime = new Date(
                        today.getFullYear(),
                        today.getMonth(),
                        today.getDate(),
                        noteHour,
                        noteMinute,
                        0,
                        0
                    );

                    const timeDifference = noteDateTime.getTime() - now.getTime(); // Thời gian còn lại đến ghi chú (ms)
                    const minutesDifference = timeDifference / (1000 * 60); // Thời gian còn lại (phút)

                    // Kiểm tra nếu thời gian còn lại nằm trong khoảng thông báo và chưa quá thời gian ghi chú
                    // Đảm bảo thông báo chỉ xuất hiện 1 lần khi đạt ngưỡng notificationTimeBefore
                    if (minutesDifference <= notificationTimeBefore && minutesDifference > 0) {
                        const message = translations[currentLanguage].notificationReminder.replace('{title}', note.title);
                        showToast(message, 'info', 10000); // Hiển thị thông báo trong 10 giây
                        notifiedNotes.add(note.id); // Đánh dấu ghi chú này đã được thông báo
                    }
                }
            });
        }, 30000); // Kiểm tra mỗi 30 giây
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
        const hasUncompleted = notes.some(note => !note.completed);
        if (!hasUncompleted) {
            showToast('toastNoNotesToComplete', 'info');
            return;
        }

        const batch = db.batch();
        notes.forEach(note => {
            if (!note.completed) {
                const noteRef = notesCollection.doc(note.id);
                batch.update(noteRef, { completed: true });
            }
        });

        try {
            if (notes.some(note => !note.completed)) {
                await batch.commit();
                showToast('toastAllNotesCompleted', 'success');
            }
        } catch (error) {
            console.error("Error completing all notes: ", error);
            showToast('toastErrorCompletingAllNotes', 'error');
        }
    }

    async function resetAllNotes() {
        const hasCompleted = notes.some(note => note.completed);
        if (!hasCompleted) {
            showToast('toastNoNotesToReset', 'info');
            return;
        }

        const batch = db.batch();
        notes.forEach(note => {
            if (note.completed) {
                const noteRef = notesCollection.doc(note.id);
                batch.update(noteRef, { completed: false });
            }
        });

        try {
            if (notes.some(note => note.completed)) {
                await batch.commit();
                showToast('toastAllNotesReset', 'success');
            }
        } catch (error) {
            console.error("Error resetting all notes: ", error);
            showToast('toastErrorResettingAllNotes', 'error');
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

    function saveSettings() {
        const selectedColumns = noteColumnsSelect.value;
        const selectedBackgroundColor = backgroundColorInput.value;
        const selectedLanguage = languageSelect.value;
        const selectedAppName = appNameInput.value.trim();

        // Lưu cài đặt
        localStorage.setItem('noteColumns', selectedColumns);
        localStorage.setItem('backgroundColor', selectedBackgroundColor);
        localStorage.setItem('language', selectedLanguage);
        localStorage.setItem('notificationTimeBefore', notificationTimeBeforeSelect.value);

        // Lưu tên ứng dụng
        if (selectedAppName) {
            localStorage.setItem('appName', selectedAppName);
        } else {
            localStorage.removeItem('appName');
        }

        // Kiểm tra nếu ngôn ngữ thay đổi
        const languageChanged = currentLanguage !== selectedLanguage;

        // Cập nhật biến ngôn ngữ toàn cục
        currentLanguage = selectedLanguage;

        // Áp dụng bản dịch
        applyTranslations();

        // MỚI: Cập nhật datetime khi đổi ngôn ngữ
        updateDateTime();

        // Nếu ngôn ngữ thay đổi, reload lại các filter options và notes
        if (languageChanged) {
            renderFilterOptions();
            renderTagOptions();
            renderCurrentTagsList();
            renderNotes();
        }

        showToast('toastSettingsSaved', 'success');
        closeSettingsModal();

        // Áp dụng lại cài đặt
        document.documentElement.style.setProperty('--notes-grid-columns', selectedColumns);
        document.documentElement.style.setProperty('--body-bg-color', selectedBackgroundColor);
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
});

//'Shift + Alt + F - Format toàn bộ file'