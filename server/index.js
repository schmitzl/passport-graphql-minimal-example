import express from 'express';
import passport from 'passport';
import {Strategy as LocalStrategy} from 'passport-local';
import session from 'express-session';
import cors from 'cors';
import bodyParser from 'body-parser';
import models from './models';
import typeDefs from './schema';
import resolvers from './resolvers';
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
import { makeExecutableSchema } from 'graphql-tools';

export const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});
 
const app = express();

app.use('*', cors({ origin: 'http://localhost:3000' }));

app.set('port', (process.env.PORT || 3001));

//--- Passport ----
app.use(session({ 
  saveUninitialized: true, 
  resave: false,
  secret: 'verysecretkey'
}));
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
    console.log('serialize ' + user.id)
    done(null, user);
  });

passport.deserializeUser((user, done) => {
  console.log('deserialize ' + user.id)
  done(null, user);
});

passport.use(new LocalStrategy(
  {
    usernameField: 'email',
    passwordField: 'password',
  },
  function(email, password, done) {
    models.User.findOne({
      where: {
          email: email
      }
    }).then(function(user) {
      if (user) {
        if (user.validPassword(password)) {
          return done(null, user);
        } else {
          return done(null, false);
        }
      } 
      return done(null, false);     
    });    
  }
));

//--- Routes ----
app.use('/graphiql', graphiqlExpress({ 
    endpointURL: '/graphql' 
}));

app.use(
  '/graphql',
  bodyParser.json(),
  graphqlExpress( (req) => {
    console.log('/graphql User: ' + req.user); // prints undefined
    return ({
    schema,
    context: {
      user: req.user,
    },
  });}),
);

app.use(bodyParser.urlencoded({ extended: true }) );
app.post('/login', passport.authenticate('local'), (req, res) => {
  console.log('/login: User', req.user); // prints the logged in user's data
  return res.sendStatus(200);
});

export default app;
