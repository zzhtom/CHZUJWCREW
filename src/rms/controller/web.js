'use strict';

import Base from './base.js';
var marked = require('marked'), fs = require("fs");
export default class extends Base {
  /**
   * index action
   * @return {Promise} []
   */
  indexAction() {
    return this.display();
  }
  userinfoAction() {
    return this.display();
  }
  userlistAction() {
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