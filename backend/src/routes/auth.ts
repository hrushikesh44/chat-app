import express from 'express';

const router = express.Router();

router.post('/signup', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
});

export default router;
