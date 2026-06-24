# Simple Task Manager

A clean, accessible web application to manage daily tasks — built with plain HTML, CSS, and JavaScript (no frameworks or dependencies).

---

## Features

- **Add tasks** via the input field — click "Add task" or press `Enter`
- **Complete tasks** by clicking the circle button; completed tasks show a strikethrough
- **Delete tasks** with the trash icon button
- **Filter tasks** by All / Pending / Completed
- **Live stats** — total, completed, and remaining task counts
- Smooth slide-in animation on new tasks
- Fully keyboard-accessible and screen-reader friendly

---

## Project Structure

```
task-manager/
├── index.html   ← Semantic HTML structure
├── style.css    ← All layout, component, and state styles
├── script.js    ← DOM manipulation, event handling, state logic
└── README.md    ← This file
```

---

## How to Run

No build steps required. Just open `index.html` in any modern browser:

```bash
# Option 1 — double-click the file in your file explorer

# Option 2 — serve locally with Python
python -m http.server 8000
# then visit http://localhost:8000
```

---

## Technical Details

### HTML
- Semantic tags: `<header>`, `<ul>`, `<li>`, `<button>`, `<input>`
- ARIA labels on interactive elements for screen readers
- `aria-live="polite"` on the task list for dynamic announcements

### CSS
- Custom properties for color and spacing consistency
- Flexbox layout throughout
- CSS `animation` for the slide-in effect on new tasks
- `.done` class triggers `text-decoration: line-through` and muted opacity
- Responsive at 480 px (stacked input row)

### JavaScript
- Pure vanilla JS — no libraries
- State held in a `tasks` array of `{ id, name, done }` objects
- Event delegation on `<ul>` handles all task interactions (complete + delete)
- `escapeHtml()` sanitizes task names before DOM insertion
- Filter logic applied at render time, not stored separately in the DOM

---

## Sample Output

```
Task Manager
Track what you need to get done today

[ Add a new task...              ] [ + Add task ]

[ All ]  [ Pending ]  [ Completed ]

○  Learn HTML
✓  ~~Learn CSS~~
○  Learn JavaScript

Total: 3   Completed: 1   Remaining: 2
```

---

## Author

Aaysha  
APJ Abdul Kalam Technological University
