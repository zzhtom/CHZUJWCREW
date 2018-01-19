'use strict';
/**
 * model
 */
export default class extends think.model.base {
    getVideo() {
        //只设定缓存时间
        return this.cache('getVideo').field('videoURL, imageURL, title, action, type').select();
    }
}