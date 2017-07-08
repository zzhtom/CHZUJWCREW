'use strict';

import Base from './base.js';
var marked = require('marked'), fs = require("fs");
export default class extends Base {
  /**
   * index action
   * @return {Promise} []
   */
  async indexAction() {
    //auto render template file photograph_index.html
    this.assign('title', global.title);
    this.assign('random', global.random);
    let pdata = await this.model('photograph').field('name,action,mdname').select();
    this.assign('photographs', pdata);
    return this.display();
  }
  async detailAction() {
    //auto render template file photograph_detail1.html
    let pdata = await this.model('photograph').field('name,mdname').select();
    let mdData = fs.readFileSync(think.MD_PATH + 'gallery/' + this.get().mdname +'.md', 'utf-8').toString();
    this.assign('ImgIntro', marked(mdData))
    this.assign('title', global.title);
    this.assign('photos', JSON.stringify(pdata));
    this.assign('name', this.get().name);
    return this.display();
  }
  detail2Action() {
    //auto render template file photograph_detail2.html
    let mdData = fs.readFileSync(think.MD_PATH + 'gallery/img_intro1.md', 'utf-8').toString();
    // this.assign('ImgIntro', marked(mdData))this.assign('ImgIntro');
    this.assign('ImgIntro', marked(mdData))
    this.assign('title', global.title);
    this.assign('picname', this.get('picname'));
    this.assign('random', global.random);
    return this.display();
  }
}