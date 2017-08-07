'use strict';
/**
 * model
 */
export default class extends think.model.base {
    getTeam() {
        //只设定缓存时间
        return this.cache(7200).field('photo,mdname').select();
    }
}