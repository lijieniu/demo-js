// curl 'https://backend.inagora.org/activity/ajaxDoCreateLotteryAward' \
//   -H 'authority: backend.inagora.org' \
//   -H 'accept: application/json, text/javascript, */*; q=0.01' \
//   -H 'accept-language: zh-CN,zh;q=0.9,en;q=0.8,ja;q=0.7' \
//   -H 'cache-control: no-cache' \
//   -H 'content-type: application/x-www-form-urlencoded; charset=UTF-8' \
//   -H 'cookie: user_key=ba140a435d7e5a0cd478386a08575353; token=7--p1UBPI0tSk-dOjKoo4Q2kqOZ9ke0UnuOMzsF5qqVYdZMlyNn5Gn5EVyxce3mz; Wonderfull-Session-Id=1547770587814002688; Csrf-Token-fe1a2a3s12=e0cae03bdd29796086c0056170b9e8f10038d649; img_fmt=webp; wonderfull_admin_token=niulijie.5e8bd02fd3eedf014218486b0e65b9ff.1657868574' \
//   -H 'csrf-token-fe1a2a3s12: e0cae03bdd29796086c0056170b9e8f10038d649' \
//   -H 'origin: https://backend.inagora.org' \
//   -H 'pragma: no-cache' \
//   -H 'referer: https://backend.inagora.org/activity/createLotteryAward?activity_id=191&winid=1657868570288' \
//   -H 'sec-ch-ua: " Not A;Brand";v="99", "Chromium";v="102", "Google Chrome";v="102"' \
//   -H 'sec-ch-ua-mobile: ?0' \
//   -H 'sec-ch-ua-platform: "macOS"' \
//   -H 'sec-fetch-dest: empty' \
//   -H 'sec-fetch-mode: cors' \
//   -H 'sec-fetch-site: same-origin' \
//   -H 'user-agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.0.0 Safari/537.36' \
//   -H 'x-requested-with: XMLHttpRequest' \
//   --data-raw 'activity_id=191&name=BCL%E9%98%B2%E6%B0%B4%E9%80%9F%E5%B9%B2%E7%9C%89%E6%AF%9B%E9%9B%A8%E8%A1%A35ml&num=50&type=9&winning_val=&exchange_code=%E5%A8%83%E5%A8%83%E6%9C%BA%E6%97%A5%E6%9C%AC&gift_goods_id=240895&goods_id=&house_id=0&winning_goods_price=&icon=https%3A%2F%2Fs3.wandougongzhu.cn%2Fs%2Fea%2F240895_8f6c1f.png&chance=50&winning_cycle=2&winning_num=17&award_winning_cycle=4&award_winning_num=1&award_tips=%E6%81%AD%E5%96%9C%E4%BD%A0&order_max_price=0&user_reg_sdate=&user_reg_edate=&valid_stime=2022-07-15+00%3A00%3A00&valid_etime=2022-07-20+00%3A00%3A00&note=' \
//   --compressed
const axios = require("axios");
const qs = require("querystring");
let confArr = [
  // {
  //   goodsId: 72678,
  //   nums: 10,
  //   code: "娃娃机日本",
  //   goodsName: "LE WATOSA 透明收纳化妆包",
  //   activityId: 191,
  //   icon: "https://s1.wandougongzhu.cn/s/f2/72678_69b2b7.png",
  // },
  // {
  //   goodsId: 237957,
  //   nums: 10,
  //   code: "娃娃机日本",
  //   goodsName: "CUPI 植物精华亮肤化妆水 120ml",
  //   activityId: 191,
  //   icon: "https://s5.wandougongzhu.cn/s/12/237957_73ee97.png",
  // },
  // {
  //   goodsId: 76865,
  //   nums: 6,
  //   code: "娃娃机日本",
  //   goodsName: "米肌 澄肌清透防晒啫喱 60g ",
  //   activityId: 191,
  //   icon: "https://s4.wandougongzhu.cn/s/37/76865_7bef71.png",
  // },
  // {
  //   goodsId: 223014,
  //   nums: 10,
  //   code: "娃娃机日本",
  //   goodsName: "Pure Dry胶原蛋白冻干粉 7支装",
  //   activityId: 191,
  //   icon: "https://s2.wandougongzhu.cn/s/07/223014_dfb686.png",
  // },
  {
    goodsId: 224554,
    nums: 20,
    code: "娃娃机日本",
    goodsName: "NEMOHAMO 保湿护理化妆水120ml",
    activityId: 191,
    icon: "https://s1.wandougongzhu.cn/s/a8/224554_74b256.png",
  },
  {
    goodsId: 223995,
    nums: 6,
    code: "娃娃机日本",
    goodsName: "E-Special保湿精华液18ml",
    activityId: 191,
    icon: "https://s4.wandougongzhu.cn/s/48/223995_57c8da.png",
  },
  {
    goodsId: 222250,
    nums: 40,
    code: "娃娃机日本",
    goodsName: "ARTNATURE 保湿卷翘奢华睫毛美容液6ml",
    activityId: 191,
    icon: "https://s2.wandougongzhu.cn/s/67/222250_e1bf9d.png",
  },
  {
    goodsId: 86640,
    nums: 1,
    code: "娃娃机日本",
    goodsName: "怡丽丝尔美容面霜45g",
    activityId: 191,
    icon: "https://s1.wandougongzhu.cn/s/87/86640_f53d55.png",
  },
  {
    goodsId: 118645,
    nums: 100,
    code: "娃娃机郑州1",
    goodsName: "友桝饮料 碳酸汽水2瓶",
    activityId: 191,
    icon: "https://s1.wandougongzhu.cn/s/0b/118645_2b3b12.png",
  },
  {
    goodsId: 80697,
    nums: 20,
    code: "娃娃机郑州1",
    goodsName: "米肌 化妆水纸膜 15片",
    activityId: 191,
    icon: "https://s2.wandougongzhu.cn/s/5a/80697_a73e26.png",
  },
  {
    goodsId: 80696,
    nums: 40,
    code: "娃娃机郑州1",
    goodsName: "米肌 纯棉化妆棉 40枚",
    activityId: 191,
    icon: "https://s3.wandougongzhu.cn/s/a4/80696_a16b90.png",
  },
  {
    goodsId: 222688,
    nums: 50,
    code: "娃娃机郑州1",
    goodsName: "贝亲 桃叶精华按摩油90ml",
    activityId: 191,
    icon: "https://s3.wandougongzhu.cn/s/61/222688_713135.png",
  },
  {
    goodsId: 28348,
    nums: 10,
    code: "娃娃机郑州1",
    goodsName: "卡乐比 薯条三兄弟 10袋",
    activityId: 191,
    icon: "https://s3.wandougongzhu.cn/s/33/28348_055978.png",
  },
  {
    goodsId: 218653,
    nums: 50,
    code: "娃娃机郑州1",
    goodsName: "大木制药 室内除菌清新净化剂",
    activityId: 191,
    icon: "https://s2.wandougongzhu.cn/s/cb/218653_5ca029.png",
  },
  {
    goodsId: 239093,
    nums: 10,
    code: "娃娃机郑州1",
    goodsName: "NARISUP 钻白补水护肤试用套装",
    activityId: 191,
    icon: "https://s5.wandougongzhu.cn/s/bc/239093_7f39f7.png",
  },
  {
    goodsId: 112917,
    nums: 6,
    code: "娃娃机郑州1",
    goodsName: "BIG BIO 除菌消臭防霉喷雾",
    activityId: 191,
    icon: "https://s3.wandougongzhu.cn/s/ea/112917_f1566c.png",
  },
  {
    goodsId: 62352,
    nums: 20,
    code: "娃娃机郑州1",
    goodsName: "MAMA BUTTER 沐浴露250mL",
    activityId: 191,
    icon: "https://s2.wandougongzhu.cn/s/cb/62352_ba243a.png",
  },
  {
    goodsId: 220892,
    nums: 1,
    code: "娃娃机郑州1",
    goodsName: "完美意境无暇透亮美肌蜜粉底 ",
    activityId: 191,
    icon: "https://s3.wandougongzhu.cn/s/f1/220892_665f2e.png",
  },
  {
    goodsId: 237822,
    nums: 10,
    code: "娃娃机郑州1",
    goodsName: "NARISUP 温和敏感肌用保湿乳液",
    activityId: 191,
    icon: "https://s3.wandougongzhu.cn/s/a3/237822_70fada.png",
  },
  {
    goodsId: 237821,
    nums: 10,
    code: "娃娃机郑州1",
    goodsName: "NARISUP 保湿化妆水180ml",
    activityId: 191,
    icon: "https://s3.wandougongzhu.cn/s/9a/237821_1d87f8.png",
  },
  {
    goodsId: 227327,
    nums: 10,
    code: "娃娃机郑州1",
    goodsName: "芳珂卸妆油超值套装",
    activityId: 191,
    icon: "https://s3.wandougongzhu.cn/s/08/227327_5093f8.png",
  },
  {
    goodsId: 220894,
    nums: 5,
    code: "娃娃机郑州1",
    goodsName: "怡丽丝尔 优悦活颜弹润免洗睡眠面膜",
    activityId: 191,
    icon: "https://s1.wandougongzhu.cn/s/79/220894_f1d536.png",
  },
  {
    goodsId: 220897,
    nums: 5,
    code: "娃娃机郑州1",
    goodsName: "怡丽丝尔 化妆水170mL",
    activityId: 191,
    icon: "https://s1.wandougongzhu.cn/s/e1/220897_ab1c06.png",
  },
  {
    goodsId: 220899,
    nums: 1,
    code: "娃娃机郑州1",
    goodsName: "怡丽丝尔 紧致乳液130mL",
    activityId: 191,
    icon: "https://s4.wandougongzhu.cn/s/f5/220899_1410fb.png",
  },
  {
    goodsId: 237349,
    nums: 10,
    code: "娃娃机郑州1",
    goodsName: "SPA透亮焕白精华18ml",
    activityId: 191,
    icon: "https://s3.wandougongzhu.cn/s/6a/237349_1784a0.png",
  },
  {
    goodsId: 237175,
    nums: 10,
    code: "娃娃机郑州1",
    goodsName: "REVISIS保湿面膜10片",
    activityId: 191,
    icon: "https://s5.wandougongzhu.cn/s/f8/237175_5098d1.png",
  },
  {
    goodsId: 220896,
    nums: 1,
    code: "娃娃机郑州1",
    goodsName: "资生堂抗皱精华眼霜22g",
    activityId: 191,
    icon: "https://s3.wandougongzhu.cn/s/93/220896_57edca.png",
  },
  {
    goodsId: 46617,
    nums: 4,
    code: "娃娃机郑州1",
    goodsName: "怡丽丝尔 免洗睡眠面膜105g",
    activityId: 191,
    icon: "https://s2.wandougongzhu.cn/s/93/46617_1259ab.png",
  },
  {
    goodsId: 86636,
    nums: 1,
    code: "娃娃机郑州1",
    goodsName: "怡丽丝尔精华眼霜15g",
    activityId: 191,
    icon: "https://s1.wandougongzhu.cn/s/fd/86636_bcac91.png",
  },
  {
    goodsId: 200550,
    nums: 50,
    code: "娃娃机郑州2",
    goodsName: "肩乐儿童背背佳",
    activityId: 191,
    icon: "https://s4.wandougongzhu.cn/s/22/200550_03a26e.png",
  },
];
// let params = decodeURIComponent(
//   "activity_id=191&name=BCL%E9%98%B2%E6%B0%B4%E9%80%9F%E5%B9%B2%E7%9C%89%E6%AF%9B%E9%9B%A8%E8%A1%A35ml&num=50&type=9&winning_val=&exchange_code=%E5%A8%83%E5%A8%83%E6%9C%BA%E6%97%A5%E6%9C%AC&gift_goods_id=240895&goods_id=&house_id=0&winning_goods_price=&icon=https%3A%2F%2Fs3.wandougongzhu.cn%2Fs%2Fea%2F240895_8f6c1f.png&chance=50&winning_cycle=2&winning_num=17&award_winning_cycle=4&award_winning_num=1&award_tips=%E6%81%AD%E5%96%9C%E4%BD%A0&order_max_price=0&user_reg_sdate=&user_reg_edate=&valid_stime=2022-07-15+00%3A00%3A00&valid_etime=2022-07-20+00%3A00%3A00&note="
// );
(async function () {
  for (let i = 0; i < confArr.length; i++) {
    await doRequest(i);
    console.log(i);
    await sleep(2000);
  }
})();
function sleep(time) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("");
    }, time);
  });
}
function doRequest(i) {
  return new Promise((resolve, reject) => {
    let data = {
      activity_id: 191,
      name: confArr[i].goodsName,
      num: confArr[i].nums,
      type: 9,
      winning_val: confArr[i].code,
      exchange_code: confArr[i].code,
      gift_goods_id: confArr[i].goodsId,
      goods_id: confArr[i].goodsId,
      house_id: 0,
      winning_goods_price: "",
      icon: confArr[i].icon,
      chance: confArr[i].nums,
      winning_cycle: 2,
      winning_num: Math.floor(confArr[i].nums / 3),
      award_winning_cycle: 4,
      award_winning_num: 1,
      award_tips: "恭喜你",
      order_max_price: 0,
      user_reg_sdate: "",
      user_reg_edate: "",
      valid_stime: "2022-07-15 00:00:00",
      valid_etime: "2022-07-20 00:00:00",
      note: "",
    };
    axios
      .post(
        "https://backend.inagora.org/activity/ajaxDoCreateLotteryAward",
        qs.stringify(data),
        {
          headers: {
            cookie:
              "user_key=ba140a435d7e5a0cd478386a08575353; token=7--p1UBPI0tSk-dOjKoo4Q2kqOZ9ke0UnuOMzsF5qqVYdZMlyNn5Gn5EVyxce3mz; Wonderfull-Session-Id=1547770587814002688; Csrf-Token-fe1a2a3s12=e0cae03bdd29796086c0056170b9e8f10038d649; img_fmt=webp; wonderfull_admin_token=niulijie.5e8bd02fd3eedf014218486b0e65b9ff.1657868574",
            "csrf-token-fe1a2a3s12": "e0cae03bdd29796086c0056170b9e8f10038d649",
            authority: "backend.inagora.org",
            "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
            origin: "https://backend.inagora.org",
            pragma: "no-cache",
            referer:
              "https://backend.inagora.org/activity/createLotteryAward?activity_id=191&winid=1657868570288",
            "sec-ch-ua":
              '" Not A;Brand";v="99", "Chromium";v="102", "Google Chrome";v="102"',
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": '"macOS"',
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-origin",
          },
        }
      )
      .then((res) => {
        resolve("");
        console.log(res.data);
      });
  });
}
