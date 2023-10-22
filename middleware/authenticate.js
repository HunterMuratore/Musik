const User = require('../models/User');

// Custom Middleware function to check if the user is already logged in
function isLoggedIn(req, res, next) {
    if (req.session.user_id) {
        return res.redirect('/');
    }

    next();
}

// Check that the user is authenticated or send them to the login page
function isAuthenticated(req, res, next) {
    if (!req.session.user_id) {
        return res.redirect('/login');
    }

    next();
}

// Authenticate a user
async function authenticate(req, res, next) {
    const user_id = req.session.user_id;
    
    if (user_id) {
        // Access to the user id stored in the login route
        const user = await User.findByPk(user_id, {
            attributes: ['id', 'username']
        });

        if (user) {
            // Assign the Sequelize model instance to req.user
            req.user = user;
        } else {
            req.user = null;
        }
    }

    next();
}

module.exports = { authenticate, isLoggedIn, isAuthenticated }