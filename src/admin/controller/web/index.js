'use strict';

import Base from '../base.js';

export default class extends Base {
  /**
   * mian action
   * @return {Promise} []
   */
  mainAction(){
    //auto render template file index_mian.html
    return this.display();
  }
  /**
   * top action
   * @return {Promise} []
   */
  topAction(){
    //auto render template file index_top.html
    return this.display();
  }
  /**
   * center action
   * @return {Promise} []
   */
  centerAction(){
    //auto render template file index_center.html
    return this.display();
  }
  /**
   * down action
   * @return {Promise} []
   */
  downAction(){
    //auto render template file index_down.html
    return this.display();
  }
  /**
   * left action
   * @return {Promise} []
   */
  leftAction(){
    //auto render template file index_left.html
    return this.display();
  }
}