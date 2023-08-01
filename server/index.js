const express = require("express");
const app = express();
require("dotenv").config();
const connection = require("./config/connection");
const cookieParser = require("cookie-parser");
const path = require("path");
const port = process.env.PORT;

connection();
//middleware
app.use(express.json());
app.use(cookieParser());
app.use(require("./routes/userRoute"));
app.use(require("./routes/transactionRoute"));

__dirname = path.resolve();
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/client/build")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.status(200).send("Home Page");
  });
}

app.listen(port, () => {
  console.log(`Listening at port ${port}`);
});
