// routes/main.js
// All route handlers

const express = require("express");
const path = require("path");
const router = express.Router();

// Template function
function pageTemplate({ title, heading, subheading, paragraphs = [] }) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <title>${title}</title>
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: 'Poppins', 'Segoe UI', sans-serif;
      background: linear-gradient(120deg, #0f2027, #203a43, #2c5364, #1a2a6c);
      background-size: 400% 400%;
      animation: gradient 12s ease infinite;
      color: #f2f2f2;
      min-height: 100vh;
      display: flex; align-items: center; justify-content: center;
      padding: 50px 20px;
    }
    @keyframes gradient {
      0% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    }
    main {
      background: rgba(255,255,255,0.1);
      backdrop-filter: blur(20px);
      border: 1px solid rgba(255,255,255,0.2);
      border-radius: 25px;
      padding: 50px 60px;
      max-width: 880px;
      box-shadow: 0 20px 50px rgba(0,0,0,0.4);
      animation: fadeUp 1s ease forwards;
      transform: translateY(40px);
      opacity: 0;
    }
    @keyframes fadeUp { to { transform: translateY(0); opacity: 1; } }
    main::before {
      content: "";
      position: absolute;
      inset: 0;
      border-radius: 25px;
      padding: 2px;
      background: linear-gradient(135deg, #00d2ff, #3a7bd5, #2c5364, #00d2ff);
      background-size: 300% 300%;
      -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
      -webkit-mask-composite: xor;
              mask-composite: exclude;
      animation: glow 10s linear infinite;
    }
    @keyframes glow {
      0% { background-position: 0% 50%; }
      100% { background-position: 300% 50%; }
    }
    h1 {
      font-size: 2.8rem;
      text-align: center;
      background: linear-gradient(90deg, #00d2ff, #3a7bd5, #5f9ea0);
      -webkit-background-clip: text;
      color: transparent;
      margin-bottom: 10px;
    }
    h2 { text-align: center; color: #ccc; margin-bottom: 25px; }
    nav { text-align: center; margin-bottom: 35px; }
    nav a {
      color: #00d2ff; text-decoration: none; margin: 0 15px; font-weight: 600;
      position: relative; transition: color 0.3s;
    }
    nav a:hover { color: #89f7fe; }
    p { margin-bottom: 18px; font-size: 1.1rem; color: #e8e8e8; line-height: 1.8; }
    footer { text-align: center; margin-top: 35px; font-size: 0.9rem; color: #aaa; }
    @media (max-width: 600px) {
      main { padding: 30px; }
      h1 { font-size: 2rem; }
      nav a { margin: 0 8px; font-size: 0.95rem; }
    }
  </style>
</head>
<body>
  <main>
    <nav>
      <a href="/">Home</a> |
      <a href="/about">About</a> |
      <a href="/contact">Contact</a> |
      <a href="/date">Date</a> |
      <a href="/welcome/Halit">Welcome</a> |
      <a href="/chain">Chain</a> |
      <a href="/file">File</a>
    </nav>
    <h1>${heading}</h1>
    <h2>${subheading}</h2>
    ${paragraphs.map(p => `<p>${p}</p>`).join("\n")}
    <footer>© ${new Date().getFullYear()} Halit Ozger</footer>
  </main>
</body>
</html>`;
}

// Env info
function environmentMessage(req) {
  const ua = req.headers["user-agent"] || "";
  const lang = (req.headers["accept-language"] || "en").split(",")[0];
  const isMobile = /mobile|iphone|android/i.test(ua);
  return [
    `User-Agent: ${ua}`,
    `Language: ${lang}`,
    `Device: ${isMobile ? "mobile" : "desktop"}`,
    `Method: ${req.method}`,
    `URL: ${req.originalUrl}`,
  ];
}

// Home route
router.get("/", (req, res) => {
  res.send(
    pageTemplate({
      title: "Halit Ozger — Home",
      heading: "Halit Ozger",
      subheading: "Computer Science, Goldsmiths",
      paragraphs: [
        "Welcome to my Express web app.",
        "This app demonstrates routing and design.",
        ...environmentMessage(req),
      ],
    })
  );
});

// About route
router.get("/about", (req, res) => {
  res.send(
    pageTemplate({
      title: "About — Halit Ozger",
      heading: "About Me",
      subheading: "Background & Skills",
      paragraphs: [
        "I'm a Computer Science student at Goldsmiths.",
        "Focused on algorithms, web apps, and cybersecurity.",
        ...environmentMessage(req),
      ],
    })
  );
});

// Contact route
router.get("/contact", (req, res) => {
  res.send(
    pageTemplate({
      title: "Contact — Halit Ozger",
      heading: "Contact Me",
      subheading: "Get in touch",
      paragraphs: [
        "Email: <a href='mailto:myemail@example.com'>myemail@example.com</a>",
        "Available for collaborations or projects.",
        ...environmentMessage(req),
      ],
    })
  );
});

// Date route
router.get("/date", (req, res) => {
  const currentDate = new Date();
  res.send(
    pageTemplate({
      title: "Date — Halit Ozger",
      heading: "Current Date & Time",
      subheading: "Generated dynamically",
      paragraphs: [`Server time: ${currentDate}`, ...environmentMessage(req)],
    })
  );
});

// Welcome route
router.get("/welcome/:name", (req, res) => {
  const name = req.params.name;
  res.send(
    pageTemplate({
      title: "Welcome",
      heading: `Welcome, ${name}!`,
      subheading: "Personalized Greeting",
      paragraphs: [
        `Hello ${name}, nice to meet you.`,
        "This shows parameterized routing.",
        ...environmentMessage(req),
      ],
    })
  );
});

// Chain route
router.get(
  "/chain",
  (req, res, next) => {
    console.log("First middleware");
    next();
  },
  (req, res) => {
    console.log("Second middleware");
    res.send(
      pageTemplate({
        title: "Route Chain",
        heading: "Chaining Example",
        subheading: "Both middlewares ran",
        paragraphs: [
          "Demonstrates use of next().",
          ...environmentMessage(req),
        ],
      })
    );
  }
);

// File route
router.get("/file", (req, res) => {
  res.sendFile(path.join(__dirname, "../a.html"));
});

module.exports = router;