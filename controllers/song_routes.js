const router = require('express').Router();
const { getSongsByTitle } = require('../queries/get_song');
const { authenticate, isAuthenticated } = require('../middleware/authenticate');

router.get('/song/:title', isAuthenticated, authenticate, async (req, res) => {
  try {
    const results = await getSongsByTitle(req.params.title);
    res.json(results.items);
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
