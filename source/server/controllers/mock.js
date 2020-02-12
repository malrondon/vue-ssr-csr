const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    message: 'MOCK API',
  });
});

router.get('/accounts', (req, res) => {
  res.json({ message: '/accounts' });
});

export default router;
