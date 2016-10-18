/**
 * Created by Stefan Hariton <hariton.stefan@outlook.com> on 14/10/16.
 */

'use strict';

import Hoek from 'hoek';
import Boom from 'boom';

import Converters from './Converters/Converters';

const App = {
  register: (server, options, next) => {
    server.register([
      {
        register: require('./Converters/Document/Document'),
        options: options,
        routes: {
          prefix: '/api/convert'
        }
      }
    ], err => {
      Hoek.assert(!err, Boom.badImplementation(err));
      return next();
    })
  }
};

App.register.attributes = {
  name: 'Any-Convert'
};

module.exports = App;