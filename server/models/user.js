const bcrypt   = require('bcrypt-nodejs');

'use strict';
module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {});

  User.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
  };

  User.prototype.validPassword= function(password) {
    return bcrypt.compareSync(password, this.password);
  };

  User.beforeCreate((user, options) => {
    const hashedPw = User.generateHash(user.password);
    user.password = hashedPw;
  });

  return User;
};