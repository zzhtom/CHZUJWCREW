'use strict';

import Base from './base.js';

export default class extends Base {
  /**
   * index action
   * @return {Promise} []
   */
  async indexAction() {
    //auto render template file photograph_index.html
    this.assign('title', global.title);
    this.assign('random', global.random);
    let pdata = await this.model('photograph').field('pid,pname,paction').select();
    this.assign('photographs', pdata);
    return this.display();
  }
  detail1Action() {
    //auto render template file photograph_detail1.html
    let marked = require('marked'), fs = require("fs");
    let mdData = fs.readFileSync(think.MD_PATH + 'gallery/img_intro.md', 'utf-8').toString();
    // this.assign('ImgIntro', marked(mdData))this.assign('ImgIntro');
    this.assign('ImgIntro', marked(mdData))
    this.assign('title', global.title);
    this.assign('picname', this.get('picname'));
    this.assign('picid', this.get('picid'));
    this.assign('random', global.random);
    return this.display();
  }
  detail2Action() {
    //auto render template file photograph_detail2.html
    let marked = require('marked'), fs = require("fs");
    let mdData = fs.readFileSync(think.MD_PATH + 'gallery/img_intro1.md', 'utf-8').toString();
    // this.assign('ImgIntro', marked(mdData))this.assign('ImgIntro');
    this.assign('ImgIntro', marked(mdData))
    this.assign('title', global.title);
    this.assign('picname', this.get('picname'));
    this.assign('picid', this.get('picid'));
    this.assign('random', global.random);
    return this.display();
  }
  async redirectAction() {
    //auto render template file photograph_detail2.html
    /*this.assign('picname',this.get('picname'));*/
    let picid, pdata;
    if (this.get('chevron') == 'right') {
      picid = Number(this.get('picid')) + 1;
    } else if (this.get('chevron') == 'left') {
      picid = Number(this.get('picid')) - 1;
    } else {
      return;
    }
    pdata = await this.model('photograph').where({ pid: picid }).find();
    if (think.isEmpty(pdata) && this.get('chevron') == 'right') {
      let datas = await this.model('photograph').select();
      pdata = await this.model('photograph').where({ pid: datas[0].pid }).find();
      return this.redirect(pdata.paction + '?picname=' + pdata.pname + '&&picid=' + datas[0].pid + '&&random=' + global.random);
    } else if (think.isEmpty(pdata) && this.get('chevron') == 'left') {
      let datas = await this.model('photograph').select();
      pdata = await this.model('photograph').where({ pid: datas[datas.length - 1].pid }).find();
      return this.redirect(pdata.paction + '?picname=' + pdata.pname + '&&picid=' + datas[datas.length - 1].pid + '&&random=' + global.random);
    }
    return this.redirect(pdata.paction + '?picname=' + pdata.pname + '&&picid=' + picid + '&&random=' + global.random);
  }
}