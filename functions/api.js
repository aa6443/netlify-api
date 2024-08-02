const express = require('express');
const serverless = require('serverless-http');
const app = express();
const router = express.Router();

app.use(express.json());

const userId = "john_doe_17091999";
const email = "john@xyz.com";
const rollNumber = "ABCD123";

router.get('/bfhl', (req, res) => {
  res.status(200).json({ operation_code: 1 });
});

router.post('/bfhl', (req, res) => {
  const data = req.body.data;
  if (!Array.isArray(data)) {
    return res.status(400).json({ is_success: false, message: "Invalid input data format" });
  }

  const numbers = [];
  const alphabets = [];
  let highestAlphabet = "";

  data.forEach(item => {
    if (!isNaN(item)) {
      numbers.push(item);
    } else if (typeof item === 'string' && /^[A-Za-z]$/.test(item)) {
      alphabets.push(item);
      if (!highestAlphabet || item.toUpperCase() > highestAlphabet.toUpperCase()) {
        highestAlphabet = item;
      }
    }
  });

  res.json({
    is_success: true,
    user_id: userId,
    email: email,
    roll_number: rollNumber,
    numbers,
    alphabets,
    highest_alphabet: highestAlphabet ? [highestAlphabet] : []
  });
});

app.use('/.netlify/functions/api', router);

module.exports = app;
module.exports.handler = serverless(app);
