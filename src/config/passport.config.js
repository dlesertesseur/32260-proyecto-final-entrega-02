import * as dotenv from "dotenv";
import passport from "passport";
import GithubStrategy from "passport-github2";
import local from "passport-local";

import { authenticate, registerUser } from "../services/auth.service.js";
import { findByEmail } from "../services/user.service.js";
import { createHash } from "../util/Crypt.js";

dotenv.config();

const LocalStrategy = local.Strategy;

const initializePassport = () => {
  passport.serializeUser((user, done) => {
    done(null, user.email);
  });

  passport.deserializeUser(async (email, done) => {
    try {
      const user = await findByEmail(email);
      done(null, user);
    } catch (error) {
      done(error);
    }
  });

  passport.use(
    "github",
    new GithubStrategy(
      {
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_SECRET,
        callbackURL: process.env.CALLBACK_URL,
        scope: ["user:email"],
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          let user = await findByEmail(profile.emails[0].value);

          if (!user) {
            let newUser = {
              first_name: profile._json.login,
              last_name: profile._json.login,
              age: 18,
              email: profile.emails[0].value,
              password: createHash("123")
            };

            let result = await registerUser(newUser);
            done(null, result);
          } else {
            done(null, user);
          }
        } catch (error) {
          done(error);
        }
      }
    )
  );
};

passport.use(
  "register",
  new LocalStrategy(
    { passReqToCallback: true, usernameField: "email" },
    async (req, username, password, done) => {
      try {
        const newUser = { ...req.body };
        newUser.password = createHash(newUser.password);

        const user = await registerUser(newUser);
        done(null, user);
      } catch (error) {
        done(error);
      }
    }
  )
);

passport.use(
  new LocalStrategy(
    { usernameField: "email" , passReqToCallback: true},
    async ( req, username, password, done) => {
      try {
        const user = await authenticate({
          email: username,
          password: password,
        });

        done(null, user);
      } catch (error) {
        done(null, false, req.flash('loginMessage', error.message))
      }
    }
  )
);

export default initializePassport;
