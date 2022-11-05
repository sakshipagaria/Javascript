const carousel = document.querySelector(".carousel"),
firstImg= carousel.querySelectorAll("img")[0],
arrowIcons= document.querySelectorAll(".wrapper i");

let isDragStart = false,isDragging = false,prevPageX,prevScrollLeft,positionDiff;

const showHideIcons = () =>{
    //showing and hiding prev/next icons acc to carousel scroll lwidtheft value
    let scrollWidth = carousel.scrollWidth - carousel.clientWidth ;    //getting max scrollable 
    arrowIcons[0].style.display = carousel.scrollLeft == 0 ? "none" :"block";
    arrowIcons[1].style.display = carousel.scrollLeft == scrollWidth ? "none" :"block";

}

arrowIcons.forEach (icon =>{
    icon.addEventListener('click',()=>{
        let firstImgWidth = firstImg.clientWidth + 14;        //getting first img width and 14 margin 
        //console.log(icon);
        carousel.scrollLeft += icon.id =="left" ? -firstImgWidth :firstImgWidth;
        setTimeout(() => showHideIcons(),60);            //calling showhidden icons after 60s
    });
});

const autoSlide = () =>{
    if(carousel.scrollLeft == (carousel.scrollWidth - carousel.clientWidth )) return;      //if there is no image left to scroll then return from here

    positionDiff=Math.abs(positionDiff);     //mking positionDiff value to positive
    let firstImgWidth = firstImg.clientWidth + 14;
    //getting diff value that needs to add or reduce from carousel left to take middle img center
    let valDifference = firstImgWidth - positionDiff;

    if(carousel.scrollLeft > prevScrollLeft){
        //if the user is scrolling to right
        return carousel.scrollLeft += positionDiff > firstImgWidth / 3 ? valDifference : -positionDiff;
    } 
    //if the user is scrolling tot he left
    carousel.scrollLeft -= positionDiff > firstImgWidth / 3 ? valDifference : -positionDiff;
}

const dragStart = (e) => {
    //updating global varibales value on mouse down event
    isDragStart = true;
    prevPageX = e.pageX || e.touches[0].pageX;                         //e.pageX will run on desktop and touch devices touched.pageX will run
    prevScrollLeft = carousel.scrollLeft;
}

const dragging = (e) => {
    //console.log(e.pageX); -page X returns the horizontal cordinators of mouse pointer
    if(!isDragStart) return;
    e.preventDefault();     //due to this img wont be dragged automatically
    isDragging = true;
    carousel.classList.add("dragging");
    positionDiff = (e.pageX || e.touches[0].pageX)- prevPageX;              //scrolling imgs to left scrolling to mouse pointer
    carousel.scrollLeft = prevScrollLeft-positionDiff;       //scrollleft set or return no. of pixel an elemnts content iśscrolled is crolled horizontally
    showHideIcons();
}

const dragStop = () =>{
    isDragStart = false;
    carousel.classList.remove("dragging");

    if(isDragging)return;
    isDragging =false;
    autoSlide();
}

carousel.addEventListener("mousedown",dragStart);
carousel.addEventListener("touchstart",dragStart);

carousel.addEventListener("mousemove",dragging);
carousel.addEventListener("touchmove",dragging);

carousel.addEventListener("mouseup",dragStop);
carousel.addEventListener("mouseleave",dragStop);
carousel.addEventListener("touchleave",dragStop);