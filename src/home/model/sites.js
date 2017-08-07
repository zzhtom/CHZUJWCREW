'use strict';
/**
 * model
 */
export default class extends think.model.base {
    getSites() {
        //只设定缓存时间
        return this.cache(7200).field('sitename,siteurl').select();
    }
}