const router = require('express').Router();
const Post = require('../models/Post');
const { authenticate, isAuthenticated } = require('../middleware/authenticate');

/* /post routes */

// Create a Post
router.post('/profile', isAuthenticated, authenticate, async (req, res) => {
    try {
        const post = await Post.create(req.body);

        // Add the Post to the user in the session
        await req.user.addPost(post);

        res.redirect('/profile');
    } catch (err) {
        req.session.errors = err.errors.map(errObj => errObj.message);
        res.redirect('/profile');
    }
});

module.exports = router;