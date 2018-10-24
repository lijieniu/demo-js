function Toast(options) {
    this.prompt = '';
    this.elem = null;
    this.init(options);
}

Object.defineProperty(Toast.prototype, 'constructor', {
    enumerable: false,
    value: Toast,
});

Toast.prototype = {
    init: function(option) {
        this.prompt = option.prompt || '';
        this.render();
        this.bindEvent();
    },
    // 显示
    show: function() {
        this.changeStyle(this.elem, 'display', 'block');
    },
    // 隐藏
    hide: function() {
        this.changeStyle(this.elem, 'display', 'none');
    },
    render: function() {
        var html = '';
        this.elem = document.createElement('div');
        this.changeStyle(this.elem, 'display', 'none');

        html += '<a class="J-close" href="javascript:;">x</a>';
        html += '<p>' + this.prompt + '</p>';

        this.elem.prompt = html;
        return document.body.appendChild(this.elem);
    },
    bindEvent: function() {
        var self = this;
        this.addEvent(this.elem, 'click', function(e) {
            if(e.target.className.indexOf('J-close') != -1) {
                self.hide();
            }
        });
    },
    addEvent: function(node, name, fn) {
        var self = this;
        node.addEventListener(name, function() {
            fn.apply(self, Array.prototype.slice.call(arguments));
        }, false);
    },
    changeStyle: function(node, key, value) {
        node.style[key] = value;
    }
}

var T = new Toast({prompt: 'I am Toast!'});
T.show();