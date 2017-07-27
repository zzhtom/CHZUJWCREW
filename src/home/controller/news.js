'use strict';

import Base from './base.js';

export default class extends Base {
  /**
   * index action
   * @return {Promise} []
   */
  async indexAction(){
    //auto render template file index_index.html
     let data = await global.theme(this);
    let marked = require('marked'), fs = require("fs");
    let mdData = fs.readFileSync(think.MD_PATH + 'news/' + this.get('mdn') + '.md', 'utf-8').toString();
    this.assign('themes', data);
    this.assign('title', global.title);
    this.assign('news', marked(mdData));
    return this.display();
  }
}