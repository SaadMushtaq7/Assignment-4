const GitHubStrategy = require("passport-github2").Strategy;
const passport = require("passport");

GITHUB_CLIENT_ID = "089bddea47eeab5fcc52";
GITHUB_CLIENT_SECRET = "aba4b4f99519a50207a73f64ff4b6d66cd44da17";

passport.use(
  new GitHubStrategy(
    {
      clientID: GITHUB_CLIENT_ID,
      clientSecret: GITHUB_CLIENT_SECRET,
      callbackURL: "/auth/github/callback",
    },
    function (accessToken, refreshToken, profile, done) {
      done(null, profile);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser((user, done) => {
  done(null, user);
});
