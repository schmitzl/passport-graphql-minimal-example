export default {
  Query: {
    hello: (parent, args, {user}) => user ? 'hi ' + user.name : 'hi',
  },
};