'use strict';
/**
 * model
 */
export default class extends think.model.base {
    getPagetitles() {
        //只设定缓存时间
        return this.cache(7200).find();
    }
}