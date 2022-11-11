const cards = document.querySelectorAll(".card");

let matchedCard = 0;
let cardOne , cardTwo;
let disableDeck = false;


function flipCard(e){
    //console.log(e.target);
    let clickedCard = e.target;            //getting user clicked card
    if(clickedCard !== cardOne && !disableDeck){
        clickedCard.classList.add("flip");
        if(!cardOne){
            return cardOne = clickedCard;         //return card1 value to clicked card
        }
        cardTwo = clickedCard;
        //console.log(cardOne,cardTwo);
        disableDeck=true;
        let cardOneImg = cardOne.querySelector("img").src,
        cardTwoImg = cardTwo.querySelector("img").src;
        matchCards(cardOneImg,cardTwoImg);
    }   
}

function matchCards(img1,img2){
    //console.log(img1,img2);
    if(img1 === img2){
        matchedCard++;    //increment match cards value by 1

        if(matchedCard == 8){
            //if matched value is 8 that means user has matched all the cards(8*2=16)
           setTimeout(()=>{
            return shuffleCard();
           },1000); 
        }
        cardOne.removeEventListener("click",flipCard);
        cardTwo.removeEventListener("click",flipCard);
        cardOne = cardTwo ="";     //setting both card values to blank
        return disableDeck=false;
    }
    setTimeout(()=>{ 
        //adding shake class to both after 200ms
        cardOne.classList.add("shake");
        cardTwo.classList.add("shake");
    },200);
    setTimeout(()=>{ 
        //removing and adding shake & flip classes to both after 1s
        cardOne.classList.remove("shake","flip");
        cardTwo.classList.remove("shake","flip");
        cardOne = cardTwo ="";     //setting both card values to blank
        disableDeck=false;
    },1000);

}

function shuffleCard(){
    matchedCard = 0;
    cardOne = cardTwo = "";
    disableDeck = false;
    let arr=[1,2,3,4,5,6,7,8,1,2,3,4,5,6,7,8];
    arr.sort(()=>Math.random()>0.5 ? 1:-1);        //sorting array item randomly

    //removing flip class from each card and passing random image to each card
    cards.forEach((card,index) => {
        //console.log(card);
        card.classList.remove("flip");
        let imgTag = card.querySelector("img");
        imgTag.src = `gems/img-${arr[index]}.png`;
        card.addEventListener("click",flipCard);
    });
}
shuffleCard();

cards.forEach(card => {
    //console.log(card);
    card.addEventListener("click",flipCard);   //adding click event to all cards
});