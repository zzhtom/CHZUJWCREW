'use strict';
/**
 * model
 */
export default class extends think.model.base {
    getTeam() {
        //只设定缓存时间
        return this.cache('getTeam').field('photo,mdname').select();
    }
}