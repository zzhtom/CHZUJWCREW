'use strict';
/**
 * db config
 * @type {Object}
 */
export default {
  type: 'mysql',
  log_sql: true,
  log_connect: true,
  connectionLimit: 10,
  adapter: {
    mysql: {
      host: '127.0.0.1',
      port: '',
      database: 'jw_crew',
      user: 'root',
      password: 'zzhzzhzzh',
      prefix: 'think_',
      encoding: 'utf8'
    },
    mongo: {

    }
  }
};