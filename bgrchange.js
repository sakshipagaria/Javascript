//select 7color
let colors=['crimson','orange','yellow','blue','green','teal','purple','violet'];

//changes the background when clicked on button 
let button=document.getElementById('button');

button.addEventListener('click',function(){
    //select random no. from 0-7
    let index=parseInt((Math.random()*colors.length)+1);

    //grab the canvas
    let canvas=document.getElementById('canvas');

    canvas.style.background=`${colors[index]}`
})
