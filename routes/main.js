// Create a new router
const express = require("express");
const path = require("path"); // needed for sending files
const router = express.Router();

// ----------------------
// Main routes
// ----------------------

router.get("/", (req, res) => res.send("Hello World!")); 

router.get("/about", (req, res) => res.send("<h1>This is the about page</h1>"));

router.get('/contact', (req, res) => {
  res.send('<h1>Contact Page</h1><p>Email: myemail@example.com</p>');
});

router.get('/date', (req, res) => {
  const currentDate = new Date();
  res.send(`<h1>Date and Time</h1><p>${currentDate}</p>`);
});

// ----------------------
// Task 11: Route Chaining (using next())
// ----------------------

router.get('/chain', 
  (req, res, next) => {
    console.log('First function ran');
    next(); // go to the next function
  },
  (req, res) => {
    console.log('Second function ran');
    res.send('<h1>Route Chaining</h1><p>Both functions ran successfully!</p>');
  }
);

// ----------------------
// Task 12: Sending a file (a.html)
// ----------------------

// Sends an HTML file stored in the main project folder
router.get('/file', (req, res) => {
  // __dirname refers to the current folder (routes/)
  // We go one level up (../) to find a.html in the main project folder
  res.sendFile(path.join(__dirname, '../a.html'));
});

// ----------------------
// Export router
// ----------------------
module.exports = router;