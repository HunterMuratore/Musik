const router = require("express").Router();
const { Op } = require('sequelize');
const User = require("../models/User.js");

/* /auth routes */

router.post("/register", async (req, res) => {
  const data = req.body;

  try {
    const user = await User.create(data);

    req.session.user_id = user.id;

    res.redirect("/");
  } catch (error) {
    // Set our session errors array to an array of just Sequelize error message strings
    req.session.errors = error.errors.map((errObj) => errObj.message);
    res.redirect("/register");
  }
});

router.post("/login", async (req, res) => {
  const data = req.body;

  // Find the user with either the email or the username provided
  const user = await User.findOne({
    where: {
      [Op.or]: [
        { email: data.email },
        { username: data.username }
      ]
    },
  });

  // User not found with the email address provided
  if (!user) {
    req.session.errors = ["No user found with that email or username."];

    return res.redirect("/login");
  }

  const pass_is_valid = await user.validatePass(data.password);

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
