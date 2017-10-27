'use strict';

import Base from './base.js';
var marked = require('marked'),
  fs = require("fs");
export default class extends Base {
  /**
   * 说明: 此文件主要用于获取数据库的数据信息
   */
  async __before() {
    let ID = await this.session('identification');
    //判断 session 是否存在，不存在直接跳出主页面
    if (think.isEmpty(ID)) {
      return this.redirect('/rms/login');
    }
  }
  async get_adminAction() {
    let ID = await this.session('identification');
    let adminInfo = await this.model('admin').getAdmin(ID.username);
    return this.json({
      data: adminInfo
    });
  }
  async getalladminAction() {
    let adminInfo = await this.model('admin').getAllAdmin(this.get().page, this.get().limit);
    for (var i in adminInfo.data) {
      adminInfo.data[i].id = parseInt(i) + 1;
    }
    return this.json({
      code: 0,
      msg: "用户列表",
      count: adminInfo.count,
      data: adminInfo.data
    });
  }
  async addadminAction() {
    if (this.isGet()) {
      return this.json({
        success: false,
        msg: "请求类型错误!"
      });
    }
    try {
      await this.model('admin').add(this.post());
      await this.cache('getAllAdmin', null);
      return this.json({
        success: true,
        msg: "添加用户成功!",
      });

    } catch (err) {
      return this.json({
        success: false,
        msg: err.stack
      });
    }

  }
}