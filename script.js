import questions from './questions.js';

const questionBox = document.querySelector('.question');
const answersBox = document.querySelector('.answers');
const spnQtd = document.querySelector('.spnQtd');
const textFinish = document.querySelector('.finish span');
const content = document.querySelector('.content');
const contentFinish = document.querySelector('.finish');
const btnRestart = document.querySelector('.finish button');

let currentIndex = 0;
let correctAnswers = 0;

btnRestart.onclick = () => {
  content.style.display = "flex";
  contentFinish.style.display = "none";
  currentIndex = 0;
  correctAnswers = 0;
  loadQuestion();
};

function nextQuestion(e) {
  const isCorrect = e.target.getAttribute("data-correct") === "true";
  if (isCorrect) correctAnswers++;

  if (currentIndex < questions.length - 1) {
    currentIndex++;
    loadQuestion();
  } else {
    finish();
  }
}

function finish() {
  textFinish.innerHTML = `Você acertou ${correctAnswers} de ${questions.length} questões`;
  content.style.display = "none";
  contentFinish.style.display = "flex";
}

function loadQuestion() {
  const question = questions[currentIndex];
  spnQtd.innerHTML = `Pergunta ${currentIndex + 1} de ${questions.length}`;
  questionBox.innerHTML = question.question;
  answersBox.innerHTML = '';

  question.answers.forEach(answer => {
    const div = document.createElement('div');
    div.innerHTML = `<button class="answer" data-correct="${answer.correct}">${answer.option}</button>`;
    answersBox.appendChild(div);
  });

  document.querySelectorAll('.answer').forEach(button => {
    button.addEventListener('click', nextQuestion);
  });
}

loadQuestion();

