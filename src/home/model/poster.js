'use strict';
/**
 * model
 */
export default class extends think.model.base {
    getPoster() {
        //只设定缓存时间
        return this.cache(7200).where({show: true}).find();
    }
}