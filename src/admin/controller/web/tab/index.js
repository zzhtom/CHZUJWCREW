'use strict';

import Base from '../../base.js';

export default class extends Base {
  /**
   * tab action
   * @return {Promise} []
   */
  tabAction() {
    //auto render template file index_tab.html
    return this.display();
  }
  async updateAction() {
    //auto render template file index_update.html
    let userInfo = await this.session('userInfo');
    if (think.isEmpty(userInfo)) {
      return this.fail('用户信息错误');
    }
    if (this.get('msg') !== undefined)
      this.assign('msg', this.get('msg'));
    let adminInfor = await this.model('admin').where({ username: userInfo.username }).find();
    this.assign('data', adminInfor);
    return this.display();
  }
  async adminAction() {
    //auto render template file index_update.html
    let userInfo = await this.session('userInfo');
    if (think.isEmpty(userInfo)) {
      return this.fail('用户信息错误');
    }
    let adminInfor = this.post();
    let model = this.model('admin');
    let affectedRows = await model.where({ username: userInfo.username }).update(adminInfor);
    if (affectedRows != 1)
      return this.fail('更新' + userInfo.username + '信息失败');
    let msg = "modify success!"
    return this.redirect('update?msg=' + msg);
  }
  async themeAction() {
    //auto render template file index_update.html
    let userInfo = await this.session('userInfo');
    if (think.isEmpty(userInfo)) {
      return this.fail('用户信息错误');
    }
    if (this.get('msg') !== undefined)
      this.assign('msg', this.get('msg'));
    let themes = await this.model('theme').field('tname').select();
    console.log(themes);
    this.assign('data', themes);
    return this.display();
  }
  async uthemeAction() {
    //auto render template file index_update.html
    let userInfo = await this.session('userInfo');
    if (think.isEmpty(userInfo)) {
      return this.fail('用户信息错误');
    }
    let model = this.model('theme');
    let themes = this.post().theme1;
    for (var i = 1; i <= themes.length; i++) {
      console.log(new Date());
      let affectedRows = await model.where({ tid: i }).update({ tname: themes[i - 1], uuser: userInfo.username, utime: think.datetime() });
      if (affectedRows != 1)
        return this.fail('更新' + themes[i - 1] + '信息失败');
    }
    let msg = "modify success!"
    return this.redirect('theme?msg=' + msg);
  }
  async passwdAction() {
    //auto render template file index_update.html
    let userInfo = await this.session('userInfo');
    if (think.isEmpty(userInfo)) {
      return this.fail('用户信息错误');
    }
    this.assign('msg', '');
    if (this.isPost()) {
      // let passwds = this.post();
      let passwd = (await this.model('admin').where({ username: userInfo.username }).field('passwd').find()).passwd;
      if (think.md5(this.post().passwd) == passwd) {
        let affectedRows = await this.model('admin').where({ username: userInfo.username }).update({ passwd: think.md5(this.post().npasswd) });
        if (affectedRows != 1)
          this.assign('msg', '修改密码信息失败，请检查日志！');
        await this.session();
        this.assign('msg', "密码修改成功,请退出重新登入！");
        setTimeout(() => {
          console.log("跳转中......");
        }, 3000);
        // return this.redirect('/admin/login/login');
      } else {
        this.assign('msg', '原密码错误！');
      }
    }
    return this.display();
  }
  async newsAction() {
    //auto render template file index_tab.html
    if (this.isPost()) {
      let fs = require("fs"), model = this.model('news');
      let data = this.post();
      let userInfo = await this.session('userInfo');
      try {
        await model.startTrans();
        let newsId = await model.add({
          newsname: data.newsname, cnewsuser: userInfo.username, mdname: data.mdname,
          action: '/news/index', cnewstime: think.datetime()
        });
        fs.writeFile(think.MD_PATH + '/news/' + data.mdname + '.md', data.content, (err) => {
          if (err) throw err;
          console.log('The file has been saved!');
          return this.display();
        });
        await model.commit();
      } catch (e) {
        await model.rollback();
      }
    }

    return this.display();
  }
  async activityAction() {
    //auto render template file index_tab.html
    if (this.isPost()) {
      let fs = require("fs"), model = this.model('activity');
      let data = this.post();
      let userInfo = await this.session('userInfo');
      try {
        await model.startTrans();
        let activityId = await model.add({
          title: data.title, cuser: userInfo.username, mdname: data.mdname,
          action: '/activity/index', ctime: think.datetime()
        });
        fs.writeFile(think.MD_PATH + '/activity/' + data.mdname + '.md', data.content, (err) => {
          if (err) throw err;
          console.log('The file has been saved!');
          return this.display();
        });
        await model.commit();
      } catch (e) {
        await model.rollback();
      }
    }

    return this.display();
  }
}