const express = require("express");
const path = require("path");

const compression = require("compression");
const bodyParser = require("body-parser");

const port = process.env.PORT || 9000;
const app = express();

app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "/build")));

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "/build", "index.html"));
});

app.listen(port, () => console.log("Connected"));
