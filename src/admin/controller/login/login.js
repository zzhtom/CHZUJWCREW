'use strict';

import Base from '../base.js';

export default class extends Base {
  /**
   * index action
   * @return {Promise} []
   */
  async indexAction() {
    if (this.isPost()) {
      let parms = this.post();
      let verficate = await global.verificateAdmin(this, parms.username, parms.password);
      let auth = think.md5(parms.username + parms.password);
      if (think.isEmpty(verficate)) {
        return this.json({
          success: false,
          error: '用户名或密码错误！'
        });
      } else {
        await this.session('userInfo', parms);
        return this.json({
          success: true,
          url: '/admin/web/index/main',
          auth: auth
        });
      }
    } else {
      await this.session();
      return this.display();
    }
  }
}