/* =========================================================================
   LAYER 1: CENTRAL COMPLEX APPLICATION STATE MANAGEMENT (localStorage Sync)
   ========================================================================= */

let boardStateCollection = JSON.parse(localStorage.getItem('kanban_board_state')) || [
    {
        id: "card_todo_01",
        title: "Create Quiz UI",
        description: "Design and implement the front-end user interface components for the quiz layer.",
        status: "todo",
        timestamp: "Initial Setup"
    },
    {
        id: "card_todo_02",
        title: "Create API Module",
        description: "Develop structural backend controllers and endpoint routers for routing data pipelines.",
        status: "todo",
        timestamp: "Initial Setup"
    },
    {
        id: "card_progress_01",
        title: "Expense Tracker",
        description: "Core module logic execution stream handling operational ledger tracking metrics.",
        status: "progress",
        timestamp: "Initial Setup"
    },
    {
        id: "card_done_01",
        title: "Portfolio",
        description: "Completed deployment compilation structure for the primary developer hub workspace.",
        status: "done",
        timestamp: "Initial Setup"
    }
];

let reactiveTargetEditId = null;

function synchronizeBoardStatePipeline() {
    localStorage.setItem('kanban_board_state', JSON.stringify(boardStateCollection));
    renderKanbanBoardDOM();
}

/* =========================================================================
   LAYER 2: NATIVE HTML5 DRAG AND DROP SUBSYSTEM ENGINE
   ========================================================================= */

function initializeDragAndDropEngine() {
    const draggableCards = document.querySelectorAll('.task-card');
    const dropColumns = document.querySelectorAll('.kanban-column');

    draggableCards.forEach(card => {
        card.addEventListener('dragstart', (e) => {
            card.classList.add('dragging');
            e.dataTransfer.setData('text/plain', card.dataset.cardId);
            e.dataTransfer.effectAllowed = 'move';
        });

        card.addEventListener('dragend', () => {
            card.classList.remove('dragging');
            dropColumns.forEach(col => col.classList.remove('drag-over'));
        });
    });

    dropColumns.forEach(column => {
        column.addEventListener('dragover', (e) => {
            e.preventDefault();
            column.classList.add('drag-over');
            e.dataTransfer.dropEffect = 'move';
        });

        column.addEventListener('dragleave', () => {
            column.classList.remove('drag-over');
        });

        column.addEventListener('drop', (e) => {
            e.preventDefault();
            column.classList.remove('drag-over');
            
            const extractedCardId = e.dataTransfer.getData('text/plain');
            const designatedStatus = column.dataset.columnStatus;

            const targetedItemIndex = boardStateCollection.findIndex(item => item.id === extractedCardId);
            
            if (targetedItemIndex !== -1 && boardStateCollection[targetedItemIndex].status !== designatedStatus) {
                boardStateCollection[targetedItemIndex].status = designatedStatus;
                boardStateCollection[targetedItemIndex].timestamp = new Date().toLocaleDateString() + " (Moved)";
                synchronizeBoardStatePipeline();
            }
        });
    });
}

/* =========================================================================
   LAYER 3: DOM VIEW COMPILER & RENDERING LIFECYCLE (Read Logic Mapping)
   ========================================================================= */

const zoneTodo = document.getElementById('zone-todo');
const zoneProgress = document.getElementById('zone-progress');
const zoneDone = document.getElementById('zone-done');

const labelCounterTodo = document.getElementById('counter-todo');
const labelCounterProgress = document.getElementById('counter-progress');
const labelCounterDone = document.getElementById('counter-done');

function renderKanbanBoardDOM() {
    zoneTodo.innerHTML = '';
    zoneProgress.innerHTML = '';
    zoneDone.innerHTML = '';

    let counts = { todo: 0, progress: 0, done: 0 };

    boardStateCollection.forEach(task => {
        counts[task.status]++;

        const cardElement = document.createElement('article');
        cardElement.className = 'task-card';
        cardElement.setAttribute('draggable', 'true'); 
        cardElement.setAttribute('data-card-id', task.id);

        cardElement.innerHTML = `
            <div class="card-body">
                <h4>${sanitizeInputMarkups(task.title)}</h4>
                <p>${sanitizeInputMarkups(task.description)}</p>
            </div>
            <div class="card-footer">
                <span class="card-timestamp">${task.timestamp}</span>
                <div class="card-actions">
                    <button class="action-icon-btn btn-edit-card" title="Edit Content Task" onclick="triggerEditCardWorkflow('${task.id}')">
                        <svg><use href="#icon-edit"></use></svg>
                    </button>
                    <button class="action-icon-btn btn-delete-card" title="Delete Content Task" onclick="executeDeleteCardRecord('${task.id}')">
                        <svg><use href="#icon-delete"></use></svg>
                    </button>
                </div>
            </div>
        `;

        if (task.status === 'todo') zoneTodo.appendChild(cardElement);
        if (task.status === 'progress') zoneProgress.appendChild(cardElement);
        if (task.status === 'done') zoneDone.appendChild(cardElement);
    });

    labelCounterTodo.textContent = counts.todo;
    labelCounterProgress.textContent = counts.progress;
    labelCounterDone.textContent = counts.done;

    initializeDragAndDropEngine();
}

function sanitizeInputMarkups(stringInput) {
    const containerDiv = document.createElement('div');
    containerDiv.textContent = stringInput;
    return containerDiv.innerHTML;
}

/* =========================================================================
   LAYER 4: CONTROLLERS & COMPLETE CRUD EVENT WORKFLOW HANDLERS
   ========================================================================= */

const coreModalOverlay = document.getElementById('task-modal');
const formSubmitElement = document.getElementById('modal-core-form');

const modalHeadingText = document.getElementById('modal-interface-heading');
const modalInputTitle = document.getElementById('input-task-title');
const modalInputDesc = document.getElementById('input-task-desc');

formSubmitElement.addEventListener('submit', () => {
    const captureTitle = modalInputTitle.value.trim();
    const captureDesc = modalInputDesc.value.trim();
    const formattedDate = new Date().toLocaleDateString();

    if (reactiveTargetEditId === null) {
        const newCardSchema = {
            id: "card_id_" + Date.now() + Math.random().toString(36).substr(2, 3),
            title: captureTitle,
            description: captureDesc,
            status: "todo",
            timestamp: formattedDate
        };
        boardStateCollection.push(newCardSchema);
    } else {
        const editTargetIndex = boardStateCollection.findIndex(item => item.id === reactiveTargetEditId);
        if (editTargetIndex !== -1) {
            boardStateCollection[editTargetIndex].title = captureTitle;
            boardStateCollection[editTargetIndex].description = captureDesc;
            boardStateCollection[editTargetIndex].timestamp = formattedDate + " (Edited)";
        }
    }

    dismissModalInterface();
    synchronizeBoardStatePipeline();
});

function triggerEditCardWorkflow(cardId) {
    const operationalRecord = boardStateCollection.find(item => item.id === cardId);
    if (!operationalRecord) return;

    reactiveTargetEditId = cardId;

    modalInputTitle.value = operationalRecord.title;
    modalInputDesc.value = operationalRecord.description;

    modalHeadingText.textContent = "Modify Operational Card Details";
    document.getElementById('btn-modal-submit').textContent = "Apply Save Changes";
    
    coreModalOverlay.classList.remove('hide');
    modalInputTitle.focus();
}

function executeDeleteCardRecord(cardId) {
    if (confirm("Are you confident you want to permanently erase this operational task log?")) {
        boardStateCollection = boardStateCollection.filter(item => item.id !== cardId);
        if (reactiveTargetEditId === cardId) {
            reactiveTargetEditId = null;
        }
        synchronizeBoardStatePipeline();
    }
}

document.getElementById('global-add-task-btn').addEventListener('click', () => {
    reactiveTargetEditId = null;
    formSubmitElement.reset();
    modalHeadingText.textContent = "Create New Task Card";
    document.getElementById('btn-modal-submit').textContent = "Save Commit";
    coreModalOverlay.classList.remove('hide');
    modalInputTitle.focus();
});

function dismissModalInterface() {
    coreModalOverlay.classList.add('hide');
    formSubmitElement.reset();
    reactiveTargetEditId = null;
}

document.getElementById('btn-modal-cancel').addEventListener('click', dismissModalInterface);

window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !coreModalOverlay.classList.contains('hide')) {
        dismissModalInterface();
    }
});

document.addEventListener('DOMContentLoaded', () => {
    synchronizeBoardStatePipeline();
});
