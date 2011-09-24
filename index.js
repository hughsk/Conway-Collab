var PORT_NUMBER = 80;

/*
 * Load Resources
 */
var fs = require('fs'), url = require('url'), path = require('path');
var html = fs.readFileSync(__dirname+'/index.html','UTF8');
var less = require('less');

var css = '';
less.render(fs.readFileSync(__dirname+'/style.less', "UTF8"), function(e, _css) {
	css = _css;
});

var sprOn = fs.readFileSync(__dirname+'/on.png');
var sprOnUser = fs.readFileSync(__dirname+'/user.png');


/*
 * Creating the actual server
 */
var server = require('http').createServer(function(req,res) { 
	var uri = url.parse(req.url).pathname;
	
/** UNCOMMENT FOR TESTING **/
//Otherwise HTML/LESS will be loaded/parsed once and then stored in memory

	html = fs.readFileSync(__dirname+'/index.html','UTF8');
	less.render(fs.readFileSync(__dirname+'/style.less', "UTF8"), function(e, _css) {
		css = _css;
	});

/**************************/
	
	if (uri == '/style.less') {
		res.writeHead(200, {"Content-Type":"text/css"});
		res.write(css);
		res.end();
	} else {
		res.writeHead(200, {"Content-Type":"text/html"});
		res.write(html);
		res.end();
	}
});

server.listen(PORT_NUMBER);

var nowjs = require('now');
var everyone = nowjs.initialize(server);

//Create the grid
var gridfn = require('./grid.js');
var grid = new gridfn.Grid(50,30,everyone);

/*
 * Bridging functions between the grid object and NowJS
 */
everyone.now.getGridDimensions = function(fn) {
	fn(grid.width,grid.height);
};
everyone.now.getGrid = function(fn) {
	fn(grid.width,grid.height,grid.cells);
};
everyone.now.setGrid = function(x,y,v) {
	var id = grid.getCellID(x,y);	
	grid.cells[id] = !!v;
	if (everyone.now.updateCell)
		everyone.now.updateCell(id,v);
};

everyone.now.getGens = function(callback) {callback(grid.generations);}
everyone.now.getPop = function(callback) {callback(grid.population);}
everyone.now.getOverall = function(callback) {callback(grid.overall);}
everyone.now.getGametime = function(callback) {callback(grid.time);}
everyone.now.getDelay = function(callback) {callback(grid.delay);}

//Run every time a "generation" finishes
function tick() {	
	grid.iterate();
	if (everyone.now.updateGrid != undefined)
		everyone.now.updateGrid(grid.width,grid.height,grid.cells);
	setTimeout(tick,grid.delay);
}; tick();
