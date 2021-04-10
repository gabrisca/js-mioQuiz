// var quiz = [
//   'Chi ha scoperto l\'america? A)Cristoforo Colombo, B)Vasco de Gama C)Magellano', 
//   'Quale pianeta è più vicino al sole? A) Giove, B) Mercurio, C) Giove', 
//   'Quanti sono gli stati membri dell\'unione europea?A)25, B)26, C)27',
//   'Chi ha scoperto l\'america? A)Cristoforo Colombo, B)Vasco de Gama C)Magellano', 
//   'Quale pianeta è più vicino al sole? A) Giove, B) Mercurio, C) Giove', 
//   'Quanti sono gli stati membri dell\'unione europea?A)25, B)26, C)27',
//   'Chi ha scoperto l\'america? A)Cristoforo Colombo, B)Vasco de Gama C)Magellano', 
//   'Quale pianeta è più vicino al sole? A) Giove, B) Mercurio, C) Giove', 
//   'Quanti sono gli stati membri dell\'unione europea?A)25, B)26, C)27',
//   'Quanti sono gli stati membri dell\'unione europea?A)25, B)26, C)27'
// ];

// var soluzioni = [
//   'a',
//   'b',
//   'c',
//   'a',
//   'b',
//   'c',
//   'a',
//   'b',
//   'c',
//   'c'
// ];

// var punteggio = 0;
// var risposta;

// for (var i = 0; i < quiz.length; i++){
//   risposta = prompt(quiz[i]).toLowerCase();
//   if(risposta == soluzioni [i]) {
//    punteggio++;
//    console.log('risposta corretta!');
//  }
//  else {
//    console.log('risposta errata');
//  }
// }

// console.log(punteggio);




// for(var i = 0; i < 5; i++){ // 5 tentativi
//   var indovina = prompt("In che anno ci fu la Rivoluzione Francese?");
//   if(indovina == "1789"){
//     console.log(prompt("Risposta esatta. Complimenti"))
//   } else {
//     console.log(prompt("Risposta sbagliata"))
//   }
// }


// function quiz() {
// var i = 0
// var total=document.forms.length-1
// var ncorrect=0
// var response=new Array(total)
// var theForms=new Array(total)
// var answer=new Array(total)
// for (i=1; i<=total;i++)
// theForms[i]=document.forms[i-1]
// for (i=1; i <= total; i++)
// response[i]=theForms[i].answer.selectedIndex
// for (i=1; i<=total;i++)
// answer[i]=theForms[i].correct.value
// var flag=true
// for (i=1; i <= total; i++)
// if (response[i]==0) {
// alert("Attenzione la domanda" + i + "non ha avuto risposta")
// flag=false
// }
// if (flag) {
// for (i=1; i <= total; i++)
// if (response[i]==answer[i]) ncorrect++
// document.total.score.value = ncorrect
// var per = Math.round((ncorrect / total) * 100)
// document.total.percent.value = per
// document.total.outof.value=total
// } //end if (flag)
// }
// // –>

(function(){
  function buildQuiz(){
    // variable to store the HTML output
    const output = [];

    // for each question...
    myQuestions.forEach(
      (currentQuestion, questionNumber) => {

        // variable to store the list of possible answers
        const answers = [];

        // and for each available answer...
        for(letter in currentQuestion.answers){

          // ...add an HTML radio button
          answers.push(
            `<label>
              <input type="radio" name="question${questionNumber}" value="${letter}">
              ${letter} :
              ${currentQuestion.answers[letter]}
            </label>`
          );
        }

        // add this question and its answers to the output
        output.push(
          `<div class="question"> ${currentQuestion.question} </div>
          <div class="answers"> ${answers.join('')} </div>`
        );
      }
    );

    // finally combine our output list into one string of HTML and put it on the page
    quizContainer.innerHTML = output.join('');
  }

  function showResults(){

    // gather answer containers from our quiz
    const answerContainers = quizContainer.querySelectorAll('.answers');

    // keep track of user's answers
    let numCorrect = 0;

    // for each question...
    myQuestions.forEach( (currentQuestion, questionNumber) => {

      // find selected answer
      const answerContainer = answerContainers[questionNumber];
      const selector = `input[name=question${questionNumber}]:checked`;
      const userAnswer = (answerContainer.querySelector(selector) || {}).value;

      // if answer is correct
      if(userAnswer === currentQuestion.correctAnswer){
        // add to the number of correct answers
        numCorrect++;

        // color the answers green
        answerContainers[questionNumber].style.color = 'lightgreen';
      }
      // if answer is wrong or blank
      else{
        // color the answers red
        answerContainers[questionNumber].style.color = 'red';
      }
    });

    // show number of correct answers out of total
    resultsContainer.innerHTML = `${numCorrect} out of ${myQuestions.length}`;
  }

  const quizContainer = document.getElementById('quiz');
  const resultsContainer = document.getElementById('results');
  const submitButton = document.getElementById('submit');
  const myQuestions = [
    {
      question: "1. " + "Chi è l'inventore del World Wide Web",
      answers: {
        a: "Douglas Crockford",
        b: "Tim Berners Lee",
        c: "Brendan Eich"
      },
      correctAnswer: "b"
    },
    {
      question: "2. " + "Con quale locuzione latina è ricordato Federico II di Svevia?",
      answers: {
        a: "Dies irae",
        b: "Festina lente",
        c: "Stupor mundi"
      },
      correctAnswer: "c"
    },
    {
      question: "3. " + "Qual è il nome della celebre filosofa, matematica ed astronoma vissuta ad Alessandria d'Egitto tra IV e V secolo d.C",
      answers: {
        a: "Barsine",
        b: "Statira",
        c: "Olimpiade",
        d: "Ipazia"
      },
      correctAnswer: "d"
    },
    {
      question: "4. " + "Qual è l'anno di nascita di Alessandro Magno?",
      answers: {
        a: "356 a.C",
        b: "760 d.C",
        c: "280 d.C.",
        d: "560 a.C."
      },
      correctAnswer: "a"
    },
    {
      question: "5. " + "Quale era il nome in codice dell'operazione che portò gli Alleati sulle coste siciliane nel 1943?",
      answers: {
        a: "Operazione Oro",
        b: "Operazione Husky",
        c: "Operazione Overlord",
        d: "Operazione Dynamo"
      },
      correctAnswer: "b"
    }
  ];

  // Kick things off
  buildQuiz();

  // Event listeners
  // submitButton.addEventListener('click', showResults);

  submitButton.addEventListener('click', function() { //aggiungi showResults  e togli function per vedere il punteggio
    document.getElementById("dati").innerHTML = "Dati acquisiti";
    var str = "CLICCA QUI PER VEDERE IL RISULTATO";
  var result = str.link("https://gabrielescarparo.wordpress.com/");
  document.getElementById("link").innerHTML = result;
  });
})();

