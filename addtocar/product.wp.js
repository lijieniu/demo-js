/* global PAGE_CONF, GOODS_CONF, Vue */

import 'coms/highQualityDetect';
import AdBox from 'coms-dev/adbox';
import Cookie from 'js/lib/cookie';
import Vuex from 'vuex';
import jsShare from 'coms/jsShare';
import buy from './buy.vue';
import presaleorderbuy from './presaleorder.vue';
import qtip from 'coms-dev/QuickTip';
import Swipable from 'coms/nova/Swipable';
import Dialog from 'coms-dev/Dialog/index';
import '../index/include/actionsupport';

var postSwipable,
	brandSwipable,
	guessSwipable,
	imgPreSwipable,
	videoSwipable,
	partnerSwipable1,
	partnerSwipable2,
	articleSwipable,
	bundleSwipable,
	recoSwipable;
var guessGoodsData;

const store = new Vuex.Store({
	state: {
		goodsConf: {},
	},
	mutations: {
		changeGoods(state, conf) {
			state.goodsConf = conf;
		}
	}
});

let app = new Vue({
	store,
	data: {
		data: {}
	},
	components: {
		'x-buy': buy,
		'x-presaleorder':presaleorderbuy
	}
}).$mount('#app');

function Tick(options) {
	this.startTime = +new Date();
	this.timeTotal = options.dtime - options.now;
	this.el = options.el;
	this.callback = options.callback || null;
	this.tick();
}

Tick.timeFormat = function (time) {
	var d = 0,
		h = 0,
		m = 0,
		s = 0;
	if (time > 60 * 60 * 24) {
		d = Math.floor(time / 60 / 60 / 24);
		time = time % (60 * 60 * 24);
	}
	if (time > 60 * 60) {
		h = Math.floor(time / 60 / 60);
		time = time % (60 * 60);
	}
	if (time > 60) {
		m = Math.floor(time / 60);
		time = time % 60;
	}
	s = time;

	var str = [];
	[d, h, m, s].forEach(function (t) {
		if (t < 10) {
			str.push('0' + t);
		} else {
			str.push(t);
		}
	});
	var timeStr;
	if (str.length == 4) {
		if (str[0] > 0) {
			timeStr = str[0] + '天';
		} else {
			timeStr = str[1] + ':' + str[2] + ':' + str[3];
		}
	} else if (str.length == 3) {
		timeStr = str[0] + ':' + str[1] + ':' + str[2];
	} else if (str.length == 2) {
		timeStr = str[0] + ':' + str[1];
	} else {
		timeStr = str[0] + '秒';
	}
	return timeStr;
};
Tick.prototype = {
	tick: function () {
		var left = this.timeTotal - ((new Date()) - this.startTime);
		if (left < 0) {
			return;
		}
		if (this.callback) {
			this.callback(left);
		} else {
			this.el.html(Tick.timeFormat(Math.floor(left / 1000)));
		}

		var self = this;
		setTimeout(function () { self.tick(); }, 1000);
	}
};

function getQueryString(name) {
	var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
	var r = window.location.search.substr(1).match(reg);
	if (r != null) return unescape(r[2]);
	return null;
}

function getCSS(obj,style){
	if(window.getComputedStyle){
		return getComputedStyle(obj)[style];
	}
	return obj.currentStyle[style];
} 
function parabolMove(json){
	//设置要操作的元素
	var obj = json.obj;
	//设置x轴上的目标值
	var xTarget = json.xTarget;
	xTarget = Number(xTarget) || 300;
	var yTarget = json.yTarget;
	yTarget = Number(yTarget) || 550;
	//设置x轴的步长值
	var stepValue = json.step || 2;
	//设置x轴的步长
	var step = 0;
	//设置回调函数
	var fn = json.fn;
	//参数a、b、c
	var a = json.a;
	a = Number(a) || 0.01;
	var b = json.b;
	b = Number(b) || -1*xTarget/100;
	var c = json.c;
	c = Number(c) || 0;
	//初始值
	var left = parseFloat(getCSS(obj,'left'));
	console.log(left)
	if(left <= xTarget){return;}
	var top = parseFloat(getCSS(obj,'top')); 
	//清除定时器
	if(obj.timer){return;}
	//声明当前值cur
	var cur = {};
	obj.timer = setInterval(function(){
		//更新步长值
		step += stepValue; 
		//更新left和top值
		var x = left - step;
		// 抛物线公式
		var y = top + a*step*step + b*step + c;
		if(x < xTarget){
			x = xTarget;
		}
		if (y > yTarget) {
			y = yTarget;
		}
		obj.style.left = x + 'px';
		obj.style.top = y + 'px';  
		//如果到达目标点，清除定时器
		if(x == xTarget || y == yTarget){
			clearInterval(obj.timer);
			obj.timer = 0;
			fn && fn.call(obj);    
		}  
	},20);
}

function initEvent() {
	
	if (PAGE_CONF.isDutyfree != '1') {
		$('.collect-btn').on('click', function () {
			if (!PAGE_CONF.isLogin) {
				location.href = PAGE_CONF.browser.app ? 'wonderfull://mall/login' : '/user/login';
				return;
			}
			var $this = $(this);
			var goods_id = GOODS_CONF.id;
			var isCollected = GOODS_CONF.collected;
			var action, isArrivalNotice;
			if (isCollected > 0) {
				action = '/Collect/ajaxCancel';
			} else {
				action = '/Collect/ajaxAdd';
			}
			if (GOODS_CONF.residue_count > 0) {
				isArrivalNotice = 0;
			} else {
				isArrivalNotice = 1;
			}
			$.post(action, {
				goods_id: goods_id,
				is_arrival_notice: isArrivalNotice
			}, function (res) {
				if (!res.errno) {
					if (isCollected > 0) {
						qtip.show('取消关注');
						GOODS_CONF.collected = 0;
						$this.removeClass('collected').addClass('collect');
					} else {
						qtip.show('关注成功');
						GOODS_CONF.collected = 1;
						$this.removeClass('collect').addClass('collected');
					}
				} else {
					qtip.show(res.errmsg);
				}
			}, 'json');
		});
	}

	$('.goods-act-item').on('click', function () {
		var $this = $(this);
		var tag = $this.data('goods');
		if (tag == 1) {
			$('#giftPanel').show();
		} else {
			var action = $this.data('action');
			if (action) {
				location.href = action;
			}

		}
	});

	$('.get-coupon').on('click', function () {
		$.post('/product/ajaxGetGoodsRelCouponList', {
			goods_id: GOODS_CONF.id
		}, function (res) {
			console.log(res);
			new Vue({
				el: '#coupon',

				replace: true,
				data: {
					items: res.data
				},
				methods: {
					getCoupon: function (couponItem) {
						$.post('/userCoupon/ajaxReceGoodsCoupon', {
							goods_id: GOODS_CONF.id,
							coupon_id: couponItem.coupon_id
						}, function (res) {
							if (!res.errno) {
								qtip.show('领取成功');
								couponItem.is_received = true;
							} else {
								qtip.show(res.errmsg);
							}
						}, 'json');
					}
				},
				template: $('#couponTpl').html(),
			});
		}, 'json');
		$('#couponPanel').show();
	});

	//领券
	$('.dutyfree-coupon-item').click(function () {
		if (!PAGE_CONF.isLogin) {
			location.href = PAGE_CONF.browser.app ? 'wonderfull://mall/login' : '/user/login';
			return;
		}

		var couponId = $(this).data('coupon');
		var couponKey;
		if (couponId == '1469') {
			couponKey = 'c79057ec47b8bf79';
		} else if (couponId == '1566') {
			couponKey = '104935234b174e62';
		}

		$.post('/userCoupon/ajaxRecvCoupon', {
			coupon_id: couponId,
			coupon_ukey: couponKey
		}).then(function (res) {
			if (!res.errno) {
				qtip.show('领取成功');
			} else {
				qtip.show(res.errmsg);
			}
		});
	});

	$('.gift-close, .service-close, .coupon-close').on('click', function () {
		$('.p-bottom-panel').hide();
	});

	$('#giftPanel').on('touchmove', function () {
		return false;
	});

	$('.info-more').on('click', function () {
		var $parent = $(this).siblings('.info-content');
		$parent.removeClass('info-collapse');
		$(this).remove();
	});

	$('.goods-nav').on('click', function () {
		var $this = $(this),
			nav = $this.data('nav');
		if (!$this.hasClass('goods-nav-current')) {
			$this.addClass('goods-nav-current');
			$this.siblings('.goods-nav').removeClass('goods-nav-current');
			if (nav == 'detail') {
				$('.goods-detail-item').show();
				$('.goods-question-item').hide();
			} else {
				$('.goods-detail-item').hide();
				$('.goods-question-item').show();
			}
		}
	});
	var screenWidth = document.body.clientWidth || document.documentElement.clientWidth;
	var endX = $('.fixed-operate-bar-cart-box').offset().left + $('.fixed-operate-bar-cart-box').width() / 2 - 20;
	$('.call-panel').on('click', function (e) {
		addtoCartAnimation.init(e.clientX,endX,0.005,'https://ossimg.wandougongzhu.cn/7850045f13b057290024914858c3c803.png@750w_193h_1l.webp', 3, function() {
			
			document.getElementById('carContainer') ? actionBar.removeChild(document.getElementById('carContainer')) : ''
		});

    	addtoCartAnimation.move();
		// debugger;
		// if (!PAGE_CONF.isLogin) {
		// 	location.href = PAGE_CONF.browser.app ? 'wonderfull://mall/login' : '/user/login';
		// 	return;
		// }
		// var curGoods = {};
		// curGoods = $.extend({}, GOODS_CONF);
		// var opt = $(this).data('opt');
		// if (location.search.indexOf('loc') != -1) {
		// 	curGoods.loc = getQueryString('loc');
		// }
		// if (location.search.indexOf('ch') != -1) {
		// 	curGoods.ch = getQueryString('ch');
		// }

		// if (opt == 'buy') {
		// 	// todo: this
		// 	curGoods.text = '立即购买';
		// 	curGoods.buy = true;
		// } else if (opt == 'add') {
		// 	curGoods.text = '确定加入购物袋';
		// 	curGoods.addCart = true;
		// } else if (opt == 'select') {
		// 	curGoods.text = '添加到推荐清单';
		// 	curGoods.drp = true;
		// } else if (opt == 'pre-sale-order'){
		// 	curGoods.text = '确定支付定金';
		// 	curGoods.preSaleOrder = true;
		// }
		// if(opt == 'pre-sale-order'){
		// 	curGoods.isShow = false;
		// 	curGoods.presaleShow = true;
		// }else{
		// 	curGoods.isShow = true;
		// 	curGoods.presaleShow = false;
		// }
		// store.commit('changeGoods', curGoods);
		// app.data = curGoods;
	});

	$('.show-big-img-js').on('click',function(){
		$('.big-first-promise').show();
	});
	$('.close-big-img-js').on('click',function(){
		$('.big-first-promise').hide();
	});

	if (!postSwipable) {
		var $postCard = $('.post-box');
		postSwipable = new Swipable({
			element: $postCard,
			dir: 'horizontal'
		});
	}
	postSwipable.refresh();

	if (!brandSwipable) {
		var $brandCard = $('.brand-box');
		brandSwipable = new Swipable({
			element: $brandCard,
			dir: 'horizontal'
		});
	}
	brandSwipable.refresh();

	if (!videoSwipable) {
		var $videoCard = $('.video-box');
		videoSwipable = new Swipable({
			element: $videoCard,
			dir: 'horizontal'
		});
	}
	videoSwipable.refresh();

	if (!partnerSwipable1) {
		var $partnerCard1 = $('.partner-swip-1');
		partnerSwipable1 = new Swipable({
			element: $partnerCard1,
			dir: 'horizontal'
		});
	}
	partnerSwipable1.refresh();

	if (!partnerSwipable2) {
		var $partnerCard2 = $('.partner-swip-2');
		partnerSwipable2 = new Swipable({
			element: $partnerCard2,
			dir: 'horizontal'
		});
	}
	partnerSwipable2.refresh();

	if (!articleSwipable) {
		var $articleCard = $('.article-box');
		articleSwipable = new Swipable({
			element: $articleCard,
			dir: 'horizontal'
		});
	}
	articleSwipable.refresh();

	if (!bundleSwipable) {
		var $bundleCard = $('.bundle-box');
		bundleSwipable = new Swipable({
			element: $bundleCard,
			dir: 'horizontal'
		});
	}
	bundleSwipable.refresh();

	if($('.recommendation-panel')) {
		$('.reco-head').click(function() {
			$('.recommendation-panel').toggleClass('reco-active');
		});
		if(!recoSwipable) {
			var $recoCard = $('.reco-box');
			recoSwipable = new Swipable({
				element: $recoCard,
				dir: 'horizontal'
			});
		}
		recoSwipable.refresh();
		$('.recommendation-panel').on('touchmove',function(e){
			e.preventDefault();
		});
	}

	var imgSlide = $('#slider').swipeSlide({
		continuousScroll: true,
		autoSwipe: false,
		lazyLoad: true,
		speed: 3000,
		transitionType: 'cubic-bezier(0.22, 0.69, 0.72, 0.88)',
		firstCallback: function () { },
		callback: function (i, sum, me) {
			me.find('.dot').children().eq(i).addClass('cur').siblings().removeClass('cur');
		}
	});
	$('.dot span:first-child').addClass('cur');
	//默认定位到相册第一张图
	if ($('.dot span:first-child').hasClass('dot-video')) {
		imgSlide[0].goTo(1);
	}

	if (!imgPreSwipable) {
		var $card = $('#goodsMainInfo').find('.slider-box');
		imgPreSwipable = new Swipable({
			element: $card,
			dir: 'horizontal'
		});
	}
	imgPreSwipable.refresh();

	//展开列表
	$('.show-add').click(function(){
		$('.show-add').hide();
		$('.show-cut').show();
		$('.js-comment-box').show();
	});
	$('.show-cut').click(function(){
		$('.js-comment-box').hide();
		$('.show-add').show();
		$('.show-cut').hide();
	});

	// 最佳拍档
	$('.paterner-tap').on('click','.goods-type-item',function(){
		let index = $(this).index();
		if(!$(this).hasClass('paterner-actived')){
			$(this).addClass('paterner-actived').siblings().removeClass('paterner-actived');
		}
		$('.partner-list-js').eq(index).show().siblings('.partner-list-js').hide();
	});

}

$(function () {
	var $el = $('.act-left-time-wrap');
	var now = $el.data('now');
	var endTime = (parseInt($el.data('dtime'), 10) * 1000)||Infinity;
	now = now * 1000 || +new Date();

	// 如果倒计时时间大于7天将不展现
	if (endTime - now >= 7 * 24 * 60 * 60 * 1000) {
		$('.act-left-time').hide();
	} else {
		new Tick({
			el: $el,
			now: now,
			dtime: endTime
		});
	}

	// 如果插入节点存在，再拉取数据
	if ($('#guessGoods')[0]) {
		$.get('/Product/ajaxGetGuessGoods', {
			goods_id: GOODS_CONF.id
		}, function (res) {
			// debugger;
			let data = res.data;
			data.forEach(item => {
				item.show_discount = Math.ceil(item.discount);
			});
			// console.log(data);
			guessGoodsData = data;

			new Vue({
				el: '#guessGoods',
				replace: true,
				data: {
					items: guessGoodsData
				},
				methods: {
					goDetail(goods_id) {
						if(GOODS_CONF.isApp) {
							location.href='wonderfull://mall/goods_detail?goods_id=' + goods_id;
						} else{
							if(origin == 'drp') {
								location.href = '/product?goods_id='+goods_id+'&origin=drp&link_id='+linkId;
							} else {
								location.href='/product/' + goods_id + '.html';
							}

						}
					},
					addCart(goods_id,house_id,act_id){
						$.post('/Cart/ajaxAdd', {
							goods_id: goods_id,
							activity_id: act_id,
							house_id: house_id
						}).then((res) => {
							if(res.errno == '0'){
								qtip.show('添加成功','ok');
							}else{
								qtip.show(res.errmsg);
							}
						});	
					}
				},
				template: $('#guessTpl').html(),
			});
		}, 'json').then(function () {
			if (!guessSwipable) {
				var $card = $('#guessGoods').find('.slider-box');
				guessSwipable = new Swipable({
					element: $card,
					dir: 'horizontal'
				});
			}
			guessSwipable.refresh();
		});
	}

	// app = new Vue({
	// 	el: '#app',
	// 	replace: false,
	// 	data: {
	// 		data: {}
	// 	},
	// 	components: {
	// 		'x-buy': buy
	// 	},
	// 	events: {
	// 		'currentGoods': function (data) {
	// 			this.data = data;
	// 		}
	// 	}
	// });

	initEvent();

	//如果页面referer不是/index/、/s/、/cart/、/category/、/brand/、/user/、/order/、/activity/ 跳转到首页
	var historyBackValid = true;
	if (!document.referrer) {
		historyBackValid = false;
	} else {
		var aEl = document.createElement('a');
		aEl.href = document.referrer;
		var pathname = aEl.pathname;
		if (/^\/(index|s|cart|category|brand|user|order|activity)(\/|$)/.test(pathname) || pathname == '/') {
			historyBackValid = true;
		} else {
			historyBackValid = false;
		}
	}
	if (!historyBackValid) {
		if ($('.header-bar .header-btn-back').length > 0) {
			$('.header-bar .header-btn-back').eq(0)
				.css({
					'background-position': '0.3rem center',
					'padding-left': '0.7rem',
					'color': '#191919'
				})
				//.removeClass('x-header-goback')
				.attr('href', '/');
		}
	}

	if (getQueryString('ch') == 'baidubjh') {
		$('.header-btn-back').css('visibility', 'hidden');
	}

	var desc = $('.comment-txt').text() || '';
	jsShare.initShare({
		title: '在#豌豆公主#' + GOODS_CONF.final_price + '元抢' + GOODS_CONF.goods_name,
		desc: desc.trim().replace(/^\[公主点评\] /, ''),
		img: $('#slider img').attr('src') || '',
		conf: GOODS_CONF.wxconf
	});

	//积分商城部分
	if (GOODS_CONF.is_integral) {
		var url = 'wonderfull://mall/pay?pay_src=jfsc&attach_info=' + encodeURIComponent(JSON.stringify({ pid: GOODS_CONF.pid }));
		$('#integralBtn').attr('href', url);
	}

	// 所有活动面板
	var allActPanel = new Vue({
		el: '#goodsActPanel',
		replace: true,
		data: {
			list: [],
			show: false,
			showPanel: false,
			maxBodyHeight: 0,
			tid: null,
			canBgScroll: false
		},
		mounted: function () {
			var self = this;
			self.$nextTick(function () {
				var $body = $(self.$el).find('.all-act-panel-body');
				var bd = $body[0];
				var canScroll = false;
				var sY = 0;

				$(self.$el).on('touchstart', function (e) {
					var target = e.target;
					var touch = e.touches[0];

					if ($.contains(bd, target)) {
						canScroll = true;
						sY = touch.pageY;
					} else {
						canScroll = false;
					}
				}).on('touchmove', function (e) {
					if (!canScroll) {
						e.preventDefault();
						return;
					}

					var touch = e.touches[0];
					var cY = touch.pageY;
					var diff = cY - sY;
					var max = bd.scrollHeight - bd.clientHeight;

					if (diff < 0 && (bd.scrollTop - diff >= max)) {
						e.preventDefault();
					} else if (diff > 0 && bd.scrollTop - diff <= 0) {
						e.preventDefault();
					} else if (diff == 0) {
						e.preventDefault();
					}
				});
			});
		},
		methods: {
			showHalfPanel: function () {
				this.maxBodyHeight = $(window).height() * 0.6;
				this.show = true;
				$('body').addClass('body-scroll-lock');
				var self = this;
				if (this.tid) {
					clearTimeout(this.tid);
				}
				this.tid = setTimeout(function () {
					self.showPanel = true;
				}, 20);
				this.$nextTick(function () {
					self.canBgScroll = 1;
				});
			},
			hideHaldPanel: function () {
				this.showPanel = false;
				var self = this;
				$('body').removeClass('body-scroll-lock');
				if (this.tid) {
					clearTimeout(this.tid);
				}

				this.tid = setTimeout(function () {
					self.show = false;
				}, 300);
			}
		},
		template: $('#allActTpl').html()
	});

	$('.all-act-list').click(function () {
		allActPanel.showHalfPanel();
	});

	/**
	 * 判断是否要显示切仓或者切换活动的弹框
	 *
	 */
	function checkToShowPop() {
		if (PAGE_CONF.switching_popup_info && PAGE_CONF.switching_popup_info.desc) {
			var houseId = PAGE_CONF.switching_popup_info.house_id + '';
			var activityId = PAGE_CONF.switching_popup_info.act_id + '';
			if (PAGE_CONF.house && PAGE_CONF.house !== '0' && PAGE_CONF.house !== houseId) {
				switchHouseConfirm(PAGE_CONF.switching_popup_info.desc, houseId, activityId);
			} else if (PAGE_CONF.activity && PAGE_CONF.activity !== activityId) {
				switchActivityConfirm(PAGE_CONF.switching_popup_info.desc, activityId);
			}
		}
	}

	/**
	 * 切活动提示
	 *
	 * @param {any} msg
	 * @param {any} activityId
	 */
	function switchActivityConfirm(msg, activityId) {
		var dialog = new Dialog({
			buttons: [{
				'text': '我知道了',
				'click': function () {
					changeUrl(null, activityId);
				}
			}],
			body: msg
		});

		$('.screen-dialog-cover').addClass('opacity-bg-color');
		dialog.show();
	}

	/**
	 * 显示切仓提示
	 *
	 * @param {any} msg
	 * @param {any} houseId
	 * @param {any} activityId
	 */
	function switchHouseConfirm(msg, houseId, activityId) {
		Dialog.confirm(msg, {
			'fn': function (status) {
				if (status === 'yes') {
					changeUrl(houseId, activityId);
				}
			}
		});
	}

	/**
	 * 切仓或者切活动的时候调用
	 * @param {string} houseId
	 * @param {string} activityId
	 */
	function changeUrl(houseId, activityId) {
		var search = location.search || '';

		if (search) {
			search = search.slice(1);
		}

		var params = new URLSearchParams(search);

		if (houseId) {
			params.set('house_id', houseId);
		}

		if (activityId) {
			params.set('act_id', activityId);
		}

		window.location.href = window.location.pathname + '?' + params.toString();
	}

	/**
	 * 获取 domain
	 */
	function getDomain() {
		let host = window.location.host || '';

		if (host) {
			let list = host.split('.');
			list = list.slice(-2);
			return '.' + list.join('.');
		}

		return '';
	}

	/**
	 * 区域检测，判断是否弹起免税店弹窗
	 */
	function checkZone() {
		let offset = new Date().getTimezoneOffset();
		let search = location.search.slice(1);
		let params = search.split('&');
		let map = {};
		let parts;

		params.forEach((item) => {
			parts = item.split('=');
			if (parts && parts[0] && parts[0].trim()) {
				map[parts[0].trim()] = parts[1] && parts[1].trim() || '';
			}
		});

		if (offset === -540 && !GOODS_CONF.isJpMode) { // 如果是在东九区
			new AdBox({
				img: 'https://s3.wandougongzhu.cn/s/db/pop_027ad3.png',
				click: function () {
					Cookie.set('duty_free', '1', {
						domain: getDomain(),
						path: '/',
						expires: 7
					});
					Cookie.remove('dutyfree-box');
					map.house_id = 1;
					location.href = location.pathname + '?' + Object.keys(map).map((key) => {
						return key + '=' + map[key];
					}).join('&');
				},
				close: function () {
					Cookie.set('dutyfree-box', '1', {
						path: '/',
						expires: 7
					});
				}
			}).show();
		}
	}

	checkToShowPop(); // 检测仓库、活动变化
	checkZone(); // 检测时区

	//收起卡片
	// if($('.comment-box').length >= 3){
	// 	$('.js-comment-box').hide();
	// }
	//最佳搭档
	$('.partner-list-js').hide().eq(0).show();
});

$(function(){
	var elCountdown = $('.countdown-box');
	if(elCountdown.length>0) {
		var elTime = elCountdown.find('.countdown-time'),
			end_time = elTime.data('time')*1000,
			countdownTimer;
		function countdown(){
			if(countdownTimer)
				clearTimeout(countdownTimer);
			var leftTime = end_time - (new Date());
			if(leftTime<0) leftTime = 0;
			leftTime = Math.floor(leftTime/1000);
			if(leftTime>359999)	//如果超过100小时，直接显示99小时
				leftTime = 359999;

			var hourLength = 60*60,
				minuteLength = 60,
				h = Math.floor(leftTime/hourLength),
				m = Math.floor(leftTime%hourLength/minuteLength),
				s = leftTime%minuteLength;
			if(h<10) h='0'+h;
			if(m<10) m='0'+m;
			if(s<10) s='0'+s;
			elTime.html(
				'<span class="countdown-time-item">'+h+'</span>'
				+ '<span class="countdown-time-colon">:</span>'
				+ '<span class="countdown-time-item">'+m+'</span>'
				+ '<span class="countdown-time-colon">:</span>'
				+ '<span class="countdown-time-item">'+s+'</span>'
			);

			if(leftTime>0)
				countdownTimer = setTimeout(countdown, 1000);
		}
		countdown();
	}
});
