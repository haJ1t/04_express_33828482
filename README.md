# 🌐 Express.js Web Application — Halit Ozger

A clean, modern, and fully responsive **Express.js web application** featuring server-side rendering, environment-aware content, and an animated glassmorphism UI.  
Built with Node.js and Express to demonstrate structured routing, modular design, and elegant front-end presentation — all without external frameworks.

---

## ✨ Features

- ⚡ **Express.js Framework** — clean routing, middleware chaining, and modular architecture  
- 🧠 **Environment Detection** — dynamically displays user-agent, language, and device type  
- 🎨 **Glassmorphism Design** — blurred glass panels, animated gradients, smooth transitions  
- 📄 **Static File Serving** — HTML file sent using `res.sendFile()`  
- 🧩 **Dynamic Routing** — includes parameterized routes and route chaining with `next()`  
- 📱 **Fully Responsive** — adapts beautifully to all screen sizes  
- 🔒 **Lightweight & Secure** — pure Node.js and Express, no unnecessary dependencies  

---

## 🧱 Project Structure
express-app/
│
├── index.js               # Main server file
├── routes/
│   └── main.js            # Route handlers
├── a.html                 # Static file served via /file
├── package.json           # Dependencies & scripts
└── README.md              # Documentation

---

## 🧭 Routes

| Route | Description |
|-------|--------------|
| `/` | Home page displaying system & environment info |
| `/about` | About section with background and interests |
| `/contact` | Contact page with email and details |
| `/date` | Displays current date and time |
| `/welcome/:name` | Personalized greeting route |
| `/chain` | Demonstrates route chaining and `next()` usage |
| `/file` | Sends `a.html` via `res.sendFile()` |

---

## 🎨 Design Highlights

The web interface follows a **modern glassmorphism aesthetic** enhanced with fluid animations and gradient motion.  

**Key design features:**
- Dynamic gradient background (animated via keyframes)
- Soft depth shadows and glowing card borders
- Smooth fade and slide-in animations for content
- Interactive navigation hover effects
- Fully responsive layout for desktop and mobile devices

**Visual Principles:**
- Minimalistic, high-contrast typography  
- Consistent color palette (cyan, navy, steel blue)  
- Accessibility-conscious contrast ratios  

---