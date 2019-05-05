window.onload=function(){
	waterfall('main','box');
	var dataInt = {"data":[{"src":'0.jpg'},
	{"src":'1.jpg'},
	{"src":'2.jpg'},
	{"src":'3.jpg'}]}
	window.onscroll=function(){
		if(checkScrollSlide){
			oParent = document.getElementById('main');
			//将数据块渲染到当前页面的尾部
			for(var i =0 ;i <dataInt.data.length;i++){
				var oBox = document.createElement('div');
				oBox.className='box';
				oParent.appendChild(oBox);
				var oPic = document.createElement('div');
				oPic.className = 'pic';
				oBox.appendChild(oPic);
				var oImg = document.createElement('img');
				oImg.src = '../images/'+dataInt.data[i].src;
				oPic.appendChild(oImg);
			}
            waterfall('main','box');

		}
	}
};
function waterfall(parent,box){
	//1、将parent下所有box元素取出
	var oParent = document.getElementById(parent);
	var oBoxs = getClass(oParent,box);
	//2、计算整个页面显示的列数
	var oBoxW = oBoxs[0].offsetWidth;
	var cols = Math.floor(document.documentElement.clientWidth/oBoxW);
	//3、设置Main的宽度
	oParent.style.cssText ='width:'+oBoxW*cols +'px;margin:0 auto;';

	var hArr=[];
	for(var i = 0; i <oBoxs.length ; i++){
		if(i<cols){
			hArr.push(oBoxs[i].offsetHeight);
		}else{
			var minH = Math.min.apply(null,hArr);
			var index = getMinHIndex(hArr,minH);  //获取最矮盒子的索引
			oBoxs[i].style.position = 'absolute';
			oBoxs[i].style.top = minH+'px';
			oBoxs[i].style.left = index*oBoxW+'px';
			hArr[index] += oBoxs[i].offsetHeight;
		}
	}	
}
//根据class获取元素
function getClass(parent,className){
    var boxArr = new Array(), //用于存储所有class为box的元素
    oElements = parent.getElementsByTagName('*');
    for(var i =0 ;i<oElements.length;i++){
    	if(oElements[i].className ==className){
    		boxArr.push(oElements[i]);
    	}
    }
    return boxArr;
}

function getMinHIndex(arr,val){
	for(var i= 0 ; i<arr.length; i++){
		if(arr[i] == val){
			return i ;
		}
	}
}
//检测是否具备加载数据块的条件
function checkScrollSlide(){
	var oParent = document.getElementById(parent);
	var oBoxs = getClass(oParent,'box');
	//到达最后一块数据块的中部的高度，开始加载数据块
    var lastBoxH = oBoxs[oBoxs.length-1].offsetTop
                  +Math.floor(oBoxs[oBoxs.length-1].offsetHeight/2);
    //混杂模式，标准模式的兼容性获取
    var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
    var h = document.body.clientHeight || document.documentElement.clientHeight;    
    return (lastBoxH<scrollTop+h) ? true:false ;
}