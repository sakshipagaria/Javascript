const pianoKeys = document.querySelectorAll('.piano-keys .key'),
volSlider = document.querySelector('.vol-slider input'),
keysCheckbox = document.querySelector('.keys-checkbox input');

let allKeys = [],
audio =new Audio("tunes/a.wav");  //by default ,audio src is "a" tune

const playTune = (key) => {
    audio.src = `tunes/${key}.wav`; //passing audio src based on key passed
    audio.play(); //playing audio
    console.log(allKeys);

    const clickedKey = document.querySelector(`[data-key="${key}"]`);  //getting clicked key element
    clickedKey.classList.add('active');         //adding active class to the clicked key element
    setTimeout(() => {
        //removing active class after 150ms from the clicked key element
        clickedKey.classList.remove('active');
    },150);
}

pianoKeys.forEach(key => {
    allKeys.push(key.dataset.key);
    //calling playtune functn with passing data-key value as an argument
    key.addEventListener("click",() => playTune(key.dataset.key));
    //console.log(key.dataset.key);
});

const pressedKey = (e) => {
    //if the pressed key is in the allkeys array ,only call the playtune fn
    if(allKeys.includes(e.key))playTune(e.key);
    //console.log(e);
}

const handleVolume =(e)=>{
    audio.volume=e.target.value;       //passing range slider as an audio vol
}

const showHideKeys =()=>{
    pianoKeys.forEach(key => key.classList.toggle("hide"));    //toggling hide class from each key on the checkbox click
}

volSlider.addEventListener('input',handleVolume);
keysCheckbox.addEventListener('click',showHideKeys);
document.addEventListener("keydown",pressedKey);
