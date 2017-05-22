'use strict';

import Base from '../base.js';

export default class extends Base {
  /**
   * mian action
   * @return {Promise} []
   */
  async mainAction() {
    //auto render template file index_mian.html
    let parms = this.post();
    console.log(parms);
    let verficate = await global.verificateAdmin(this, parms.username, parms.password);
    if(think.isEmpty(verficate)){
      // return this.display('main');
      this.assign('msg', '用户名或者密码错误！');
      return this.redirect('/admin/login/login');
    }
    return this.display();
  }
  /**
   * top action
   * @return {Promise} []
   */
  topAction() {
    //auto render template file index_top.html
    return this.display();
  }
  /**
   * center action
   * @return {Promise} []
   */
  centerAction() {
    //auto render template file index_center.html
    return this.display();
  }
  /**
   * down action
   * @return {Promise} []
   */
  downAction() {
    //auto render template file index_down.html
    return this.display();
  }
  /**
   * left action
   * @return {Promise} []
   */
  leftAction() {
    //auto render template file index_left.html
    return this.display();
  }
}