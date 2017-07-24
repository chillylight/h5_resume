/* h5component.js */
var H5componentPolyline = function(name,cfg){
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

	//水平网格线
	var step = 10;
	ctx.beginPath();
	ctx.lineWidth = 1;
	ctx.strokeStyle = "#eee";
	for (var i = 0; i < step+1 ; i++) {
		var y = (h/step)*i;
		ctx.moveTo(0,y);
		ctx.lineTo(w,y);
	}
	ctx.stroke();

	// 垂直网格线
	step = cfg.data.length+1;
	var text_w = Math.floor(w/step);
	for (var i = 0; i < step+1; i++) {
		var x = (w/step)*i;
		ctx.moveTo(x,0);
		ctx.lineTo(x,h);

	if (cfg.data[i]) {
		var text = $('<div class="text">');
		text.text(cfg.data[i][0]);
		text.css('width',text_w/2).css('left',x/2+(text_w/4));
		component.append(text);
		}
	}
	ctx.stroke();


	//绘制折线图-数据层
	var cas = document.createElement("canvas");
	var ctx = cas.getContext("2d");
	cas.width = ctx.width = w;
	cas.height = ctx.height = h;
	component.append(cas);
	
	var draw = function( per ){
	//清空画布
	ctx.clearRect(0,0,w,h);

	//绘制折线数据
	ctx.beginPath();
	ctx.lineWidth = 3;
	ctx.strokeStyle = '#2797CC';

	var x = 0;
	var y = 0;
	var row_w = w/(cfg.data.length+1);

	//画点
	for(i in cfg.data){
		var item = cfg.data[i];
		x = row_w*i+row_w;
		y = h-item[1]*h*per;
		ctx.moveTo(x,y);
		ctx.arc(x,y,5,0,2*Math.PI);	
	}

	//连线
	ctx.moveTo(row_w,h-cfg.data[0][1]*h*per);
	for(i in cfg.data){
		var item = cfg.data[i];
		x = row_w*i+row_w;
		y = h-item[1]*h*per;
		ctx.lineTo(x,y);
	}
	ctx.stroke();

	ctx.lineWidth = 1;
	ctx.strokeStyle = 'rgba(39,151,204,0)';
	//绘制阴影
	ctx.lineTo(x,h);
	ctx.lineTo(row_w,h);
	ctx.fillStyle='rgba(39,151,204,0.5)';
	ctx.fill();


	//写数据
	for(i in cfg.data){
		var item = cfg.data[i];
		x = row_w*i+row_w;
		y = h-item[1]*h*per;
		ctx.fillStyle = item[2]?item[2]:"#fff";
		ctx.fillText((item[1]*100)+'%',x-10,y-10);
	}
	ctx.stroke();
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