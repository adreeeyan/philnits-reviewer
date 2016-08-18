import * as _ from 'lodash';
import { Component, OnInit } from '@angular/core';
import { NavController, MenuController } from 'ionic-angular';

import { QuestionsProvider } from '../../providers/questions/questions';
import { Question } from '../../models/question';
import { NumToCharPipe } from '../../pipes/num-to-char-pipe';

import { SummaryPage } from '../summary/summary';

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
  choiceLegend: number = 65; //this is the starting choice legend 'A'
  constructor(private navCtrl: NavController, private questionsProvider: QuestionsProvider, menu: MenuController) {
    menu.enable(false);
  }

  ngOnInit() {
    this.questionsProvider.generate().then(questions => {
      this.questions = questions;
    });
  }

  currentQuestion(): Question {
    return this.questions[this.currentIndex] || new Question();
  }

  totalQuestions(): number {
    return this.questions.length;
  }

  disableNext(): boolean {
    return this.currentIndex + 1 === this.totalQuestions();
  }

  disablePrev(): boolean {
    return this.currentIndex === 0;
  }

  nextQuestion() {
    if (this.currentIndex + 1 === this.totalQuestions()) {
      this.navCtrl.push(SummaryPage, {
        questions: this.questions,
        unansweredQuestions: this.unansweredQuestions(),
        answeredQuestions: this.answeredQuestions(),
        currentIndex: this.currentIndex
      });
      return;
    }
    ++this.currentIndex;
  }

  prevQuestion() {
    if (this.currentIndex === 0) return;
    --this.currentIndex;
  }

  selectAnswer(answer: string) {
    this.currentQuestion().choice = answer;
  }

  //compute the unanswered questions
  unansweredQuestions(): Question[]{
    return _.filter(this.questions, question => _.isEmpty(question.choice));
  }

  //compute the answered questions
  answeredQuestions(): Question[]{
    return _.filter(this.questions, question => !_.isEmpty(question.choice));
  }

}
