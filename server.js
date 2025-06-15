import express from "express";
import qrcode from "qrcode";
const app = express();
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
const urlDB = {};

app.get("/", (req, res) => {
  res.render("index", { shortUrl: null });
});

app.post("/", async (req, res) => {
  const id = Math.random().toString(36).slice(2, 8);
  const longUrl = req.body.longUrl;
  const shortUrl = `http://localhost:3000/${id}`;
  urlDB[id] = longUrl;
  const qrc = await qrcode.toDataURL(shortUrl);
  res.render("index", { shortUrl, qrc });
});

app.get("/:id", (req, res) => {
  res.redirect(urlDB[req.params.id]);
});

app.listen(3000);
