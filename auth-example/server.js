const http = require('http');
const path = require('path');
const express = require('express');
const helmet = require('helmet');
const passport = require('passport');
const { Strategy } = require('passport-google-oauth20');

const app = express();

const GOOGLE_CLIENT_ID = '720033713150-klomv10v4qg9f7ovjlfjo8p8lr8n76be.apps.googleusercontent.com';
const GOOGLE_CLIENT_SECRET = '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';

passport.use(
  new Strategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: '/auth/google/callback',
    },
    function (accessToken, refreshToken, profile, cb) {
      console.log(profile);
      return cb(null, profile);
    },
  ),
);

app.use(helmet());
app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'public')));

function verifyCallback(req, res) {
  // Successful authentication, redirect home.
  res.redirect('/');
}

app.get('/auth/google', passport.authenticate('google', { scope: ['email', 'profile'] }));

app.get(
  '/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/fail', session: false }),
  verifyCallback,
);

app.get('/fail', (req, res) => {
  res.send('failed login google');
});

app.get('/secret', (req, res) => {
  res.send('Sectret 42');
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '.', 'public', 'index.html'));
});

http.createServer(app).listen(3000);
