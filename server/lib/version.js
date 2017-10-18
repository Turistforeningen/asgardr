'use strict';

const fs = require('fs');
const path = require('path');

const version = {tag: 'unknown'};

version.promise = new Promise((resolve, reject) => {
  fs.readFile(`${path.resolve(__dirname, '..')}/.gitcommit`, {encoding: 'utf-8'}, (err, data) => {
    if (err) {
      console.log(err); // eslint-disable-line
      reject();
    } else {
      version.gitcommit = data.trim();
      resolve(version.gitcommit);
    }
  });
});

module.exports = version;
