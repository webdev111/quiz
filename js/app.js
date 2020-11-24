import Quiz from "./Quiz.js";
import Question from "./Question.js";

const App = (() => {
  // cache the DOM
  const quizEl = document.querySelector(".jabquiz");
  const quizQuestionEl = document.querySelector(".jabquiz__question");
  const trackerEl = document.querySelector(".jabquiz__tracker");
  const taglineEl = document.querySelector(".jabquiz__tagline");
  const choicesEl = document.querySelector(".jabquiz__choices");
  const progressInnerEl = document.querySelector(".progress__inner");
  const nextButtonEl = document.querySelector(".next");
  const restartButtonEl = document.querySelector(".restart");

  // questions
  const q1 = new Question("what is 1+1", [0, 2, 4, 6], 1);
  const q2 = new Question("what is 2+2", [2, 6, 4, 8], 2);
  const q3 = new Question("what is 4+2", [2, 8, 1, 6], 3);
  const q4 = new Question("what is 1-1", [0, 4, 3, 6], 0);
  const q5 = new Question("what is 4-2", [6, 2, 3, 2], 1);

  const quiz = new Quiz([q1, q2, q3, q4, q5]);

  // listerners
  const resetQuiz = () => {
    renderAll();
  };

  const listeners = () => {
    nextButtonEl.addEventListener("click", () => {
      const choice = document.querySelector("input[name='choice']:checked");

      if (choice) {
        const val = parseInt(choice.dataset.order);
        quiz.guessAnswer(parseInt(val));
        renderAll();
      }
    });

    restartButtonEl.addEventListener("click", () => {
      quiz.reset();
      renderAll();
      nextButtonEl.style.opacity = 1;
    });
  };

  // dom
  const setContent = (elem, content) => {
    elem.innerHTML = content;
  };

  const renderQuestion = () => {
    const questionText = quiz.getCurrentQuestion().question;
    setContent(quizQuestionEl, questionText);
  };

  const getPercentage = (a, b) => {
    return Math.floor((a / b) * 100);
  };
  const renderProgress = () => {
    progressInnerEl.style.width = `${getPercentage(
      quiz.currentQuestionIdx,
      quiz.questions.length
    )}%`;
  };

  const renderTracker = () => {
    trackerEl.innerText = `${quiz.currentQuestionIdx + 1} of ${
      quiz.questions.length
    }`;
  };

  const returnLi = (choice, i) => `<li class="jabquiz__choice">
  <input
    type="radio"
    name="choice"
    class="jabquiz__input"
    data-order="${i}"
    id="choice${i}"
  />
  <label for="choice${i}" class="jabquiz__label">
    <i></i>
    <span>${choice}</span>
  </label>
</li>`;

  const renderOptions = () => {
    let list = ``;
    quiz.getCurrentQuestion().choices.forEach((choice, i) => {
      list += returnLi(choice, i);
    });
    setContent(choicesEl, list);
  };

  const renderEndScreen = () => {
    // display score
    setContent(
      quizQuestionEl,
      `Your Score is ${getPercentage(quiz.score, quiz.questions.length)}%`
    );
    // increase progress
    renderProgress();
    // tagline to quiz completed
    setContent(taglineEl, "Quiz Completed");
    nextButtonEl.style.opacity = 0;
  };

  const renderAll = () => {
    if (quiz.isEnded()) {
      // end screen
      renderEndScreen();
    } else {
      // render question
      renderQuestion();
      //render tracker
      renderTracker();
      // render progress
      renderProgress();
      // tagline
      setContent(taglineEl, "Pick an option below!");
      //render options
      renderOptions();
    }
  };
  return {
    renderAll,
    listeners,
  };
})();

App.renderAll();
App.listeners();
