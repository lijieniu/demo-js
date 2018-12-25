var __const = function __const(data, value) {
    window.data = value;
    Object.defineProperty(window, data, {
        enumerable: false,
        configurable: false,
        get: function() {
            return value;
        },
        set: function(data) {
            if(data !== value) {
                throw new TypeError('Assignmeng to constant variable!');
            } else {
                return value
            }
        }
    });
}
__const('a', 10);
console.log(a);
delete a;
console.log(a);
for(let item in window) {
    if(item === 'a') {
        console.log(window[item]);
    }
}
a = 20;