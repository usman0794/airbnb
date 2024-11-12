let isLoggedin = (req, res, next) => {
  // console.log(req.user);
  if (!req.isAuthenticated()) {
    req.flash("error", "you must logged in to create listing");
    return res.redirect("/login");
  }
  next();
};

module.exports = isLoggedin;
