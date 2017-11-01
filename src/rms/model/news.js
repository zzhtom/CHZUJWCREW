'use strict';
/**
 * model
 */
export default class extends think.model.base {
    getAllNews(page, numsPerPage) {
        return this.cache('getAllNews').field('id,title,cuser,DATE_FORMAT(ctime,"%Y-%c-%d %T") as ctime,uuser,DATE_FORMAT(utime,"%Y-%c-%d %T") as utime,mdname,action').page(page, numsPerPage).countSelect();
    }
}