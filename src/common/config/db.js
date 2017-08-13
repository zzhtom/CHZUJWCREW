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
      host: '45.62.101.211',
      // host: '192.168.1.106',
      port: '3306',
      database: 'jw_crew',
      user: 'root',
      password: 'zzhzzhzzh',
      prefix: 'think_',
      encoding: 'utf8',
      cache: {
        on: true,
        type: 'file',
        timeout: 3600 * 24,
        adapter: { //不同 adapter 下的配置
          file: {
            path: think.RUNTIME_PATH + '/cache', //缓存文件的根目录
            path_depth: 2, //缓存文件生成子目录的深度
            file_ext: '.json' //缓存文件的扩展名
          },
          redis: {
            prefix: 'thinkjs_'
          },
          memcache: {
            prefix: 'thinkjs_'
          },
        }
      }
    },
    mongo: {

    }
  },
};