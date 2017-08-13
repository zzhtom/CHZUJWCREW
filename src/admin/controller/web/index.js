'use strict';

import Base from './base.js';

export default class extends Base {
  /**
   * mian action
   * @return {Promise} []
   */
  async mainAction() {
    //auto render template file index_mian.html
    if(this.isPost()){
      let userInfo = await this.session('userInfo');
      if(think.md5(userInfo.username + userInfo.password) === this.post().auth){
        return this.display();
      }else{
        return this.redirect('/admin/login/login');
      } 
    }else{
      return this.redirect('/admin/login/login');
    }
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