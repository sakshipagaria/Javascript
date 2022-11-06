const wrapper = document.querySelector(".wrapper"),
inputPart = wrapper.querySelector(".input-part"),
infoText = inputPart.querySelector(".info-txt"),
inputField = inputPart.querySelector("input"),
locationbtn = inputPart.querySelector("button"),
wIcon = document.querySelector(".weather-part img"),
arrowBk = wrapper.querySelector("header i");

let api;

inputField.addEventListener("keyup", e =>{
    //if enter btn is pressed and input value is not empty
    if(e.key == "Enter" && inputField.value !=""){
        //console.log("Hello");
        requestApi(inputField.value);
    }
});

locationbtn.addEventListener("click",()=>{
    if(navigator.geolocation){      
        //if browser supports geolocation api
        navigator.geolocation.getCurrentPosition(onSuccess , onError);
    }
    else{
        alert("Your browser does not support api")
    }
});

function onSuccess(position){
    //console.log(position);
    const {latitude,longitude} = position.coords                //getting lat lon of user device from coords obj
    api=`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=022e7685dedd30f57b498531c4871673`;
    fetchData();
}

function onError(error){
    //console.log(error);
    infoText.innerText =error.message;
    infoText.classList.add("error");
}

function requestApi(city){
    //console.log(city);
    api =`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=022e7685dedd30f57b498531c4871673`;
    fetchData();
}

function fetchData(){
    infoText.innerText = "Getting weather details..";
    infoText.classList.add("pending");
    //getting api response and returning 10 with parsing into js obj and in another then function calling weatherDetails function with passing api result as an argument
    fetch(api).then(response => response.json()).then(result => weatherDetails(result));
}
function weatherDetails(info){
    
    if(info.cod == "404"){
        infoText.innerText = `${inputField.value} isn't a valid city name`;
        infoText.classList.replace("pending","error");
    }
    else{
        //lets get required properties value from the info object
        const city = info.name;
        const country = info.sys.country;
        const {description , id } = info.weather[0];
        const {feels_like , humidity,temp } = info.main;

        if(id == 800){
            wIcon.src="static/day.svg";
        }
        else if(id >= 200 && id <= 232){
            wIcon.src="static/thunder.svg";
        }
        else if(id >= 600 && id <= 622){
            wIcon.src="static/snowy-3.svg";
        }
        else if(id >= 701 && id <= 781){
            wIcon.src="static/cloudy-day-2.svg";
        }
        else if(id >= 801 && id <= 804){
            wIcon.src="static/cloudy.svg";
        }
        else if((id >= 300 && id <= 321) || (id >=500 && id<=531)){
            wIcon.src="static/rainy-6.svg";
        }

        //lets pass these values to a particular html element
        wrapper.querySelector(".temp .num").innerText = Math.floor(temp);
        wrapper.querySelector(".weather").innerText = description;
        wrapper.querySelector(".location span").innerText =`${city}, ${country}`;
        wrapper.querySelector(".temp .num-2").innerText = Math.floor(feels_like);
        wrapper.querySelector(".humidity span").innerText = `${humidity}%` ;
        
        infoText.classList.remove("pending","error");
        wrapper.classList.add("active");
        console.log(info);
    }
}
arrowBk.addEventListener("click", () => {
    wrapper.classList.remove("active");
});