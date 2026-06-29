<div align="center">

<!-- Animated Title Banner -->
<img src="https://capsule-render.vercel.app/api?type=waving&color=190047,310780,00bcd4&height=200&section=header&text=Kanban%20Task%20Board&fontSize=52&fontColor=ffffff&fontAlignY=38&desc=Drag.%20Drop.%20Done.&descAlignY=60&descSize=20&animation=fadeIn" width="100%"/>

<!-- Badges Row -->
<p>
  <img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white"/>
  <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white"/>
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black"/>
  <img src="https://img.shields.io/badge/localStorage-Persisted-10b981?style=for-the-badge&logo=databricks&logoColor=white"/>
  <img src="https://img.shields.io/badge/Drag%20%26%20Drop-HTML5%20API-00bcd4?style=for-the-badge"/>
</p>

<p>
  <img src="https://img.shields.io/badge/License-MIT-blueviolet?style=flat-square"/>
  <img src="https://img.shields.io/badge/Status-Live-brightgreen?style=flat-square"/>
  <img src="https://img.shields.io/badge/PRs-Welcome-ed008c?style=flat-square"/>
  <img src="https://img.shields.io/badge/Zero%20Dependencies-%E2%9C%94-190047?style=flat-square"/>
</p>

</div>

---

## ✦ What Is This?

> A **Trello-style Kanban board** built with pure HTML, CSS, and JavaScript — no frameworks, no libraries, zero dependencies.  
> Every card you create, move, or delete is **persisted to `localStorage`** so your board survives page refreshes.

Cards live in three swimlane columns:

```
┌─────────────────┐   ┌─────────────────┐   ┌─────────────────┐
│     📋 TO DO    │ → │  ⚡ IN PROGRESS  │ → │    ✅ DONE      │
│                 │   │                 │   │                 │
│  [Card]         │   │  [Card]         │   │  [Card]         │
│  [Card]         │   │                 │   │                 │
└─────────────────┘   └─────────────────┘   └─────────────────┘
        ↑ Drag any card across columns to update its status instantly
```

---

## ✨ Features

| Feature | Detail |
|---|---|
| 🖱️ **Drag & Drop** | Native HTML5 API — grab any card and drop it into a new column |
| 💾 **localStorage Sync** | Full board state persists across page reloads automatically |
| ➕ **Create Cards** | Modal form with title + description, lands in *To Do* |
| ✏️ **Edit Cards** | In-place editing via the pencil icon on any card |
| 🗑️ **Delete Cards** | Confirmation-guarded deletion so you never lose work by accident |
| 🔢 **Live Counters** | Each column header shows a real-time card count |
| 📱 **Responsive** | Single-column stacked layout on mobile (< 900px) |
| ⌨️ **Keyboard Support** | `Esc` dismisses the modal from anywhere |
| 🎨 **Zero deps** | Pure HTML/CSS/JS — open the file, it just works |

---

## 🚀 Getting Started

No build step. No `npm install`. Just clone and open.

```bash
# 1. Clone the repo
git clone https://github.com/YOUR_USERNAME/kanban-task-board.git

# 2. Navigate into it
cd kanban-task-board

# 3. Open in your browser
open index.html
# or just double-click index.html in your file explorer
```

---

## 🗂️ Project Structure

```
kanban-task-board/
│
├── index.html          ← Everything: markup, styles, and scripts in one file
│
└── README.md           ← You are here
```

The entire app is **self-contained in `index.html`**, organized in four logical layers:

```
Layer 1 — State Management     localStorage read/write + board array
Layer 2 — Drag & Drop Engine   HTML5 dragstart / dragover / drop events
Layer 3 — DOM Renderer         Compiles state → card elements on every update
Layer 4 — CRUD Controllers     Create, Edit, Delete event handlers + modal logic
```

---

## 🎨 Design System

The UI uses a hand-crafted token system — no Tailwind, no Bootstrap.

| Token | Value | Used For |
|---|---|---|
| `--brand-purple` | `#190047` | Headings, buttons, labels |
| `--brand-blue` | `#00bcd4` | Focus rings, drag-over highlights |
| `--accent-pink` | `#ed008c` | Accent moments |
| `--todo-color` | `#3b82f6` | To Do column indicator |
| `--progress-color` | `#f59e0b` | In Progress column indicator |
| `--done-color` | `#10b981` | Done column indicator |

---

## ⚙️ How It Works

### Card Lifecycle

```
User clicks "Log New Task Card"
        │
        ▼
   Modal opens → user fills Title + Description
        │
        ▼
   New card object pushed to boardStateCollection[]
        │
        ▼
   Saved to localStorage  →  DOM re-renders  →  Card appears in "To Do"
        │
        ▼
   User drags card to "In Progress" or "Done"
        │
        ▼
   status field updated  →  localStorage synced  →  Column counters update
```

### Drag & Drop Flow

```javascript
// dragstart  → tag the card with its ID
e.dataTransfer.setData('text/plain', card.dataset.cardId);

// drop       → read the ID, find the card in state, update its status
const id = e.dataTransfer.getData('text/plain');
boardStateCollection.find(c => c.id === id).status = newColumn;
synchronizeBoardStatePipeline(); // save + re-render
```

### localStorage Persistence

```javascript
// Every mutation runs through one function:
function synchronizeBoardStatePipeline() {
    localStorage.setItem('kanban_board_state', JSON.stringify(boardStateCollection));
    renderKanbanBoardDOM();
}
// On page load, state is hydrated from storage:
let boardStateCollection = JSON.parse(localStorage.getItem('kanban_board_state')) || [...defaults];
```

---

## 📋 Usage Guide

### Creating a Card
1. Click **"Log New Task Card"** in the top-right header
2. Fill in the **Title** and **Description**
3. Click **"Save Commit"** — card appears in the *To Do* column

### Moving a Card
- **Click and drag** any card, then **drop it** into a different column
- The column highlights in blue when it's a valid drop target
- Timestamp updates automatically to show the move date

### Editing a Card
- Click the **pencil icon** (✏️) on any card
- The modal reopens pre-filled with current content
- Save with **"Apply Save Changes"**

### Deleting a Card
- Click the **trash icon** (🗑️) on any card
- Confirm the prompt — deletion is permanent from state and storage

---

## 🔮 Possible Enhancements

- [ ] Card priority labels (High / Medium / Low)
- [ ] Due dates with overdue highlighting
- [ ] Drag-to-reorder within a column
- [ ] Multiple boards support
- [ ] Export board state as JSON
- [ ] Dark mode toggle
- [ ] Assignee avatars per card

---

## 📄 License

```
MIT License — use it, fork it, ship it.
```

---

<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=190047,310780,00bcd4&height=120&section=footer&animation=fadeIn" width="100%"/>

**Built with 💜 using vanilla HTML, CSS & JavaScript**

*If this helped you, drop a ⭐ — it means a lot!*

</div>
