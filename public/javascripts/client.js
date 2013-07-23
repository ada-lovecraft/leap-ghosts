$(function() {


	var height = $(document).height();
	var width = $(document).width();
	var controllerOptions = { enableGestures: true };

	try{
		var canvas = document.getElementsByTagName('canvas')[0];
	    var heatmap = createWebGLHeatmap({height:height, width: width,gradientTexture:'images/finger-paint.png'});
	    document.body.appendChild(heatmap.canvas);
	}
	catch(error){
	    console.log(error);
	}

	Leap.loop(controllerOptions, function(frame, done) {
		for (var i = 0; i < frame.pointables.length; i++) {
			console.log(frame.pointables[i].tipPosition[1]);
			heatmap.addPoint(((frame.pointables[i].tipPosition[0]+450)/900) * width,((-frame.pointables[i].tipPosition[1]+450)/450) *height,25,.15);
    	}
		done();
    });

    var raf = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
	                                         window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

	var update = function(){
	    //heatmap.addPoint(100, 100, 100, 10/255);
	    heatmap.adjustSize(); // can be commented out for statically sized heatmaps, resize clears the map
	    heatmap.update(); // adds the buffered points
	    heatmap.display(); // adds the buffered points
	    heatmap.blur();
	    heatmap.clamp(0.0, .75); // depending on usecase you might want to clamp it
	    raf(update);
	}
	raf(update);
});