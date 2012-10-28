define(["lib/mootools-core"], function() {
	
	var Cell = new Class({
		
		// Upper left corner (north west)
		x1 : 0,
		y1 : 0,
		// Lower right corner (south east)
		x2 : 0,
		y2 : 0,
		// Center of the cell
		centerX : 0,
		centerY : 0,

		initialize : function(x1, y1, x2, y2) {
			this.x1 = x1;
			this.y1 = y1;
			this.x2 = x2;
			this.y2 = y2;

			this._calcCenter();
		},

		setNorthWestCoords : function(x1, y1) {
			this.x1 = x1;
			this.y1 = y1;

			this._calcCenter();
		},

		setSouthEastCoords : function(x2, y2) {
			this.x2 = x2;
			this.y2 = y2;

			this._calcCenter();
		},

		_calcCenter : function() {
			this.centerX = (this.x2 + this.x1) / 2;
			this.centerY = (this.y2 + this.y1) / 2;
		}

	});

	return Cell;
});