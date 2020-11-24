export default class Quiz {
  constructor(questions) {
    this.questions = questions;
    this.currentQuestionIdx = 0;
    this.score = 0;
  }
  isEnded() {
    return this.currentQuestionIdx >= this.questions.length;
  }
  getCurrentQuestion() {
    return this.questions[this.currentQuestionIdx];
  }
  guessAnswer(gussedKey) {
    const isCorrect = this.questions[this.currentQuestionIdx].isCorrect(
      gussedKey
    );
    if (isCorrect) {
      this.score += 1;
    }

    this.currentQuestionIdx += 1;
  }

  reset(){
    this.currentQuestionIdx = 0;
    this.score = 0;
  }
}
