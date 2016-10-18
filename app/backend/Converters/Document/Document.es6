/**
 * Created by Stefan Hariton <hariton.stefan@outlook.com> on 14/10/16.
 */

'use strict';

import Hoek from 'hoek';
import Boom from 'boom';
import Joi from 'joi';
import BaseConverter from '../BaseConverter';

export default class Document extends BaseConverter {
  constructor(server, options) {
    super(server, options);
  }

  get path() {
    return '/document'
  }

  get method() {
    return 'POST'
  }

  get config() {
    return {
      payload: {
        output: 'stream',
        parse: true,
        maxBytes: '1073741824'
      },
      validate: {
        payload: {
          file: {
            hapi: {
              filename: Joi.string(),
              headers: {
                'content-disposition': Joi.any(),
                'content-type': Joi.any().valid(
                  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
                  'application/vnd.openxmlformats-officedocument.wordprocessingml.template',
                  'application/msword',
                  'application/vnd.palm',
                  'application/rtf',
                  'application/vnd.stardivision.writer',
                  'application/vnd.sun.xml.writer.template',
                  'application/vnd.oasis.opendocument.text'
                ).required(),
              }
            }
          }
        }
      }
    }
  }

  get handler() {
    return (request, reply) => {
      return reply(request.payload);
    }
  }
}

Document.register = (server, options, next) => {
  new Document(server, options);
  return next();
};

Document.register.attributes = {
  name: 'Document convert endpoint'
};

module.exports = Document;