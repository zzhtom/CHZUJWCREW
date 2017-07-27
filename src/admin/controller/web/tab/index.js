'use strict';

import Base from '../../base.js';
var fs = require("fs");
var path = require('path');
const uuid = require('uuid/v1');
var sizeOf = require('image-size');
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
        let mdpath = think.MD_PATH + '/' + data.model;
        if (!think.isDir(mdpath)) {
          think.mkdir(mdpath);
        }
        fs.writeFile(mdpath + '/' + mdname + '.md', data.content, (err) => {
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
      let mdpath = think.MD_PATH + '/' + data.model;
      try {
        await model.startTrans();
        let activityId = await model.add({
          title: data.title, cuser: userInfo.username, uuser: userInfo.username, mdname: data.mdname,
          action: '/' + data.model + '/index', ctime: think.datetime(), utime: think.datetime()
        });
        if (!think.isDir(mdpath)) {
          think.mkdir(mdpath);
        }
        fs.writeFile(mdpath + '/' + data.mdname + '.md', data.content, (err) => {
          if (err) throw err;
          await model.commit();
          return this.json({
            success: true,
            title: data.title
          });
        });
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
          await model.where({ theme: this.post().theme }).update({ show: 0 });
        }
        if (this.post().reason == 'setting') {
          await model.where('1=1').update({ show: 0 });
          await model.where({ theme: this.post().theme }).update({ show: 1 });
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
            await model.commit();
            return this.json({
              success: true,
              theme: data.theme
            });
          })
        })
      } catch (e) {
        await model.rollback();
        return this.json({
          success: false,
          title: data.theme
        });
      }
    }
  }
  async batchdelposterAction() {
    //auto render template file index_tab.html
    if (this.isPost()) {
      let data = this.post();
      let model = this.model(data.model);
      let _list = JSON.parse(data.data);
      try {
        await model.startTrans();
        _list.forEach(async (item) => {
          await model.where({ theme: item.theme }).delete();
          fs.unlink(think.MD_PATH + '/' + data.model + '/' + item.mdname + '.md', (err) => {
            if (err) {
              throw err;
            }
            fs.unlink(think.POSTER_PATH + '/' + item.mdname + '/' + item.pname, (err) => {
              if (err) { throw err; }
              think.rmdir(think.POSTER_PATH + '/' + item.mdname, false);
              await model.commit();
              return this.json({
                success: true
              });
            })
          })
        });
      } catch (e) {
        await model.rollback();
        return this.json({
          success: false
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
          await model.commit();
          return this.json({
            success: true,
            title: data.title,
            error: ''
          });
        })
      } catch (err) {
        await model.rollback();
        return this.json({
          success: false,
          title: data.title,
          error: err
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
            await model.commit();
            return this.json({
              success: true,
              error: ''
            });
          });
        });
      } catch (err) {
        await model.rollback();
        return this.json({
          success: false,
          error: err
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
            title: data.title | data.name,
            error: err
          });
        });
      } catch (err) {
        return this.json({
          success: false,
          title: data.title,
          error: err
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
  /**
   * Gallery area
   */
  async showgalleryAction() {
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
  // edited gallery matkdown
  editgalleryAction() {
    //auto render template file index_tab.html
    if (this.isPost()) {
      let data = this.post();
      try {
        fs.writeFile(think.MD_PATH + '/' + data.model + '/' + data.mdname + '.md', data.content, (err) => {
          if (err) throw err;
          return this.json({
            success: true,
            name: data.name,
            error: ''
          });
        });
      } catch (err) {
        return this.json({
          success: false,
          name: data.name,
          error: err
        });
      }
    }
    fs.readFile(think.MD_PATH + '/' + this.get().model + '/' + this.get().mdname + '.md', 'utf8', (err, data) => {
      if (err) throw err;
      this.assign('name', this.get().title);
      this.assign('mdname', this.get().mdname);
      this.assign('content', data);
      this.assign('showModel', this.get().model);
      return this.display();
    });
  }
  // single delete galery
  async delgalleryAction() {
    //auto render template file index_tab.html
    if (this.isPost()) {
      let data = this.post();
      let model = this.model(data.model);
      try {
        await model.startTrans();
        await model.where({ name: data.name }).delete();
        fs.unlink(think.MD_PATH + '/' + data.model + '/' + data.mdname + '.md', (err) => {
          if (err) {
            throw err;
          }
          fs.unlink(think.GALLERY_PATH + '/' + data.mdname + '/' + data.name, (err) => {
            if (err) { throw err; }
            think.rmdir(think.GALLERY_PATH + '/' + data.mdname, false);
            await model.commit();
            return this.json({
              success: true,
              name: data.name,
              error: ''
            });
          })
        })
      } catch (err) {
        await model.rollback();
        return this.json({
          success: false,
          name: data.name,
          error: err
        });
      }
    }
  }
  async batchdelgalleryAction() {
    //auto render template file index_tab.html
    if (this.isPost()) {
      let data = this.post();
      let model = this.model(data.model);
      let _list = JSON.parse(data.data);
      try {
        await model.startTrans();
        _list.forEach(async (item) => {
          await model.where({ name: item.name }).delete();
          fs.unlink(think.MD_PATH + '/' + data.model + '/' + item.mdname + '.md', (err) => {
            if (err) {
              throw err;
            }
            fs.unlink(think.GALLERY_PATH + '/' + item.mdname + '/' + item.name, (err) => {
              if (err) { throw err; }
              think.rmdir(think.GALLERY_PATH + '/' + item.mdname, false);
              await model.commit();
              return this.json({
                success: true,
                error: ''
              });
            })
          })
        });
      } catch (err) {
        await model.rollback();
        return this.json({
          success: false,
          error: err
        });
      }
    }
  }
  // Gallery upload
  async galleryuploadAction() {
    if (this.isPost()) {
      let model = this.model(this.get().model);
      let userInfo = await this.session('userInfo');
      if (think.isEmpty(userInfo)) {
        return this.fail('会话超时，请重新提交用户信息!');
      }
      try {
        await model.startTrans();
        var file = think.extend({}, this.file('file'));
        var filepath = file.path;
        let name = path.basename(filepath);
        let mdname = uuid();
        let dimensions = sizeOf(filepath);
        let ratio = (dimensions.width / dimensions.height) < 1 ? 0 : 1;
        await model.add({
          name: name, cuser: userInfo.username, uuser: userInfo.username, mdname: mdname, ratio: ratio,
          ctime: think.datetime(), utime: think.datetime()
        });
        let mdpath = think.MD_PATH + '/' + this.get().model;
        if (!think.isDir(mdpath)) {
          think.mkdir(mdpath);
        }
        fs.writeFileSync(mdpath + '/' + mdname + '.md', '暂无介绍');
        var galleryPath = think.GALLERY_PATH + mdname;
        think.mkdir(galleryPath);
        fs.renameSync(filepath, galleryPath + '/' + name);
        await model.commit();
        return this.json({
          success: true,
          error: ''
        });
        // return this.display();
      } catch (err) {
        console.log(err);
        await model.rollback();
        return this.json({
          success: false,
          error: err
        });
      }
    }
    return this.display();
  }
  /**
 * Team area
 */
  async showteamAction() {
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
  async addteamAction() {
    if (this.isPost()) {
      let data = this.post();
      let model = this.model(data.model);
      let userInfo = await this.session('userInfo');
      try {
        await model.startTrans();
        var file = think.extend({}, this.file('photo'));
        var filepath = file.path;
        let photo = path.basename(filepath);
        let mdname = uuid();
        let content = '## 个人信息 ##\n' +
          '- **姓名：**' + data.name + '\n' +
          '- **学号：**' + data.stuno + '\n' +
          '- **届时：**' + data.entrance + '\n' +
          '- **专业：**' + data.major + '\n' +
          '## 简单介绍 ##\n' +
          '暂无';
        await model.add({
          id: uuid(), name: data.name, stuno: data.stuno, major: data.major, entrance: data.entrance, cuser: userInfo.username, photo: photo, uuser: userInfo.username, mdname: mdname,
          ctime: think.datetime(), utime: think.datetime()
        });
        let mdpath = think.MD_PATH + '/' + data.model;
        if (!think.isDir(mdpath)) {
          think.mkdir(mdpath);
        }
        fs.writeFile(mdpath + '/' + mdname + '.md', content, (err) => {
          if (err) throw err;
          let photoPath = think.TEAM_PATH + mdname;
          think.mkdir(photoPath);
          fs.renameSync(filepath, photoPath + '/' + photo);
          await model.commit();
          return this.json({
            success: true,
            team: { name: data.name, stuno: data.stuno },
            error: ''
          });
        });
      } catch (err) {
        await model.rollback();
        return this.json({
          success: false,
          team: { name: data.name, stuno: data.stuno },
          error: err
        });
      }
    }
    this.assign('addModel', this.get().model);
    return this.display()
  }
  // 编辑成员信息
  editteamAction() {
    //auto render template file index_tab.html
    if (this.isPost()) {
      let data = this.post();
      try {
        fs.writeFile(think.MD_PATH + '/' + data.model + '/' + data.mdname + '.md', data.content, (err) => {
          if (err) throw err;
          return this.json({
            success: true,
            team: { name: data.name, model: data.model },
            error: ''
          });
        });
      } catch (err) {
        return this.json({
          success: false,
          team: { name: data.name, model: data.model },
          error: err
        });
      }
    }
    fs.readFile(think.MD_PATH + '/' + this.get().model + '/' + this.get().mdname + '.md', 'utf8', (err, data) => {
      if (err) throw err;
      this.assign('name', this.get().name);
      this.assign('mdname', this.get().mdname);
      this.assign('content', data);
      this.assign('showModel', this.get().model);
      return this.display();
    });
  }
  // 删除成员信息
  async delteamAction() {
    //auto render template file index_tab.html
    if (this.isPost()) {
      let data = this.post();
      let model = this.model(data.model);
      try {
        await model.startTrans();
        await model.where({ stuno: data.stuno }).delete();
        fs.unlink(think.MD_PATH + '/' + data.model + '/' + data.mdname + '.md', (err) => {
          if (err) {
            throw err;
          }
          fs.unlink(think.TEAM_PATH + '/' + data.mdname + '/' + data.name, (err) => {
            if (err) { throw err; }
            think.rmdir(think.TEAM_PATH + '/' + data.mdname, false);
            await model.commit();
            return this.json({
              success: true,
              stuno: data.stuno,
              error: ''
            });
          });
        });
      } catch (err) {
        await model.rollback();
        return this.json({
          success: false,
          stuno: data.stuno,
          error: err
        });
      }
    }
  }
  async batchdelteamAction() {
    //auto render template file index_tab.html
    if (this.isPost()) {
      let data = this.post();
      let model = this.model(data.model);
      let _list = JSON.parse(data.data);
      try {
        await model.startTrans();
        _list.forEach(async (item) => {
          await model.where({ stuno: item.stuno }).delete();
          fs.unlink(think.MD_PATH + '/' + data.model + '/' + item.mdname + '.md', (err) => {
            if (err) {
              throw err;
            }
            fs.unlink(think.TEAM_PATH + '/' + item.mdname + '/' + item.name, (err) => {
              if (err) { throw err; }
              think.rmdir(think.TEAM_PATH + '/' + item.mdname, false);
              await model.commit();
              return this.json({
                success: true,
                error: ''
              });
            });
          });
        });
      } catch (err) {
        await model.rollback();
        return this.json({
          success: false,
          error: err
        });
      }
    }
  }
  // 更新成员信息
  async uteamAction() {
    //auto render template file index_uactivity.html
    let userInfo = await this.session('userInfo');
    if (think.isEmpty(userInfo)) {
      return this.fail('会话超时，请重新提交用户信息!');
    }
    if (this.isPost()) {
      let data = this.post();
      let model = this.model(data.model);
      let entrance = (data.stuno).substr(0, 4);
      let content = '## 个人信息 ##\n' +
        '- **姓名：**' + data.name + '\n' +
        '- **学号：**' + data.stuno + '\n' +
        '- **届时：**' + entrance + '\n' +
        '- **专业：**' + data.major + '\n' +
        '## 简单介绍 ##\n' +
        '暂无';
      try {
        await model.startTrans();
        await model.where({ id: data.id }).update({ name: data.name, stuno: data.stuno, major: data.major, entrance: entrance, uuser: userInfo.username, utime: think.datetime() });
        fs.writeFile(think.MD_PATH + '/' + data.model + '/' + data.mdname + '.md', content, (err) => {
          if (err) throw err;
          await model.commit();
          return this.json({
            success: true,
            team: { name: this.post().name, stuno: this.post().stuno },
            error: ''
          });
        });
      } catch (error) {
        return this.json({
          success: false,
          team: { name: this.post().name, stuno: this.post().stuno },
          error: error
        });
      }
    }
    let team = await this.model(this.get().model).where({ id: this.get().id }).find();
    this.assign('model', this.get().model);
    this.assign('data', team);
    return this.display();
  }
}