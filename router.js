const express = require("express");
const router = express.Router();

const controller = require("./handel");

const cpu = new controller();

router.post("/use", async (req, res) => {
  try {
    let result = await cpu.insert_cpu(req.body);
    res.send(result);
  } catch (error) {
    res.status(400);
    res.send(error);
  }
});
router.get("/showmax", async (req, res) => {
  try {
    let result = await cpu.insert_cpu(req.body);
    res.send(result);
  } catch (error) {
    res.status(400);
    res.send(error);
  }
});
router.get("/showcurrent", async (req, res) => {
  try {
    let result = await cpu.insert_cpu(req.body);
    res.send(result);
  } catch (error) {
    res.status(400);
    res.send(error);
  }
});



module.exports = router;
