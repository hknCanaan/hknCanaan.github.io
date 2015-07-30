function drawResourcesStatus(fuel, ammo, steel, bauxite)
{
	var maxium = 300000;
	fuel = (fuel/maxium)*200;
	ammo = (ammo/maxium)*200;
	steel = (steel/maxium)*200;
	bauxite = (bauxite/maxium)*200;
	var canvas = document.getElementById('canvas');
	var ctx = canvas.getContext('2d');
	ctx.strokeStyle = "black";
	var gradient = ctx.createLinearGradient(40,40,240,40);
	gradient.addColorStop(0,"red");
	gradient.addColorStop(0.35,"yellow");
	gradient.addColorStop(0.70,"PaleGreen");
	gradient.addColorStop(1,"green");
	var y_cord = 40;
	ctx.fillStyle = gradient;
	ctx.fillRect(40, y_cord, fuel, 15);
	ctx.strokeRect(40, y_cord, 200, 15);
	y_cord  += 15+10;
	ctx.fillRect(40, y_cord, ammo, 15);
	ctx.strokeRect(40, y_cord, 200, 15);
	y_cord  += 15+10;
	ctx.fillRect(40, y_cord, steel, 15);
	ctx.strokeRect(40, y_cord, 200, 15);
	y_cord  += 15+10;
	ctx.fillRect(40, y_cord, bauxite, 15);
	ctx.strokeRect(40, y_cord, 200, 15);
}