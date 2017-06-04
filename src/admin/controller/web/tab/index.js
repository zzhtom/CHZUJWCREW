'use strict';

import Base from '../../base.js';

export default class extends Base {
  /**
   * tab action
   * @return {Promise} []
   */
  tabAction() {
    //auto render template file index_tab.html
    return this.display();
  }
  async updateAction() {
    //auto render template file index_update.html
    let adminInfor = await this.model('admin').where({ username: "admin" }).find();
    console.log(adminInfor);
    this.assign('data', adminInfor);
    return this.display();
  }
}