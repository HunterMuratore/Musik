const router = require('express').Router();
const Post = require('../models/Post');
const { getSpotifyData } = require('../queries/get_song');

/* /post routes */

// Create a Post
router.post('/profile', async (req, res) => {
    try {
        const data = getSpotifyData(req.body.track);

        const songData = {
            track: data.items[0],
            genre: data.items[0],
            artist: data.items[0],
            album_cover: "",
            comment: req.body.comment
        }

        console.log(songData);

        // const post = await Post.create(songData);

        // // Add the Post to the user in the session
        // await req.user.addPost(post);

        res.redirect('/profile');
    } catch (err) {
        req.session.errors = err.errors.map(errObj => errObj.message);
        res.redirect('/profile');
    }
});

module.exports = router;