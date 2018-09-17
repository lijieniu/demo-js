{%if isset($smarty.get.origin) && $smarty.get.origin=="drp" && $goods.residue_count>0%}
<div class="operate-bar drp-btn-select-pd"
	data-id="{%$goods.goods_id%}"
	data-img="{%$goods.img_small%}">添加到推荐清单</div>
{%else%}
	{%if $goods.is_onsell != 0%}
		{%if $goods.residue_count>0%}
			{%if $new_footer%}
			<div class="fixed-operate-bar actionBar" id="actionBar">
				<div class="fixed-operate-bar-collect-box collect-btn">
					<div class="icon-btn-wraper">
						<div class="collect-icon-wraper">
							<img src="https://s.wandougongzhu.cn/s/c1/love_892cae.png"
								alt="未收藏"
								class="collect-img collect-img-1">
							<img src="https://s4.wandougongzhu.cn/s/ff/xiangqingye_shoucang_dianji2x_6da49e.png"
								alt="已收藏"
								class="collect-img collect-img-2">
						</div>
						<p>收藏</p>
					</div>
				</div>
				<div class="fixed-operate-bar-cart-box">
					<a href="{%if $is_app%}wonderfull://mall/cart{%else%}/cart/{%/if%}"
						rel="购物车">
						<div class="icon-btn-wraper">
							<img src="https://s4.wandougongzhu.cn/s/07/cart_a65b3c.png"
								alt="购物车"
								class="cart-img">
							<p>购物袋</p>
						</div>
					</a>
				</div>
				<div id="addCart"
					class="addCart fixed-operate-bar-add-to-cart call-panel {%if count($goods.pre_sale_info)>0 && $goods.pre_sale_info['is_closed']==0%}red{%elseif count($goods.pre_sale_info)>0 && $goods.pre_sale_info['is_closed']==1%}gray{%/if%}"
					data-img="{%$goods.img_small%}"
					data-opt="{%if count($goods.pre_sale_info)>0%}pre-sale-order{%elseif $goods.is_purchase_only == '1'%}buy{%else%}add{%/if%}">
					{%if count($goods.pre_sale_info)>0%}
					<span class="pre-sale-btn-wrapper">
						<div>
							{%$goods.pre_sale_info['pay_btn_title']%}
						</div>
						<div class="pre-sale-pay-btn-desc">
							{%$goods.pre_sale_info['pay_btn_desc']%}
						</div>
					</span>
					{%elseif $goods.is_pre_sale=='1'%}抢先购
					{%elseif $goods.is_purchase_only==1%}立即购买
					{%else%}加入购物袋{%/if%}
				</div>
			</div>
			{%else%}
			<div id="optBar" class="operate-bar">
				{%if $is_integral%}
					{%if $browser.app%}
						{%if $exchange_product_info.user_exchange_config.is_exchange%}
						<a href="###" id="integralBtn" class="btn-bottom">立即兑换</a>
						{%else%}
						<span class="btn-bottom btn-none">{%$exchange_product_info.user_exchange_config.exchange_tip%}</span>
						{%/if%}
					{%else%}
						<a class="btn-bottom" href="/index/redirectDownload?src=h5_user" rel="下载">请使用豌豆公主app兑换</a>
					{%/if%}
				{%else%}
					<span class="collect collect-btn"></span>
					<span class="btn-bottom	call-panel add-cart"
						id="addCart"
						data-img="{%$goods.img_small%}"
						data-opt="{%if $goods.is_purchase_only == '1'%}buy{%else%}add{%/if%}">{%if $goods.is_pre_sale=='1'%}抢先购{%elseif $goods.is_purchase_only==1%}立即购买{%else%}加入购物袋{%/if%}</span>
				{%/if%}
				<!--<span id="buy" class="btn-bottom call-panel {%if $goods.is_purchase_only=='1'%}buy-full{%/if%}" data-opt="buy">{%if $goods.is_pre_sale=='1'%}抢先购{%else%}立即购买{%/if%}</span>-->
			</div>
			{%/if%}
		{%else%}
			{%if $new_footer%}
			<div class="fixed-operate-bar">
				<div class="fixed-operate-bar-collect-box collect-btn">
					<div class="icon-btn-wraper">
						<div class="collect-icon-wraper">
							<img src="https://s.wandougongzhu.cn/s/c1/love_892cae.png" alt="未收藏"
								class="collect-img collect-img-1">
							<img src="https://s4.wandougongzhu.cn/s/ff/xiangqingye_shoucang_dianji2x_6da49e.png" alt="已收藏"
								class="collect-img collect-img-2">
						</div>
						<p>收藏</p>
					</div>
				</div>
				<div class="fixed-operate-bar-cart-box">
					<a href="{%if $is_international&&$is_app%}wonderfull://mall/cart{%else%}/cart/{%/if%}" rel="购物车">
						<div class="icon-btn-wraper">
							<img src="https://s4.wandougongzhu.cn/s/07/cart_a65b3c.png"
								alt="购物车"
								class="cart-img">
							<p>购物袋</p>
						</div>
					</a>
				</div>
				<div id="addCart" class="fixed-operate-bar-add-to-cart" style="background:#ccc;">
					已抢光
				</div>
			</div>
			{%else%}
			<div id="optBarBlank" class="operate-bar">
				{%if !$is_integral%}<span class="collect collect-btn"></span>{%/if%}
				<span class="btn-bottom btn-none">已抢光</span>
				<!--<span class="btn-add-notice">添加到货提醒</span>-->
			</div>
			{%/if%}
		{%/if%}
	{%else%}
		<div id="optBarNone" class="operate-bar">
			{%if !$is_integral%}<span class="collect collect-btn"></span>{%/if%}
			<span class="btn-bottom btn-gray">已下架</span>
		</div>
	{%/if%}
{%/if%}
