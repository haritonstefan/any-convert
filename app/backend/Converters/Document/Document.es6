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
        maxBytes: '1073741824',
        allow: 'multipart/form-data'
      },
      validate: {
        payload: {
          file: {
            'hapi': {
              'headers': {
                'content-type': Joi.string().valid(
                  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
                  'application/vnd.openxmlformats-officedocument.wordprocessingml.template',
                  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                  'application/msword',
                  'application/vnd.ms-excel',
                  'application/vnd.palm',
                  'application/rtf',
                  'application/vnd.stardivision.writer',
                  'application/vnd.sun.xml.writer.template',
                  'application/vnd.oasis.opendocument.text'
                )
              }
            }
          }
        },
        options: {
          allowUnknown: true
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