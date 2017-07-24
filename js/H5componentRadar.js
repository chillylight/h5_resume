/* h5componentRadar.js */
var H5componentRadar = function(name,cfg){
	var component = new H5componentBase(name,cfg);
	//绘制网格图
	var w = cfg.width;
	var h = cfg.height;

	//加入一个画布-背景层
	var cas = document.createElement("canvas");
	var ctx = cas.getContext("2d");
	cas.width = ctx.width = w;
	cas.height = ctx.height = h;
	component.append(cas);

	var r = w/2;
	var step = cfg.data.length;

	// ctx.beginPath();
	// ctx.arc(r,r,r-2,0,2*Math.PI);
	// ctx.stroke();

	// ctx.beginPath();
	// ctx.arc(r,r,5,0,2*Math.PI);	
	// ctx.stroke();

	// 绘制雷达图网格背景
	var isblue = false;
	for(var s=10;s>0;s--){
		ctx.beginPath();
		for (var i = 0; i < step; i++) {
			var rad = (2*Math.PI/360)*(360/step)*i;
			var x = r + Math.sin(rad) * r * (s/10);
			var y = r + Math.cos(rad) * r * (s/10);
			ctx.lineTo(x,y);	
		}
		ctx.closePath();
		ctx.fillStyle = (isblue = !isblue)?'#99c0ff':'#f1f9ff';
		ctx.fill();
	}
	ctx.stroke();
	//绘制伞骨
	for(var i = 0; i<step;i++){
		var rad = (2*Math.PI/360)*(360/step)*i;
		var x = r + Math.sin(rad) * r;
		var y = r + Math.cos(rad) * r;
		ctx.moveTo(r,r);
		ctx.lineTo(x,y);
		ctx.strokeStyle = '#e0e0e0';
		
		//输出项目文字
		var text = $('<div class="text">');
		text.css('transition','all 0.5s ' +0.1*i+'s');
		if(cfg.data[i]){
			text.text(cfg.data[i][0]);
		}
		if (x>w/2) {
			text.css('left',x/2+5);
		}else{			
			text.css('right',(w-x)/2+5);
		}

		if (y>(h/2)) {
			text.css('top',y/2+5);
		}else{
			text.css('bottom',(h-y)/2+5);
		}

		if(cfg.data[i][2]){
			text.css('color',cfg.data[i][2]);
		}

		text.css('opacity',0);
		
		component.append(text);
	}

	ctx.stroke();

	//数据层开发
	//加入一个画布-数据层
	var cas = document.createElement("canvas");
	var ctx = cas.getContext("2d");
	cas.width = ctx.width = w;
	cas.height = ctx.height = h;
	component.append(cas);
	
	ctx.strokeStyle = "#2797CC";
	var draw = function( per ){
		ctx.clearRect(0,0,w,h);
		if(per>=1){
			component.find('.text').css('opacity',1);
		}
		if(per<1){
			component.find('.text').css('opacity',0);
		}
		//输出数据的折线
		for(var i=0;i<step;i++){
			var rad = (2*Math.PI/360)*(360/step)*i;
			var rate = cfg.data[i][1]*per;
			var x = r + Math.sin(rad) * r * rate;
			var y = r + Math.cos(rad) * r * rate;
			ctx.lineTo(x,y);
			ctx.fill();
		}
		ctx.closePath();
		ctx.stroke();

		//输出数据的点
		ctx.fillStyle = '#2797CC';
		for(var i=0;i<step;i++){
			var rad = (2*Math.PI/360)*(360/step)*i;
			var rate = cfg.data[i][1]*per;
			var x = r + Math.sin(rad) * r * rate;
			var y = r + Math.cos(rad) * r * rate;
			ctx.beginPath();
			ctx.arc(x,y,5,0,2*Math.PI);	
			ctx.fill();
			ctx.closePath();
		}
		
		
	}

	draw(0);

	component.on('onLoad',function(){
		var s = 0;
		for (var i = 0; i < 100; i++) {
			setTimeout(function(){
				s+=0.01;
				draw(s);
			},i*10+500)
		}
	})	

	component.on('onLeave',function(){
		var s = 1;
		for (var i = 0; i < 100; i++) {
			setTimeout(function(){
				s-=0.01;
				 draw(s);
			},i*10)
		}
	})	

	return component;
}