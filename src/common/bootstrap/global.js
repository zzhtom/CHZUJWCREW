/**
 * this file will be loaded before server started
 * you can define global functions used in controllers, models, templates
 */

/**
 * use global.xxx to define global functions
 * 
 * global.fn1 = function(){
 *     
 * }
 */
// 网页标题
global.title = '滁院J舞社'
// 随机数
global.random = Math.random();
// 查询数据库
global.theme = function (self) {
    // return self.model('theme').cache().field('tname,action').select();
    return self.model('theme').getTheme();
}
global.news = function (self) {
    return self.model('news').getNews();
}
global.activitys = function (self) {
    return self.model('activity').getActivity();
}
global.sites = function (self) {
    return self.model('sites').getSites();
}
global.pagetitles = function (self) {
    return self.model('pagetitles').getPagetitles();
}
global.verificateAdmin = function (self, uname, password) {
    return self.model('admin').cache().where({ username: uname, passwd: think.md5(password) }).find();
}
global.poster = function (self) {
    return self.model('poster').getPoster();
}
global.team = function (self) {
    return self.model('team').getTeam();
}
global.gallery = function (self) {
    return self.model('gallery').getGallery();
}