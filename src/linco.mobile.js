var linco = linco || new Linco;

linco.extend({

	touchMove: function(opt){
		var startX, startY;
		var options = {
			up		: function(){},
			down	: function(){},
			left	: function(){},
			right	: function(){},
			callback: function(){}
		};

		// 合并参数
		opt = linco.extend(options, opt);

		//返回角度
		function GetSlideAngle(dx, dy) {
		    return Math.atan2(dy, dx) * 180 / Math.PI;
		}
		 
		//根据起点和终点返回方向 1：向上，2：向下，3：向左，4：向右,0：未滑动
		function GetSlideDirection(startX, startY, endX, endY) {
		    var dy = startY - endY;
		    var dx = endX - startX;
		    var result = 0;
		 
		    //如果滑动距离太短
		    if (Math.abs(dx) < 2 && Math.abs(dy) < 2) {
		        return result;
		    }
		 
		    var angle = GetSlideAngle(dx, dy);
		    if (angle >= -45 && angle < 45) {
		        result = 4;
		    } else if (angle >= 45 && angle < 135) {
		        result = 1;
		    } else if (angle >= -135 && angle < -45) {
		        result = 2;
		    }
		    else if ((angle >= 135 && angle <= 180) || (angle >= -180 && angle < -135)) {
		        result = 3;
		    }
		 
		    return result;
		}

		//滑动处理
		document.addEventListener('touchstart', function (ev) {
		    startX = ev.touches[0].pageX;
		    startY = ev.touches[0].pageY;

		    opt.callback(ev);
		}, false);

		document.addEventListener('touchend', function (ev) {
		    var endX, endY;
		    endX = ev.changedTouches[0].pageX;
		    endY = ev.changedTouches[0].pageY;
		    var direction = GetSlideDirection(startX, startY, endX, endY);
		    switch (direction) {
		        case 0:
		            console.log("没滑动");
		            break;
		        case 1:
		            opt.up();
		            break;
		        case 2:
		            opt.down();
		            break;
		        case 3:
		            opt.left();
		            break;
		        case 4:
		            opt.right();
		            break;
		        default:;       
		    } 

		    return false;
		}, false);

	},

	transitionEnd: function(el, callback){

		// 检查callback
		if(!linco.isFunction(el) && (!callback || !linco.isFunction(callback))){
			return console.log('not callback');
		}

		// 检查el为空
		if(linco.isString(el)){
			el = document.querySelector(el);

			if(!el){
				return console.log(el + ' is not element')
			}

			return end(el, callback);
		}

		// 检查el为callback
		if(linco.isFunction(el)){
			return end(document, el);
		}

		// 检查el是否为dom或document
		if(linco.type(el) == 'object' && (el.nodeType == 1 || el.nodeType == 9)){
			return end(el, callback);
		}

		// 监听动画完成事件
		function end(el, callback){
			el.addEventListener('webkitTransitionEnd', callback, false);
			el.addEventListener('mozTransitionEnd', callback, false);
			el.addEventListener('msTransitionEnd', callback, false);
			el.addEventListener('transitionEnd', callback, false);
		}
	},

	animationEnd: function(el, callback){
		// 检查callback
		if(!linco.isFunction(el) && (!callback || !linco.isFunction(callback))){
			return console.log('not callback');
		}

		// 检查el为空
		if(linco.isString(el)){
			el = document.querySelector(el);

			if(!el){
				return console.log(el + ' is not element')
			}

			return end(el, callback);
		}

		// 检查el为callback
		if(linco.isFunction(el)){
			return end(document, el);
		}

		// 检查el是否为dom或document
		if(linco.type(el) == 'object' && (el.nodeType == 1 || el.nodeType == 9)){
			return end(el, callback);
		}

		// 监听动画完成事件
		function end(el, callback){
			el.addEventListener('webkitAnimationEnd', callback, false);
			el.addEventListener('mozAnimationEnd', callback, false);
			el.addEventListener('msAnimationEnd', callback, false);
			el.addEventListener('animationEnd', callback, false);
		}
	}
	
});





