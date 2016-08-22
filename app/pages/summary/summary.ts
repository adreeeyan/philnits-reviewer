import * as moment from 'moment';
import { Component } from '@angular/core';
import { NavController, NavParams, MenuController } from 'ionic-angular';

import { Question } from '../../models/question';
import { UnansweredQuestionsPage } from '../unanswered-questions/unanswered-questions';
import { ReviewAnswersPage } from '../review-answers/review-answers';
import { QuestionPage } from '../question/question';

import { TimerProvider } from '../../providers/timer/timer';

/*
  Generated class for the SummaryPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/summary/summary.html'
})
export class SummaryPage{
  questions: Question[];
  unansweredQuestions: Question[];
  answeredQuestions: Question[];
  questionPageResolver: any;
  constructor(private navCtrl: NavController, private navParams: NavParams,
    menu: MenuController, private timerProvider: TimerProvider) {
    menu.enable(false);
    this.questions = this.navParams.get('questions') || [];
    this.unansweredQuestions = this.navParams.get('unansweredQuestions') || [];
    this.answeredQuestions = this.navParams.get('answeredQuestions') || [];
    this.questionPageResolver = this.navParams.get('questionPageResolver');
  }

  goToUnansweredQuestions() {
    //send the questionPage resolve
    //imagine sending it to the 35th level of a page (sigh)
    this.navCtrl.push(UnansweredQuestionsPage, {
      unchangeable: this.isTestFinished,
      questions: this.unansweredQuestions,
      questionPageResolver: this.questionPageResolver
    });
  }

  goToReviewAnswers() {
    //send the questionPage resolve
    //imagine sending it to the 35th level of a page (sigh)
    this.navCtrl.push(ReviewAnswersPage, {
      unchangeable: this.isTestFinished,
      questions: this.answeredQuestions,
      questionPageResolver: this.questionPageResolver
    });
  }

  get remainingTime(): string {
    return this.timerProvider.getTime().format('HH:mm:ss');
  }

  get isTestFinished(): boolean {
    return this.remainingTime === '00:00:00';
  }

}
