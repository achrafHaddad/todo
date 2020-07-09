const passport = require("passport");
const BearerStrategy = require("passport-http-bearer").Strategy;
const User = require("./model/user.schema");
const jwt = require("jsonwebtoken");

passport.use(
  new BearerStrategy((token, done) => {
    jwt.verify(token, "secret", (err, decoded) => {
      User.findOne({ email: decoded.data.email }, (err, user) => {
        if (!user) {
          return done(null, false);
        }
        if (err) {
          return done(null, false);
        }
        return done(null, { user });
      });
    });
  })
);
