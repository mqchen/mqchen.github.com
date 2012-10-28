define(["lib/mootools-core", "triangles/Cell"], function(mc, Cell) {
	
	var Grid = new Class({

		cellWidth : 30,
		cellHeight : 30,
		cellMarginVertical : 0,
		cellMarginHorizontal : 0,

		initialize : function(cellWidth, cellHeight) {
			this.cellWidth = cellWidth;
			this.cellHeight = cellHeight;
		},

		getCellAtCoords : function(x, y) {
			var cell = new Cell(0, 0, 0, 0);

			var x1 = Math.floor(x / (this.cellWidth + this.cellMarginHorizontal))
				* (this.cellWidth + this.cellMarginHorizontal) - (this.cellMarginHorizontal / 2);
			var y1 = Math.floor(y / (this.cellHeight + this.cellMarginVertical))
				* (this.cellHeight + this.cellMarginVertical) - (this.cellMarginVertical / 2);

			cell.setNorthWestCoords(x1, y1);
			cell.setSouthEastCoords(x1 + this.cellWidth, y1 + this.cellHeight);

			return cell;
		}

	});

	return Grid;
});