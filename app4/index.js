import express from "express";
import cookieParser from "cookie-parser";

const port = 8000;
const app = express();

app.use(cookieParser());

app.get("/", (req, res) => {
  res.type("html");
  res.send(`
        <a href="/setcookies"> Set Cookies </a><br>
        <a href="/getcookies"> Get Cookies </a><br>
        <a href="/clearcookies"> Clear Cookies </a><br>
        `);
});

app.get("/setcookies", (req, res) => {
  const time = 5 * 60 * 1000; // 5 min
  res.cookie("name", "Tom Jerry", { maxAge: time });
  res.cookie("email", "tomjerry@test.com", { maxAge: time });
  res.cookie("year_born", 1990, { maxAge: time });

  res.send(`<h4>Cookies Set</h4>
            <a href="/">Back</a>`);
});

app.get("/getcookies", (req, res) => {
  const y = new Date().getFullYear();
  const yb = parseInt(req.cookies.year_born || y);
  res.send(`name => ${req.cookies.name || ""}<br>
    email => ${req.cookies.email || ""}<br>
    age => ${y - yb || ""}<br>
    <a href="/">Back</a>
    `);
});

app.get("/clearcookies", (req, res) => {
  res.clearCookie("name");
  res.clearCookie("email");
  res.clearCookie("year_born");
  res.send(`<h4>Cookies Cleared</h4>
            <a href="/">Back</a>`);
});

app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});
