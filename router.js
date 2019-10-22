const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send('chat app is live');
});

module.exports = router;
