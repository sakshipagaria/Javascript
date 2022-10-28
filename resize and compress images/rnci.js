const uploadBox = document.querySelector(".upload-box"),
previewImg = uploadBox.querySelector("img"),
fileInput = uploadBox.querySelector("input");
widthInput = document.querySelector(".width input");
heightInput = document.querySelector(".height input");
ratioInput = document.querySelector(".ratio input");
quaInput = document.querySelector(".quality");
downloadBtn = document.querySelector(".download-btn");

let ogImageRatio;

const loadFile = (e) => {
    const file = e.target.files[0];  //getting first user selected file
    if(!file) return;  //return if user hasnt selected any file
    previewImg.src=URL.createObjectURL(file);      //passing selected file url to preview img src
    previewImg.addEventListener("load",() => {
        widthInput.value = previewImg.naturalWidth;
        heightInput.value = previewImg.naturalHeight;
        ogImageRatio = previewImg.naturalWidth / previewImg.naturalHeight;
        document.querySelector(".wrapper").classList.add("active")
    });
    //console.log(file);
}
widthInput.addEventListener("keyup",() =>{
    const height=ratioInput.checked ? widthInput.value / ogImageRatio : widthInput.value;     //getting width according to the ratio checkbox status
    heightInput.value=Math.floor(height);   //math.floor rounds number down to the nearest interger
});

heightInput.addEventListener("keyup",() =>{
    const width=ratioInput.checked ? heightInput.value * ogImageRatio : heightInput.value;     //getting height according to the ratio checkbox status
    widthInput.value=Math.floor(width);   //math.floor rounds number down to the nearest interger
});

const resizeAndDownload =()=>{
    const canvas = document.createElement("canvas");
    const a = document.createElement("a");
    const ctx = canvas.getContext("2d");      //getcontext method returns a drawing context on the canvas 

    //if quality checkbox is checked pass 0.7 to imgQuality else pas 1.0
    //1.0 is 100% quality where 0.7 is 70% 0f total .you can pass from 0.1-1.0
    const imgQuality = quaInput.checked ? 0.7 : 1.0;

    //setting canvas height and width according to the input values
    canvas.width = widthInput.value;
    canvas.height = heightInput.value;
    //drawing user selected img onto the canvas
    ctx.drawImage(previewImg,0,0,canvas.width,canvas.height);
    //document.body.appendChild(canvas);
    a.href=canvas.toDataURL("image/jpeg",imgQuality);
    a.download =  new Date().getTime();        //passing current time as download value
    a.click();            //clicking <a> element so the file downloads
}

downloadBtn.addEventListener("click",resizeAndDownload);
fileInput.addEventListener("change",loadFile);
uploadBox.addEventListener("click",() => fileInput.click());