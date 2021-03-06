'use strict';

import Base from '../base.js';
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
  /**
   * author: zhangxiaoheng
   * time: 20170805
   * model area
   */
  async addmodelAction() {
    if (this.isPost()) {
      let data = this.post();
      let model = this.model(data.model);
      let userInfo = await this.session('userInfo');
      let mdpath = think.MD_PATH + '/' + data.model;
      let mdname = uuid();
      try {
        await model.startTrans();
        let activityId = await model.add({
          title: data.title, cuser: userInfo.username, uuser: userInfo.username, mdname: mdname,
          action: '/' + data.model + '/index', ctime: think.datetime(), utime: think.datetime()
        });
        await model.commit();
        if (data.model === 'activity') {
          await this.cache('getActivity', null);
        } else {
          await this.cache('getNews', null);
        }
        if (!think.isDir(mdpath)) {
          think.mkdir(mdpath);
        }
        fs.writeFile(mdpath + '/' + mdname + '.md', data.content, (err) => {
          if (!!err) {
            think.log(err, 'ERROR');
            return this.json({
              success: false,
              title: data.title,
              error: err
            });
          } else {
            think.log(`${mdname}.md文件添加成功`, 'INFO');
            return this.json({
              success: true,
              title: data.title,
              error: ''
            });
          }
        });
      } catch (err) {
        await model.rollback();
        return this.json({
          success: false,
          title: data.title,
          error: err
        });
      }
    } else {
      this.assign('addModel', this.get().model);
      return this.display();
    }
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
      if (this.post().model === 'activity') {
        await this.cache('getActivity', null);
      } else {
        await this.cache('getNews', null);
      }
      return this.json({
        success: true,
        id: this.post().id,
        title: this.post().title
      });
    } else {
      this.assign('model', this.get().model);
      this.assign('id', this.get().id);
      this.assign('title', this.get().title);
      return this.display();
    }

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
  async delmodelAction() {
    //auto render template file index_tab.html
    if (this.isPost()) {
      let data = this.post();
      let model = this.model(data.model);
      try {
        await model.startTrans();
        await model.where({ id: data.id }).delete();
        await model.commit();
        if (data.model === 'activity') {
          await this.cache('getActivity', null);
        } else {
          await this.cache('getNews', null);
        }
        fs.unlink(think.MD_PATH + '/' + data.model + '/' + data.mdname + '.md', (err) => {
          if (!!err) {
            think.log(err, 'ERROR');
            return this.json({
              success: false,
              title: data.title,
              error: err
            });
          } else {
            think.log(`${data.mdname}.md文件删除成功`, 'INFO');
            return this.json({
              success: true,
              title: data.title,
              error: ''
            });
          }
        });
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
        for (let i = 0; i < _list.length; i++) {
          await model.where({ id: _list[i].id }).delete();
          fs.unlink(think.MD_PATH + '/' + data.model + '/' + _list[i].mdname + '.md', (err) => {
            if (!!err) {
              think.log(err, 'ERROR');
            } else {
              think.log(`${_list[i].mdname}.md文件删除成功`, 'INFO');
            }
          });
        }
        await model.commit();
        if (data.model === 'activity') {
          await this.cache('getActivity', null);
        } else {
          await this.cache('getNews', null);
        }
        return this.json({
          success: true,
          error: ''
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
      fs.writeFile(think.MD_PATH + '/' + data.model + '/' + data.mdname + '.md', data.content, (err) => {
        if (!!err) {
          think.log(err, 'ERROR');
          return this.json({
            success: false,
            title: data.title,
            error: err
          });
        } else {
          think.log(`${data.mdname}.md文件编辑成功`, 'INFO');
          return this.json({
            success: true,
            title: data.title,
            error: ''
          });
        }
      });
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
      let affectedRows = await model.where({ tid: i }).update({ tname: themes[i - 1], uuser: userInfo.username, utime: think.datetime() });
      if (affectedRows != 1)
        return this.fail('更新' + themes[i - 1] + '信息失败');
    }
    let msg = "modify success!"
    await this.cache('getTheme', null);
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
        // return this.redirect('/admin/login/login');
      } else {
        this.assign('msg', '原密码错误！');
      }
    }
    return this.display();
  }
  /**
   * author: zhangxiaoheng
   * time: 20170805
   * POSTER AREA
   */
  async addposterAction() {
    //auto render template file index_tab.html
    if (this.isPost()) {
      let data = this.post();
      let model = this.model(data.model);
      let userInfo = await this.session('userInfo');
      let mdpath = think.MD_PATH + '/' + data.model;
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
        await model.commit();
        await this.cache('getPoster', null);
        if (!think.isDir(mdpath)) {
          think.mkdir(mdpath);
        }
        fs.writeFile(mdpath + '/' + mdname + '.md', data.content, async (err) => {
          if (!!err) {
            think.log(err, 'ERROR');
            return this.json({
              success: false,
              error: err
            });
          } else {
            think.log(`${data.mdname}.md文件创建成功`, 'INFO');
            var posterPath = think.POSTER_PATH + mdname;
            think.mkdir(posterPath);
            fs.renameSync(filepath, posterPath + '/' + pname);
            this.assign('addModel', data.model);
            this.assign('tips', 'add poster is success!')
            return this.display();
          }
        });
      } catch (err) {
        think.log(err, 'ERROR');
        await model.rollback();
        return this.json({
          success: false,
          error: err
        });
      }
    } else {
      this.assign('addModel', this.get().model);
      this.assign('tips', '')
      return this.display();
    }
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
        await this.cache('getPoster', null);
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
      await this.cache('getPoster', null);
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
          if (!!err) {
            think.log(err, 'ERROR');
          } else {
            think.log(`${data.mdname}.md文件删除成功`, 'INFO');
            fs.unlink(think.POSTER_PATH + '/' + data.mdname + '/' + data.pname, (err) => {
              if (!!err) {
                think.log(err, 'ERROR');
              } else {
                think.log(`${data.pname}文件删除成功`, 'INFO');
                think.rmdir(think.POSTER_PATH + '/' + data.mdname, false);
              }
            });
          }
        });
        await model.commit();
        await this.cache('getPoster', null);
        return this.json({
          success: true,
          theme: data.theme,
          error: ''
        });
      } catch (err) {
        await model.rollback();
        return this.json({
          success: false,
          title: data.theme,
          error: err
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
        for (let i = 0; i < _list.length; i++) {
          await model.where({ theme: _list[i].theme }).delete();
          fs.unlink(think.MD_PATH + '/' + data.model + '/' + _list[i].mdname + '.md', (err) => {
            if (!!err) {
              think.log(err, 'ERROR');
            } else {
              think.log(`${_list[i].mdname}.md文件删除成功`, 'INFO');
              fs.unlink(think.POSTER_PATH + '/' + _list[i].mdname + '/' + _list[i].pname, (err) => {
                if (!!err) {
                  think.log(err, 'ERROR');
                } else {
                  think.log(`${_list[i].pname}文件删除成功`, 'INFO');
                  think.rmdir(think.POSTER_PATH + '/' + _list[i].mdname, false);
                }
              });
            }
          });
        }
        await model.commit();
        await this.cache('getPoster', null);
        return this.json({
          success: true,
          error: ''
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
      fs.writeFile(think.MD_PATH + '/' + data.model + '/' + data.mdname + '.md', data.content, (err) => {
        if (!!err) {
          think.log(err, 'ERROR');
          return this.json({
            success: false,
            name: data.name,
            error: err
          });
        } else {
          think.log(`${data.mdname}.md文件编辑成功`, 'INFO');
          return this.json({
            success: true,
            name: data.name,
            error: ''
          });
        }
      });
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
          if (!!err) {
            think.log(err, 'ERROR');
          } else {
            think.log(`${data.mdname}.md文件删除成功`, 'INFO');
            fs.unlink(think.GALLERY_PATH + '/' + data.mdname + '/' + data.name, (err) => {
              if (!!err) {
                think.log(err, 'ERROR');
              } else {
                think.log(`${data.name}文件删除成功`, 'INFO');
                think.rmdir(think.GALLERY_PATH + '/' + data.mdname, false);
              }
            });
          }
        });
        await model.commit();
        await this.cache('getGallery', null);
        return this.json({
          success: true,
          name: data.name,
          error: ''
        });
      } catch (err) {
        await model.rollback();
        return this.json({
          success: false,
          name: data.name,
          error: err
        });
        think.log(err, 'ERROR');
      }
    }
  }
  async batchdelgalleryAction() {
    //auto render template file index_tab.html
    if (this.isPost()) {
      let data = this.post();
      let model = this.model(data.model);
      let _list = JSON.parse(data.data);
      let i = 0;
      try {
        await model.startTrans();
        for (; i < _list.length; i++) {
          await model.where({ name: _list[i].name }).delete();
          fs.unlink(think.MD_PATH + data.model + '/' + _list[i].mdname + '.md', (err) => {
            if (!!err) {
              think.log(err, 'ERROR');
            } else {
              think.log(`${_list[i].mdname}.md文件删除成功`, 'INFO');
              fs.unlink(think.GALLERY_PATH + _list[i].mdname + '/' + _list[i].name, (err) => {
                if (!!err) {
                  think.log(err, 'ERROR');
                } else {
                  think.log(`${_list[i].name}文件删除成功`, 'INFO');
                  think.rmdir(think.GALLERY_PATH + '/' + _list[i].mdname, false);
                }
              });
            }
          });
        }
        await model.commit();
        await this.cache('getGallery', null);
        return this.json({
          success: true,
          error: ''
        });
      } catch (err) {
        await model.rollback();
        think.log(err, 'ERROR');
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
        await this.cache('getGallery', null);
        return this.json({
          success: true,
          error: ''
        });
        // return this.display();
      } catch (err) {
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
      let id = uuid();
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
      let mdpath = think.MD_PATH + '/' + data.model;
      try {
        await model.startTrans();
        await model.add({
          id: id, name: data.name, stuno: data.stuno, major: data.major, entrance: data.entrance, cuser: userInfo.username, photo: photo, uuser: userInfo.username, mdname: mdname,
          ctime: think.datetime(), utime: think.datetime()
        });
        await model.commit();
        await this.cache('getTeam', null);
        if (!think.isDir(mdpath)) {
          think.mkdir(mdpath);
        }
        fs.writeFile(mdpath + '/' + mdname + '.md', content, (err) => {
          if (!!err) {
            think.log(err, 'ERROR');
            // await model.where({ id: id }).delete();
            return this.json({
              success: false,
              team: { name: data.name, stuno: data.stuno },
              error: err
            });
          } else {
            think.log(`${mdname}.md文件添加成功`, 'INFO');
            let photoPath = think.TEAM_PATH + mdname;
            think.mkdir(photoPath);
            fs.renameSync(filepath, photoPath + '/' + photo);
            return this.json({
              success: true,
              team: { name: data.name, stuno: data.stuno },
              error: ''
            });
          }
        });
      } catch (err) {
        await model.rollback();
        return this.json({
          success: false,
          team: { name: data.name, stuno: data.stuno },
          error: err
        });
      }
    } else {
      this.assign('addModel', this.get().model);
      return this.display()
    }
  }
  // 编辑成员信息
  editteamAction() {
    //auto render template file index_tab.html
    if (this.isPost()) {
      let data = this.post();
      fs.writeFile(think.MD_PATH + data.model + '/' + data.mdname + '.md', data.content, (err) => {
        if (!!err) {
          think.log(err, 'ERROR');
          return this.json({
            success: false,
            team: { name: data.name, model: data.model },
            error: err
          });
        } else {
          think.log(`${data.mdname}.md文件编辑成功`, 'INFO');
          return this.json({
            success: true,
            team: { name: data.name, model: data.model },
            error: ''
          });
        }
      });
    }
    fs.readFile(think.MD_PATH + this.get().model + '/' + this.get().mdname + '.md', 'utf8', (err, data) => {
      if (!!err) {
        think.log(err, 'ERROR');
        return this.fail('error information!')
      } else {
        this.assign('name', this.get().name);
        this.assign('mdname', this.get().mdname);
        this.assign('content', data);
        this.assign('showModel', this.get().model);
        return this.display();
      }
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
        await model.commit();
        await this.cache('getTeam', null);
      } catch (err) {
        await model.rollback();
        return this.json({
          success: false,
          stuno: data.stuno,
          error: err
        });
      }
      fs.unlink(think.MD_PATH + data.model + '/' + data.mdname + '.md', (err) => {
        if (!!err) {
          think.log(err, 'ERROR');
          return this.json({
            success: false,
            stuno: data.stuno,
            error: err
          });
        } else {
          think.log(`${data.mdname}.md文件删除成功`, 'INFO');
          fs.unlink(think.TEAM_PATH + data.mdname + '/' + data.photo, (err) => {
            if (!!err) {
              think.log(err, 'ERROR');
              return this.json({
                success: false,
                stuno: data.stuno,
                error: err
              });
            } else {
              think.log(`${data.photo}文件删除成功`, 'INFO');
              think.rmdir(think.TEAM_PATH + '/' + data.mdname, false);
              return this.json({
                success: true,
                stuno: data.stuno,
                error: ''
              });
            }
          });
        }
      });
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
        for (let i = 0; i < _list.length; i++) {
          await model.where({ stuno: _list[i].stuno }).delete();
          fs.unlink(think.MD_PATH + '/' + data.model + '/' + _list[i].mdname + '.md', (err) => {
            if (!!err) {
              think.log(err, 'ERROR');
            } else {
              think.log(`${_list[i].name}.md文件删除成功`, 'INFO');
              fs.unlink(think.TEAM_PATH + '/' + _list[i].mdname + '/' + _list[i].name, (err) => {
                if (!!err) {
                  think.rmdir(think.TEAM_PATH + '/' + _list[i].mdname, false);
                } else {
                  think.log(err, 'ERROR');
                }
              });
            }
          });
        }
        await model.commit();
        await this.cache('getTeam', null);
        return this.json({
          success: true,
          error: ''
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
      await model.startTrans();
      await model.where({ id: data.id }).update({ name: data.name, stuno: data.stuno, major: data.major, entrance: entrance, uuser: userInfo.username, utime: think.datetime() });
      fs.writeFile(think.MD_PATH + '/' + data.model + '/' + data.mdname + '.md', content, async (err) => {
        if (!!err) {
          think.log(err, 'ERROR');
          return this.json({
            success: false,
            team: { name: this.post().name, stuno: this.post().stuno },
            error: error
          });
        } else {
          think.log(`${data.mdname}.md文件编辑成功`, 'INFO');
          await model.commit();
          await this.cache('getTeam', null);
          return this.json({
            success: true,
            team: { name: this.post().name, stuno: this.post().stuno },
            error: ''
          });
        }
      });
    }
    let team = await this.model(this.get().model).where({ id: this.get().id }).find();
    this.assign('model', this.get().model);
    this.assign('data', team);
    return this.display();
  }
}