# passport-graphql-minimal-example
This is a minimal example illustrating the problems I have setting up a passport session with a client and a GraphQL server. The issue it is illustrating it described and solved in this [Stackoverflow thread](https://stackoverflow.com/questions/49036910/graphql-and-passport-session-access-req-user-when-querying-graphql).

The fix for the problem can be found in the branch `fix`.

## Setting up the project
Create the postgres database `database_development`.

Then install the node modules like this:
```
npm i && cd client && npm i && cd ..
```

After that you can start the project with 
```
npm start
```
