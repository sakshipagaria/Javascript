const quizData=[

    {
        question:"What's my Birth date? (easy peasy:p)",
        a:"17th June",
        b:"25th September",
        c:"3rd March",
        d:"29th December",
        correct:"c",
    },
    {
        question:"Which one do i prefer?",
        a:"Coffee",
        b:"Chai",
        c:"bournvita",
        d:"hot chocolate",
        correct:"a",
    },
    {
        question:"What would i love to vist?",
        a:"Mountains",
        b:"Beaches",
        c:"Deserts",
        d:"All of the above",
        correct:"b",
    },
    {
        question:"What do i use the most?",
        a:"Instagram",
        b:"Twitter",
        c:"Snapchat",
        d:"Pinterest",
        correct:"b",
    },
    {
        question:"What's my height?",
        a:"5'5",
        b:"5'6",
        c:"5'7",
        d:"5'8",
        correct:"c",
    },
    {
        question:"What is my biggest fear? ",
        a:"height",
        b:"water",
        c:"Lizards",
        d:"humans",
        correct:"c",
    },
    {
        question:"What's my fav food?",
        a:"Samosa",
        b:"Dabeli",
        c:"Dosa",
        d:"All above",
        correct:"d",
    },
    {
        question:"Which one is my Favorite?",
        a:"Munch",
        b:"Kitkat",
        c:"Cadbury",
        d:"5star",
        correct:"b",
    }
];
const quiz = document.getElementById('quiz')
const answerEl = document.querySelectorAll('.answer')
const question = document.getElementById('question')
const a_text = document.getElementById('a_text')
const b_text = document.getElementById('b_text')
const c_text = document.getElementById('c_text')
const d_text = document.getElementById('d_text')
const submitbtn = document.getElementById('submit')

let currentQuiz = 0
let score = 0

loadQuiz()
function loadQuiz(){
    deselectAnswers()
    const currentQuizData = quizData[currentQuiz]

    question.innerText = currentQuizData.question
    a_text.innerText = currentQuizData.a
    b_text.innerText = currentQuizData.b
    c_text.innerText = currentQuizData.c
    d_text.innerText = currentQuizData.d
}
function deselectAnswers(){
    Array.from(answerEl).forEach(answer => answer.checked = false)
}
function getSelected() {
    let answer
    Array.from(answerEl).forEach(function (answerEl) {
            if (answerEl.checked) {
                answer = answerEl.id;
            }
        });
    return answer
}
submitbtn.addEventListener('click',() =>{
    const answerEl = getSelected()
    if(answerEl){
        if (answerEl === quizData[currentQuiz].correct){
            score++
        }
        currentQuiz++
        if(currentQuiz < quizData.length){
            loadQuiz()
        }
        else{
            quiz.innerHTML =
            `<h2>You answered ${score}/${quizData.length} questions correctly</h2>
            <p>Whatever the results maybe ,just remember that I'll be there for you!<br><span>xoxo</span></p>
            <button onclick = "location.reload()">Reload</button>`
        }
    }
})