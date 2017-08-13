'use strict';

export default class extends think.controller.base {
  /**
   * some base method in here
   */
  // async __before() {
  //   //部分 action 下不检查
  //   // let blankActions = ['login'];
  //   // if (blankActions.indexOf(this.http.action) >= 0) {
  //   //   return;
  //   // }
  //   let userInfo = await this.session('userInfo');
  //   //判断 session 里的 userInfo
  //   if (think.isEmpty(userInfo)) {
  //     return this.redirect('/admin/login/login');
  //   }
  // }
}