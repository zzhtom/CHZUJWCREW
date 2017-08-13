'use strict';
/**
 * model
 */
export default class extends think.model.base {
    getTheme() {
        //只设定缓存时间
        return this.cache('getTheme').field('tname,action').select();
    }
}