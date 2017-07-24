/* h5component.js */
var H5componentBar = function(name,cfg){
	var component = new H5componentBase(name,cfg);
	$.each(cfg.data,function(index,item){
		var line = $("<div class='line'>");
		var name = $("<div class = 'name'>");
		var rate = $("<div class = 'rate'>");
		var per = $("<div class = 'per'>");

		var width = item[1]*100+'%';
		per.text(width);
		var bgStyle = '';
		if (item[2]) {
			bgStyle = "style = 'background-color:"+item[2]+"'";
		}
		rate.width(width);
		rate.html("<div class='bg' "+bgStyle+">");
		name.text(item[0]);

		component.append(line);
		line.append(name).append(rate).append(per);
	})
	return component;
}