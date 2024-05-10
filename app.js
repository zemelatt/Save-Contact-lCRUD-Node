const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const cors = require("cors");

const router = require("./route/route");

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", router);

const server = app.listen(2222, () => {
  console.log("Server runing on 2222");
});
