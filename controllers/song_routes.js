const router = require('express').Router();
const { getSong } = require('../queries/get_song');
const Post = require('../models/Post');
const { authenticate, isAuthenticated } = require('../middleware/authenticate');


router.get('/song', isAuthenticated, authenticate, async (req, res) => {
    const id = req.query.id;
    const comment = req.query.comment;
    const song = await getSong(id);

    const songData = {
        track: song.name,
        artist: song.artists[0].name,
        album_cover: song.album.images[0].url,
        album_name: song.album.name,
        comment: comment
    }

    // Create a post
    try {
        const newPost = await Post.create(songData);

        // Add the Post to the user in the session
        await req.user.addPost(newPost);

        res.redirect('/profile');
    } catch (err) {
        console.log(err);
        if (err.errors) {
            req.session.errors = err.errors.map(errObj => errObj.message);
        }
        res.redirect('/profile');
    }
});

module.exports = router;