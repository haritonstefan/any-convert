/**
 * Created by Stefan Hariton <hariton.stefan@outlook.com> on 14/10/16.
 */

'use strict';

import Hapi from 'hapi';
import Good from 'good';
import Hoek from 'hoek';
import Boom from 'boom';

import App from './backend/app';

const server = new Hapi.Server();

const goodOptions = {
  ops: {
    interval: 1000
  },
  reporters: {
    console: [
      {
        module: 'good-squeeze',
        name: 'Squeeze',
        args: [{log: '*', response: '*'}]
      },
      {
        module: 'good-console'
      },
      'stdout'
    ]
  }
};

server.connection({
  port: '8080',
});

server.route({
  method: ['GET', 'POST', 'PUT', 'DELETE'],
  path: '/ping',
  handler: (request, reply) => {
    return reply(request.headers)
  }
});

server.register([
  {
    register: Good,
    options: goodOptions,
  },
  {
    register: require('blipp'),
  },
  {
    register: require('inert')
  }
],
  (err) => {
    Hoek.assert(!err, Boom.internal(err));

    server.register([
      {
        register: App,
        routes: {
          prefix: '/api'
        }
      }
    ],
      (err) => {
        Hoek.assert(!err, Boom.internal(err));

        server.start(err => {
          Hoek.assert(!err, Boom.internal(err));
        });

        console.info(`Server running at: ${server.info.uri}`);
      }
    )
  }
);