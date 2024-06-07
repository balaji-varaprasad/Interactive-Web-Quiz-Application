const questions=[
    {
       question: "What is the colour of apple?",
       answers:[
        {text:"Green",correct:"false"},
        {text:"Orange",correct:"false"},
        {text:"Red",correct:"true"},
        {text:"Yellow",correct:"false"}
       ],
       timer:10
    },
    {
        question: "When is the independence day?",
        answers:[
         {text:"13th August",correct:"false"},
         {text:"14th August",correct:"false"},
         {text:"15th August",correct:"true"},
         {text:"16th August",correct:"false"}
        ],
        timer:10
    },
    {
        question: "Which is the largest animal in the world?",
        answers:[
         {text:"Bluewhale",correct:"true"},
         {text:"Shark",correct:"false"},
         {text:"Elephant",correct:"false"},
         {text:"Giraffe",correct:"false"}
        ],
        timer:10
    }
];
const questionElement=document.getElementById("question");
const answerButton=document.getElementById("answer-buttons");
const nextBtn=document.getElementById("next-btn");
const timerElement = document.getElementById("timer");
const countdownElement = document.getElementById("countdown");

let currIndex=0;
let score=0;
let countdown;
function startQuiz(){
    currIndex=0;
    score=0;
    timerElement.style.display = "block";
    nextBtn.innerHTML="Next";
    showQuestion();
}
let interval;
function startCountdown() {
    countdownElement.textContent = countdown; // Display initial countdown value

    interval = setInterval(() => {
        countdown--; // Decrease countdown value
        countdownElement.textContent = countdown; // Update countdown display
        if (countdown <= 0) {
            clearInterval(interval); // Clear the interval when countdown reaches 0
            handleNextBtn(); // Move to the next question automatically when time runs out
        }
    }, 1000); // Update countdown every 1 second (1000 milliseconds)
}
function showQuestion(){
    resetState();
    let currQuestion=questions[currIndex];
    countdown = currQuestion.timer; 
    startCountdown();
    let questionNo=currIndex+1;
    questionElement.innerHTML=questionNo+". "+currQuestion.question;

    currQuestion.answers.forEach(answer =>{
       const button=document.createElement("button");
       button.innerHTML=answer.text;
       button.classList.add("button");
       answerButton.appendChild(button);  
       if(answer.correct){
        button.dataset.correct=answer.correct;
       } 
       button.addEventListener("click",selectAnswer);
    });
}


function resetState(){
    nextBtn.style.display="none";
    while(answerButton.firstChild){
        answerButton.removeChild(answerButton.firstChild);
    }
}
function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButton.children).forEach(button =>{
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled=true;
    });
    clearInterval(interval);
    nextBtn.style.display="block";
}
function showScore(){
     resetState();
     timerElement.style.display = "none";
     questionElement.innerHTML=`You scored ${score} out of ${questions.length}!`;
     nextBtn.innerHTML="Play Again";
     nextBtn.style.display="block";
}
function handleNextBtn(){
    currIndex++;
    if(currIndex<questions.length){
        showQuestion();
    }else{
        showScore();
    }
}
nextBtn.addEventListener("click",()=>{
    if(currIndex<questions.length){
        handleNextBtn();
    }else{
        startQuiz();
        
    }
})
startQuiz();