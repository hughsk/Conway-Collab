/*!
 * Conway-Collab
 * Copyright(c) 2011 Hugh Kennedy <hughskennedy@gmail.com>
 * MIT Licensed
 */

exports.Grid = function(width,height,now) {
	this.overall = {
		generations:0,
		generations_best:0,
		time_best:0,
		pop_average:0
	}
	this.game_number = 0;
	this.everyone = now;

	/*
	 * RESETS THE CURRENT GRID
	 */
	this.reset = function() {
		this.cells = [];
		for (var i = 0, l = this.width*this.height; i < l; i++) {
			this.cells.push(Math.random(1) > 0.75 ? 1 : 0);
		}

		this.width = width;
		this.height = height;
		this.generations = 0;
		this.population = 0;
		this.time = 0;
		this.delay = 15000;
		this.game_number++;

		if (this.everyone.now.reset)
			this.everyone.now.reset();
	};
	this.reset();
	

	/*
	 * X/Y TO CELL ID
	 */
	this.getCellID = function(x,y) {
		return Math.floor(Math.min(Math.max(x,0),this.width-1)) +
			Math.floor(Math.min(Math.max(y,0),this.height-1)) * this.width;
	};
	
	/*
	 * CELL ID TO X/Y
	 */
	this.getCellPos = function(id) {
		return {'x':Math.floor(id%this.width), 'y':Math.floor(id/this.width)};
	};

	/*
	 * CHECK THE AMOUNT OF NEIGHBOURING CELLS
	 * Pretty scrappy at the moment, but gets the job done.
	 */
	this.getCellNeighbours = function(id) {
		var	n = 0;
		pos = this.getCellPos(id);
		if (this.cells[this.getCellID((pos.x-1+this.width)%this.width,(pos.y-1+this.height)%this.height)]) n++;
		if (this.cells[this.getCellID((pos.x+this.width)%this.width,(pos.y-1+this.height)%this.height)])  n++;
		if (this.cells[this.getCellID((pos.x+1+this.width)%this.width,(pos.y-1+this.height)%this.height)]) n++;
		if (this.cells[this.getCellID((pos.x-1+this.width)%this.width,(pos.y+this.height)%this.height)]) n++;
		if (this.cells[this.getCellID((pos.x+1+this.width)%this.width,(pos.y+this.height)%this.height)]) n++;
		if (this.cells[this.getCellID((pos.x-1+this.width)%this.width,(pos.y+1+this.height)%this.height)]) n++;
		if (this.cells[this.getCellID((pos.x+this.width)%this.width,(pos.y+1+this.height)%this.height)]) n++;
		if (this.cells[this.getCellID((pos.x+1+this.width)%this.width,(pos.y+1+this.height)%this.height)]) n++;

		return n;
	}

	/*
	 * RUN EACH TICK, CREATES THE NEXT GENERATION
	 */
	this.iterate = function() {
		this.delay = (this.delay-2000)*0.975+2000;
		this.generations++;
		this.overall.generations++;
		if (this.generations > this.overall.generations_best)
			this.overall.generations_best = this.generations;
		this.time += 0.001*this.delay;
		if (this.time > this.overall.time_best)
			this.overall.time_best = this.time;
		
		var newCells = []; var pos = {};
		var alive = n = total = 0;	
		for (var i = 0, l = this.width*this.height; i < l; i++) {
			alive = this.cells[i];
			n = this.getCellNeighbours(i);
			if (n < 2) {alive = 0;} else
			if (n == 2) {alive = this.cells[i] > 0 ? 2 : 0;} else
			if (n == 3) {alive = n;} else
						{alive = 0;}
			newCells.push(alive);
			if (alive != 0) {total++}
		}
		this.cells = newCells;
		this.population = 100*total/this.width/this.height;
		this.overall.pop_average = this.overall.pop_average*((this.overall.generations_best-1)/this.overall.generations_best)+this.population*(1/this.overall.generations_best);

		if (this.population <= 5) {console.log('RESET'); this.reset();}		
	};

	return this;
};
