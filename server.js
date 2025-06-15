import express from "express";
const app = express();
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
const urlDB = {};

app.get("/", (req, res) => {
  res.render("index", { shortUrl: null });
});

app.post("/", (req, res) => {
  const id = Math.random().toString(36).slice(2, 8);
  urlDB[id] = req.body.longUrl;
  res.render("index", { shortUrl: `http://localhost:3000/${id}` });
});

app.get("/:id", (req, res) => {
  res.redirect(urlDB[req.params.id]);
});

app.listen(3000);
