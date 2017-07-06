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
global.theme = function(self){
    return self.model('theme').field('tname,action').select();
}
global.news = function(self){
    return self.model('news').field('title,action,mdname').select();
}
global.activitys = function(self){
    return self.model('activity').field('title,action,mdname').select();
}
global.sites = function(self){
    return self.model('sites').field('sitename,siteurl').select();
}
global.pagetitles = function(self){
    return self.model('pagetitles').find();
}
global.verificateAdmin = function(self,uname,password){
    return self.model('admin').where({username: uname,passwd:think.md5(password)}).find();
}
global.poster = function(self){
    return self.model('poster').where({show: true}).find();
}