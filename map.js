var main=document.getElementsByTagName("body")[0];
var mapFrame=document.getElementById("mapFrame");
var allFrame=document.getElementById("all");
var mapImage=document.createElement("img");
var right_button=document.getElementById("right");
var left_button=document.getElementById("left");
var top_button=document.getElementById("top");
var down_button=document.getElementById("bottom");
var plus_button=document.getElementById("plus");
var minus_button=document.getElementById("minus");

var counter=1;
var imageArray=new Array();
var photoArray=["map-s.gif","map-m.gif","map-l.gif","map-xl.gif"];
var dynamic_width,dynamic_height;
var isDragging=false;
var original_x=0,original_y=0,new_x,new_y,init_left_margin,init_top_margin;
var x_point,y_point;
var left_margin,top_margin;
mapFrame.style.cursor="context-menu";

//Preloading
for(var i=0;i<photoArray.length;i++){
	imageArray[i]=new Image();
	imageArray[i].src=photoArray[i];
}

function default_view(){
	
	mapImage.src=photoArray[1];
	mapFrame.style.position="absolute";
	mapImage.style.position="absolute";
	console.log(mapFrame.clientWidth);
	console.log(mapImage.width);
	console.log(mapImage.height);
	console.log(mapImage.style.left);
	console.log(mapImage.style.top);
	dynamic_width=(window.innerWidth-140);
	dynamic_height=(window.innerHeight-30);
	console.log(mapFrame.clientWidth);
	mapFrame.style.width=dynamic_width+"px";
	mapFrame.style.height=dynamic_height+"px"
	mapImage.style.left=(mapFrame.clientWidth/2)-(mapImage.width/2)+"px";
	mapImage.style.top=(mapFrame.clientHeight/2)-(mapImage.height/2)+"px";
	x_point=(mapFrame.clientWidth/2);
	y_point=(mapFrame.clientHeight/2);
	original_x=parseInt(mapFrame.clientWidth/2);
	original_y=parseInt(mapFrame.clientHeight/2);
	init_left_margin=parseInt(mapImage.style.left);
	init_top_margin=parseInt(mapImage.style.top);
	console.log(mapImage.style.left);
	console.log(mapImage.style.top);
	console.log(mapFrame.style.left);
	console.log(mapFrame.style.top);
	
}
function resizeFrame(){
	dynamic_width=(window.innerWidth-140);
	dynamic_height=(window.innerHeight-30);
	mapFrame.style.width=dynamic_width+"px";
	mapFrame.style.height=dynamic_height+"px"
}

function inFrame(x,y){
	
	return (x >= 14 && x <= mapFrame.clientWidth +14
				&& y >= 14 && y <= mapFrame.clientHeight+ 14 );
}

function handleMouseDown(event){
	if (inFrame(event.clientX,event.clientY)) {
		isDragging = true;
		event.preventDefault();
		original_x=event.clientX;
		original_y=event.clientY;
		console.log(original_x);
		console.log(original_y);
		return false;	// don't forget this line or some versions of Firefox will get in trouble when dragging
	}
}
function handleMouseUp(event){
	if (isDragging) {
		init_left_margin=parseInt(mapImage.style.left);
		init_top_margin=parseInt(mapImage.style.top);
		console.log(init_left_margin);
		console.log(init_top_margin);
		mapFrame.style.cursor="context-menu";
		isDragging = false;
		
	}
}
function handleMouseMove(event){
	if (isDragging) {
		mapFrame.style.cursor="move";
		new_x=event.clientX-original_x;
		new_y=event.clientY-original_y;
		console.log(new_x);
		console.log(new_y);
		console.log("event"+event.clientX);
		console.log("eventY"+event.clientY);
		mapImage.style.left = new_x + init_left_margin+ "px";
		mapImage.style.top = new_y + init_top_margin+"px";
		return false;  // don't forget this line or some versions of IE won't allow dragging;
		
	}
	
}

function handleDblClick(event){
	
	console.log("In double click");
	console.log("X:"+ event.clientX);
	console.log("Y:"+event.clientY);
	if(inFrame(event.clientX,event.clientY))
	{
		console.log("In side frame");
		console.log("In 1st quad");
		mapImage.style.left=(mapFrame.clientWidth/2 - event.clientX ) + parseInt(mapImage.style.left) + "px";
		mapImage.style.top=(mapFrame.clientHeight/2 - event.clientY) + parseInt(mapImage.style.top) + "px";
		flag=1;
		init_left_margin=parseInt(mapImage.style.left);
		init_top_margin=parseInt(mapImage.style.top);
		console.log("Moved");
		console.log("New left:"+ mapImage.style.left);
		console.log("New Top:"+ mapImage.style.top);
		left_margin=mapImage.style.left;
		top_margin=mapImage.style.top;
		x_point=(mapFrame.clientWidth/2);
		y_point=(mapFrame.clientHeight/2);
		console.log(mapFrame.clientWidth/2);
		console.log(mapFrame.clientHeight/2);
		console.log(x_point);
		console.log(y_point);
	}
}

function zoomIn(){
	console.log("In");
	var width_multiplier,height_multiplier,old_width,old_height,new_height,new_width=0;
	counter++;
	if(counter<4)
	{
		console.log("old:"+mapImage.width);
		old_width=mapImage.width;
		old_height=mapImage.height;
		mapImage.src=photoArray[counter];
		new_width=mapImage.width;
		new_height=mapImage.height;
		width_multiplier=new_width/old_width;
		height_multiplier=new_height/old_height;
		console.log("new:"+mapImage.width);
	}
	else{
		counter=3;
	}

	console.log("Large-left:"+mapImage.style.left);
	console.log("Large-top:"+mapImage.style.top);	
	mapImage.style.left=(mapFrame.clientWidth/2 - (x_point*width_multiplier)) + (parseInt(mapImage.style.left)*width_multiplier)  + "px";
	mapImage.style.top=(mapFrame.clientHeight/2 - (y_point*height_multiplier)) + (parseInt(mapImage.style.top)*height_multiplier)  + "px";
	init_left_margin=parseInt(mapImage.style.left);
	init_top_margin=parseInt(mapImage.style.top);
	console.log("Large-left:"+mapImage.style.left);
	console.log("Large-top:"+mapImage.style.top);	
}

function zoomOut(){
	console.log("Out");
	counter--;
	var width_multiplier,height_multiplier,old_width,old_height,new_height,new_width=0;
	if(counter<=-1){
		counter=0;
		console.log("Reset");
	}
	else{
		console.log("old:"+mapImage.width);
		old_width=mapImage.width;
		old_height=mapImage.height;
		mapImage.src=photoArray[counter];
		new_width=mapImage.width;
		new_height=mapImage.height;
		width_multiplier=new_width/old_width;
		height_multiplier=new_height/old_height;
		console.log("new:"+mapImage.width);
	}
	
	mapImage.style.left=(mapFrame.clientWidth/2 - (x_point*width_multiplier)) + (parseInt(mapImage.style.left)*width_multiplier)  + "px";
	mapImage.style.top=(mapFrame.clientHeight/2 - (y_point*height_multiplier)) + (parseInt(mapImage.style.top)*height_multiplier) + "px";
	init_left_margin=parseInt(mapImage.style.left);
	init_top_margin=parseInt(mapImage.style.top);	
}
function forward_move()
{
	mapImage.style.left=parseInt(mapImage.style.left)-(parseInt(mapFrame.clientWidth/2))+"px";
	console.log(mapImage.style.left);	
	console.log("in forward");
	init_left_margin=parseInt(mapImage.style.left);
	init_top_margin=parseInt(mapImage.style.top);
}

function backward_move()
{
	console.log("back");
	mapImage.style.left=parseInt(mapImage.style.left)+(parseInt(mapFrame.clientWidth/2))+"px";
	init_left_margin=parseInt(mapImage.style.left);
	init_top_margin=parseInt(mapImage.style.top);
	console.log(mapImage.style.left);
}

function upward_move()
{
	mapImage.style.top=parseInt(mapImage.style.top)+(parseInt(mapFrame.clientHeight/2))+"px";
	console.log(mapFrame.clientHeight/2);
	console("In top");
	console.log(mapImage.style.top);
	init_left_margin=parseInt(mapImage.style.left);
	init_top_margin=parseInt(mapImage.style.top);
}

function downward_move(){
	mapImage.style.top=parseInt(mapImage.style.top)-(parseInt(mapFrame.clientHeight/2))+"px";
	init_left_margin=parseInt(mapImage.style.left);
	init_top_margin=parseInt(mapImage.style.top);
	console.log("in Down");
	console.log(mapImage.style.top);
	
}

//Appends
mapFrame.appendChild(mapImage);
main.appendChild(mapFrame);

//Event Listeners
window.addEventListener("load",default_view,false);
window.addEventListener("resize",resizeFrame,false);
document.addEventListener("mousemove",handleMouseMove,false);
document.addEventListener("mousedown",handleMouseDown,false);
document.addEventListener("mouseup",handleMouseUp,false);
document.addEventListener("dblclick",handleDblClick,false);
right_button.addEventListener("click",forward_move,false);
left_button.addEventListener("click",backward_move,false);
top_button.addEventListener("click",upward_move,false);
down_button.addEventListener("click",downward_move,false);
plus_button.addEventListener("click",zoomIn,false);
minus_button.addEventListener("click",zoomOut,false);

