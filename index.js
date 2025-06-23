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

    // NEW: Lấy container cho Toast Notifications
    const toastContainer = document.getElementById("toastContainer");

    // MỚI: Các phần tử cho Modal Cài đặt
    const settingsBtn = document.getElementById("settingsBtn");
    const settingsModal = document.getElementById("settingsModal");
    const closeSettingsModalBtn = document.getElementById("closeSettingsModalBtn");
    const noteColumnsSelect = document.getElementById("noteColumns");
    const backgroundColorInput = document.getElementById("backgroundColor");
    const languageSelect = document.getElementById("languageSelect");
    const saveSettingsBtn = document.getElementById("saveSettingsBtn");

    const tagManagementBtn = document.getElementById("tagManagementBtn");
    const tagManagementModal = document.getElementById("tagManagementModal");
    const closeTagModalBtn = document.getElementById("closeTagModalBtn");
    const tagInput = document.getElementById("tagInput");
    const addTagBtn = document.getElementById("addTagBtn");
    const tagList = document.getElementById("tagList");
    const noteTagSelect = document.getElementById("noteTag");

     const notificationTimeBeforeSelect = document.getElementById("notificationTimeBefore");

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
        renderNotes();
        updateEmptyState();
        filterNotes();
        startOverdueCheckInterval();
    }, (error) => {
        console.error("Error fetching notes from Firestore: ", error);
        showToast('Lỗi khi tải ghi chú.', 'error');
    });

    tagsCollection.orderBy('name').onSnapshot((snapshot) => {
        tags = [];
        snapshot.forEach((doc) => {
            const tag = doc.data();
            tag.id = doc.id;
            tags.push(tag);
        });
        renderTagOptions();
        renderFilterOptions();
        renderCurrentTagsList();
    }, (error) => {
        console.error("Error fetching tags from Firestore: ", error);
        showToast('Lỗi khi tải thẻ.', 'error');
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

    // === Tag Management Functions ===

    const translations = {
    'vi': {
        'appName': 'Châu Chí Kil',
        'appSlogan': 'Lưu trữ suy nghĩ và ý tưởng của bạn một cách phong cách',
        'searchInputPlaceholder': 'Tìm kiếm ghi chú...',
        'allNotesOption': 'Tất cả ghi chú',
        'completedNotesOption': 'Đã hoàn thành',
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
        'updateNoteBtn': 'Cập nhật ghi chú',
        'viewNoteModalTitlePlaceholder': '', // Tiêu đề được thiết lập động
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
            notificationTimeBeforeLabel: "Thông báo trước (phút):", // Nếu bạn dùng khóa này để dịch label
            notificationTimeBefore: "Thông báo trước (phút):", // Nếu bạn dùng khóa này để dịch select option
            notificationReminder: "Nhắc nhở: Đến giờ '{title}'"
    },
    'en': {
        'appName': 'Chau Chi Kil',
        'appSlogan': 'Store your thoughts and ideas with style',
        'searchInputPlaceholder': 'Search notes...',
        'allNotesOption': 'All notes',
        'completedNotesOption': 'Completed',
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
        'updateNoteBtn': 'Update Note',
        'viewNoteModalTitlePlaceholder': '', // Title is dynamic
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
        'notificationTimeBefore': 'Notify before (minutes):',
            notificationReminder: "Reminder: Time for '{title}'",
            notificationTimeBeforeLabel: "Notify before (minutes):",
    }
};
let currentLanguage = localStorage.getItem('language') || 'vi'; // Mặc định là Tiếng Việt

function applyTranslations() {
    const lang = translations[currentLanguage];

    // Header
    document.querySelector('.header h1').textContent = lang.appName;
    document.querySelector('.header p').textContent = lang.appSlogan;
    document.getElementById('searchInput').placeholder = lang.searchInputPlaceholder;
    document.querySelector('#filterSelect option[value="all"]').textContent = lang.allNotesOption;
    // Đảm bảo tùy chọn 'completed' tồn tại trước khi cố gắng đặt textContent
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
    // Phần này được thiết lập động trong openAddNoteModal, nhưng chúng ta đặt mặc định ở đây cho các nhãn
    document.querySelector('label[for="noteTitle"]').textContent = lang.noteTitleLabel;
    document.querySelector('label[for="noteContent"]').textContent = lang.noteContentLabel;
    document.querySelector('label[for="noteTime"]').textContent = lang.noteTimeLabel;
    // Giả sử nhãn thứ 4 là cho thẻ, điều chỉnh bộ chọn nếu cần
    const noteTagLabelElement = document.querySelector('.form-group label:has(#noteTagsContainer)');
    if (noteTagLabelElement) {
        noteTagLabelElement.textContent = lang.noteTagLabel;
    }
    document.getElementById('manageTagsBtn').innerHTML = lang.manageTagsBtn;


    // Modal Xem Ghi chú
    document.querySelector('#viewNoteTag').previousElementSibling.textContent = lang.viewNoteTagLabel;
    document.querySelector('#viewNoteStatus').previousElementSibling.textContent = lang.viewNoteStatusLabel;
    document.querySelector('#viewNoteTime').previousElementSibling.textContent = lang.viewNoteTimeLabel;
    document.querySelector('#viewNoteContent').previousElementSibling.textContent = lang.viewNoteContentLabel;

    // Modal Xác nhận
    document.querySelector('.confirmation-text').textContent = lang.confirmDeleteText;
    document.getElementById('cancelDeleteBtn').textContent = lang.cancelBtn;
    document.getElementById('confirmDeleteBtn').textContent = lang.deleteBtnConfirm;

    // Modal Quản lý Thẻ
    document.querySelector('#manageTagsModal .modal-header .modal-title').textContent = lang.manageTagsModalTitle;
    document.querySelector('label[for="newTagName"]').textContent = lang.newTagNameLabel;
    document.querySelector('label[for="newTagIcon"]').textContent = lang.newTagIconLabel;
    document.querySelector('label[for="newTagColor"]').textContent = lang.newTagColorLabel;
    document.querySelector('#manageTagsModal h4').textContent = lang.currentTagsTitle;
    // Xử lý đặc biệt cho thông báo "không có thẻ"
    if (currentTagsList.textContent.includes('Chưa có thẻ nào.') || currentTagsList.textContent.includes('No tags yet.')) {
         currentTagsList.innerHTML = `<p>${lang.noTagsMessage}</p>`;
    }


    // Modal Cài đặt
    document.querySelector('#settingsModal .modal-header .modal-title').textContent = lang.settingsModalTitle;
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

    // Cập nhật các văn bản nút động phụ thuộc vào trạng thái chỉnh sửa
    document.getElementById('modalTitle').textContent = editingNoteKey ? lang.editNoteModalTitle : lang.newNoteModalTitle;
    document.getElementById('submitNoteBtn').textContent = editingNoteKey ? lang.updateNoteBtn : lang.saveNoteBtn;
    document.getElementById('addOrUpdateTagBtn').textContent = editingTagId ? lang.updateTagBtn : lang.addTagBtn;
}

    // Điều chỉnh để chỉ đặt CSS variable, CSS sẽ lo phần màu nền/màu chữ
    function renderTagOptions(selectedTagId = null) {
        noteTagsContainer.innerHTML = '';
        tags.forEach(tag => {
            const label = document.createElement('label');
            label.className = 'tag-option';
            // Đặt CSS custom property (--tag-custom-color)
            label.innerHTML = `
                <input
                    type="radio"
                    name="noteTag"
                    value="${tag.id}"
                    class="tag-radio"
                    ${selectedTagId === tag.id ? 'checked' : ''}
                />
                <span class="tag-label" style="--tag-custom-color: ${tag.color || '#e0e0e0'};">
                    ${tag.icon ? `<i class="${tag.icon}"></i>` : ''} ${tag.name}
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
        filterSelect.innerHTML = '<option value="all">Tất cả ghi chú</option>';
        tags.forEach(tag => {
            const option = document.createElement('option');
            option.value = tag.id;
            option.textContent = tag.name;
            filterSelect.appendChild(option);
        });
        filterSelect.innerHTML += '<option value="completed">Đã hoàn thành</option>';
        filterSelect.value = currentFilterValue;
    }

    // Điều chỉnh để đặt màu nền và màu chữ trực tiếp cho tag-item
    function renderCurrentTagsList() {
        currentTagsList.innerHTML = '';
        if (tags.length === 0) {
            currentTagsList.innerHTML = '<p>Chưa có thẻ nào. Hãy thêm một thẻ mới!</p>';
            return;
        }

        tags.forEach(tag => {
            const tagItem = document.createElement('div');
            tagItem.className = 'tag-item';
            const tagColor = tag.color || '#e0e0e0';
            const tagTextColor = getContrastYIQ(tagColor);
            tagItem.innerHTML = `
                <span class="tag-label" style="background-color: ${tagColor}; color: ${tagTextColor}; --tag-custom-color: ${tagColor};">
                    ${tag.icon ? `<i class="${tag.icon}"></i>` : ''} ${tag.name}
                </span>
                <div class="tag-actions">
                    <button class="edit-tag-btn" data-id="${tag.id}"><i class="fas fa-edit"></i></button>
                    <button class="delete-tag-btn" data-id="${tag.id}"><i class="fas fa-trash"></i></button>
                </div>
            `;
            currentTagsList.appendChild(tagItem);
        });

        document.querySelectorAll('.edit-tag-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                editingTagId = this.getAttribute('data-id');
                const tagToEdit = tags.find(t => t.id === editingTagId);
                if (tagToEdit) {
                    newTagNameInput.value = tagToEdit.name;
                    newTagIconInput.value = tagToEdit.icon || '';
                    newTagColorInput.value = tagToEdit.color || '#4f46e5';
                    addOrUpdateTagBtn.textContent = 'Cập nhật Thẻ';
                    showToast(`Đang chỉnh sửa thẻ: ${tagToEdit.name}`, 'info');
                }
            });
        });

        document.querySelectorAll('.delete-tag-btn').forEach(btn => {
            btn.addEventListener('click', async function() {
                const tagIdToDelete = this.getAttribute('data-id');
                if (confirm('Bạn có chắc chắn muốn xóa thẻ này? Những ghi chú sử dụng thẻ này sẽ mất liên kết thẻ.')) {
                    try {
                        const notesUsingThisTag = await notesCollection.where('tag', '==', tagIdToDelete).get();
                        const batch = db.batch();
                        notesUsingThisTag.forEach(doc => {
                            batch.update(doc.ref, { tag: null }); // Hoặc một ID thẻ mặc định khác
                        });
                        await batch.commit();

                        await tagsCollection.doc(tagIdToDelete).delete();
                        showToast('Thẻ đã được xóa và ghi chú liên quan đã được cập nhật!', 'success');
                    } catch (error) {
                        console.error("Error deleting tag: ", error);
                        showToast('Lỗi khi xóa thẻ.', 'error');
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

        var r = parseInt(hexcolor.substr(0,2),16);
        var g = parseInt(hexcolor.substr(2,2),16);
        var b = parseInt(hexcolor.substr(4,2),16);
        var yiq = ((r*299)+(g*587)+(b*114))/1000;
        return (yiq >= 128) ? '#000000' : '#ffffff';
    }


    async function handleAddOrUpdateTag() {
        const tagName = newTagNameInput.value.trim();
        const tagIcon = newTagIconInput.value.trim();
        const tagColor = newTagColorInput.value;

        if (!tagName) {
            showToast('Tên thẻ không được để trống!', 'warning');
            return;
        }

        const isDuplicate = tags.some(tag => tag.name.toLowerCase() === tagName.toLowerCase() && tag.id !== editingTagId);
        if (isDuplicate) {
            showToast('Tên thẻ đã tồn tại!', 'warning');
            return;
        }

        const tagData = {
            name: tagName,
            icon: tagIcon || '',
            color: tagColor || '#e0e0e0' // Lưu màu, mặc định xám nhạt
        };

        try {
            if (editingTagId) {
                await tagsCollection.doc(editingTagId).update(tagData);
                showToast('Thẻ đã được cập nhật!', 'success');
            } else {
                await tagsCollection.add(tagData);
                showToast('Thẻ đã được thêm!', 'success');
            }
            newTagNameInput.value = '';
            newTagIconInput.value = '';
            newTagColorInput.value = '#4f46e5';
            addOrUpdateTagBtn.textContent = 'Thêm Thẻ';
            editingTagId = null;
        } catch (error) {
            console.error("Error adding/updating tag: ", error);
            showToast('Lỗi khi thêm/cập nhật thẻ.', 'error');
        }
    }

    function openManageTagsModal() {
        manageTagsModal.classList.add("active");
        document.body.style.overflow = "hidden";
        newTagNameInput.value = '';
        newTagIconInput.value = '';
        newTagColorInput.value = '#4f46e5';
        addOrUpdateTagBtn.textContent = 'Thêm Thẻ';
        editingTagId = null;
        renderCurrentTagsList();
    }

    function closeManageTagsModal() {
        manageTagsModal.classList.remove("active");
        document.body.style.overflow = "auto";
        newTagNameInput.value = '';
        newTagIconInput.value = '';
        newTagColorInput.value = '#4f46e5';
        addOrUpdateTagBtn.textContent = 'Thêm Thẻ';
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

    // Áp dụng màu nền và màu chữ tương phản cho thẻ hiển thị trong note card
    function renderNotes(notesToRender = notes) {
        notesContainer.innerHTML = "";

        const sortedNotes = sortNotesByTime([...notesToRender]);

        sortedNotes.forEach((note) => {
            const noteTagObject = tags.find(t => t.id === note.tag);
            const tagName = noteTagObject ? noteTagObject.name : 'Không xác định';
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
                    ${!note.completed ? `<button class="complete-btn" data-id="${note.id}">Hoàn thành</button>` : ''}
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
            button.addEventListener("click", function (event) {
                event.stopPropagation();
                const noteId = this.getAttribute("data-id");
                notesCollection.doc(noteId).update({ completed: true })
                    .then(() => {
                        showToast('Ghi chú đã hoàn thành!', 'success');
                    })
                    .catch((error) => {
                        console.error("Error completing note: ", error);
                        showToast('Lỗi khi hoàn thành ghi chú.', 'error');
                    });
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

        if (note) {
            modalTitle.textContent = "Sửa ghi chú";
            submitNoteBtn.textContent = "Cập nhật ghi chú";
            document.getElementById("noteTitle").value = note.title;
            document.getElementById("noteContent").value = note.content;
            document.getElementById("noteTime").value = note.time;
            renderTagOptions(note.tag);
            editingNoteKey = note.id;
        } else {
            modalTitle.textContent = "Ghi chú mới";
            submitNoteBtn.textContent = "Lưu ghi chú";
            setDefaultTime();
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

    // Áp dụng màu nền và màu chữ tương phản cho thẻ hiển thị trong view modal
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
        const viewTagName = viewNoteTagObject ? viewNoteTagObject.name : 'Không xác định';
        const viewTagIcon = viewNoteTagObject ? viewNoteTagObject.icon : '';
        const viewTagColor = viewNoteTagObject ? (viewNoteTagObject.color || '#e0e0e0') : '#e0e0e0';
        const viewTagTextColor = getContrastYIQ(viewTagColor);

        viewNoteTag.className = `view-content note-tag`;
        viewNoteTag.style.backgroundColor = viewTagColor;
        viewNoteTag.style.color = viewTagTextColor;
        viewNoteTag.style.setProperty('--tag-custom-color', viewTagColor); // Set variable too for consistency
        viewNoteTag.innerHTML = `${viewTagIcon ? `<i class="${viewTagIcon}"></i>` : ''} ${viewTagName}`;

        viewNoteStatus.textContent = note.completed ? "Đã hoàn thành" : "Chưa hoàn thành";
        viewNoteStatus.style.color = note.completed ? "#10b981" : "#ef4444";

        viewNoteActions.innerHTML = '';
        if (note.completed) {
            const uncompleteBtn = document.createElement('button');
            uncompleteBtn.className = 'uncomplete-btn';
            uncompleteBtn.textContent = 'Chưa hoàn thành';
            uncompleteBtn.setAttribute('data-id', note.id);

            uncompleteBtn.addEventListener('click', function () {
                const noteId = this.getAttribute('data-id');
                notesCollection.doc(noteId).update({ completed: false })
                    .then(() => {
                        closeViewNoteModal();
                        showToast('Ghi chú đã được đặt lại!', 'info');
                    })
                    .catch((error) => {
                        console.error("Error uncompleting note: ", error);
                        showToast('Lỗi khi đặt lại ghi chú.', 'error');
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

    async function handleNoteSubmit(e) {
        e.preventDefault();

        const title = document.getElementById("noteTitle").value;
        const content = document.getElementById("noteContent").value;
        const time = document.getElementById("noteTime").value;
        const selectedTagRadio = document.querySelector('input[name="noteTag"]:checked');
        
        let tagId = null;
        if (selectedTagRadio) {
            tagId = selectedTagRadio.value;
        } else if (tags.length > 0) {
            tagId = tags[0].id;
        } else {
            showToast('Chưa có thẻ nào được định nghĩa! Vui lòng thêm thẻ trước.', 'warning');
            return;
        }

        const newNoteData = {
            title,
            content,
            tag: tagId,
            time: time,
            completed: false
        };

        const updateNoteData = {
            title,
            content,
            tag: tagId,
            time: time,
        };

        try {
            if (editingNoteKey) {
                await notesCollection.doc(editingNoteKey).update(updateNoteData);
                showToast('Ghi chú đã được cập nhật!', 'success');
            } else {
                await notesCollection.add(newNoteData);
                showToast('Ghi chú đã được thêm!', 'success');
            }
        } catch (error) {
            console.error("Error saving note: ", error);
            showToast('Lỗi khi lưu ghi chú.', 'error');
        }

        closeAddNoteModal();
    }

    async function confirmDeleteNote() {
        if (noteToDeleteId) {
            try {
                await notesCollection.doc(noteToDeleteId).delete();
                showToast('Ghi chú đã bị xóa!', 'error');
            } catch (error) {
                console.error("Error deleting note: ", error);
                showToast('Lỗi khi xóa ghi chú.', 'error');
            }
            closeConfirmModal();
        }
    }

    function filterNotes() {
        const searchTerm = searchInput.value.toLowerCase();
        const filterValue = filterSelect.value;

        let filteredNotes = notes;

        if (searchTerm) {
            filteredNotes = filteredNotes.filter(
                (note) =>
                    note.title.toLowerCase().includes(searchTerm) ||
                    note.content.toLowerCase().includes(searchTerm)
            );
        }

        if (filterValue !== "all") {
            if (filterValue === "completed") {
                filteredNotes = filteredNotes.filter(note => note.completed);
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
            showToast('Tất cả ghi chú đã hoàn thành rồi!', 'info');
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
                showToast('Tất cả ghi chú đã được đánh dấu hoàn thành!', 'success');
            }
        } catch (error) {
            console.error("Error completing all notes: ", error);
            showToast('Lỗi khi hoàn thành tất cả ghi chú.', 'error');
        }
    }

    async function resetAllNotes() {
        const hasCompleted = notes.some(note => note.completed);
        if (!hasCompleted) {
            showToast('Không có ghi chú nào cần đặt lại!', 'info');
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
                showToast('Tất cả ghi chú đã được đặt lại!', 'success');
            }
        } catch (error) {
            console.error("Error resetting all notes: ", error);
            showToast('Lỗi khi đặt lại tất cả ghi chú.', 'error');
        }
    }

function loadSettings() {
        // Ví dụ về cách loadSettings nên áp dụng các thay đổi
        const savedColumns = localStorage.getItem('noteColumns');
        if (savedColumns) {
            document.documentElement.style.setProperty('--notes-grid-columns', savedColumns);
        } else {
             // Đặt mặc định dựa trên kích thước màn hình nếu không có giá trị đã lưu
             if (window.innerWidth >= 1024) {
                 document.documentElement.style.setProperty('--notes-grid-columns', 3);
             } else if (window.innerWidth >= 768) {
                 document.documentElement.style.setProperty('--notes-grid-columns', 2);
             } else {
                 document.documentElement.style.setProperty('--notes-grid-columns', 1);
             }
        }

        const savedBackgroundColor = localStorage.getItem('backgroundColor');
        if (savedBackgroundColor) {
            document.documentElement.style.setProperty('--body-bg-color', savedBackgroundColor);
        } else {
            document.documentElement.style.setProperty('--body-bg-color', '#f8f9fa');
        }

        const savedLanguage = localStorage.getItem('language');
        if (savedLanguage) {
            currentLanguage = savedLanguage;
            applyTranslations();
        } else {
            currentLanguage = 'vi'; // Mặc định là Tiếng Việt
            applyTranslations();
        }

        const savedNotificationTime = localStorage.getItem('notificationTimeBefore');
        if (savedNotificationTime !== null) {
            notificationTimeBeforeSelect.value = savedNotificationTime;
        } else {
            notificationTimeBeforeSelect.value = '5'; // Mặc định 5 phút
        }

    }
    loadSettings();

function saveSettings() {
        const selectedColumns = noteColumnsSelect.value;
        const selectedBackgroundColor = backgroundColorInput.value;
        const selectedLanguage = languageSelect.value;

        localStorage.setItem('noteColumns', selectedColumns);
        localStorage.setItem('backgroundColor', selectedBackgroundColor);
        localStorage.setItem('language', selectedLanguage);
        localStorage.setItem('notificationTimeBefore', notificationTimeBeforeSelect.value)

        // Cập nhật biến ngôn ngữ toàn cục và áp dụng bản dịch ngay lập tức
        currentLanguage = selectedLanguage;
        applyTranslations();

        showToast('toastSettingsSaved', 'success');
        closeSettingsModal();

        // Áp dụng lại cài đặt để đảm bảo các biến CSS được cập nhật cho thay đổi hình ảnh ngay lập tức
        loadSettings(); // Đảm bảo loadSettings() được gọi để áp dụng các thay đổi
        loadNotes(); 
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
        // Tải các cài đặt hiện tại vào form khi mở
        noteColumnsSelect.value = localStorage.getItem('noteColumns') || (window.innerWidth >= 1024 ? 3 : (window.innerWidth >= 768 ? 2 : 1));
        backgroundColorInput.value = localStorage.getItem('backgroundColor') || '#f8f9fa';
        languageSelect.value = localStorage.getItem('language') || 'vi';
        notificationTimeBeforeSelect.value = localStorage.getItem('notificationTimeBefore') || '5';
    }

function closeSettingsModal() {
    settingsModal.classList.remove("active");
    document.body.style.overflow = "auto";
}

function showToast(messageKey, type = 'info', duration = 3000) {
    const message = translations[currentLanguage][messageKey] || messageKey; // Sử dụng khóa hoặc thông báo trực tiếp

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
});