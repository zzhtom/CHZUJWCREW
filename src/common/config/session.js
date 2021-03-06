'use strict';

/**
 * session configs
 */
export default {
  name: 'chzujw',
  type: 'file',
  secret: 'ZBIS7VUP',
  timeout: 3600,
  cookie: { // cookie options
    length: 32,
    httponly: true
  },
  adapter: {
    file: {
      path: think.RUNTIME_PATH + '/session',
    }
  }
};