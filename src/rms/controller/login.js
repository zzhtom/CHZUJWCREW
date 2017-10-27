'use strict';

import Base from './base.js';
var marked = require('marked'),
  fs = require("fs");
export default class extends Base {
  /**
   * index action
   * @return {Promise} []
   */
  async indexAction() {
    if (this.isPost()) {
      let loginInfo = this.post();
      let verficate = await global.verificateAdmin(this, loginInfo.username, loginInfo.password);
      let auth = think.md5(loginInfo.username + loginInfo.password);
      if (think.isEmpty(verficate)) {
        return this.json({
          success: false,
          msg: '用户名或密码错误！'
        });
      } else {
        await this.session('identification', loginInfo);
        return this.json({
          success: true,
          url: '/rms/web/index',
          auth: auth
        });
      }
    } else {
      let action = this.get().action;
      if (action === 'signOut') {
        await this.session();
      }
      return this.display();
    }
  }
}