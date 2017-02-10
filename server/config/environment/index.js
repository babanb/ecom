'use strict';

var path = require('path');
var _ = require('lodash');

function requiredProcessEnv(name) {
  if (!process.env[name]) {
    throw new Error('You must set the ' + name + ' environment variable');
  }
  return process.env[name];
}

// All configurations will extend these options
// ============================================
var all = {
  env: process.env.NODE_ENV,

  // Root path of server
  root: path.normalize(__dirname + '/../../..'),

  // Server port
  port: process.env.PORT || 9000,

  // Server IP
  ip: process.env.IP || '0.0.0.0',

  // Should we populate the DB with sample data?
  seedDB: false,

  // Secret for session, you will want to change this and make it an environment variable
  secrets: {
    session: 'juskart-secret'
  },

  // MongoDB connection options
  mongo: {
    options: {
      db: {
        safe: true
      }
    }
  },

  facebook: {
    clientID:     process.env.FACEBOOK_ID || 'id',
    clientSecret: process.env.FACEBOOK_SECRET || 'secret',
    callbackURL:  (process.env.DOMAIN || '') + '/auth/facebook/callback'
  },

  google: {
    clientID:     process.env.GOOGLE_ID || '395593907364-cc9p9l4njfd08koqqoouqucgd2u4hbo6.apps.googleusercontent.com',
    clientSecret: process.env.GOOGLE_SECRET || '9eXPEtNFE2zqIvXB8p5-LJ_2',
    callbackURL:  (process.env.DOMAIN || '') + 'http://ec2-54-187-15-116.us-west-2.compute.amazonaws.com:9000/auth/google/callback'
  },

  email: {
    user:         'darshanmyself@gmail.com',
    pass:         'Nikhil@1989',
    fromEmail:    'darshanmyself@gmail.com',
    emailHead:    'JUSKART',
    bcc:    'anil.16sg@gmail.com'

  }
};

// Export the config object based on the NODE_ENV
// ==============================================
module.exports = _.merge(
  all,
  require('./shared'),
  require('./' + process.env.NODE_ENV + '.js') || {});
