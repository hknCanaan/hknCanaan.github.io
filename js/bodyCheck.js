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
	context.strokeRect(0,0,600,500);
	
	drawAdmiralInfoSection()
	drawResourcesSection()

}

function drawAdmiralInfoSection()
{
	starting_x = 100;
	starting_y = 52;
	spacing = 10;
	
	name_height = 16;
	
	icon_width = 120;
	icon_height = icon_width;
	
	lv_height = 14;
	server_height = 16;
	
	
	var context = canvasObj.context;
	context.fillStyle = "black";
	context.strokeStyle = "black";
	context.font = "bold "+name_height+"px serif";
	
	
	var name = $("#adm_name").val() ? $("#adm_name").val() : "Nameless Admiral";
	context.fillText(name, starting_x, starting_y);
	
	//Icon Area
	var drawing = new Image();
	drawing.src = "img/default.png";
	drawing.customData = {x:starting_x,y:starting_y+spacing};
	drawing.onload = function()
	{
		context.drawImage(this,this.customData.x, this.customData.y);
	}
	context.strokeRect(starting_x, starting_y+spacing, icon_height, icon_width);

	var lv = $("#adm_lv").val() ? ("Lv. "+$("#adm_lv").val()) : "Lv. ?";
	context.font = "bold "+lv_height+"px serif";
	context.fillText(lv, starting_x, starting_y+spacing+icon_height+lv_height);
	
	var server = $("#adm_server").val() ? (($("#adm_server option:selected").text()).split("　"))[1] : "Unknown Server";
	context.font = "bold "+server_height+"px serif";
	context.fillText(server, starting_x, starting_y+spacing+icon_height+spacing+lv_height+spacing);

}

function drawResourcesSection()
{
	starting_y = 42;
	starting_x = 310;
	barLength = 200;
	barHeight = 15;
	space_betweenBar = 25;
	
	var context = canvasObj.context;
	context.strokeStyle = "black";
	context.lineWidth = 1;
	
	var fuel = canvasObj.Resources[0];
	var ammo = canvasObj.Resources[1];
	var steel = canvasObj.Resources[2];
	var bauxite = canvasObj.Resources[3];
	var bucket = canvasObj.Resources[4];
	
	var fuelGradient = context.createLinearGradient(starting_x, 0, starting_x+barLength, 0);
	fuelGradient.addColorStop(0, 'red');
	fuelGradient.addColorStop(fuel.low/parseFloat(fuel.maxium), 'yellow');
	fuelGradient.addColorStop(fuel.sufficient/parseFloat(fuel.maxium), 'palegreen');
	fuelGradient.addColorStop(1, 'green');
	
	var ammoGradient = context.createLinearGradient(starting_x, 0, starting_x+barLength, 0);
	ammoGradient.addColorStop(0, 'red');
	ammoGradient.addColorStop(ammo.low/parseFloat(ammo.maxium), 'yellow');
	ammoGradient.addColorStop(ammo.sufficient/parseFloat(ammo.maxium), 'palegreen');
	ammoGradient.addColorStop(1, 'green');
	
	var steelGradient = context.createLinearGradient(starting_x, 0, starting_x+barLength, 0);
	steelGradient.addColorStop(0, 'red');
	steelGradient.addColorStop(steel.low/parseFloat(steel.maxium), 'yellow');
	steelGradient.addColorStop(steel.sufficient/parseFloat(steel.maxium), 'palegreen');
	steelGradient.addColorStop(1, 'green');
	
	var bauxiteGradient = context.createLinearGradient(starting_x, 0, starting_x+barLength, 0);
	bauxiteGradient.addColorStop(0, 'red');
	bauxiteGradient.addColorStop(bauxite.low/parseFloat(bauxite.maxium), 'yellow');
	bauxiteGradient.addColorStop(bauxite.sufficient/parseFloat(bauxite.maxium), 'palegreen');
	bauxiteGradient.addColorStop(1, 'green');
	
	var bucketGradient = context.createLinearGradient(starting_x, 0, starting_x+barLength, 0);
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
		drawing.customData = {x:(starting_x-25),y:starting_y};
		drawing.onload = function() {
			context.drawImage(this,this.customData.x, this.customData.y);
		};
		
		currentRes = canvasObj.Resources[i];
		currentResArr[i] = (currentResArr[i] > currentRes.maxium) ? currentRes.maxium : currentResArr[i];
		
		
		var barPgoress = Math.ceil(barLength*(currentResArr[i]/parseFloat(currentRes.maxium)));
		context.fillStyle = gradientArr[i];
		context.fillRect(starting_x, starting_y, barPgoress, barHeight);
		context.strokeRect(starting_x, starting_y, barLength, barHeight);
		
		var lowIndicator = Math.ceil(barLength*(currentRes.low/parseFloat(currentRes.maxium)));
		var sufficientIndicator = Math.ceil(barLength*(currentRes.low/parseFloat(currentRes.sufficient)));
		
		context.beginPath();
		context.moveTo(starting_x-0.5+lowIndicator,starting_y-4);
		context.lineTo(starting_x-0.5+lowIndicator,starting_y+19);
		context.stroke();
		
		
		context.beginPath();
		context.moveTo(starting_x-0.5+sufficientIndicator,starting_y-4);
		context.lineTo(starting_x-0.5+sufficientIndicator,starting_y+19);
		context.stroke();
		
		
		context.font = "bold 12px serif";
		context.fillStyle = "black";
		context.fillText(currentResArr[i], starting_x+barLength-50, starting_y+12);
		
		context.font = "bold 10px serif";
		context.fillStyle = "black";
		context.fillText("Low", starting_x+lowIndicator-7, starting_y-5);
		context.fillText("Sufficient", starting_x+sufficientIndicator-10, starting_y-5);
		
		context.font = "bold 12px serif";
		if(currentResArr[i] < currentRes.low)
		{
			context.fillStyle = "red";
			context.fillText("×", starting_x+barLength+5, starting_y+barHeight-3);
		}
		else if(currentResArr[i] < currentRes.sufficient)
		{
			context.fillStyle = "orange";
			context.fillText("✓", starting_x+barLength+5, starting_y+barHeight-3);
		}
		else
		{
			context.fillStyle = "green";
			context.fillText("✓✓", starting_x+barLength+5, starting_y+barHeight-3);
		}
		starting_y+=(barHeight+space_betweenBar);
	}
	
	
}
