var originLatitudeDegree = 0;
var originLatitudeMinute = 0;
var originLongitudeDegree = 0;
var originLongitudeMinute = 0;
var gridLatitudeDegree = 0;
var gridLatitudeMinute = 0;
var gridLongitudeDegree = 0;
var gridLongitudeMinute = 0;
var bearing = 0;
var distance = 0;
var sector = {
	red : "RED",
	white : "WHITE",
	blue : "BLUE",
	green : "GREEN",
}

var calculate = function() {
	originLatitudeDegree = parseInt($("#origin-lat-degree").val())*60;
	originLatitudeMinute = parseInt($("#origin-lat-minute").val());
	originLongitudeDegree = parseInt($("#origin-lon-degree").val())*60;
	originLongitudeMinute = parseInt($("#origin-lon-minute").val());
	gridLatitudeDegree = parseInt($("#grid-lat-degree").val())*60;
	gridLatitudeMinute = parseInt($("#grid-lat-minute").val());
	gridLongitudeDegree = parseInt($("#grid-lon-degree").val())*60;
	gridLongitudeMinute = parseInt($("#grid-lon-minute").val());
	bearing = parseInt($("#bearing").val());
	distance = parseInt($("#distance").val());

	if(originLatitudeDegree > 0 &&
		originLongitudeDegree > 0 &&
		gridLatitudeDegree > 0 &&
		gridLongitudeDegree > 0 &&
		bearing > 0 &&
		distance > 0) {
		calculatePosition();
	}
}

var calculatePosition = function() {
	var resultLat = 0;
	var resultLon = 0;
	var opp = Math.sin(bearing)*distance;
	var sqr = Math.cos(bearing)*distance;
	var positionX = 0;
	var positionY = 0;

	if(bearing >= 0 && bearing <= 90) {
		resultLat = originLatitudeDegree + originLatitudeMinute + opp;
		resultLon = originLongitudeDegree + originLongitudeMinute + sqr;
	} else if(bearing >= 90 && bearing <= 180) {
		resultLat = (originLatitudeDegree + originLatitudeMinute) - opp;
		resultLon = originLongitudeDegree + originLongitudeMinute + sqr;
	} else if(bearing >= 180 && bearing <= 270) {
		resultLat = (originLatitudeDegree + originLatitudeMinute) - opp;
		resultLon = (originLongitudeDegree + originLongitudeMinute) - sqr;
	} else {
		resultLat = originLatitudeDegree + originLatitudeMinute + opp;
		resultLon = (originLongitudeDegree + originLongitudeMinute) - sqr;
	}

	var gridLat = gridLatitudeDegree + gridLatitudeMinute;
	var gridLon = gridLongitudeDegree + gridLongitudeMinute;

	if((resultLat - gridLat) > 0 && (resultLon - gridLon) > 0) {
		$("#sector").html("Sector : " + sector.white);
		$("x-axis").html("X-Axis : " + (resultLon - gridLon).toString());
		$("y-axis").html("Y-Axis : " + (resultLat - gridLat).toString());
		console.log(sector.white);
	} else if((resultLat - gridLat) < 0 && (resultLon - gridLon) > 0) {
		$("#sector").html("Sector : " + sector.blue);
		$("x-axis").html("X-Axis : " + (resultLon - gridLon).toString());
		$("y-axis").html("Y-Axis : " + (gridLat - resultLat).toString());
		console.log(sector.blue);
	} else if((resultLat - gridLat) < 0 && (resultLon - gridLon) < 0) {
		$("#sector").html("Sector : " + sector.green);
		$("x-axis").html("X-Axis : " + (gridLon - resultLon).toString());
		$("y-axis").html("Y-Axis : " + (gridLat - resultLat).toString());
		console.log(sector.green);
		console.log(gridLon);
		console.log(gridLat);
		console.log((gridLon - resultLon).toString());
		console.log((gridLat - resultLat).toString());
	} else {
		$("#sector").html("Sector : " + sector.red);
		$("x-axis").html("X-Axis : " + (gridLon - resultLon).toString());
		$("y-axis").html("Y-Axis : " + (resultLat - gridLat).toString());
		console.log(sector.red);
	}
}
