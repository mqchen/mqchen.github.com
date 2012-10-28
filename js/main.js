requirejs.config({
	paths : {
		"domReady" : "require/domReady"
	},
	shim : {
		"lib/mootools-more" : ["lib/mootools-core"],
        "lib/MooHashChange" : ["lib/mootools-core"]
	}
});


require(["triangles/Master"], function(Master) {

	var canvas = $("triangles");

	var m = new Master(canvas);
	m.setSizeFunc(function() {
		var s = canvas.getSize();
		return {
			width : s.x,
			height : s.y
		}
	});
	m.start();
});