//get all quotes
const quotes = [
    {
        quote:"Code never lies,comments sometimes do",
        author:"Ron Jeffries"
    },
    {
        quote:"Out of sight, out of Mind",
        author:"anonymous"
    },
    {
        quote:"Code is like humor , when you have to explain it ,its bad",
        author:"Cory house"
    },
    {
        quote:"If you can't deploy your services independently then they are not microservice",
        author:"Daniel Bryant"
    },
];

//button generator
const btn=document.querySelector('.generator');

//add even listener
btn.addEventListener('click',() =>{
    //get random text of quotes
    let random=Math.floor(Math.random() * quotes.length);
    //console.log(random);
    //now show text on screen
    document.querySelector('.quote').innerText = quotes[random].quote;
    document.querySelector('.author').innerText = quotes[random].author;


});