const fs = require('fs');
module.exports = {
    // 判断文件夹是否存在,不存在即创建
    isDir: function (path) {
        if (!think.isDir(path)) {
            think.mkdir(path);
        }
    },
    // 创建markdown文件
    createMarkdown: function (path, name, content) {
        return new Promise(function (resolve, reject) {
            fs.writeFile(path + '/' + name + '.md', content, (err) => {
                if (!!err) {
                    think.log(err, 'ERROR');
                    reject(false);
                } else {
                    think.log(`${name}.md文件添加成功`, 'INFO');
                    resolve(true);
                }
            });
        })

    }
}