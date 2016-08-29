function container(){
	$(".left").on("touchstart", function (event) {
		event=event?event:window.event;
		$(".right").unbind("scrollstop");
		var obj=event.srcElement?event.srcElement:event.target;
		$(obj.parentNode).addClass("active").siblings().removeClass("active");
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
		$(".call").css("display","block");
		$(".zhezhao").css("display","block");
	})
	$(".menu-guide").on("click",function(){
		$(".guide").css("display","block");
		$(".zhezhao").css("display","block");
	})
	$(".menu-message").on("click",function(){
		$(".message").css("display","block");
		$(".zhezhao").css("display","block");
	})
	$("button").on("click",function(){
		$(this).parent().css("display","none");
		$(".zhezhao").css("display","none");
	})
}