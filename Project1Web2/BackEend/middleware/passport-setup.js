const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/UsersModel'); // Reemplaza con tu modelo de usuario

passport.use(new GoogleStrategy({
    clientID: '485381445112-4bsedqg2hn68ju8bgtf2goluuau3a3dh.apps.googleusercontent.com',
    clientSecret: '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',
    callbackURL: 'http://localhost:3001/api/auth/google/callback'
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      let user = await User.findOne({ googleId: profile.id });

      if (!user) {
        user = new User({
          googleId: profile.id,
          firstName: profile.name.givenName,
          Lastname: profile.name.familyName,
          email: profile.emails[0].value
        });
        await user.save();
      }

      return done(null, user);
    } catch (error) {
      return done(error);
    }
  }
));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});