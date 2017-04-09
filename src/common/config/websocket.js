export default {
  on: true, //是否开启 WebSocket
  type: "socket.io",
  allow_origin: "",
  sub_protocal: "",
  adapter: undefined,
  path: "", //url path for websocket
  messages: {
    open: 'home/chat/open',
    close: 'home/chat/close',
    chat: 'home/chat/chat',
    typing: 'home/chat/typing',
    stoptyping: 'home/chat/stoptyping',
    adduser: 'home/chat/adduser'
  }
};