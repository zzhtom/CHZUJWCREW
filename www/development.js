var thinkjs = require('thinkjs');
var path = require('path');

var rootPath = path.dirname(__dirname);

var instance = new thinkjs({
  APP_PATH: rootPath + path.sep + 'app',
  RUNTIME_PATH: rootPath + path.sep + 'runtime',
  ROOT_PATH: rootPath,
  RESOURCE_PATH: __dirname,
  env: 'development'
});

/*var io = require('socket.io');
io.on('connection', function(socket){
  console.log('a user connected');
});*/
// Build code from src to app directory.
instance.compile({
	log: true,
	presets: [],
	plugins: []
});

instance.run();
