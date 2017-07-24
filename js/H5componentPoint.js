/* h5component.js */
var H5componentPoint = function(name,cfg){
	var component = new H5componentBase(name,cfg);
	var base = cfg.data[0][1];
	$.each(cfg.data,function(index,item){
		var point = $("<div class='point point_"+index+"'>");
		//point.text(item[0]+'-'+item[1]);
		var per = (item[1]/base*100)+'%';
		var name = $('<div class="name">'+item[0]+'</div>');
		var rate = $("<div class='per'>"+item[1]*100+'%'+"</div>");
		point.append(name);
		name.append(rate);

		point.width(per).height(per);
		component.append(point);
		if (item[2]) {
			point.css({
				'backgroundColor':item[2]
			})
		}

		if (item[3] && item[4]) {
			point.css({
				'left':item[3],
				'top':item[4]
			})
		}
	})
	return component;
}