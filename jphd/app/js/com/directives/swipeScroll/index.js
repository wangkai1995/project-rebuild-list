module.exports = [function(){
	return{
        restrict : 'E',
        transclude : true,
        scope: {
        	ismore: '=',
        	loadmore : '&',
        	refresh : '&',
        },
        template: '<div class="swipescroll"><div class="scroll" ng-transclude></div></div>',
        link:function(scope, elem, attr){
        	var slide = {
        		moveY:0,				//移动位置Y轴
        		limit: 50,    			//滑动回弹限制
        		isVelocity:50,    		//滑动速度判断
        		startY: 0,	  			//开始滑动坐标
        		buffer : 200, 			//缓冲值
        		velocityY:0,			//快速移动距离Y轴
        		loadY:0,				//落地的位置Y轴
        		scrollHeight:0,      	//滚动条的高度
        		clientHeight:0,			//元素自身高度
        		startTime:0,       		//滑动开始时间
        	}
        	var reminderDom = {
        		dom: '',
        		text: '',
        		direction: '',
        		loading: '',
        	};
        	var timer = '';
        	var raw = elem[0].querySelectorAll('.swipescroll')[0];
            var scroll = raw.querySelectorAll('.scroll')[0];
           	var flag = true,
           		isDown = false,			//松手移动计算标志
           		isTransition = false;   //移动复位计算标志
           	var isRefresh = false,      //下拉刷新标志
           		isLoadMore = false;		//上拉加载标志
           	var rAF = window.requestAnimationFrame;
           	var moveValue = 0;

            //下拉模块添加提示元素
		    function initReminder(){
		    	reminderDom.dom = document.createElement('div');
		    	reminderDom.direction = document.createElement('i');
		    	reminderDom.text = document.createElement('p');

		    	reminderDom.dom.className = 'swipescroll-reminder';
		    	reminderDom.direction.className ='cicon icon-dropdown';
		    	reminderDom.text.innerText = '下拉刷新';

		    	reminderDom.dom.appendChild(reminderDom.direction);
		    	reminderDom.dom.appendChild(reminderDom.text);	
		    	scroll.insertBefore(reminderDom.dom,scroll.firstElementChild);
		    }

		    //初始化事件
		    function initEvent(){
	            //滑动开始事件
	            elem.bind('touchstart',function(event){
	            	event.stopPropagation();     //阻止冒泡传播
	            	//如果正在复位计算中
	            	if(isTransition){
	            		return false;
	            	}
	            	var clientX = event.changedTouches[0].clientX,
	            		clientY = event.changedTouches[0].clientY,
	            		timeStamp = event.timeStamp;
            		var scrollHeight = raw.scrollHeight,
	            		clientHeight = raw.clientHeight;
	            		isDown = true;
	            		//是否发送请求结束
	            		if(flag){
	            			touchEventStart(clientY,timeStamp,scrollHeight,clientHeight);
	            		}
	            });
	            //滑动中事件
	            //高频触发事件采用
	            elem.bind('touchmove',function(event){
	            	event.stopPropagation();     //阻止冒泡传播
	        		event.preventDefault();      //阻止默认行为 这个很重要 在有滑动翻页的浏览器下 不禁止这个行为会导致翻页
	        		var clientX = event.changedTouches[0].clientX,
	            		clientY = event.changedTouches[0].clientY,
	            		timeStamp = event.timeStamp;
	            		//是否发送请求结束
            			if(flag){
            				rAF(function(){
            					touchEventMove(clientY,timeStamp);
            				});
	            		}
	            });
	            //滑动结束事件
	            elem.bind('touchend',function(event){
	            	event.stopPropagation();     //阻止冒泡传播
	            	var clientX = event.changedTouches[0].clientX,
	            		clientY = event.changedTouches[0].clientY;
	            		//是否发送请求结束
	            		if(flag){
	            			touchEventEnd(clientY);
	            		}
	            });
		    }

            //滑动事件开始
            var touchEventStart = function(clientY,timeStamp,scrollHeight,clientHeight){
            	//清除定时器
            	clearInterval(timer);

            	//由于有上拉加载和下拉刷新 所以DOM的高度和可滚动高度不固定每次都需要重新取值
            	slide.scrollHeight = scrollHeight;
            	slide.clientHeight = clientHeight;
            	//获取移动时间
            	slide.startTime = timeStamp;
            	//获取开始移动的距离 = 当前Y坐标减去上次移动结束距离
            	slide.startY = clientY - slide.moveY;
            	//获取落地坐标
            	slide.loadY = clientY;
            	//速度清零
            	slide.velocityY = 0;
            	//是否处于计算中标志清除
            	isDown = true;
            }

            //滑动事件中
            var touchEventMove = function(clientY,timeStamp){
            	if(isDown){
            		//如果慢速移动
            		if(timeStamp - slide.startTime > slide.isVelocity){
            			//更新移动时间 计算移动距离
            			slide.startTime = timeStamp;
            			slide.moveY = clientY - slide.startY;
            			if(slide.moveY > 0){
            				//顶部下拉缓冲阻力计算
            				//阻力除以阻力自身+移动距离 这个值总是一个小于1的值 随着moveY变大越来越小
            				slide.moveY *= slide.buffer/(slide.buffer+slide.moveY);
            				//slide.moveY移动一定距离 触发刷新

  							//判断是否下拉刷新
  							if(slide.moveY > 80){
  								isRefresh = true;
  								rAF(function(){
  									reminderDom.direction.style.WebkitTransform = 'rotate(180deg)';
  								});
  							}else{
  								if(isRefresh){
  									rAF(function(){
	  									reminderDom.direction.style.WebkitTransform = 'rotate(0deg)';
	  								});
	  								isRefresh = false;
  								}
  							}

            			}else if(slide.moveY< slide.clientHeight - slide.scrollHeight){
            				//底部上拉缓冲阻力计算
            				slide.moveY += slide.scrollHeight- slide.clientHeight; //加上超出距离
            				//一个很大负数除以一个很大的正数 得到一个比较小的倍数 这个倍数超过一定大小增加逐渐变小
            				//这个倍数-去 slide.scrollHight + slide.clientHighe的值
            				slide.moveY = slide.moveY*slide.buffer/(slide.buffer-slide.moveY)-slide.scrollHeight + slide.clientHeight;

            				//慢速滑动到达底部触发加载
            				if(scope.ismore){
            					clearInterval(timer);
            					loadMore();
            				}
            			}

            			setTransform(slide.moveY);
            		}
            		//快速滑动不断更新滑动距离用作松手计算
            		slide.velocityY  = clientY- slide.loadY;
            		slide.loadY = clientY;
            	}
            }

            //滑动事件结束
            var touchEventEnd = function(clientY){
            	if(isDown){
            		isDown = false;
            		//缓冲值 = 取出最后一段移动距离的符号位判断 负数为-0.5 正数为0.5
            		var friction = ((slide.velocityY>>31)*2+1)*0.5,
            		//可移动高度
            			scrollHight = raw.scrollHeight - raw.clientHeight;

            		timer = setInterval(function(){
            			//最后一次移动距离每次减相对于自己符号的0.5作为缓冲
            			slide.velocityY -= friction
            			//移动距离增加最后一次移动距离+缓冲
            			slide.moveY += slide.velocityY;
            			setTransform(slide.moveY);

            			//向底部滑动限制
            			if(-slide.moveY-scrollHight > slide.limit){
            				clearInterval(timer);
            				//判断是否需要加载
            				if(scope.ismore){
            					//复位后加载标志
            					isLoadMore = true;
            				}
            				//底部复位
            				Transition(-scrollHight);
            				return false;
            			}

            			//向头部滑动限制
            			if(slide.moveY > slide.limit){
            				clearInterval(timer);
            				//头部复位
            				Transition(0);
            				return false;
            			}

            			//如果最后滑动的距离小于1做过渡处理
            			if(Math.abs(slide.velocityY) < 1){

            				clearInterval(timer);
            				//复位
            				if(slide.moveY>0){
            					Transition(0);
            					return false;
            				}else if(-slide.moveY > scrollHight){
            					//判断是否需要加载
	            				if(scope.ismore){
	            					//复位后加载标志
	            					isLoadMore = true;
	            				}
            					Transition(-scrollHight);
            					return false;
            				}
            			}
            		},17);
            	}
            }

            //过渡移动
            function Transition(target){
            	isTransition = true;
            	timer = setInterval(function(){
            		//每次减目标值在*0.2 作为缓冲
            		slide.moveY -=(slide.moveY - target) *0.2;
            		//等于0或者变成负数结束
            		if(Math.abs(slide.moveY - target) < 1){
            			slide.moveY = target;
            			clearInterval(timer);
            			//判断是否需要上拉加载
            			if(isLoadMore){
            				isLoadMore = false;
            				loadMore();
            			}
            			//判断是否需要下拉刷新
            			if(isRefresh){
            				isRefresh = false;
            				doRefresh();
            			}
            			isTransition = false;
            		}
            		setTransform(slide.moveY);
            	},17);
            }

            //移动模块
            function setTransform(move){
		        //这里还需要修改 IOS9.0以下和安卓5 以下需要加webkit 以上则不需要加
		        // move = Math.floor(move);
		        // scroll.setAttribute('style','-webkit-transform: translate3d(0px, '+move+'px, 0px);');
		        // scroll.style.WebkitTransform = 'translate3d(0px,'+move+'px,0px)';
		        moveValue = move;
		        rAF(function(){
		        	scroll.style.WebkitTransform = 'translate3d(0px,'+moveValue+'px,0px)';
		        });
		    }

		    //发送下拉加载请求
		    function doRefresh(){
		    	scope.refresh();
		    	flag = false;
		    	reminderDom.direction.style.WebkitTransform = 'rotate(0deg)';
		    	//延时1S后结束并且重置
		    	setTimeout(function(){
		    		flag = true;
		    	},500);
		    }

		    //发送上拉请求
		    function loadMore(){
				scope.loadmore();
		    	flag = false;
		    	//延时1S后结束并且重置
		    	setTimeout(function(){
		    		flag = true;
		    	},500);
		    }

		    initReminder();
		    initEvent();
		    
        }
    }

}]