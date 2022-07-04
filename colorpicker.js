//get value
document.querySelectorAll('input[type=color]').forEach(function(picker){
    //target point
    var targetLabel = document.querySelector('label[for="'+ picker.id+'"]'),
        colorArea = document.createElement(span);

    colorArea.innerHTML = picker.value;
    targetLabel.appendChild(colorArea);

    //now addeventlistener
    picker.addEventListener('change',function(){
        colorArea.innerHMTL = picker.value;
        targetLabel.appendChild(colorArea);
    });
});