const questions = [
  {
    question: "What does HTML stand for?",
    options: ["Hyper Text Markup Language", "Hot Mail", "How to Make Links", "High Text Machine Language"],
    answer: "Hyper Text Markup Language"
  },
  {
    question: "What does CSS stand for?",
    options: ["Cascading Style Sheets", "Colorful Style Sheets", "Creative Style Sheets", "Computer Style Sheets"],
    answer: "Cascading Style Sheets"
  },
  {
    question: "Which language runs in the browser?",
    options: ["Java", "C", "Python", "JavaScript"],
    answer: "JavaScript"
  }
];

let currentQuestion = 0;
let score = 0;
let timer;
let timeLeft = 15; // seconds

const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const nextBtn = document.getElementById("next-btn");
const scoreEl = document.getElementById("score");
const timerEl = document.getElementById("timer");

function startQuiz() {
  showQuestion();
  startTimer();
}

function showQuestion() {
  resetState();
  let q = questions[currentQuestion];
  questionEl.innerText = q.question;

  q.options.forEach(option => {
    const button = document.createElement("button");
    button.innerText = option;
    button.addEventListener("click", () => selectAnswer(button, q.answer));
    optionsEl.appendChild(button);
  });
}

function resetState() {
  optionsEl.innerHTML = "";
  nextBtn.style.display = "none";
  clearInterval(timer);
  timeLeft = 15;
  timerEl.innerText = `Time: ${timeLeft}s`;
  startTimer();
}

function selectAnswer(button, correctAnswer) {
  const selected = button.innerText;
  const allButtons = optionsEl.querySelectorAll("button");
  allButtons.forEach(btn => btn.disabled = true);

  if (selected === correctAnswer) {
    score++;
    button.style.backgroundColor = "lightgreen";
  } else {
    button.style.backgroundColor = "salmon";
  }

  nextBtn.style.display = "block";
}

function showScore() {
  questionEl.innerText = "Quiz Completed!";
  optionsEl.innerHTML = "";
  nextBtn.style.display = "none";
  timerEl.style.display = "none";
  scoreEl.innerText = `Your Score: ${score} / ${questions.length}`;
}

nextBtn.addEventListener("click", () => {
  currentQuestion++;
  if (currentQuestion < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
});

function startTimer() {
  timer = setInterval(() => {
    timeLeft--;
    timerEl.innerText = `Time: ${timeLeft}s`;
    if (timeLeft === 0) {
      clearInterval(timer);
      selectAnswer({ innerText: "" }, questions[currentQuestion].answer); // Auto-fail
    }
  }, 1000);
}

startQuiz();
