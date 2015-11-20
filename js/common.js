/**
 * Created by taguchimunetaka on 2015/11/20.
 */

var SYUKOU = SYUKOU || {};

SYUKOU.COMMON = {};

SYUKOU.COMMON.FIXSIDEBAR = {

	init: function () {
		this.setParameters();
		this.prepare();
		this.bindEvent();
	},
	setParameters: function () {
		this.$window = $(window);
		this.$sideWrap = $('.jsc-sidebox');
		this.$sidebar = $('.jsc-sidebox-inner');
		this.$sidebarHeight = this.$sidebar.height();
		this.$bottomContents = $('.jsc-bottom-contents');

		this.$bottomContentsMargintop = parseInt($('.jsc-bottom-contents').css('margin-top'), 10);
		this.$bottomContentsOffsettop = this.$bottomContents.offset().top;
	},
	prepare: function () {
		this.$contents = $('.jsc-contents');
		this.$contentsHeight = this.$contents.outerHeight();
		this.$sideWrap.css({
			'height': this.$contentsHeight
		});

		this.boxOffsetTop = this.$sidebar.offset().top
	},
	bindEvent: function () {
		var _self = this;

		this.$window.on('scroll resize', function(){
			_self.posResizeWindow();
			_self.fixsidebox();
		});
	},
	fixsidebox: function () {
		var windowTop = this.$window.scrollTop();

		if (windowTop > this.boxOffsetTop && (this.$bottomContentsOffsettop - this.$sidebarHeight) < this.$window.scrollTop() + this.$bottomContentsMargintop) {
			this.$sidebar.css({
				'position': 'absolute',
				'top': '',
				'bottom': '0',
				'left':''
			});
		} else if (windowTop > this.boxOffsetTop) {
			this.$sidebar.css({
				'position': 'fixed',
				'top': 0,
				'bottom': ''
			});
		} else if (windowTop < this.boxOffsetTop) {
			this.$sidebar.css({
				'position': 'static',
				'top': '',
				'bottom': ''
			});
		}
	},
	posResizeWindow: function () {
		var wrapperOffsetLeft = this.$sideWrap.offset().left - (this.$window.scrollLeft());

		if (this.$sidebar.css('position') === 'static') {
			return false;
		}
		this.$sidebar.css({
			left: wrapperOffsetLeft
		});
	}
};


$(function () {
	SYUKOU.COMMON.FIXSIDEBAR.init();
});