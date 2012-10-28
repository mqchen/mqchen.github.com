define(["lib/mootools-core", "lib/mootools-more", "triangles/MathUtils"],
	function(mc, mm, MathUtils) {
	
	/**
		ROTATION AND POSITION


		COORDS
		
		Coords are from the center of an imaginative square, eg.

		+----+----+
		|    |    |
		+----+----+
		|    |    |
		+----+----+

		x, y for the triangle, is the center +


		ROTATION

		If rotation is set to 0, or north west (ne),
		triangle will be drawn so (pretend its a square):

		+----+----+
		| \  |    |
		|  \ |    |
		|   \|    |
		+----+----+
		|    |\   |
		|    | \  |
		|    |  \ |
		+----+----+


		SIZE

		Size of the triangle is the width of the square.

	 */

	var Triangle = new Class({

		x : 0,
		y : 0,
		size : 10,
		rotation : 0,
		color : {
			r : 255,
			g : 0,
			b : 255,
			a : 255 / 2
		},

		initialize : function(x, y, size, rotation) {
			this.x = x;
			this.y = y;
			this.size = size;

			if(rotation === 'nw') { // North west
				rotation = 0;
			}
			else if(rotation === 'ne') { // North east
				rotation = Math.PI / 2; // 90 deg
			}
			else if(rotation === 'se') { // South east
				rotation = Math.PI; // 180
			}
			else if(rotation === 'sw') { // South west
				rotation = Math.PI + Math.PI / 2; // 270
			}
			this.rotation = rotation;
		},

		_calcCorners : function() {
			var normalVector = {
				x : this.x - this.size / 2,
				y : this.y - this.size / 2
			};
			var hypotenuseVectorA = {
				x : this.x - this.size / 2,
				y : this.y + this.size / 2
			};
			var hypotenuseVectorB = {
				x : this.x + this.size / 2,
				y : this.y - this.size / 2
			};
			

			normalVector = MathUtils.rotateVector(
				this.x, this.y,
				normalVector.x, normalVector.y,
				this.rotation);

			hypotenuseVectorA = MathUtils.rotateVector(
				this.x, this.y,
				hypotenuseVectorA.x, hypotenuseVectorA.y,
				this.rotation);

			hypotenuseVectorB = MathUtils.rotateVector(
				this.x, this.y,
				hypotenuseVectorB.x, hypotenuseVectorB.y,
				this.rotation);


			return {
				// The angle with the right 90deg corner
				x1 : normalVector.x,
				y1 : normalVector.y,
				// The corner that is the right from the right corner
				x2 : hypotenuseVectorA.x,
				y2 : hypotenuseVectorA.y,
				// The opposite corner
				x3 : hypotenuseVectorB.x,
				y3 : hypotenuseVectorB.y
			};
		},


		draw : function(master) {
			master.processing.noStroke();
			master.processing.fill(this.color.r, this.color.g, this.color.b, this.color.a);
			
			var corners = this._calcCorners();
			master.processing.triangle(
				corners.x1, corners.y1,
				corners.x2, corners.y2,
				corners.x3, corners.y3);
		}

	});

	return Triangle;
});