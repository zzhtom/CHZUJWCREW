'use strict';

import Base from './base.js';
var marked = require('marked'),
  fs = require("fs");
export default class extends Base {
  async __before() {
    let ID = await this.session('identification');
    //判断 session 是否存在，不存在直接跳出主页面
    if (think.isEmpty(ID)) {
      return this.redirect('/rms/login');
    }
  }
  /**
   * index action
   * @return {Promise} []
   */
  async indexAction() {
    let ID = await this.session('identification');
    this.assign('username', ID.username);
    return this.display();
  }
  async userinfoAction() {
    let ID = await this.session('identification');
    this.assign('data', await this.model('admin').getAdmin(ID.username));
    return this.display();
  }
  async userlistAction() {
    await this.cache('getAllAdmin', null);
    return this.display();
  }
  adduserAction() {
    return this.display();
  }
  newslistAction() {
    return this.display();
  }
  addnewsAction() {
    return this.display();
  }
}