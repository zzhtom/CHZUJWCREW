'use strict';

import Base from './base.js';
const marked = require('marked'),
  fs = require("fs"),
  uuid = require('uuid/v1'),
  handle = require('./handle');;
export default class extends Base {
  /**
   * 说明: 此文件主要用于获取数据库的数据信息
   */
  async __before() {
    let ID = await this.session('identification');
    //判断 session 是否存在，不存在直接跳出主页面
    if (think.isEmpty(ID)) {
      return this.redirect('/rms/login');
    }
  }
  /**
   * area: for admin
   */
  async get_adminAction() {
    let ID = await this.session('identification');
    let adminInfo = await this.model('admin').getAdmin(ID.username);
    return this.json({
      data: adminInfo
    });
  }
  async getalladminAction() {
    let adminInfo = await this.model('admin').getAllAdmin(this.get().page, this.get().limit);
    for (var i in adminInfo.data) {
      adminInfo.data[i].id = parseInt(i) + 1;
    }
    return this.json({
      code: 0,
      msg: "用户列表",
      count: adminInfo.count,
      data: adminInfo.data
    });
  }
  async addadminAction() {
    if (this.isGet()) {
      return this.json({
        success: false,
        msg: "请求类型错误!"
      });
    }
    try {
      await this.model('admin').add(this.post());
      await this.cache('getAllAdmin', null);
      return this.json({
        success: true,
        msg: "添加用户成功!",
      });

    } catch (err) {
      return this.json({
        success: false,
        msg: err.stack
      });
    }
  }

  /**
   * area: for news
   */
  async getallnewsAction() {
    let newsInfo = await this.model('news').getAllNews(this.get().page, this.get().limit);
    // for (var i in newsInfo.data) {
    //   adminInfo.data[i].id = parseInt(i) + 1;
    // }
    return this.json({
      code: 0,
      msg: "新闻列表",
      count: newsInfo.count,
      data: newsInfo.data
    });
  }
  async addnewsAction() {
    if (this.isGet()) {
      return this.json({
        success: false,
        msg: "请求类型错误!"
      });
    }
    try {
      let data = this.post(),
        article = data.article,
        ID = await this.session('identification');
      data.mdname = uuid();
      data.cuser = ID.username;
      data.uuser = ID.username;
      data.ctime = think.datetime();
      data.utime = think.datetime();
      delete data['article'];
      await this.model('news').add(data);
      handle.isDir(think.NEWS_MD_PATH);
      let flag = await handle.createMarkdown(think.NEWS_MD_PATH, data.mdname, article);
      await this.cache('getAllNews', null);
      await this.cache('getNews', null);
      if (flag) {
        return this.json({
          success: true,
          msg: `添加新闻记录成功,添加文章结果成功`,
        });
      } else {
        return this.json({
          success: true,
          msg: `添加新闻记录成功,添加文章结果失败`,
        });
      }

    } catch (err) {
      return this.json({
        success: false,
        msg: err.stack
      });
    }
  }
}