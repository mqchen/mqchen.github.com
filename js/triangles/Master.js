define(["lib/mootools-core", "lib/mootools-more", "lib/processing", "triangles/Triangle"],
function(mc, mm, p, Triangle) {
	'use strict';

	var TrianglesMaster = new Class({

		canvas : null,
		processing : null,
		procesingInstance : null,
		sizeFunc : null,

		triangles : new Array(),

		initialize : function(canvas) {
			this.canvas = canvas;
		},

		start : function() {
			this.procesingInstance = new Processing(
            	this.canvas, this._setupProcessing.bind(this));
		},

        _setupProcessing: function(p) {

            this.processing = p;

            var methods = new Hash(this).getKeys();

            // Override processing functions
            for(var i = 0; i < methods.length; i++) {
                if(!this.hasOwnProperty(methods[i]) && this[methods[i]] instanceof Function && methods[i].indexOf("$") != 0) {
                    //console.debug(methods[i]);
                    this.processing[methods[i]] = this[methods[i]].bind(this);
                }
            }
        },

        _defaultSizeFunc : function() {
            return {
                width: this.processing.width,
                height: this.processing.height
            }
        },

        _getSizeFunc : function() {
        	return typeof(this.sizeFunc) === "function"
        		? this.sizeFunc
        		: this._defaultSizeFunc.bind(this);
        },

        setSizeFunc : function(func) {
        	this.sizeFunc = func;
        },

        setup: function() {
            this.processing.background(0, 0, 0, 0);
        },

        getCenter : function() {
        	return {
        		x : this.processing.width / 2,
        		y : this.processing.height / 2
        	};
        },
        clicks : 0,
        mouseClicked : function() {
        	this.triangles.push(
        		new Triangle(
        			this.processing.mouseX, this.processing.mouseY,
        			30, this.clicks++ * (Math.PI / 2)));
        },

        draw : function() {
        	var size = (this._getSizeFunc())();
        	this.processing.size(size.width, size.height);

        	this._drawTriangles();
        },

        _drawTriangles : function() {
        	for (var i = this.triangles.length - 1; i >= 0; i--) {
        		this.triangles[i].draw(this);
        	};
        }
	});
	
	return TrianglesMaster;
});