let spanCount = 0;
let count = 0;
let score = 0;
let isFirst = true;
let quizData;
let CorrectAnswer;

window.onload=intro;

function intro(){
    $('.intro').show();
    $('.question').hide();
    $('.evaluation').hide();
}

$(".introSubmit").click(function(event){
    console.log("test");
    event.preventDefault();
    spanCount++;
    $('.qCount').text(spanCount);
    formQuestion();
});

//https://stackoverflow.com/questions/45283149/jquery-button-click-does-not-work
$(document).on('click', '.questionSubmit', function(e){
   e.preventDefault();
   isFirst=true;

//    if (spanCount == 5){ 
//      showEvaluation();
//    }else{
    if($("p.quizBox").hasClass("correct") || $("p.quizBox").hasClass("incorrect")){
        if (spanCount == 5){ 
                showEvaluation();
        }else{
        spanCount++;
        $('.qCount').text(spanCount);
        buildQuiz(quizData);
        //getData();
        }
    }else{
        console.log("faaaalse");
        $("#danger-alert").fadeIn(500).delay(500).fadeOut(1000);
    }

});

$(document).on('click', '.quizBox' , function(e){
    e.preventDefault();
    let ansID= e.target.id;
    let text= e.target;
    console.log(ansID)

   checkAnswer(ansID,text);
 });

function checkAnswer(answer,text2){
  if(isFirst){
    if (answer == CorrectAnswer){
        console.log("true")
        $(text2).addClass("correct");
        score+=10;
        $('.scoreCount').text(score);
    }else{
        $(text2).addClass("incorrect");
        console.log("false");
    } 
}
isFirst= false;
}

function formQuestion(){
    // spanCount++;
    // $('.qCount').text(spanCount);
    displayQuestion();
}

function displayQuestion(){
    getData();
    $('.intro').hide();
    $('.question').show();
    $('.evaluation').hide();
}

function getData(){
    $.getJSON("https://raw.githubusercontent.com/ashwaqasiri/AJAX/master/data.json",function(data){
        buildQuiz(data);
    });
}

function buildQuiz(data){
    $('.question').html("");
    quizData = data;
    let qID,question_1,qAnswers;
    // for(let i=0;i<quizData.length;i++){
     qID = quizData[count].question_id;
     question_1= quizData[count].question;
     qAnswers = quizData[count].answers;
     CorrectAnswer = quizData[count].correct;
     displayQuiz(question_1,qAnswers);
   // }
}

function displayQuiz(question_1,qAnswers){
    $('.question').addClass("content_2");
    let qSection=`<h4>${question_1}</h4>`;
    $(qSection).appendTo($('.content_2'));
    //build answers
    for(i=0;i<qAnswers.length;i++){
      console.log(qAnswers[i].text)
      let content=`<div class="quizAns"><p class="quizBox" id="${qAnswers[i].id}">${qAnswers[i].text}</p></div>`
      $(content).appendTo($('.content_2'));
    }
    let bottom = `<button type="button" class='btn questionSubmit hvr-glow'>Next</button>`
    $(bottom).appendTo($('.content_2'));

    if (count == quizData.length -1 ) {
        console.log("submit");
        $(".questionSubmit").text("Submit");
    }
    count++;
}

function showEvaluation(){
    $('.evaluation').html("");
    $('.intro').hide();
    $('.question').hide();
    $('.evaluation').show();
    displayResult();
}

function displayResult(){
    $('.evaluation').addClass("content_2");
if(score<=20){
    let qSection=`<h4 class="pt-3">Your score is ${score}/50</h4>
    <p>Maths is'nt everything 😢</p>`; 
    $(qSection).appendTo($('.content_2'));
}else{
    let qSection=`<h4 class="pt-3">Good job!</br>Your score is ${score}/50</h4>
    <p>you're just a genius aren't you 🏅🌟</p>`; 
    $(qSection).appendTo($('.content_2'));
}
    
    let bottom = `<button type="button" class='btn evaluationSubmit hvr-glow'>Try again</button>`
    $(bottom).appendTo($('.content_2'));
}

$(document).on('click', '.evaluationSubmit', function(e){
    e.preventDefault();
    count=0;
    spanCount=0;
    score=0;
    $('.scoreCount').text(0);
    $('.qCount').text(0);
    $('.question').html("");

    intro();
})

/*
if ($('input[name="radioOption"]:checked').length < 1) {
    $('.questionSubmit').attr( "disabled", true);
}else{
    $('.questionSubmit').removeAttr("disabled");
}
-----------------------------------*/

/*function getData(){
    $.getJSON("https://raw.githubusercontent.com/ashwaqasiri/AJAX/master/data.json",function(data){

        /*correctAnswer= data[count].correct;
        // qID = data[count].question_id;
        console.log(correctAnswer);
        $('.question').addClass("content_2");
        var qSection=`<h4>${data[count].question}</h4>`;
        $(qSection).appendTo($('.content_2'));

        //build answers 
        for(i=0;i<data[count].answers.length;i++){
          console.log(data[count].answers[i].text)
          let content= `<div><p class="quizBox" id="${data[count].answers[i].id}">${data[count].answers[i].text}</p></div>`;
          $(content).appendTo($('.content_2'));
        }

        let bottom = `<button type="button" class='btn questionSubmit hvr-glow'>Next</button>`
        $(bottom).appendTo($('.content_2'))

        if (count == data.length -1 ) {
            console.log("submit");
            $(".questionSubmit").text("Submit");
        }
        count++; 
    });
}
}
*/
//if spanCount == 5 display evaluation info
//5- increase spanCount
//6- call the function to get a new question.
