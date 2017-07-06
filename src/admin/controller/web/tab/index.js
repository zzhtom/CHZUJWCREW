'use strict';

import Base from '../../base.js';
var fs = require("fs");
var path = require('path');
const uuid = require('uuid/v1');
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
      return this.fail('会话超时，请重新提交用户信息!');
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
      return this.fail('会话超时，请重新提交用户信息!');
    }
    let data = await this.model(this.get().model).page(this.get('page'), 10).countSelect();
    this.assign('model', data);
    this.assign('showModel', this.get().model);
    return this.display();
  }
  async showposterAction() {
    //auto render template file index_shownews.html
    let userInfo = await this.session('userInfo');
    if (think.isEmpty(userInfo)) {
      return this.fail('会话超时，请重新提交用户信息!');
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
      return this.fail('会话超时，请重新提交用户信息!');
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
      return this.fail('会话超时，请重新提交用户信息!');
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
      return this.fail('会话超时，请重新提交用户信息!');
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
      return this.fail('会话超时，请重新提交用户信息!');
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
      return this.fail('会话超时，请重新提交用户信息!');
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
  async addposterAction() {
    //auto render template file index_tab.html
    if (this.isPost()) {
      let data = this.post();
      console.log(data);
      let model = this.model(data.model);
      let userInfo = await this.session('userInfo');
      try {
        await model.startTrans();
        var file = think.extend({}, this.file('image'));
        var filepath = file.path;
        let pname = path.basename(filepath);
        let mdname = uuid();
        let posterId = await model.add({
          theme: data.theme, cuser: userInfo.username, pname: pname, uuser: userInfo.username, mdname: mdname,
          action: '/' + data.model + '/index', ctime: think.datetime(), utime: think.datetime()
        });
        let mdpath = think.MD_PATH + '/' + data.model + '/';
        if (!think.isDir(mdpath)) {
          think.mkdir(mdpath);
        }
        fs.writeFile(think.MD_PATH + '/' + data.model + '/' + mdname + '.md', data.content, (err) => {
          if (err) throw err;
          var posterPath = think.POSTER_PATH + mdname;
          think.mkdir(posterPath);
          fs.renameSync(filepath, posterPath + '/' + pname);
        });
        await model.commit();
        this.assign('addModel', data.model);
        this.assign('tips', 'add poster is success!')
        return this.display();
      } catch (e) {
        console.log(e);
        await model.rollback();
        return this.json({
          success: false,
          error: '添加失败！'
        });
      }
    }
    this.assign('addModel', this.get().model);
    this.assign('tips', '')
    return this.display();
  }
  async addmodelAction() {
    //auto render template file index_tab.html
    if (this.isPost()) {
      let data = this.post();
      let model = this.model(data.model);
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
  /**
   * poster operation
   */
  async setposterAction() {
    let userInfo = await this.session('userInfo');
    if (think.isEmpty(userInfo)) {
      return this.fail('会话超时，请重新提交用户信息!');
    }
    if (this.isPost()) {
      let model = this.model(this.post().model);
      try {
        await model.startTrans();
        if (this.post().reason == 'cancel') {
          await model.where({ theme: this.post().theme }).update({ show: 0});
        }
        if (this.post().reason == 'setting') {
          await model.where('1=1').update({ show: 0});
          await model.where({ theme: this.post().theme }).update({ show: 1});
        }
        await model.commit();
        return this.json({
          success: true,
          theme: this.post().theme,
          error: ''
        });
      } catch (err) {
        await model.rollback();
        return this.json({
          success: false,
          title: this.post().theme,
          error: err
        });
      }
    }
  }
  async uposterAction() {
    //auto render template file index_uactivity.html
    let userInfo = await this.session('userInfo');
    if (think.isEmpty(userInfo)) {
      return this.fail('会话超时，请重新提交用户信息!');
    }
    if (this.isPost()) {
      let model = this.model(this.post().model);
      let affectedRows = await model.where({ theme: this.post().otheme }).update({ theme: this.post().ntheme, uuser: userInfo.username, utime: think.datetime() });
      if (affectedRows != 1)
        return this.json({
          success: false,
          theme: this.post().ntheme
        });
      return this.json({
        success: true,
        theme: this.post().ntheme
      });
    }
    this.assign('model', this.get().model);
    this.assign('theme', this.get().theme);
    return this.display();
  }
  async delposterAction() {
    //auto render template file index_tab.html
    if (this.isPost()) {
      let data = this.post();
      let model = this.model(data.model);
      try {
        await model.startTrans();
        await model.where({ theme: data.theme }).delete();
        fs.unlink(think.MD_PATH + '/' + data.model + '/' + data.mdname + '.md', (err) => {
          if (err) {
            throw err;
          }
          fs.unlink(think.POSTER_PATH + '/' + data.mdname + '/' + data.pname, (err) => {
            if (err) { throw err; }
            think.rmdir(think.POSTER_PATH + '/' + data.mdname, false);
          })
        })
        await model.commit();
        return this.json({
          success: true,
          theme: data.theme
        });
      } catch (e) {
        await model.rollback();
        return this.json({
          success: false,
          title: data.title
        });
      }
    }
  }
  async delmodelAction() {
    //auto render template file index_tab.html
    if (this.isPost()) {
      let data = this.post();
      let model = this.model(data.model);
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
      let model = this.model(data.model);
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
    if (this.isPost()) {
      let data = this.post();
      try {
        fs.writeFile(think.MD_PATH + '/' + data.model + '/' + data.mdname + '.md', data.content, (err) => {
          if (err) throw err;
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