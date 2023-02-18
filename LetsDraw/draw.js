const canvas = document.querySelector("canvas"),
toolBtns = document.querySelectorAll(".tool"),
fillColor = document.querySelector("#fill-color"),
sizeSlider = document.querySelector("#size-slider"),
colorBtns = document.querySelectorAll(".colors .option"),
colorPicker = document.querySelector("#color-picker"),
clearCanvas = document.querySelector(".clear-canvas"),
saveImg = document.querySelector(".save-img"),
ctx = canvas.getContext("2d"); //getcontext() method returns drawing context on canvas

//global variables and default value
let prevMouseX,prevMouseY,snapshot,
isDrawing=false;
selectedTool="brush";
brushWidth=2;
selectedColor="#000";

const setCanvasBackground = ()=>{
    ctx.fillStyle="#fff";
    ctx.fillRect(0,0,canvas.width,canvas.height);
    ctx.fillStyle=selectedColor;   //setting fillstyle back to the selectedcolor,it'll be the brush color
}

window.addEventListener("load", () =>{
    //setting canvas width and height offsetwidth /height returns viewable width/height of element
    canvas.width=canvas.offsetWidth;
    canvas.height=canvas.offsetHeight;
    setCanvasBackground();
});

const drawRect =(e) => {
    //if color isnt checked draw a rectangle
    if(!fillColor.checked){
       //strokeRect(x-coord,y-coord,width,height)
        return ctx.strokeRect(e.offsetX, e.offsetY,prevMouseX-e.offsetX,prevMouseY-e.offsetY);   //creating circle acc to mouse pointer
    }
    ctx.fillRect(e.offsetX, e.offsetY,prevMouseX-e.offsetX,prevMouseY-e.offsetY);
}

const drawCircle=(e)=>{
    ctx.beginPath();   //creating new path to draw circle
    //getting radius for circle acc to mouse pointer
    let radius = Math.sqrt(Math.pow((prevMouseX - e.offsetX),2)+Math.pow((prevMouseY - e.offsetY),2));
    //ctx.arc(x-coord,y-coord,radius,startangle,endangle)
    ctx.arc(prevMouseX,prevMouseY,radius,0, 2*Math.PI);   
    fillColor.checked ? ctx.fill() : ctx.stroke();
}

const drawTriangle=(e)=>{
    ctx.beginPath();
    ctx.moveTo(prevMouseX,prevMouseY);    //moving triangle to mouse pointer
    ctx.lineTo(e.offsetX,e.offsetY); //creating 1st line acc to mouse 
    ctx.lineTo(prevMouseX*2-e.offsetX,e.offsetY); //creating bottom line of triangle
    ctx.closePath(); //closing path of triangle so the third line draw automatically
    fillColor.checked ? ctx.fill() : ctx.stroke();
}

const startDraw = (e) =>{
    isDrawing= true;
    prevMouseX=e.offsetX;  //passing current mousex position as prevmousex value
    prevMouseY=e.offsetY;    //passing current mousey position as prevmousey value
    ctx.beginPath();      //creating new pathto draw
    ctx.lineWidth = brushWidth;     //passing brush size as line width
    ctx.strokeStyle = selectedColor;     //passing seected colors stroke style
    ctx.fillStyle = selectedColor;       //passing selected colors as fill style
    snapshot=ctx.getImageData(0,0,canvas.width,canvas.height);       //copying data as snapshot value ,this avoid dragging the image
}

const drawing = (e) =>{
    if(!isDrawing) return;     //if isdrawing is false return here
    ctx.putImageData(snapshot,0,0);      //adding copied canvas on this canvas

    if(selectedTool === "brush"|| selectedTool === "eraser") {
        //if selected tool is eraser set strokestyle to white
        //to paint white color on to the existing canvas else set the stoke color to selected color
        ctx.strokeStyle = selectedTool === "eraser" ? "#fff" : selectedColor;
        ctx.lineTo(e.offsetX, e.offsetY);    //creating line acc to mouse pointer
        ctx.stroke();    //drawing line with color
    }
    else if(selectedTool === "rectangle"){
        drawRect(e);
    }
    else if(selectedTool === "circle"){
        drawCircle(e);
    }
    else{
        drawTriangle(e);
    };
}

toolBtns.forEach(btn =>{
    btn.addEventListener("click",()=>{
        //adding click event to all tool option
        document.querySelector(".options .active").classList.remove("active");       //removing active class from the previous option and setting current clicked option
        btn.classList.add("active");
        selectedTool = btn.id;
        console.log(selectedTool);
        
    })
});

colorBtns.forEach(btn => {
    btn.addEventListener("click",() =>{
        //adding click event to all colorbutton 
        document.querySelector(".options .selected").classList.remove("selected");       //removing active class from the previous option and setting current clicked option
        btn.classList.add("selected");
        //passing selected btn background color as selected color value
        selectedColor = window.getComputedStyle(btn).getPropertyValue("background-color");
    });
});

sizeSlider.addEventListener("change",()=>brushWidth =sizeSlider.value);  //passing slider value as brushsize

colorPicker.addEventListener("change",()=>{
    //passing picked color value from color picker to last color btn background
    colorPicker.parentElement.style.background = colorPicker.value;
    colorPicker.parentElement.click();
});

clearCanvas.addEventListener("click",() => {
    ctx.clearRect(0,0,canvas.width,canvas.height); //clears whole canvas
    setCanvasBackground();
});

saveImg.addEventListener("click",()=>{
    const link = document.createElement("a"); // creating <a> element
    link.download = `${Date.now()}.jpg`;    //passing curr date as link downlaod value
    link.href = canvas.toDataURL(); //canvas.toDataURL() method return a data url ofimg
    link.click(); //clicking link for download img
});

canvas.addEventListener("mousedown",startDraw);
canvas.addEventListener("mousemove",drawing);
canvas.addEventListener("mouseup",() => isDrawing = false);