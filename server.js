const express = require('express');
const view_routes = require('./controllers/view_routes');
const createPost_routes = require('./controllers/createPost_routes');
const user_routes = require('./controllers/user_routes');
const song_routes = require('./controllers/song_routes');
const db = require('./config/connection');
const { engine } = require('express-handlebars');
const session = require('express-session');
require('dotenv').config();

const PORT = process.env.PORT || 3333;

const app = express();

// Open Middleware channels
/* Handlebars Middleware */
app.engine('.hbs', engine({ extname: '.hbs' }));
app.set('view engine', '.hbs');
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));
/* Load Session Middleware */
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}));

// Open routes at the root level
app.use('/', view_routes, createPost_routes, song_routes);
app.use('/auth', user_routes);

// Sync and create tables
db.sync({ force: true })
    .then(() => {
        app.listen(PORT, () => console.log('Server started on port', PORT));
    });