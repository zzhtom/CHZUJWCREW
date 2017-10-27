'use strict';
/**
 * model
 */
export default class extends think.model.base {
    getAdmin(username) {
        return this.cache('getAdmin').field('realname,email,hobby,website,telphone,introduction,sex,age,province,city,town,DATE_FORMAT(birthday,"%Y-%c-%d") as birthday').where({
            username: username
        }).find();
    }
    getAllAdmin(page, numsPerPage) {
        return this.cache('getAllAdmin').field('username,realname,email,hobby,website,telphone,introduction,sex,age,province,city,town,DATE_FORMAT(birthday,"%Y-%c-%d") as birthday').page(page, numsPerPage).countSelect();;
    }
}