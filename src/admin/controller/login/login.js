'use strict';

import Base from '../base.js';

export default class extends Base {
  /**
   * index action
   * @return {Promise} []
   */
  async indexAction() {
    //auto render template file index_index.html
    let values = await this.session('userInfo');
    if(values != undefined){
      this.assign('userInfo', values);
    }else{
      this.assign('userInfo', '');
    }
    await this.session();
    return this.display();
  }
}