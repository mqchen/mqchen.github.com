define([
    "lib/mootools-core",
    "lib/mootools-more",
    "lib/processing",
    
    "triangles/Triangle",
    "triangles/Grid",
    "triangles/Cell"
    ],
    
    function(mc, mm, p,
        Triangle, Grid, Cell) {
	
    'use strict';

	var TrianglesMaster = new Class({

        // Config
        gridCellSize : 30,
        triangleSize : 30,
        newTriangleChance : 0.3,


        // Properties
		canvas : null,
		processing : null,
		procesingInstance : null,
		sizeFunc : null,

        grid : null,
		triangles : new Array(),



		initialize : function(canvas) {
			this.canvas = canvas;

            this._initGrid();
		},

		start : function() {
			this.procesingInstance = new Processing(
            	this.canvas, this._setupProcessing.bind(this));
		},

        // Processing
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

        setup: function() {
            this.processing.background(0, 0, 0, 0);
        },


        // Canvas size
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

        getCenter : function() {
            return {
                x : this.processing.width / 2,
                y : this.processing.height / 2
            };
        },


        // Actual triangles stuff

        _initGrid : function() {
            this.grid = new Grid(this.gridCellSize, this.gridCellSize);
        },

        mouseClicked : function() {
        	this.addTriangleAt(this.processing.mouseX, this.processing.mouseY);
        },

        draw : function() {
        	var size = (this._getSizeFunc())();
        	this.processing.size(size.width, size.height);

            if(this.processing.random(0, 1) <= this.newTriangleChance) {
                this.addTriangleAt(this.processing.mouseX, this.processing.mouseY);
            }

        	this._drawTriangles();
        },

        addTriangleAt : function(x, y) {
            var coords = this.grid.getCellAtCoords(x, y);

            var triangle = new Triangle(
                    coords.centerX, coords.centerY,
                    this.triangleSize, this.triangles.length * (Math.PI / 2));

            // Triangle random color rotation
            var hsb = [triangle.color.r, triangle.color.g, triangle.color.b].rgbToHsb();
            hsb[0] = this.processing.random(0, 360);
            var rgb = hsb.hsbToRgb();

            triangle.color.r = rgb[0];
            triangle.color.g = rgb[1];
            triangle.color.b = rgb[2];

            this.triangles.push(triangle);

            return triangle;
        },

        _drawTriangles : function() {
        	for (var i = this.triangles.length - 1; i >= 0; i--) {
        		this.triangles[i].draw(this);
        	};
        }
	});
	
	return TrianglesMaster;
});