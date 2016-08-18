import { Component } from '@angular/core';
import { NavController, NavParams, MenuController } from 'ionic-angular';

import { Question } from '../../models/question';
import { UnansweredQuestionsPage } from '../unanswered-questions/unanswered-questions';
import { ReviewAnswersPage } from '../review-answers/review-answers';

/*
  Generated class for the SummaryPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/summary/summary.html',
})
export class SummaryPage{
  questions: Question[];
  unansweredQuestions: Question[];
  answeredQuestions: Question[];
  currentIndex: number;
  constructor(private navCtrl: NavController, private navParams: NavParams, menu: MenuController) {
    menu.enable(false);
    this.questions = this.navParams.get('questions') || [];
    this.unansweredQuestions = this.navParams.get('unansweredQuestions') || [];
    this.answeredQuestions = this.navParams.get('answeredQuestions') || [];
    this.currentIndex= this.navParams.get('currentIndex')
  }

  goToUnansweredQuestions() {
    this.navCtrl.push(UnansweredQuestionsPage, {
      questions: this.unansweredQuestions,
      currentIndex: this.currentIndex
    });
  }

  goToReviewAnswers() {
    this.navCtrl.push(ReviewAnswersPage, {
      questions: this.answeredQuestions,
      currentIndex: this.currentIndex
    });
  }

}
