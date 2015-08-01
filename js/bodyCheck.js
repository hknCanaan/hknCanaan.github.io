function init(canvasID){
	var canvas = {};
	canvas.ID = canvasID;
	var canvas = document.getElementById(canvas.ID);
      	var context = canvas.getContext('2d');
	
	context.stroke = "black"; 
	context .lineWidth = 1;
	context.strokeRect(0, 0, 600, 250);
	
	
	context.strokeRect(0, 0, 200, 15);
	context.strokeRect(0, 20, 200, 15);
	context.strokeRect(0, 40, 200, 15);
	context.strokeRect(0, 60, 200, 15);
	initResourcesSection(context);
}

function intitAdmiralInfoSection(context)
{
	
}

function initResourcesSection(context)
{
	

	
}
