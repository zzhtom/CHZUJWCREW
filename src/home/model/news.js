'use strict';
/**
 * model
 */
export default class extends think.model.base {
    getNews() {
        return this.cache('getNews').field('title,action,mdname').select();
    }
}