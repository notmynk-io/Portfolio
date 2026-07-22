# Mayank Kumar Gupta Portfolio (Vanilla HTML, CSS, JavaScript & Python)

This directory contains a complete, clean, standalone copy of **Mayank Kumar Gupta's Portfolio** built exclusively with:
- **HTML5**: Semantic web structure
- **CSS3 / Tailwind CSS**: Cyberpunk dark styling with custom animations & glassmorphism
- **Vanilla JavaScript**: Interactive canvas, project filters, modal dialogs, and real-time radar telemetry simulators
- **Python 3**: Native `http.server` backend serving static files and handling POST requests to `/api/contact`

---

## 🚀 How to Run Locally with Python

No external `pip` dependencies or heavy frameworks required! You can run this directly with standard Python 3.

### 1. Open Terminal or Command Prompt in this folder:
```bash
cd vanilla
```

### 2. Start the Python Server:
```bash
python3 server.py
```

### 3. Open in Browser:
Navigate to `http://localhost:3000` in your browser.

---

## 📁 File Structure

- `index.html`: Main HTML file containing all sections (Hero, About Me, Projects, Interactive Lab, Skills, Contact, Modals)
- `styles.css`: Custom CSS scrollbar, range slider, and glassmorphism styles
- `script.js`: Vanilla JavaScript logic handling project rendering, filters, radar canvas simulator, particle canvas, modal triggers, and form submission API requests
- `server.py`: Python 3 standard library server handling static file serving on port 3000 and the `/api/contact` endpoint
