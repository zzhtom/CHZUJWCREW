'use strict';
/**
 * model
 */
export default class extends think.model.base {
    getTheme() {
        //只设定缓存时间
        return this.cache(7200).field('tname,action').select();
    }
}