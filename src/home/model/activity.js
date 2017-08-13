'use strict';
/**
 * model
 */
export default class extends think.model.base {
    getActivity() {
        //只设定缓存时间
        return this.cache('getActivity').field('title,action,mdname').select();
    }

}