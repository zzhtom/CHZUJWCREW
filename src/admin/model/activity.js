'use strict';
/**
 * model
 */
export default class extends think.model.base {
    getCount() {
        //查询 news 的总条数
        return this.count();
    }
}