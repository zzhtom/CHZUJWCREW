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
  async umodelAction() {
    //auto render template file index_uactivity.html
    let userInfo = await this.session('userInfo');
    if (think.isEmpty(userInfo)) {
      return this.fail('用户信息错误');
    }
    if (this.isPost()) {
      let model = this.model(this.post().model);
      let affectedRows = await model.where({ id: this.post().id }).update({ title: this.post().title, uuser: userInfo.username, utime: think.datetime() });
      if (affectedRows != 1)
        return this.json({
          success: false,
          id: this.post().id,
          title: this.post().title
        });
      return this.json({
        success: true,
        id: this.post().id,
        title: this.post().title
      });
    }
    this.assign('model', this.get().model);
    this.assign('id', this.get().id);
    this.assign('title', this.get().title);
    return this.display();
  }
  async showmodelAction() {
    //auto render template file index_shownews.html
    let userInfo = await this.session('userInfo');
    if (think.isEmpty(userInfo)) {
      return this.fail('用户信息错误');
    }
    let data = await this.model(this.get().model).page(this.get('page'), 10).countSelect();
    this.assign('model', data);
    this.assign('showModel', this.get().model);
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
          title: data.title, cuser: userInfo.username, mdname: data.mdname,
          action: '/news/index', ctime: think.datetime(), utime: think.datetime()
        });
        fs.writeFile(think.MD_PATH + '/news/' + data.mdname + '.md', data.content, (err) => {
          if (err) throw err;
          console.log('The file has been saved!');
          return this.json({
            success: true,
            title: data.title
          });
        });
        await model.commit();
      } catch (e) {
        await model.rollback();
        return this.json({
          success: false,
          title: data.title
        });
      }
    }
    return this.display();
  }
  async addmodelAction() {
    //auto render template file index_tab.html
    if (this.isPost()) {
      let data = this.post();
      let fs = require("fs"), model = this.model(data.model);
      let userInfo = await this.session('userInfo');
      try {
        await model.startTrans();
        let activityId = await model.add({
          title: data.title, cuser: userInfo.username, uuser: userInfo.username, mdname: data.mdname,
          action: '/' + data.model + '/index', ctime: think.datetime(), utime: think.datetime()
        });
        fs.writeFile(think.MD_PATH + '/' + data.model + '/' + data.mdname + '.md', data.content, (err) => {
          if (err) throw err;
          console.log('The file has been saved!');
          return this.json({
            success: true,
            title: data.title
          });
        });
        await model.commit();
      } catch (e) {
        await model.rollback();
        return this.json({
          success: false,
          title: data.title
        });
      }
    }
    this.assign('addModel', this.get().model);
    return this.display();
  }
  async delmodelAction() {
    //auto render template file index_tab.html
    if (this.isPost()) {
      let data = this.post();
      let fs = require("fs"), model = this.model(data.model);
      try {
        await model.startTrans();
        await model.where({ id: data.id }).delete();
        fs.unlink(think.MD_PATH + '/' + data.model + '/' + data.mdname + '.md', (err) => {
          if (err) {
            throw err;
          }
          console.log('文件:' + data.title + '删除成功！');
          return this.json({
            success: true,
            title: data.title
          });
        })

        await model.commit();
      } catch (e) {
        await model.rollback();
        return this.json({
          success: false,
          title: data.title
        });
      }
    }
  }
  async batchdelmodelAction() {
    //auto render template file index_tab.html
    if (this.isPost()) {
      let data = this.post();
      let fs = require("fs"), model = this.model(data.model);
      let _list = JSON.parse(data.data);
      try {
        await model.startTrans();
        _list.forEach(async (item) => {
          await model.where({ id: item.id }).delete();
          fs.unlink(think.MD_PATH + '/' + data.model + '/' + item.mdname + '.md', (err) => {
            if (err) {
              throw err;
            }
            console.log('文件:' + item.mdname + '删除成功！');
            return this.json({
              success: true
            });
          });
        });
        await model.commit();
      } catch (e) {
        await model.rollback();
        return this.json({
          success: false
        });
      }
    }
  }
  editmodelAction() {
    //auto render template file index_tab.html
    let fs = require("fs");
    if (this.isPost()) {
      let data = this.post();
      try {
        fs.writeFile(think.MD_PATH + '/' + data.model + '/' + data.mdname + '.md', data.content, (err) => {
          if (err) throw err;
          console.log('The file has been edited!');
          return this.json({
            success: true,
            title: data.title
          });
        });
      } catch (e) {
        return this.json({
          success: false,
          title: data.title
        });
      }
    }
    fs.readFile(think.MD_PATH + '/' + this.get().model + '/' + this.get().mdname + '.md', 'utf8', (err, data) => {
      if (err) throw err;
      this.assign('title', this.get().title);
      this.assign('mdname', this.get().mdname);
      this.assign('content', data);
      this.assign('showModel', this.get().model);
      return this.display();
    });
  }
}