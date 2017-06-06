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
    let userInfo = await this.session('userInfo');
    if (think.isEmpty(userInfo)) {
      return this.fail('用户信息错误');
    }
    if (this.get('msg') !== undefined)
      this.assign('msg', this.get('msg'));
    let adminInfor = await this.model('admin').where({ username: userInfo.username }).find();
    this.assign('data', adminInfor);
    return this.display();
  }
  async adminAction() {
    //auto render template file index_update.html
    let userInfo = await this.session('userInfo');
    if (think.isEmpty(userInfo)) {
      return this.fail('用户信息错误');
    }
    let adminInfor = this.post();
    let model = this.model('admin');
    let affectedRows = await model.where({ username: userInfo.username }).update(adminInfor);
    if (affectedRows != 1)
      return this.fail('更新' + userInfo.username + '信息失败');
    let msg = "modify success!"
    return this.redirect('update?msg=' + msg);
  }
  async themeAction() {
    //auto render template file index_update.html
    let userInfo = await this.session('userInfo');
    if (think.isEmpty(userInfo)) {
      return this.fail('用户信息错误');
    }
    if (this.get('msg') !== undefined)
      this.assign('msg', this.get('msg'));
    let themes = await this.model('theme').field('tname').select();
    console.log(themes);
    this.assign('data', themes);
    return this.display();
  }
  async uthemeAction() {
    //auto render template file index_update.html
    let userInfo = await this.session('userInfo');
    if (think.isEmpty(userInfo)) {
      return this.fail('用户信息错误');
    }
    let themes = this.post();
    console.log(themes)
    // let model = this.model('admin');
    // let affectedRows = await model.where({ username: userInfo.username }).update(adminInfor);
    // if (affectedRows != 1)
    //   return this.fail('更新' + userInfo.username + '信息失败');
    let msg = "modify success!"
    return this.redirect('theme?msg=' + msg);
  }
}