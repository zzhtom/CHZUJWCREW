'use strict';

import Base from '../../base.js';

export default class extends Base {
  /**
   * tab action
   * @return {Promise} []
   */
  tabAction(){
    //auto render template file index_tab.html
    return this.display();
  }
}