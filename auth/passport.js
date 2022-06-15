const GitHubStrategy = require("passport-github2").Strategy;
const passport = require("passport");

GITHUB_CLIENT_ID = "089bddea47eeab5fcc52";
GITHUB_CLIENT_SECRET = "02263790af275ae169b07704d822cafa38bd229b";

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
