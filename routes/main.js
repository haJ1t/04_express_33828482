// routes/main.js
// ----------------------------------------------------------
// Express router containing all routes for Lab 4
// Includes full design template and environment details
// ----------------------------------------------------------

const express = require("express");
const path = require("path");
const router = express.Router();

// ----------------------
// Page Template (Halit Ozger Design)
// ----------------------
function pageTemplate({ title, heading, subheading, paragraphs = [] }) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <title>${title}</title>
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <style>
    /* Reset */
    * { box-sizing: border-box; margin: 0; padding: 0; }

    /* Animated gradient background */
    body {
      font-family: 'Poppins', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      background: linear-gradient(120deg, #0f2027, #203a43, #2c5364, #1a2a6c);
      background-size: 400% 400%;
      animation: gradientMove 12s ease infinite;
      color: #f2f2f2;
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 50px 20px;
      overflow-x: hidden;
    }

    @keyframes gradientMove {
      0% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    }

    main {
      position: relative;
      background: rgba(255,255,255,0.1);
      backdrop-filter: blur(20px);
      border: 1px solid rgba(255,255,255,0.2);
      border-radius: 25px;
      padding: 50px 60px;
      max-width: 880px;
      width: 100%;
      box-shadow: 0 20px 50px rgba(0,0,0,0.4);
      animation: floatUp 1.2s ease forwards;
      transform: translateY(40px);
      opacity: 0;
      overflow: hidden;
    }

    @keyframes floatUp {
      to { transform: translateY(0); opacity: 1; }
    }

    /* Subtle glowing border animation */
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
      animation: glowMove 10s linear infinite;
    }

    @keyframes glowMove {
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
      letter-spacing: 1px;
      animation: fadeSlideDown 1.2s ease both;
    }

    @keyframes fadeSlideDown {
      from { opacity: 0; transform: translateY(-20px); }
      to { opacity: 1; transform: translateY(0); }
    }

    h2 {
      text-align: center;
      font-weight: 400;
      font-size: 1.25rem;
      color: #cfd9df;
      margin-bottom: 25px;
      animation: fadeSlideDown 1.4s ease both;
    }

    nav {
      text-align: center;
      margin-bottom: 35px;
    }

    nav a {
      color: #00d2ff;
      text-decoration: none;
      margin: 0 15px;
      font-weight: 600;
      position: relative;
      letter-spacing: 0.5px;
      transition: color 0.3s, transform 0.2s;
    }

    nav a::after {
      content: "";
      position: absolute;
      left: 0;
      bottom: -4px;
      width: 0;
      height: 2px;
      background: #00d2ff;
      transition: width 0.3s ease;
    }

    nav a:hover {
      color: #89f7fe;
      transform: translateY(-2px);
    }

    nav a:hover::after {
      width: 100%;
    }

    p {
      margin-bottom: 18px;
      font-size: 1.1rem;
      color: #e8e8e8;
      line-height: 1.8;
      animation: fadeInText 1.3s ease both;
    }

    @keyframes fadeInText {
      from { opacity: 0; transform: translateY(8px); }
      to { opacity: 1; transform: translateY(0); }
    }

    footer {
      text-align: center;
      margin-top: 35px;
      font-size: 0.9rem;
      color: #aaa;
      animation: fadeInText 1.5s ease both;
    }

    /* Add smooth glow hover effect for main */
    main:hover {
      box-shadow: 0 0 35px rgba(0, 210, 255, 0.25);
      transition: box-shadow 0.5s ease;
    }

    /* Responsive */
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

// ----------------------
// Helper: Environment Message
// ----------------------
function environmentMessage(req) {
  const ua = req.headers["user-agent"] || "";
  const lang = (req.headers["accept-language"] || "en").split(",")[0];
  const isMobile = /mobile|iphone|android/i.test(ua);
  const device = isMobile ? "mobile" : "desktop";

  return [
    `User-Agent: ${ua}`,
    `Primary language: ${lang}`,
    `Detected device: ${device}`,
    `HTTP method: ${req.method}`,
    `Requested URL: ${req.originalUrl}`,
  ];
}

// ----------------------
// Task 3–8: Core routes
// ----------------------
router.get("/", (req, res) => {
  res.send(
    pageTemplate({
      title: "Halit Ozger — Home",
      heading: "Halit Ozger",
      subheading: "Computer Science (Year 3), Goldsmiths, University of London",
      paragraphs: [
        "Welcome to my professional Express web application for coursework.",
        "This site demonstrates clean design, routing, and server-side rendering with Node.js.",
        ...environmentMessage(req),
      ],
    })
  );
});

router.get("/about", (req, res) => {
  res.send(
    pageTemplate({
      title: "About — Halit Ozger",
      heading: "About Me",
      subheading: "Background & Interests",
      paragraphs: [
        "I am Halit Ozger, a Computer Science student at Goldsmiths, University of London.",
        "I specialize in algorithms, cybersecurity, and creative JavaScript applications.",
        "I also develop interactive web systems and Node.js applications.",
        ...environmentMessage(req),
      ],
    })
  );
});

router.get("/contact", (req, res) => {
  res.send(
    pageTemplate({
      title: "Contact — Halit Ozger",
      heading: "Contact Me",
      subheading: "Get in Touch",
      paragraphs: [
        "You can reach me at: <a href='mailto:myemail@example.com'>myemail@example.com</a>",
        "Feel free to contact for collaborations, web development or security projects.",
        ...environmentMessage(req),
      ],
    })
  );
});

router.get("/date", (req, res) => {
  const currentDate = new Date();
  res.send(
    pageTemplate({
      title: "Date — Halit Ozger",
      heading: "Current Date and Time",
      subheading: "Generated dynamically using JavaScript",
      paragraphs: [`The current date and time is: ${currentDate}`, ...environmentMessage(req)],
    })
  );
});

// ----------------------
// Task 10: Parameterised route
// ----------------------
router.get("/welcome/:name", (req, res) => {
  const userName = req.params.name;
  res.send(
    pageTemplate({
      title: "Welcome Page",
      heading: `Welcome, ${userName}!`,
      subheading: "Personalized Greeting",
      paragraphs: [
        `Hello ${userName}, glad to have you here!`,
        "This route demonstrates Express route parameters.",
        ...environmentMessage(req),
      ],
    })
  );
});

// ----------------------
// Task 11: Route chaining
// ----------------------
router.get(
  "/chain",
  (req, res, next) => {
    console.log("First function ran");
    next();
  },
  (req, res) => {
    console.log("Second function ran");
    res.send(
      pageTemplate({
        title: "Chained Route",
        heading: "Route Chaining Example",
        subheading: "Both middleware functions executed successfully",
        paragraphs: [
          "This demonstrates use of <code>next()</code> to chain multiple route handlers.",
          ...environmentMessage(req),
        ],
      })
    );
  }
);

// ----------------------
// Task 12: Send a file
// ----------------------
router.get("/file", (req, res) => {
  res.sendFile(path.join(__dirname, "../a.html"));
});

// Export router
module.exports = router;