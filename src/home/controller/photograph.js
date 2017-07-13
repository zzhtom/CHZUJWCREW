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
    let data = await this.model('gallery').field('name,action,mdname,ratio').select();
    this.assign('photographs', data);
    return this.display();
  }
  async detailAction() {
    //auto render template file photograph_detail1.html
    let data = await this.model('gallery').field('name,mdname,ratio').select();
    let mdData = fs.readFileSync(think.MD_PATH + 'gallery/' + this.get().mdname + '.md', 'utf-8').toString();
    this.assign('ImgIntro', marked(mdData));
    this.assign('title', global.title);
    this.assign('photos', JSON.stringify(data));
    this.assign('name', this.get().name);
    this.assign('mdname', this.get().mdname);
    this.assign('ratio', this.get().ratio);
    return this.display();
  }
  getmarkdownAction() {
    try {
      if (this.isPost()) {
        let mdData = fs.readFileSync(think.MD_PATH + 'gallery/' + this.post().mdname + '.md', 'utf-8').toString();
        return this.json({
          success: true,
          markdown: marked(mdData),
          error: ''
        });
      }
    } catch (error) {
      return this.json({
          success: true,
          markdown: '',
          error: error
        });
    }

  }
}