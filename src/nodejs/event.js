var events = require('events');
var eventEmitter = new events.EventEmitter();

eventEmitter.on('some_event', function() {
    console.log('some_event 事件触发');
});

eventEmitter.on('some_event', function(arg1, arg2) {
    console.log(arg1, '--' + arg2);
});

eventEmitter.on('event2', function () {
    
});

eventEmitter.once('once_event', function() {
    console.log('once_event 触发了');
});

setTimeout(() => {
    console.log(eventEmitter.listeners('some_event'));
    eventEmitter.emit('some_event', '参数1', '参数2');
    eventEmitter.emit('once_event'); // 触发第一次
    eventEmitter.emit('once_event'); // 第二次不再触发
    // eventEmitter.emit('error');
}, 2000);