$(function() {
	var dom = {
		shade: $('#shade'),
		container: $('.container'),
		item: $('.li-item'),
		btnGroup: $('.btnGroup'), //ios
		listGroup: $('.listGroup') //android
	}
	layoutInit();

	//调整布局
	function layoutInit() {
		dom.item.each(function(index) {
			var _width = $(this).width();
			if (index < 2) {
				$(this).find('.i-play').css('bottom', 56 + 'px')
				_width += 45;
			}
			$(this).css('height', _width);
		})
	}

	//vue实例
	var app = window.app = new Vue({
		el: '#app',
		data: {
			system: '',
			lineLeft: '13%',
			tabBtns: [{ //选项卡按钮
				onClass: ' on',
				text: '列表1',
				listName: 'popular'
			}, {
				onClass: '',
				text: '列表2',
				listName: 'recent'
			}],
			iShow: false,
			popularShow: true,
			list: {
				listPopular: '',
				istRecent: ''
			}
		},
		ready: function() {
			this.system = this.checkSystem(); //获取手机系统
		},
		methods: {

			checkSystem: function() {
				return /iphone|ipad|ipod/.test(navigator.userAgent.toLowerCase()) ? 'ios' : 'android';
			},

			showChooseDialog: function() {
				this.system == 'ios' ? this.showBtnGroup() : this.showListGroup(); //判断系统显示对应的弹窗ui
			},
			hideChooseDialog: function(e){
				var _el = e.currentTarget;
				var _hide = this.system == 'ios' ? this.hideBtnGroup : this.hideListGroup;
			    if (!$(_el).hasClass('btnGroup') || !$(_el).hasClass('listGroup') && $(_el).hasClass('shade')) {
			        _hide();
			    }
			},

			showListGroup: function() { //安卓
				this.showShade();
				dom.listGroup.css('display', "block");
				setTimeout(function() {
					dom.listGroup.css('bottom', '0px');
				}, 100)
			},

			hideListGroup: function() { //安卓
				dom.listGroup.css('bottom', '-132px');
				setTimeout(function() {
					dom.listGroup.css('display', "none")
				}, 300)
				this.hideShade();
			},

			showBtnGroup: function() { //ios
				this.showShade();
				dom.btnGroup.css('display', "block");
				setTimeout(function() {
					dom.btnGroup.css('bottom', '0px');
				}, 100)
			},

			hideBtnGroup: function() { //ios
				dom.btnGroup.css('bottom', '-251px');
				setTimeout(function() {
					dom.btnGroup.css('display', "none")
				}, 300)
				this.hideShade();
			},

			showShade: function() {
				dom.container.addClass('blur')
				dom.shade.fadeIn(200);
			},

			hideShade: function() {
				dom.shade.css('display', 'none');
				dom.container.removeClass('blur')
			},

			itermsShow: function() {
				this.iShow = !this.iShow;
			},

			toggleList: function(event) { //切换列表
				var el = event.currentTarget;
				var index = $(el).index();

				///切换rank列表
				if ($(el).hasClass('on')) {
					return false;
				}
				$(el).addClass('on').siblings().removeClass('on');
				this.lineLeft = (index) * 47 + 13;

				this.popularShow = !this.popularShow;
			}
		}
	});

})