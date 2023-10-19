const router = require("express").Router();

// Import the User model
const User = require("../models/User.js");

// localhost:3333/auth/register
// Post request route that retrieves the form data(email, password) and creates a new user in the database, using our User model

router.post("/register", async (req, res) => {
  try {
    const user = await User.create(req.body);

    req.session.user_id = user.id;

    res.redirect("/");
  } catch (error) {
    // Set our session errors array to an array of just Sequelize error message strings
    req.session.errors = error.errors.map((errObj) => errObj.message);
    res.redirect("/register");
  }
});

router.post("/login", async (req, res) => {
  const user = await User.findOne({
    where: {
      email: req.body.email,
    },
  });

  // User not found with the email address provided
  if (!user) {
    req.session.errors = ["No user found with that email address."];

    return res.redirect("/login");
  }

  const pass_is_valid = await user.validatePass(req.body.password);

  // Check if password is invalid
  if (!pass_is_valid) {
    req.session.errors = ["Password is incorrect."];

    return res.redirect("/login");
  }

  // Log the user in
  req.session.user_id = user.id;

  res.redirect("/");
});

router.get("/logout", (req, res) => {
  req.session.destroy();

  res.redirect("/");
});

module.exports = router;
