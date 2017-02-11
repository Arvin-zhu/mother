function container(){
	$(".left").on("touchstart", function (event) {
		event=event?event:window.event;
		$(".right").unbind("scrollstop");
		var obj=event.srcElement?event.srcElement:event.target;
        var index=$(obj).index();
        $(".right>div")[index].scrollIntoView();
		$(obj).addClass("active").siblings().removeClass("active");
	})
	var h=$(this)[0].scrollTop,
		food_arr=$(".detail"),
		food_len=food_arr.length,
		h_arr=new Array();
	for(var i=0;i<food_len;i++){
		h_arr[i]=food_arr[i].offsetTop;
	}
	$(".right").on("touchstart", function () {
		$(".right").bind("scrollstop touchmove",function(){
			for(var i=0;i<food_len;i++){
				if($(this)[0].scrollTop>=h_arr[i]-20){
					$($(".left li")[i]).addClass("active").siblings().removeClass("active");
				}
			}
		})
	})
}
function container13(){
	var wrap=$(".wrap");
	$(".wrap").on("click",function(){
		$(this).addClass("wrap_focus").siblings().removeClass("wrap_focus");
	});
	$("textarea").on("click",function(){
		$(".wrap").removeClass("wrap_focus");
	})
}
function container4(){
	$("#container4 .swiper-slide").on("click",function(){
		$(this).addClass("active").siblings().removeClass("active");
	});
	var swiper = new Swiper('.swiper-container', {
		slidesPerView: 4,
		freeMode: true
	})
}
function container6(){
	var arr=$("ul>li");
	var len=arr.length;
	var w=$("ul")[0].offsetWidth;
	var preX,curX;
	var transferX=0;
	for(var i=0;i<len;i++){
		$(arr[i]).css("left",i*w);
		arr[i].addEventListener("touchstart",touchstart,false);
		arr[i].addEventListener("touchmove",touchmove,false);
		arr[i].addEventListener("touchend",touchend,false);
	}
	$(".right").on("click",slide_right);
	$(".left").on("click",slide_left);
	function slide_right(){
		event.preventDefault();
		for(var i=0;i<len;i++){
			if($(arr[i]).css("left")=="0px"){
				var $this=i;
			}
		}
		for(var i=0; i<len;i++){
			if($(arr[len-1]).css("left")=="0px"){
				for(var i=0;i<len;i++){
					$(arr[i]).animate({"left":i*w},400);
				}
			}else{
				$(arr[i]).animate({"left":(i-$this-1)*w},400);
			}
		}
	}
	function slide_left(){
		event.preventDefault();
		for(var i=0;i<len;i++){
			if($(arr[i]).css("left")=="0px"){
				var $this=i;
			}
		}
		if($(arr[0]).css("left")=="0px"){
			for(var i=0;i<len;i++){
				$(arr[i]).animate({"left":w*i},400);
			}
		}else{
			for(var i=0; i<len;i++){
				$(arr[i]).animate({"left":(i-$this+1)*w},400);
			}
		}
	}
	//触摸开始
	function touchstart(event){
		event.preventDefault();
		if(event.targetTouches.length==1){      //避免多手指触摸情况
			var touch=event.targetTouches[0];
			preX=touch.pageX;
			preY=touch.pageY;
		}
	}
	$("ul>li").mousedown(function(event){
		event.preventDefault();
		preX=event.pageX;
		$(this).mousemove(function(event){
			event.preventDefault();               //避免触发默认行为，特别在微信端；
			var $count=$(this);
			var $index2=$count.index();
			curX=event.pageX;
			transferX +=curX-preX;            //用累加是因为css的样式会叠加！！
			for(var i=0;i<len;i++){
				$(arr[i]).css("left",(i-$index2)*w+transferX);
			}
			preX=curX;
		})
	})
	$("ul>li").mouseup(function(event){
		event.preventDefault();
		$("ul>li").unbind("mousemove");
		transferX=0;                         //止transferX在下一次触摸中继续累加，导致下一次滑动幅度越来越大；
		var $this=$(this),
			$index=$(this).index(),
			$left1=parseInt($(this).css("left")),
			$left=Math.abs(parseInt($(this).css("left")));
		if($left<80){                         //设置手指滑动的距离，当小于80px的时候位置不变；
			for(var i=0;i<len;i++){
				var curL=parseInt($(arr[i]).css("left"));
				$(arr[i]).animate({"left":curL-$left1},400);
			}
		}else if($left>80){                  //当滑动的距离大于80px的时候，切换；
			if($left1>0){                    //当手指向右滑动的时候；
				if($index!=0){              //判断是不是第一张，如果不是则切换；
					for(var i=0;i<len;i++){
						$(arr[i]).animate({"left":(i-$index+1)*w},400);
					}
				}else{                         //如果是第一张，则保持不变；
					for(var i=0;i<len;i++){
						$(arr[i]).animate({"left":i*w},400);
					}
				}
			}else{                          //当手指向左滑动的时候；
				if($index!=(len-1)){        //判断是不是最后一张，如果不是则切换；
					for(var i=0;i<len;i++){
						$(arr[i]).animate({"left":(i-$index-1)*w},400);
					}
				}else{                    //如果是最后一张，则保持位置不变；
					for(var i=0;i<len;i++){
						$(arr[i]).animate({"left":(i-$index)*w},400);
					}
				}
			}
		}
	})
	//手指拖动
	function touchmove(event){
		event.preventDefault();               //避免触发默认行为，特别在微信端；
		if(event.targetTouches.length==1){    //避免多手机触摸情况
			var $count=$(this);
			var $index2=$count.index();
			var touch=event.targetTouches[0];
			curX=touch.pageX;
			transferX +=curX-preX;            //用累加是因为css的样式会叠加！！
			for(var i=0;i<len;i++){
				$(arr[i]).css("left",(i-$index2)*w+transferX);
			}
			preX=curX;
		}
	}
	function touchend(event){
		event.preventDefault();
		transferX=0;                         //为了防止transferX在下一次触摸中继续累加，导致下一次滑动幅度越来越大；
		var $this=$(this),
			$index=$(this).index(),
			$left1=parseInt($(this).css("left")),
			$left=Math.abs(parseInt($(this).css("left")));
		if($left<80){                         //设置手指滑动的距离，当小于80px的时候位置不变；
			for(var i=0;i<len;i++){
				var curL=parseInt($(arr[i]).css("left"));
				$(arr[i]).animate({"left":curL-$left1},400);
			}
		}else if($left>80){                  //当滑动的距离大于80px的时候，切换；
			if($left1>0){                    //当手指向右滑动的时候；
				if($index!=0){              //判断是不是第一张，如果不是则切换；
					for(var i=0;i<len;i++){
						$(arr[i]).animate({"left":(i-$index+1)*w},400);
					}
				}else{                         //如果是第一张，则保持不变；
					for(var i=0;i<len;i++){
						$(arr[i]).animate({"left":i*w},400);
					}
				}
			}else{                          //当手指向左滑动的时候；
				if($index!=(len-1)){        //判断是不是最后一张，如果不是则切换；
					for(var i=0;i<len;i++){
						$(arr[i]).animate({"left":(i-$index-1)*w},400);
					}
				}else{                    //如果是最后一张，则保持位置不变；
					for(var i=0;i<len;i++){
						$(arr[i]).animate({"left":(i-$index)*w},400);
					}
				}
			}
		}
	}
}
function container3(){
	var map = new AMap.Map("wrap", {
				resizeEnable: true
			});
			AMap.service(["AMap.PlaceSearch"], function() {
				var placeSearch = new AMap.PlaceSearch({ //构造地点查询类
					pageSize:100,
					pageIndex: 1,
					city: "0512", //城市
					map: map
				});
				//关键字查询
				placeSearch.search("苏州瑞鹏信息科技");
			});
}
function container5(){
	$("#container5 .swiper-slide").on("click",function(){
		$(this).addClass("active").siblings().removeClass("active");
	});
	var swiper = new Swiper('.swiper-container', {
		slidesPerView: "auto",
		freeMode: true
	})
}
function container9(){
    $(".menu-call").on("click",function(){
        $(".call").fadeIn(500);
        $(".zhezhao").fadeIn(500);
    })
    $(".menu-guide").on("click",function(){
        $(".guide").fadeIn(500);
        $(".zhezhao").fadeIn(500);
    })
    $(".menu-message").on("click",function(){
        $(".message").fadeIn(500);
        $(".zhezhao").fadeIn(500);
    })
    $("button").on("click",function(){
        $(this).parent().fadeOut(500);
        $(".zhezhao").fadeOut(500);
    })
	$("ul li").eq(0).addClass("flipInY1");
	$("ul li").eq(1).addClass("flipInY2");
	$("ul li").eq(2).addClass("flipInY3");
	$("ul li").eq(3).addClass("flipInY4");
	$("ul li").eq(4).addClass("flipInY2");
	$("ul li").eq(5).addClass("flipInY3");
	$("ul li").eq(6).addClass("flipInY4");
	$("ul li").eq(7).addClass("flipInY3");
	$("ul li").eq(8).addClass("flipInY4");
	$("ul li").eq(9).addClass("flipInY4");
}