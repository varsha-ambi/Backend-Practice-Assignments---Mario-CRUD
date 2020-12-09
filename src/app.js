const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const marioModel = require("./models/marioChar");

// Middlewares
app.use(express.urlencoded());

// Parse JSON bodies (as sent by API clients)
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// your code goes here

app.get("/mario", async (req, res) => {
  try {
    const details = await marioModel.find();
    res.json(details);
  } catch (error) {
    res.status(400).send(`error:${error}`);
  }
});

app.get("/mario/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const detailById = await marioModel.findById(_id);
    res.json(detailById);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});
app.post("/mario", async (req, res) => {
  try {
    if (req.body.name.trim() === "" || req.body.weight < 0) {
      res.status(400).send({ message: "either name or weight is missing" });
    }
  } catch (err) {
    res.status(400).send({ message: "either name or weight is missing" });
  }

  try {
    const addingChar = new marioModel(req.body);
    const newChar = await addingChar.save();
    res.status(201).send(newChar);
  } catch (error) {
    res.status(400).send({ message: "either name or weight is missing" });
  }
});
app.patch("/mario/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const updateById = await marioModel.findByIdAndUpdate(_id, req.body, {
      new: true
    });
    res.json(updateById);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});
app.delete("/mario/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    await marioModel.findByIdAndDelete(_id);
    res.json({ message: "character deleted" });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

module.exports = app;
