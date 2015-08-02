var canvasObj = {};
canvasObj.Resources = 	[
							{low:25000,standard:50000,sufficient:100000,maxium:300000},
							{low:25000,standard:50000,sufficient:100000,maxium:300000},
							{low:25000,standard:50000,sufficient:100000,maxium:300000},
							{low:20000,standard:40000,sufficient:80000,maxium:300000},
							{low:300,standard:500,sufficient:1000,maxium:3000}
						]

function render(canvasID){
	console.log("called");
	canvasObj.ID = canvasID;
	var canvas = document.getElementById(canvasObj.ID);
	var context = canvas.getContext("2d");
	canvasObj.context = context;
	context.clearRect(0, 0, canvas.width, canvas.height);
	context.strokeRect(0,0,600,250);
	
	drawAdmiralInfoSection()
	drawResourcesSection()

}

function drawAdmiralInfoSection()
{
	var context = canvasObj.context;
	context.fillStyle = "white";
	context.strokeStyle = "black";
	context.font = "bold 20px serif";
	
	var name = $("#adm_name").val() ? $("#adm_name").val() : "Nameless Admiral";
	context.fillText(name, 60, 50);
	context.strokeText(name, 60, 50);
	
	context.strokeRect(70, 60, 120, 120);

	var lv = $("#adm_lv").val() ? ("Lv. "+$("#adm_lv").val()) : "Lv. ?";
	context.font = "bold 10px serif";
	context.fillText(lv, 120, 195);
	context.strokeText(lv, 120, 195);
	
	var server = $("#adm_server").val() ? ("Lv. "+$("#adm_lv").val()) : "Lv. ?";
	context.font = "bold 14px serif";
	
	context.fillText(lv, 120, 195);
	context.strokeText(lv, 120, 195);
	
	
	var server = $("#adm_server").val() ? (($("#adm_server option:selected").text()).split("　"))[1] : "Unknown Server";
	context.font = "bold 16px serif";
	context.fillText(server, 75, 210);
	context.strokeText(server, 75, 210);
}

function drawResourcesSection()
{
	starting_y = 100;
	var context = canvasObj.context;
	var fuel = canvasObj.Resources[0];
	var ammo = canvasObj.Resources[1];
	var steel = canvasObj.Resources[2];
	var bauxite = canvasObj.Resources[3];
	var bucket = canvasObj.Resources[4];
	
	var fuelGradient = context.createLinearGradient(350, 0, 550, 0);
	fuelGradient.addColorStop(0, 'red');
	fuelGradient.addColorStop(fuel.low/parseFloat(fuel.maxium), 'yellow');
	fuelGradient.addColorStop(fuel.sufficient/parseFloat(fuel.maxium), 'palegreen');
	fuelGradient.addColorStop(1, 'green');
	
	var ammoGradient = context.createLinearGradient(350, 0, 550, 0);
	ammoGradient.addColorStop(0, 'red');
	ammoGradient.addColorStop(ammo.low/parseFloat(ammo.maxium), 'yellow');
	ammoGradient.addColorStop(ammo.sufficient/parseFloat(ammo.maxium), 'palegreen');
	ammoGradient.addColorStop(1, 'green');
	
	var steelGradient = context.createLinearGradient(350, 0, 550, 0);
	steelGradient.addColorStop(0, 'red');
	steelGradient.addColorStop(steel.low/parseFloat(steel.maxium), 'yellow');
	steelGradient.addColorStop(steel.sufficient/parseFloat(steel.maxium), 'palegreen');
	steelGradient.addColorStop(1, 'green');
	
	var bauxiteGradient = context.createLinearGradient(350, 0, 550,0 );
	bauxiteGradient.addColorStop(0, 'red');
	bauxiteGradient.addColorStop(bauxite.low/parseFloat(bauxite.maxium), 'yellow');
	bauxiteGradient.addColorStop(bauxite.sufficient/parseFloat(bauxite.maxium), 'palegreen');
	bauxiteGradient.addColorStop(1, 'green');
	
	var bucketGradient = context.createLinearGradient(350, 0, 550, 0);
	bucketGradient.addColorStop(0, 'red');
	bucketGradient.addColorStop(bucket.low/parseFloat(bucket.maxium), 'yellow');
	bucketGradient.addColorStop(bucket.sufficient/parseFloat(bucket.maxium), 'palegreen');
	bucketGradient.addColorStop(1, 'green');
	
	gradientArr = [fuelGradient,ammoGradient,steelGradient,bauxiteGradient,bucketGradient];
	
	currentFuel = $("#res_fuel").val() ? $("#res_fuel").val() : 0;
	currentAmmo = $("#res_ammo").val() ? $("#res_ammo").val() : 0;
	currentSteel = $("#res_steel").val() ? $("#res_steel").val() : 0;
	currentBauxite = $("#res_bauxite").val() ? $("#res_bauxite").val() : 0;
	currentBucket = $("#res_bucket").val() ? $("#res_bucket").val() : 0;
	
	currentResArr = [currentFuel, currentAmmo, currentSteel, currentBauxite, currentBucket];
	
	imgArr = ['img/icon_fuel.png','img/icon_ammo.png', 'img/icon_steel.png', 'img/icon_bauxite.png', 'img/icon_bucket.png'];
	
	for(i = 0; i < 5; i++)
	{
		
		var drawing = new Image();
		drawing.src = imgArr[i];
		drawing.customData = {x:325,y:starting_y};
		drawing.onload = function() {
			context.drawImage(this,this.customData.x, this.customData.y);
		};
		
		
		currentRes = canvasObj.Resources[i];
		var barPgoress = Math.ceil(200*(currentResArr[i]/parseFloat(currentRes.maxium)));
		context.fillStyle = gradientArr[i];
		context.fillRect(350, starting_y, barPgoress, 15);
		context.strokeRect(350, starting_y, 200, 15);
		
		var lowIndicator = Math.ceil(200*(currentRes.low/parseFloat(currentRes.maxium)));
		var sufficientIndicator = Math.ceil(200*(currentRes.low/parseFloat(currentRes.sufficient)));
		
		context.beginPath();
		context.moveTo(349.5+lowIndicator,starting_y-3);
		context.lineTo(349.5+lowIndicator,starting_y+18);
		context.stroke();
		
		context.beginPath();
		context.moveTo(349.5+sufficientIndicator,starting_y-3);
		context.lineTo(349.5+sufficientIndicator,starting_y+18);
		context.stroke();
		
		
		
		starting_y+=25;
	}
	
	
}
