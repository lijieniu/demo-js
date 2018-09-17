{%extends 'layout/base.tpl'%}
{%block 'title'%}
{%assign var="goods_name_simple" value="||"|explode:$goods.goods_name_split%}
{%$goods_name_simple[0]%}{%$goods_name_simple[1]%}_{%$goods_name_simple[0]%}{%$goods.cat_names[1]%}{%$goods.cat_names[count($goods.cat_names)-1]%}_豌豆公主
{%/block%}
{%block 'head_res'%}
<meta name="updatetime" content="{%$smarty.now|date_format:"%Y-%m-%d"%}">
{%if $is_dutyfree_act == '1'%}
<link rel="stylesheet" type="text/css" href="/resource/css/activity/dutyfree.css">
<link rel="stylesheet" type="text/css" href="/resource/dist/dutyfree.css">
{%/if%}

<link rel="stylesheet" type="text/css" href="/resource/dist/product.css" />
<link rel="stylesheet" type="text/css" href="/resource/css/product/index.css" />
<link rel="stylesheet" href="/resource/css/index/addToCar.css" />
{%*分销模块*%}
{%if isset($smarty.get.origin) && $smarty.get.origin=='drp'%}
<link rel="stylesheet" href="/resource/dist/drpSelect.css">
<link rel="stylesheet" href="/resource/css/drp/drp_select_pub.css">
{%if isset($smarty.get.link_id) && $smarty.get.link_id != 'blank'%}
<link rel="stylesheet" href="/resource/css/drp/drp_select_edit.css">
<style type="text/css">body{padding-top:0.88rem;}</style>
{%else%}
<link rel="stylesheet" href="/resource/css/drp/drp_select_create.css">
<style type="text/css">body{padding-top:0;}</style>
{%/if%}
{%/if%}
{%if isset($smarty.get.origin) && $smarty.get.origin=="drp_customer"%}
<link rel="stylesheet" href="/resource/css/drp/drp_coupon.css">
{%/if%}

<script src="/resource/js/lib/lazyload.min.js"></script>
{%/block%}
{%block 'main'%}
{%$new_footer = !$is_integral%}
{%if isset($smarty.get.link_id) && $smarty.get.link_id != 'blank'%}
<section class="drp-header border-1px-bottom"></section>
{%/if%}
{%assign "is_app" $browser.app%}
{%if $is_international&&$is_app%}
<div class="international-tip">您正在访问豌豆国际：https://www.wonderfull.hk</div>
{%/if%}
{%if $is_dutyfree_act == '1'%}
{%$duty_free = true%}
{%/if%}
{%$need_show_jpy = $duty_free && $goods.house_id == '1'%}{%* 免税模式+日本仓商品才展现日本价格 *%}

{%include file="./modules/header.inc.tpl"%}
{%include file="./modules/album.inc.tpl"%}
{%include file="./modules/drp_price.inc.tpl"%}
{%include file="./modules/base_info.inc.tpl"%}
{%if $goods.bundle_list%}
{%include file="./modules/bundle.inc.tpl"%}
{%/if%}
{%include file="./modules/goods_intro_tags.inc.tpl"%}
{%if $is_dutyfree_act == '1'%}
{%include file="./modules/dutyfree_benefit.inc.tpl"%}
{%/if%}
{%if false && !$isLogin && !$need_show_jpy && $is_dutyfree_act != '1'%}
<div class="new-user-guide-box">
    <a href="/user/login?tab=reg">
        <img src="https://s.wandougongzhu.cn/s/6f/coupons_0fbf42.png" alt="新用户注册礼包">
    </a>
</div>
{%/if%}
{%if $goods.selected_info%}
{%include file="./modules/top_list.inc.tpl"%}
{%/if%}
{%if $is_integral%}
{%include file="./modules/integral.inc.tpl"%}
{%/if%}
{%include file="./modules/act_info.inc.tpl"%}
{%include file="./modules/spec.inc.tpl"%}
{%if isset($goods.top_rank) && !empty($goods.top_rank)%}
{%include file="./modules/top_rank.inc.tpl"%}
{%/if%}
{%if count($goods.post_info)>0%}
{%include file="./modules/post.inc.tpl"%}
{%/if%}
{%include file="./modules/comment.inc.tpl"%}
{%if $goods.brand_info['shop_id'] && $goods.shop_info.top_url%}
{%include file="./modules/shop.inc.tpl"%}
{%/if%}
{%if $goods.brand_info.brand_id%}
{%include file="./modules/brand.inc.tpl"%}
{%/if%}
{%* {%if !$duty_free && $goods.best_partner.list%}
{%include file="./modules/partner.inc.tpl"%}
{%/if%} *%}
{%if !$duty_free &&  $goods.recommend%}
{%if $goods.recommend.best_partner || $goods.recommend.similar_user_selected%}
{%include file="./modules/partner.inc.tpl"%}
{%/if%}
{%/if%}
{%include file="./modules/tab.inc.tpl"%}
{%include file="./modules/guarantee.inc.tpl"%}
{%if $goods.video_info%}
{%include file="./modules/video.inc.tpl"%}
{%/if%}
{%if $goods.brand_desc%}
{%include file="./modules/brand_desc.inc.tpl"%}
{%/if%}
{%if $goods.attribute_info%}
{%include file="./modules/extend_info.inc.tpl"%}
{%/if%}
{%include file="./modules/goods_imgs.inc.tpl"%}
{%if !$duty_free && $goods.topics%}
{%include file="./modules/topics.inc.tpl"%}
{%/if%}
{%if $goods.goods_ad.action%}
{%include file="./modules/goods_ad.inc.tpl"%}
{%/if%}

{%include file="./modules/question.inc.tpl"%}
{%include file="./modules/guess_two.inc.tpl"%}

{%include file="./modules/bar.inc.tpl"%}
{%include file="./modules/gift.inc.tpl"%}
{%include file="./modules/coupon.inc.tpl"%}
{%include file="./modules/activity.inc.tpl"%}
{%if count($goods.alike_goods.goods_list)>0%}
{%include file="./modules/recommendation.inc.tpl"%}
{%/if%}
{%if !$browser.app && $show_dw_nav%}
{%include file="./modules/seoDownload.inc.tpl"%}
{%/if%}
<div id="app">
	<x-buy :buy-data="data"></x-buy>
	<x-presaleorder :buy-data="data"></x-presaleorder>
</div>
{%include file="./modules/drp.inc.tpl"%}
{%if $is_dutyfree_act == '1'%}
{%include file="./modules/dutyfree_act.inc.tpl"%}
{%/if%}

{%/block%}
{%block 'page_res'%}
<script type="text/javascript">
	var PAGE_CONF = {
		isLogin: {%if $isLogin%}true{%else%}false{%/if%},
		isApp: {%if $browser.app%}true{%else%}false{%/if%},
		browser: {%json_encode($browser) nofilter%},
		switching_popup_info: {%$goods.switching_popup_info|default:'[]'|@json_encode nofilter%},
		house: '{%$house_id%}',
		activity: '{%$act_id%}',
		isDutyfree: '{%$is_dutyfree_act%}',
		isMultiSpec: {%if $goods.is_multi_spec && $goods.data.attr_group_id != '0'%}true{%else%}false{%/if%},
		isNewOpt: {%if $new_footer%}true{%else%}false{%/if%}
	};
	var GOODS_CONF = {
		isLogin: {%if $isLogin%}true{%else%}false{%/if%},
		isApp: {%if $browser.app%}true{%else%}false{%/if%},
		id: '{%$goods.goods_id%}',
		house: '{%$goods.house_id%}',
		activity: '{%$goods.activity_id%}',
		img: '{%$goods.img_small nofilter%}',
		final_price: '{%$goods.final_price%}',
		final_price_jp: '{%$goods.final_price_jp%}',
		shop_price: '{%$goods.shop_price%}',
		market_price: '{%$goods.market_price%}',
		slogan: '{%$goods.slogan%}',
		goods_name: '{%$goods.goods_name|escape:"javascript"%}',
		display_flag: {%$goods.display_flag_v2|@json_encode nofilter%},
		act_left_time: '{%$goods.act_left_time%}',
		attr_group_id: '{%$goods.attr_group_id%}',
		buy_limit: '{%$goods.buy_limit%}',
		order_buy_limit: '{%$goods.order_buy_limit%}',
		residue_count: '{%$goods.residue_count%}',
		collected: '{%$goods.collected%}',
		is_pre_sale: '{%$goods.is_pre_sale%}',
		pre_sale_info:{%if count($goods.pre_sale_info)>0%}{%json_encode($goods.pre_sale_info) nofilter%}{%else%}{}{%/if%},
		isShow: true,
		is_integral: {%if $is_integral%}true{%else%}false{%/if%},
		pid: '{%$exchange_product_info.pid%}',
		isJpMode: {%if $need_show_jpy%}true{%else%}false{%/if%},
		virgin_flag: '{%$goods.virgin_flag%}',
		discount: '{%$goods.discount%}',
		show_discount: {%$goods.discount|ceil%},
		wxconf:{
			appId: '{%$appId%}',
			timestamp: '{%$timestamp%}',
			nonceStr: '{%$noncestr%}',
			signature: '{%$signature%}'
		},
		errmsg: '',
	};
	var drpGoodsId = '';
	var linkId = '{%$smarty.get.link_id%}';
	var origin = '{%if isset($smarty.get.origin)%}{%$smarty.get.origin%}{%/if%}';
</script>
<script src="/resource/js/index/addToCar.js"></script>
<script src="/resource/js/lib/zepto.min.js"></script>
<script src="/resource/js/lib/vue2.min.js"></script>
<script src="/resource/js/lib/swipeSlide.3.4.min.js"></script>
{%*<script src="/resource/js/components/Parabola.js"></script>*%}
<script src="/resource/js/lib/url.search.params.min.js"></script>
<script src="/resource/dist/product.js"></script>
{%if isset($smarty.get.origin) && $smarty.get.origin=='drp'%}
<script src="/resource/dist/drpSelect.js"></script>
<script src="/resource/js/components/qrcode.min.js"></script>
<script src="/resource/dist/drpProduct.js"></script>
{%/if%}
{%if isset($smarty.get.origin) && $smarty.get.origin=='drp_customer'%}
<script src="/resource/dist/drpClient.js"></script>
{%/if%}
{%if false && !$browser.app && $is_show_price_tag && !isset($smarty.get.origin)%}
<link rel="stylesheet" type="text/css" href="/resource/dist/appGuide.css">
<script defer="defer" src="/resource/dist/appGuide.js"></script>
{%/if%}
{%if $is_dutyfree_act == '1'%}
<script type="text/javascript" src="/resource/dist/dutyfree.js"></script>
{%/if%}
<script type="text/javascript">
	$(function() {
		if (PAGE_CONF.isDutyfree == '1') {
			$(document).find('a').on('click',function(e) {
				e.preventDefault();

				$('.cover-box').removeClass('hidden');
			})

			$('.app-mobile-guide-h2').text('豌豆公主免税店 50元现金券限时领取');
			$('.app-mobile-guide-p').text('开业大促 比日亚更便宜');
			$('.app-mobile-guide-text').text('立即领取');

			$('.collect-btn').on('click',function(e) {
				e.preventDefault();
				$('.cover-box').removeClass('hidden');
			})
		}
	})
</script>
{%*自动向百度推动链接*%}
<script>
	(function(){
		var bp = document.createElement('script');
		var curProtocol = window.location.protocol.split(':')[0];
		if (curProtocol === 'https') {
			bp.src = 'https://zz.bdstatic.com/linksubmit/push.js';
		}
		else {
			bp.src = 'http://push.zhanzhang.baidu.com/push.js';
		}
		var s = document.getElementsByTagName("script")[0];
		s.parentNode.insertBefore(bp, s);
	})();
</script>
{%/block%}
