const router = require('express').Router();

// Send the user to /songs so they can choose which song they want to post
router.post('/profile', async (req, res) => {
    try {
        req.track = req.body.track;
        req.comment = req.body.comment;
        
        res.redirect(`/songs?id=${req.track}&comment=${req.comment}`);
    } catch (err) {
        console.log(err);
        if(err.errors) {
            req.session.errors = err.errors.map(errObj => errObj.message);
        }
        res.redirect('/profile');
    }
});

module.exports = router;