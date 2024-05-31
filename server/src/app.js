// packages
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");


const app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://smart-calendar-frontend.vercel.app",
    ],
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  })
);


app.get("/", (_, res) => {
  try {
    console.log({
      level: "info",
      message: "Welcome to the slack chatgpt backend!",
      meta: {
        file: "index.js",
        timestamp: new Date().toISOString(),
      },
    });
    res.status(200).send("Welcome to the slack chatgpt backend!");
  } catch (error) {
    console.log(`Error in getting root: ${error.message}`, error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = app;
