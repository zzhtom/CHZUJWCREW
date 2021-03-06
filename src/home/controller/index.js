'use strict';

import Base from './base.js';
var marked = require('marked'), fs = require("fs");
export default class extends Base {
  /**
   * index action
   * @return {Promise} []
   */
  async indexAction() {
    //auto render template file index_index.html
    // let data = await this.model('theme').field('tname').select();
    //let data = model.limit(2).select();
    // console.log(data.length);
    let themesData = await global.theme(this);
    let newsData = await global.news(this);
    let activitysData = await global.activitys(this);
    let sitesData = await global.sites(this);
    let pagetitlesData = await global.pagetitles(this);
    let poster = await global.poster(this);
    this.assign('themes', themesData);
    this.assign('news', newsData);
    this.assign('activitys', activitysData);
    this.assign('sites', sitesData);
    this.assign('pagetitles', pagetitlesData);
    this.assign('title', global.title);
    this.assign('poster', poster);
    return this.display();
  }
  async teamAction(){
    let arr = new Array();
    let themesData = await global.theme(this);
    let data = await global.team(this);
    data.forEach(function(item){
      item.mdData = marked(fs.readFileSync(think.MD_PATH + 'team/' + item.mdname + '.md', 'utf-8').toString());
      arr.push(item);
    });
    // let mdData = fs.readFileSync(think.MD_PATH + 'jwcrew.md', 'utf-8').toString();
    this.assign('themes', themesData);
    this.assign('data', arr);
    return this.display();
  }
  async displayvideoAction() {
    //auto render template file index_displyvideo.html
    //var videoSrc = this.get('src');
    //console.log(videoSrc);
    let data = await global.theme(this);
    this.assign('themes', data);
    this.assign('videoSrc', this.get('src'));
    this.assign('title', global.title);
    return this.display();
  }
  async communicationAction() {
    //auto render template file index_communication.html
    let data = await global.theme(this);
    this.assign('themes', data);
    this.assign('title', global.title);
    return this.display();
  }
  async videoAction() {
    //auto render template file index_ideo.html
    let data = await global.theme(this),
        videos = await global.video(this);
    this.assign('themes', data);
    this.assign('title', global.title);
    this.assign('videos', videos);
    return this.display();
  }
  async communitydetailAction() {
    //auto render template file indexcommunitydetail.html
    let data = await global.theme(this);
    let mdData = fs.readFileSync(think.RESOURCE_PATH + '/static/resource/markdown/' + 'jwcrew.md', 'utf-8').toString();
    this.assign('themes', data);
    this.assign('title', global.title);
    this.assign('crewrule', marked(mdData));
    return this.display();
  }
  async photographAction() {
    //auto render template file index_photograph.html
    let data = await global.theme(this);
    this.assign('themes', data);
    this.assign('title', global.title);
    return this.display();
  }
  musicAction(){
    return this.display();
  }
}