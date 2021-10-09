const Fontmin = require('fontmin');

let fontmin = new Fontmin()
                .use(Fontmin.glyph({
                    text: '0123456789找出处即可过关卡:新包装旧参照图超时闯关失败从头再来续命本成功去抽奖太厉害了下一题！!恭喜您中重新选抽兑换奖品千元免单立即去逛逛联系客服查看优惠券恭喜获得/s今日已超过可玩次数啦日本版国际版登录后点击查看答题排行榜第一名购物车今日已超过可玩次数啦防沉迷模式开启大奖等你明天再来哦～继',
                    hinting: false
                }))
                .src('./static/font/hanti3.ttf')
                .dest('./static/font/compress');
fontmin.run((err, files) => {
    console.log(files[0]);
});
