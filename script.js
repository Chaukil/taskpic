// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, updateDoc, deleteDoc, doc, query, orderBy } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-firestore.js";

// Firebase configuration 
const firebaseConfig = {
    apiKey: "AIzaSyCcpVyibWxkMnNRMRMRtUuWNoRpQHJfX-Gq8",
    authDomain: "tasks-454f2.firebaseapp.com",
    projectId: "tasks-454f2",
    storageBucket: "tasks-454f2.firebasestorage.app",
    messagingSenderId: "851537211837",
    appId: "1:851537211837:web:60f122abd780af507a62d4",
    measurementId: "G-G1HNX3KJRX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// DOM Elements
const taskForm = document.getElementById('taskForm');
const taskList = document.getElementById('taskList');
const searchInput = document.getElementById('searchInput');
const statusFilters = document.querySelectorAll('input[name="status-filter"]');
const addPathBtn = document.getElementById('addPathBtn');
const pathsList = document.getElementById('pathsList');
const completeAllBtn = document.getElementById('completeAllBtn');
const newDayBtn = document.getElementById('newDayBtn');

// Task Modal
const taskModal = new bootstrap.Modal(document.getElementById('taskModal'));

// Hàm helper để tóm tắt nội dung
const summarizeText = (text, maxLength = 100) => {
    if (!text) return '';
    text = text.trim();
    if (text.length <= maxLength) return text;

    // Tìm vị trí khoảng trắng gần nhất trước maxLength
    const spaceIndex = text.lastIndexOf(' ', maxLength);
    if (spaceIndex > 0) {
        return text.substring(0, spaceIndex) + '...';
    }
    return text.substring(0, maxLength) + '...';
};

// Hàm helper để chuyển đổi text thành HTML với định dạng
const formatTextToHtml = (text) => {
    if (!text) return '';

    // Xử lý xuống dòng
    text = text.replace(/\n/g, '<br>');

    // Xử lý gạch đầu dòng
    text = text.replace(/^- (.+)$/gm, '<li>$1</li>');
    text = text.replace(/(<li>.*<\/li>)/gs, '<ul>$1</ul>');

    // Xử lý in đậm
    text = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

    // Xử lý in nghiêng
    text = text.replace(/\*(.*?)\*/g, '<em>$1</em>');

    return text;
};

// Confirmation Modal Template
const createConfirmationModal = () => {
    const modalTemplate = `
        <div class="modal fade" id="confirmationModal" tabindex="-1">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header border-0">
                        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body text-center py-4">
                        <div class="confirmation-icon mb-4">
                            <i class="bi bi-question-circle display-1 text-warning"></i>
                        </div>
                        <h4 class="confirmation-title mb-3"></h4>
                        <p class="confirmation-message text-muted"></p>
                    </div>
                    <div class="modal-footer border-0 justify-content-center gap-2 pb-4">
                        <button type="button" class="btn btn-lg btn-secondary px-4" data-bs-dismiss="modal">
                            <i class="bi bi-x-circle me-2"></i>Hủy
                        </button>
                        <button type="button" class="btn btn-lg btn-primary px-4" id="confirmButton">
                            <i class="bi bi-check-circle me-2"></i>Xác nhận
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modalTemplate);
    return new bootstrap.Modal(document.getElementById('confirmationModal'));
};

const getTimeStatus = (task) => {
    const now = new Date();
    const today = now.toISOString().split('T')[0];
    const currentTime = now.getHours().toString().padStart(2, '0') + ':' +
        now.getMinutes().toString().padStart(2, '0');

    const currentDateTime = new Date(`${today}T${currentTime}`);
    const compareTime = task.endTime
        ? new Date(`${today}T${task.endTime}`)  // So sánh với giờ kết thúc nếu có
        : new Date(`${today}T${task.startTime}`); // So sánh với giờ bắt đầu nếu không có giờ kết thúc

    if (currentDateTime > compareTime) {
        return task.status === 'completed' ? 'completed' : 'overdue';
    }

    return 'normal';
};

const viewTask = async (id, task) => {
    const existingModal = document.getElementById('viewTaskModal');
    if (existingModal) {
        existingModal.remove();
    }

        const priorityLabels = {
        low: 'Thấp',
        medium: 'Trung bình',
        high: 'Cao'
    };

    const timeStatus = getTimeStatus(task);
    const timeDisplay = task.endTime
        ? `${task.startTime} - ${task.endTime}`
        : `${task.startTime}`;

    const modalTemplate = `
        <div class="modal fade" id="viewTaskModal" tabindex="-1" role="dialog" aria-labelledby="viewTaskModalLabel"
             aria-modal="true">
            <div class="modal-dialog modal-fullscreen">
                <div class="modal-content">
                    <div class="navbar navbar-dark bg-primary">
                        <div class="container-fluid">
                        <a class="navbar-brand">
                                <i class="bi bi-check2-square me-2"></i>${task.title}
                            </a>
                            <button type="button" 
                                    class="btn btn-link text-white text-decoration-none"
                                    data-bs-dismiss="modal"
                                    aria-label="Quay lại">
                                <i class="bi bi-arrow-left fs-4" aria-hidden="true"></i>
                            </button>

                            
                        </div>
                        <div class="task-metadata">
            <div class="priority-badge priority-${task.priority}">
                ${priorityLabels[task.priority]}
            </div>
            <div class="task-status status-${task.status}">
                ${task.status === 'completed' ? 'Đã hoàn thành' : 'Đang thực hiện'}
            </div>
            <div class="task-time">
        <span class="time-${timeStatus}">
            <i class="bi bi-clock me-1"></i>${timeDisplay}
        </span>
    </div>
        </div>
                    </div>
                    <div class="modal-body task-view-body">
                        <div class="container-fluid py-3">
                            <div class="row">
                                <!-- Main Content -->
                                <div class="col-lg-8">
                                    <div class="task-main-content bg-white p-4 rounded shadow-sm">
                                        <!-- Content will be dynamically inserted here -->
                                    </div>
                                </div>
                                <!-- Sidebar -->
                                <div class="col-lg-4">
                                    <div class="task-sidebar bg-white p-4 rounded shadow-sm">
                                        <!-- Sidebar content will be inserted here -->
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modalTemplate);

    const modal = new bootstrap.Modal(document.getElementById('viewTaskModal'), {
        keyboard: true, // Enable keyboard navigation
        focus: true    // Enable automatic focus
    });
    const modalElement = document.getElementById('viewTaskModal');

    if (!modalElement) {
        console.error('Modal element not found');
        return;
    }

    // Get references to main content and sidebar containers
    const mainContent = modalElement.querySelector('.task-main-content');
    const sidebar = modalElement.querySelector('.task-sidebar');

    

    

    // Main content
    mainContent.innerHTML = `
        

        <div class="task-description">
            <h5 class="mb-3">
                <i class="bi bi-text-paragraph me-2"></i>Mô tả
            </h5>
            <div class="task-description-content">
                ${formatTextToHtml(task.description) || 'Không có mô tả'}
            </div>
        </div>
    `;

    // Sidebar content - Paths section
    if (task.paths && task.paths.length > 0) {
        sidebar.innerHTML = `
            <h5 class="mb-3">
                <i class="bi bi-folder me-2"></i>Đường dẫn
            </h5>
            <div class="task-paths">
                ${task.paths.map(path => `
                    <div class="task-path-item">
                        <div class="task-path-text">${path}</div>
                        <div class="path-actions">
                            <button class="btn btn-sm btn-outline-primary copy-path" data-path="${path}">
                                <i class="bi bi-clipboard"></i>
                            </button>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
    }

    // Add event listeners for path actions
    if (task.paths && task.paths.length > 0) {
        modalElement.querySelectorAll('.copy-path').forEach(btn => {
            btn.addEventListener('click', () => {
                const path = btn.dataset.path;
                navigator.clipboard.writeText(path);
                showNotification(
                    'Sao chép thành công',
                    'Đã sao chép đường dẫn vào clipboard',
                    'success'
                );
            });
        });
    }

    modal.show();
};




const editTask = async (id, task) => {
    const modal = createEditTaskModal();
    const modalElement = document.getElementById('editTaskModal');

    // Fill form with task data
    document.getElementById('editTaskId').value = id;
    document.getElementById('editTaskTitle').value = task.title;
    document.getElementById('editTaskDescription').value = task.description;
    document.getElementById('editTaskPriority').value = task.priority;
    document.getElementById('editStartTime').value = task.startTime;
    document.getElementById('editEndTime').value = task.endTime;

    const pathsList = document.getElementById('editPathsList');
    pathsList.innerHTML = '';

    // Chỉ hiển thị paths nếu task có paths
    if (task.paths && task.paths.length > 0) {
        task.paths.forEach(path => {
            const pathItem = document.createElement('div');
            pathItem.className = 'path-item input-group mb-2';
            pathItem.innerHTML = `
                <span class="input-group-text">
                    <i class="bi bi-folder"></i>
                </span>
                <input type="text" class="form-control path-input" value="${path.replace(/\\/g, '\\')}">
                <button type="button" class="btn btn-outline-danger remove-path">
                    <i class="bi bi-trash"></i>
                </button>
            `;

            const input = pathItem.querySelector('.path-input');

            // Xử lý sự kiện input để đảm bảo format đúng
            input.addEventListener('input', (e) => {
                e.target.value = e.target.value.replace(/\\\\/g, '\\');
            });

            // Xử lý sự kiện paste
            input.addEventListener('paste', (e) => {
                e.preventDefault();
                const pastedText = e.clipboardData.getData('text');
                input.value = pastedText.replace(/\\\\/g, '\\');
            });

            pathsList.appendChild(pathItem);

            pathItem.querySelector('.remove-path').addEventListener('click', async () => {
                const confirmed = await showConfirmation(
                    'Xóa đường dẫn',
                    'Bạn có chắc chắn muốn xóa đường dẫn này?',
                    'warning'
                );
                if (confirmed) {
                    pathItem.remove();
                }
            });
        });
    }

    // Form submit handler
    document.getElementById('editTaskForm').addEventListener('submit', async (e) => {
        e.preventDefault();

        const taskId = document.getElementById('editTaskId').value;
        const paths = Array.from(document.querySelectorAll('#editPathsList .path-input'))
            .map(input => input.value.trim().replace(/\\\\/g, '\\'))
            .filter(path => path !== '');

        const updatedTask = {
            title: document.getElementById('editTaskTitle').value,
            description: document.getElementById('editTaskDescription').value,
            priority: document.getElementById('editTaskPriority').value,
            startTime: document.getElementById('editStartTime').value,
            endTime: document.getElementById('editEndTime').value
        };

        if (paths.length > 0) {
            updatedTask.paths = paths;
        }

        try {
            await updateDoc(doc(db, "tasks", taskId), updatedTask);
            showNotification('Thành công', 'Công việc đã được cập nhật', 'success');
            modal.hide();
            loadTasks();
        } catch (error) {
            showNotification('Lỗi', 'Không thể cập nhật công việc', 'error');
            console.error("Error updating task:", error);
        }
    });

    modal.show();
};


const createEditTaskModal = () => {
    const modalTemplate = `
        <div class="modal fade" id="editTaskModal" tabindex="-1">
    <div class="modal-dialog modal-xl">
        <div class="modal-content">
            <div class="modal-header bg-primary text-white">
                <h5 class="modal-title">
                    <i class="bi bi-pencil-square me-2"></i>Chỉnh sửa công việc
                </h5>
                <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
            </div>
            <div class="modal-body p-4">
                <form id="editTaskForm">
                    <!-- Same form structure as Add Task Modal -->
                    <div class="row mb-4">
                        <div class="col-md-8">
                            <label class="form-label fw-bold">
                                <i class="bi bi-pencil me-2"></i>Tên công việc
                            </label>
                            <input type="text" class="form-control form-control-lg" id="editTaskTitle" required>
                        </div>
                        <div class="col-md-4">
                            <label class="form-label fw-bold">
                                <i class="bi bi-flag me-2"></i>Mức độ ưu tiên
                            </label>
                            <select class="form-select form-select-lg" id="editTaskPriority">
                                <option value="low">Thấp</option>
                                <option value="medium">Trung bình</option>
                                <option value="high">Cao</option>
                            </select>
                        </div>
                    </div>

                    <div class="mb-4">
                        <label class="form-label fw-bold">
                            <i class="bi bi-text-paragraph me-2"></i>Mô tả
                        </label>
                        <textarea class="form-control task-description-input" id="editTaskDescription" rows="6"></textarea>
                        <small class="text-muted">
                            Hỗ trợ định dạng: <br>
                            - Gạch đầu dòng: Bắt đầu với dấu "-"<br>
                            - In đậm: **text**<br>
                            - In nghiêng: *text*<br>
                            - Xuống dòng: Enter
                        </small>
                    </div>

                    <div class="mb-4">
                        <label class="form-label fw-bold">
                            <i class="bi bi-folder me-2"></i>Danh sách đường dẫn
                        </label>
                        <div id="editPathsList" class="path-list mb-2"></div>
                        <button type="button" class="btn btn-outline-primary" id="editAddPathBtn">
                            <i class="bi bi-plus-lg me-2"></i>Thêm đường dẫn
                        </button>
                    </div>

                    <div class="row">
                        <div class="col-md-6">
                            <label class="form-label fw-bold">
                                <i class="bi bi-clock me-2"></i>Giờ bắt đầu
                            </label>
                            <input type="time" class="form-control form-control-lg" id="editStartTime" required>
                        </div>
                        <div class="col-md-6">
                            <label class="form-label fw-bold">
                                <i class="bi bi-clock-history me-2"></i>Giờ kết thúc
                            </label>
                            <input type="time" class="form-control form-control-lg" id="editEndTime">
                        </div>
                    </div>
                    <input type="hidden" id="editTaskId">
                </form>
            </div>
            <div class="modal-footer bg-light">
                <button type="button" class="btn btn-secondary btn-lg" data-bs-dismiss="modal">
                    <i class="bi bi-x-circle me-2"></i>Hủy
                </button>
                <button type="submit" form="editTaskForm" class="btn btn-primary btn-lg">
                    <i class="bi bi-save me-2"></i>Lưu thay đổi
                </button>
            </div>
        </div>
    </div>
</div>
    `;
    document.body.insertAdjacentHTML('beforeend', modalTemplate);
    return new bootstrap.Modal(document.getElementById('editTaskModal'));
};

// Custom Notification System
if (!document.getElementById('notification-container')) {
    const container = document.createElement('div');
    container.id = 'notification-container';
    container.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 9999;
    `;
    document.body.appendChild(container);
}

// Add styles
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateY(-100%); opacity: 0; }
        to { transform: translateY(0); opacity: 1; }
    }
    @keyframes slideOut {
        from { transform: translateY(0); opacity: 1; }
        to { transform: translateY(100%); opacity: 0; }
    }
    .custom-notification {
        padding: 20px 30px;
        border-radius: 10px;
        background: white;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        display: flex;
        align-items: center;
        gap: 15px;
        animation: slideIn 0.5s ease forwards;
        position: relative;
        min-width: 300px;
    }
    .notification-icon {
        font-size: 24px;
        flex-shrink: 0;
    }
    .notification-content {
        flex-grow: 1;
    }
    .notification-title {
        font-weight: 600;
        margin-bottom: 5px;
    }
    .notification-message {
        color: #666;
        margin: 0;
    }
    .notification-close {
        position: absolute;
        top: 10px;
        right: 10px;
        border: none;
        background: none;
        cursor: pointer;
        padding: 5px;
        color: #999;
    }
`;
document.head.appendChild(style);

// Show Notification Function
const showNotification = (title, message, type = 'success') => {
    const container = document.getElementById('notification-container');
    const notification = document.createElement('div');
    notification.className = 'custom-notification';

    const icons = {
        success: 'bi-check-circle-fill text-success',
        error: 'bi-x-circle-fill text-danger',
        warning: 'bi-exclamation-circle-fill text-warning',
        info: 'bi-info-circle-fill text-info'
    };

    notification.innerHTML = `
        <i class="bi ${icons[type]} notification-icon"></i>
        <div class="notification-content">
            <div class="notification-title">${title}</div>
            <p class="notification-message">${message}</p>
        </div>
        <button class="notification-close">
            <i class="bi bi-x"></i>
        </button>
    `;

    container.appendChild(notification);

    // Close button handler
    notification.querySelector('.notification-close').addEventListener('click', () => {
        notification.style.animation = 'slideOut 0.5s ease forwards';
        setTimeout(() => notification.remove(), 500);
    });

    // Auto remove after 3 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.style.animation = 'slideOut 0.5s ease forwards';
            setTimeout(() => notification.remove(), 500);
        }
    }, 3000);
};

// Confirmation Dialog Function
const showConfirmation = (title, message, icon = 'warning') => {
    return new Promise((resolve) => {
        const modal = createConfirmationModal();
        const modalElement = document.getElementById('confirmationModal');

        modalElement.querySelector('.confirmation-title').textContent = title;
        modalElement.querySelector('.confirmation-message').textContent = message;

        const iconElement = modalElement.querySelector('.confirmation-icon i');
        iconElement.className = `bi bi-${icon}-circle display-1 text-${icon}`;

        const confirmHandler = () => {
            modal.hide();
            resolve(true);
            cleanup();
        };

        const cancelHandler = () => {
            resolve(false);
            cleanup();
        };

        const cleanup = () => {
            modalElement.querySelector('#confirmButton').removeEventListener('click', confirmHandler);
            modalElement.removeEventListener('hidden.bs.modal', cancelHandler);
            modalElement.remove();
        };

        modalElement.querySelector('#confirmButton').addEventListener('click', confirmHandler);
        modalElement.addEventListener('hidden.bs.modal', cancelHandler);

        modal.show();
    });
};

// Path Management
const addPath = () => {
    const pathItem = document.createElement('div');
    pathItem.className = 'path-item input-group mb-2';
    pathItem.innerHTML = `
        <span class="input-group-text">
            <i class="bi bi-folder"></i>
        </span>
        <input type="text" class="form-control path-input" placeholder="Nhập đường dẫn (vd: D:\\ckchau\\Desktop\\Tasks PIC)">
        <button type="button" class="btn btn-outline-danger remove-path">
            <i class="bi bi-trash"></i>
        </button>
    `;

    pathsList.appendChild(pathItem);

    const input = pathItem.querySelector('.path-input');

    // Xử lý sự kiện paste
    input.addEventListener('paste', (e) => {
        e.preventDefault();
        const pastedText = e.clipboardData.getData('text');
        // Chuẩn hóa đường dẫn với dấu \ đơn
        input.value = pastedText.replace(/\\\\/g, '\\');
    });

    // Xử lý sự kiện input để đảm bảo format đúng khi nhập tay
    input.addEventListener('input', (e) => {
        e.target.value = e.target.value.replace(/\\\\/g, '\\');
    });

    pathItem.querySelector('.remove-path').addEventListener('click', async () => {
        const confirmed = await showConfirmation(
            'Xóa đường dẫn',
            'Bạn có chắc chắn muốn xóa đường dẫn này?',
            'warning'
        );
        if (confirmed) {
            pathItem.remove();
        }
    });
};


addPathBtn.addEventListener('click', addPath);

// Save Task
const saveTask = async (event) => {
    event.preventDefault();

    const title = document.getElementById('taskTitle').value;
    const description = document.getElementById('taskDescription').value;
    const priority = document.getElementById('taskPriority').value;
    const startTime = document.getElementById('startTime').value;
    const endTime = document.getElementById('endTime').value;

    // Chuẩn hóa đường dẫn
    const pathInputs = document.querySelectorAll('.path-input');
    const paths = Array.from(pathInputs)
        .map(input => input.value.trim().replace(/\\\\/g, '\\'))
        .filter(path => path !== '');

    try {
        const taskData = {
            title,
            description,
            priority,
            startTime,
            endTime,
            status: 'pending',
            createdAt: new Date().toISOString()
        };

        if (paths.length > 0) {
            taskData.paths = paths;
        }

        await addDoc(collection(db, "tasks"), taskData);

        showNotification(
            'Thành công',
            'Công việc đã được thêm thành công!',
            'success'
        );

        taskModal.hide();
        taskForm.reset();
        pathsList.innerHTML = '';
        loadTasks();
    } catch (error) {
        showNotification(
            'Lỗi',
            'Không thể thêm công việc. Vui lòng thử lại!',
            'error'
        );
        console.error("Error adding task:", error);
    }
};

const timeToMinutes = (time) => {
    if (!time) return 0;
    const [hours, minutes] = time.split(':').map(Number);
    return hours * 60 + minutes;
};

taskForm.addEventListener('submit', saveTask);

// Load Tasks
const loadTasks = async () => {
    try {
        const q = query(collection(db, "tasks"));
        const querySnapshot = await getDocs(q);
        taskList.innerHTML = '';

        if (querySnapshot.empty) {
            taskList.innerHTML = `
                <div class="text-center py-5">
                    <i class="bi bi-inbox display-1 text-muted"></i>
                    <h4 class="mt-3 text-muted">Chưa có công việc nào</h4>
                    <p class="text-muted">Hãy thêm công việc mới để bắt đầu</p>
                </div>
            `;
            return;
        }

        // Chuyển tasks thành array để sắp xếp
        const tasks = [];
        querySnapshot.forEach((doc) => {
            tasks.push({
                id: doc.id,
                ...doc.data()
            });
        });

        // Sắp xếp tasks theo thời gian bắt đầu
        tasks.sort((a, b) => {
            const timeA = timeToMinutes(a.startTime);
            const timeB = timeToMinutes(b.startTime);
            return timeA - timeB;
        });

        // Render tasks đã sắp xếp
        tasks.forEach((task) => {
            const taskElement = createTaskElement(task.id, task);
            taskList.appendChild(taskElement);
        });

    } catch (error) {
        showNotification(
            'Lỗi',
            'Không thể tải danh sách công việc',
            'error'
        );
        console.error("Error loading tasks:", error);
    }
};

// Hàm helper để tạo text rút gọn với số ký tự tùy chỉnh
const truncateText = (text, maxLength) => {
    if (!text) return '';
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
};

// Create Task Element
const createTaskElement = (id, task) => {
    const div = document.createElement('div');
    div.className = `task-item list-group-item ${task.status === 'completed' ? 'bg-light' : ''}`;

    const priorityLabels = {
        low: 'Thấp',
        medium: 'Trung bình',
        high: 'Cao'
    };

    // Tóm tắt mô tả
    const descriptionSummary = summarizeText(task.description || '');
    const timeStatus = getTimeStatus(task);
    const timeDisplay = task.endTime
        ? `${task.startTime} - ${task.endTime}`
        : `${task.startTime}`;

    const truncatedDescription = truncateText(task.description, 47);// 50 ký tự cho mô tả
    div.innerHTML = `
        <div class="d-flex justify-content-between align-items-start">
            <div class="flex-grow-1">
                <h5 class="mb-1 ${task.status === 'completed' ? 'text-decoration-line-through' : ''}">
                    ${task.title}
                </h5>
                <div class="metadata-container">
                <div class="task-metadata">
                    <span class="priority-badge priority-${task.priority}">
                        ${priorityLabels[task.priority]}
                    </span>
                    <span class="task-status status-${task.status}">
                        ${task.status === 'completed' ? 'Đã hoàn thành' : 'Đang thực hiện'}
                    </span>
                </div>
                <div class="task-time-container">
                    <span class="time-${timeStatus}">
                        <i class="bi bi-clock me-2"></i>${timeDisplay}
                    </span>
                </div>
            </div>
                ${task.description ? `
                    <p class="mb-2 task-description-preview" title="${task.description}">
                        ${truncatedDescription}
                    </p>
                ` : ''}
                ${task.paths && task.paths.length > 0 ? `
                    <div class="task-links-preview">
                        <div class="path-preview" title="${task.paths[0]}">
                            <i class="bi bi-folder me-1"></i>
                            <span class="path-text">${truncateText(task.paths[0], 30)}</span>
                        </div>
                        ${task.paths.length > 1 ? `
                            <div class="more-paths">+${task.paths.length - 1} đường dẫn khác</div>
                        ` : ''}
                    </div>
                ` : ''}
            </div>
            <div class="task-actions">
                <button class="btn btn-sm btn-info view-task me-1">
                    <i class="bi bi-eye"></i>
                </button>
                <button class="btn btn-sm btn-warning edit-task me-1">
                    <i class="bi bi-pencil"></i>
                </button>
                <button class="btn btn-sm btn-success complete-task" ${task.status === 'completed' ? 'disabled' : ''}>
                    <i class="bi bi-check-lg"></i>
                </button>
                <button class="btn btn-sm btn-danger delete-task">
                    <i class="bi bi-trash"></i>
                </button>
            </div>
        </div>
    `;

    // Add event listeners
    if (task.paths && task.paths.length > 0) {
        const pathPreview = div.querySelector('.path-preview');
        pathPreview.addEventListener('click', () => {
            navigator.clipboard.writeText(task.paths[0]);
            showNotification(
                'Sao chép thành công',
                'Đã sao chép đường dẫn đầy đủ vào clipboard',
                'success'
            );
        });
    }

    // Add event listeners for task actions
    div.querySelector('.view-task').addEventListener('click', () => viewTask(id, task));
    div.querySelector('.edit-task').addEventListener('click', () => editTask(id, task));
    div.querySelector('.complete-task').addEventListener('click', async () => {
        const confirmed = await showConfirmation(
            'Hoàn thành công việc',
            'Bạn có chắc chắn muốn đánh dấu công việc này là đã hoàn thành?',
            'info'
        );
        if (confirmed) {
            completeTask(id);
        }
    });
    div.querySelector('.delete-task').addEventListener('click', async () => {
        const confirmed = await showConfirmation(
            'Xóa công việc',
            'Bạn có chắc chắn muốn xóa công việc này?',
            'danger'
        );
        if (confirmed) {
            deleteTask(id);
        }
    });

    return div;
};


// Complete Task
const completeTask = async (id) => {
    try {
        await updateDoc(doc(db, "tasks", id), {
            status: 'completed'
        });
        showNotification(
            'Thành công',
            'Công việc đã được đánh dấu hoàn thành',
            'success'
        );
        loadTasks();
    } catch (error) {
        showNotification(
            'Lỗi',
            'Không thể cập nhật trạng thái công việc',
            'error'
        );
        console.error("Error completing task:", error);
    }
};

// Delete Task
const deleteTask = async (id) => {
    try {
        await deleteDoc(doc(db, "tasks", id));
        showNotification(
            'Thành công',
            'Công việc đã được xóa',
            'success'
        );
        loadTasks();
    } catch (error) {
        showNotification(
            'Lỗi',
            'Không thể xóa công việc',
            'error'
        );
        console.error("Error deleting task:", error);
    }
};

// Search Functionality
const initializeSearch = () => {
    const searchInput = document.getElementById('searchInput');
    if (!searchInput) {
        console.warn('Search input not found');
        return;
    }

    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const tasks = taskList.getElementsByClassName('task-item');
        
        Array.from(tasks).forEach(task => {
            const title = task.querySelector('h5')?.textContent || '';
            const description = task.querySelector('.task-description-preview')?.textContent || '';
            const paths = Array.from(task.querySelectorAll('.task-path-text'))
                .map(pathElement => pathElement.textContent || '')
                .join(' ');

            const searchText = `${title} ${description} ${paths}`.toLowerCase();
            const isVisible = searchText.includes(searchTerm);
            
            task.style.display = isVisible ? '' : 'none';
        });
    });
};

// Filter Functionality
statusFilters.forEach(filter => {
    filter.addEventListener('change', () => {
        const status = filter.id;
        const tasks = taskList.getElementsByClassName('task-item');

        Array.from(tasks).forEach(task => {
            if (status === 'all') {
                task.style.display = '';
            } else {
                const taskStatus = task.querySelector('.task-status').classList.contains(`status-${status}`);
                task.style.display = taskStatus ? '' : 'none';
            }
        });
    });
});



// Complete All Tasks
completeAllBtn.addEventListener('click', async () => {
    const confirmed = await showConfirmation(
        'Hoàn thành tất cả',
        'Bạn có chắc chắn muốn đánh dấu tất cả công việc là đã hoàn thành?',
        'info'
    );

    if (confirmed) {
        try {
            const querySnapshot = await getDocs(collection(db, "tasks"));
            const batch = [];

            querySnapshot.forEach((doc) => {
                if (doc.data().status !== 'completed') {
                    batch.push(updateDoc(doc.ref, { status: 'completed' }));
                }
            });

            await Promise.all(batch);
            showNotification(
                'Thành công',
                'Tất cả công việc đã được đánh dấu hoàn thành',
                'success'
            );
            loadTasks();
        } catch (error) {
            showNotification(
                'Lỗi',
                'Không thể cập nhật trạng thái công việc',
                'error'
            );
            console.error("Error completing all tasks:", error);
        }
    }
});

// Start New Day - Reset all tasks to pending
newDayBtn.addEventListener('click', async () => {
    const confirmed = await showConfirmation(
        'Bắt đầu ngày mới',
        'Bạn có chắc chắn muốn đặt lại tất cả công việc về trạng thái "Đang thực hiện"?',
        'warning'
    );

    if (confirmed) {
        try {
            const querySnapshot = await getDocs(collection(db, "tasks"));
            const updatePromises = [];

            querySnapshot.forEach((doc) => {
                updatePromises.push(
                    updateDoc(doc.ref, {
                        status: 'pending',
                        // Cập nhật ngày mới
                        createdAt: new Date().toISOString()
                    })
                );
            });

            await Promise.all(updatePromises);
            showNotification(
                'Thành công',
                'Đã bắt đầu ngày mới! Tất cả công việc đã được đặt lại.',
                'success'
            );
            loadTasks();
        } catch (error) {
            showNotification(
                'Lỗi',
                'Không thể đặt lại trạng thái công việc',
                'error'
            );
            console.error("Error resetting tasks:", error);
        }
    }
});

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    initializeSearch();
    loadTasks();
});
