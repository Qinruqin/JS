$(window).on('load',function(){
	waterfall();
	var dataInt = {"data":[{"src":'0.jpg'},
	{"src":'1.jpg'},
	{"src":'2.jpg'},
	{"src":'3.jpg'}]};
	$(window).on('scroll',function(){
		if(checkScrollSlide){
			$.each(dataInt.data,function(index,value){
				var oBox = $('<div>').addClass('box').appendTo($('#main'));
				var oPic = $('<div>').addClass('pic').appendTo($(oBox));
    			var oImg = $('<img>').attr('src','../images/'+$(value).attr('src'));
    			oImg.appendTo($(oPic));
			});
		waterfall();
		}

	})
})

function waterfall(){
	var $boxs= $('#main>div');
	var w = $boxs.eq(0).outerWidth();
	var cols = Math.floor($(window).width()/w);
	$('#main').css({
		'width':w*cols,
		'margin':'0 auto'
	});
	// $('#main').width(w*cols).css('margin','0 auto');
	var harr = [];
	$boxs.each(function(index,value){
		var h = $boxs.eq(index).outerHeight();
		if(index<cols){
			harr[index] = h;
		}else{
			var minH = Math.min.apply(null,harr);
			var minHIndex = $.inArray(minH,harr);
			$(value).css({
				'position':'absolute',
				'top':minH,
				'left':minHIndex*w
			})
			harr[minHIndex] += $boxs.eq(index).outerHeight();
		}
	})
}

function checkScrollSlide(){
	var lastBox = $('#main>div').last();
	var lastBoxDis = $lastBox.offset().top
	                 +Math.floor($lastBox.outerHeight/2);
	var scrollTop = $(window).scrollTop();
	var documentH = $(window).height();
	return (lastBoxDis < scrollTop+documentH)?true:false;
}