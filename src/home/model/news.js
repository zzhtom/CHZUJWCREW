'use strict';
/**
 * model
 */
export default class extends think.model.base {
    getNews() {
        //只设定缓存时间
        return this.cache('getNews').field('title,action,mdname').select();
    }
}