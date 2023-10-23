const router = require('express').Router();
const { authenticate, isAuthenticated } = require('../middleware/authenticate');
const { getSong } = require('../queries/get_song');
const Post = require('../models/Post');

router.post('/profile', isAuthenticated, authenticate, async (req, res) => {
    try {
        const track = req.body.track;
        const comment = req.body.comment;

        const song = await getSong(track);

        const songData = {
            track: song.name,
            artist: song.artists[0].name,
            album_cover: song.album.images[0].url,
            album_name: song.album.name,
            audio_url: song.preview_url,
            comment: comment,
        };

        const newPost = await Post.create(songData);

        // Add the Post to the user in the session
        await req.user.addPost(newPost);

        res.redirect('/profile');
    } catch (err) {
        console.log(err);
        if (err.errors) {
            req.session.errors = err.errors.map((errObj) => errObj.message);
        }
        res.redirect('/profile');
    }
});

module.exports = router;