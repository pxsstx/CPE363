import express from "express";
import session from "express-session";

const app = express();

// Configure Session Middleware
app.use(
  session({
    secret: "hello world",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }, // Set to true if using HTTPS
  }),
);

app.get("/", (req, res) => {
  res.type("html");
  res.send(`
    <a href="/add-session"> Add Session </a><br>
    <a href="/read-session"> Read Session </a><br>
    <a href="/delete-session"> Delete Session </a><br>
  `);
});

app.get("/add-session", (req, res) => {
  const sess = req.session;

  // Initialize values if they don't exist
  sess.host = sess.host || req.hostname;
  sess.cart = sess.cart || [];

  // Add a random number
  const r = Math.floor(Math.random() * 100);
  sess.cart.push(r);

  // Set expiration (3 minutes)
  sess.cookie.maxAge = 3 * 60 * 1000;

  res.type("html");
  res.send(`
    <h4>Session Item Added: ${r}</h4>
    <a href="/"> Back </a>
  `);
});

app.get("/read-session", (req, res) => {
  const sess = req.session;
  const cartItems = sess.cart ? sess.cart.join(", ") : "Empty";

  res.type("html");
  res.send(`
    <strong>Session ID:</strong> ${req.sessionID} <br>
    <strong>Host Name:</strong> ${sess.host || "Not set"} <br>
    <strong>Numbers in Cart:</strong> ${cartItems}
    <br><br>
    <a href="/"> Back </a>
  `);
});

app.get("/delete-session", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error("Logout Error:", err);
      return res.send("Error clearing session");
    }
    res.type("html");
    res.send(`
      <h4>Session destroyed</h4>
      <a href="/"> Back </a>
    `);
  });
});

const PORT = 8000;
app.listen(PORT, () =>
  console.log(`🚀 Server started at http://localhost:${PORT}`),
);
