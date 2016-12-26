/**
 * Created by Stefan Hariton <hariton.stefan@outlook.com> on 14/10/16.
 */

'use strict';

import Hoek from 'hoek';
import Boom from 'boom';
import Joi from 'joi';
import BaseConverter from '../BaseConverter';
import { saveFile } from '../../Utils/utils';
import unoconv from 'unoconv2';
import mime from 'mime-types';

console.log();

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
          to: Joi.string().valid(
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            'application/vnd.openxmlformats-officedocument.wordprocessingml.template',
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            'application/msword',
            'application/vnd.ms-excel',
            'application/vnd.palm',
            'application/rtf',
            'application/vnd.stardivision.writer',
            'application/vnd.sun.xml.writer.template',
            'application/vnd.oasis.opendocument.text',
            'application/pdf'
          ),
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
      let path = saveFile(request.payload.file);
      let filename = request.payload.file.hapi.filename;

      unoconv.convert(path, request.payload.to, (err, result) => {
        Hoek.assert(err, Boom.create(500, 'Could not convert your file', err));

        return reply({content: 'dasda'}).header('content-disposition', `attachment: filename="${request.payload.file.hapi.filename}"`)
      })
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