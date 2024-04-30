const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const router = require("./routes");

const app = express();

app.set("views", path.join(__dirname, "..", "views"));
app.set("view engine", "pug");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  express.static(path.join(__dirname, "..", "public"), { extensions: ["html"] })
);

app.use("/", router);

const port = process.env.PORT || 3000;
const url = `http://localhost:${port}/visitors`;
app.listen(port, () => {
  console.log(`Server is running on ${url}`);
});

module.export = { app };
