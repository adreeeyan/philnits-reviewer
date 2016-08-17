import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';

import { QuestionsProvider } from '../../providers/questions/questions';
import { Question } from '../../models/question';
import { NumToCharPipe } from '../../pipes/num-to-char-pipe';

/*
  Generated class for the QuestionPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/question/question.html',
  providers: [QuestionsProvider],
  pipes: [NumToCharPipe]
})
export class QuestionPage implements OnInit {
  questions: Question[] = [];
  currentIndex: number = 0;
  currentQuestion: Question = new Question();
  totalQuestions: number = 0;
  choiceLegend: number = 65; //this is the starting choice legend 'A'
  constructor(private navCtrl: NavController, private questionsProvider: QuestionsProvider) {

  }

  ngOnInit() {
    this.questionsProvider.generate().then(questions => {
      this.questions = questions;
      this.currentQuestion = this.questions[0];
      this.totalQuestions = this.questions.length;
    });
  }

  nextQuestion() {
    this.currentQuestion = this.questions[++this.currentIndex];
  }

  prevQuestion() {
    this.currentQuestion = this.questions[--this.currentIndex];
  }

  selectAnswer(answer: string) {
    this.currentQuestion.choice = answer;
  }

}
