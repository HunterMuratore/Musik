const router = require('express').Router();

/* /post routes */

// Create a Post
router.post('/profile', async (req, res) => {
    try {

        req.track = req.body.track;

        res.redirect('/songs');
    } catch (err) {
        console.log(err);
        if(err.errors) {
            req.session.errors = err.errors.map(errObj => errObj.message);
        }
        res.redirect('/profile');
    }
});

module.exports = router;