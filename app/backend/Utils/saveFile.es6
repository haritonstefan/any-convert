/**
 * Created by Stefan Hariton <hariton.stefan@outlook.com> on 30/10/16.
 */
"use strict";

import shortId from 'shortid';
import fs from 'fs';
import Hoek from 'hoek';
import Boom from 'boom';

const defaultDir = '/tmp/';

function saveFile(file) {
  let path = defaultDir + shortId.generate() + file.hapi.filename;
  let writeStream = fs.createWriteStream(path);

  writeStream.on('error', (error) => {
    Boom.create(500, 'Storage filled, please try again later');
  });

  file.pipe(writeStream);

  // file.on('end', (err) => {
  //   // Hoek.assert(err, Boom.create(500, 'Could not save the file, try again later'));
  //   return path;
  // });

  return path;
}

export { saveFile };