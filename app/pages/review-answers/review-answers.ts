import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { Question } from '../../models/question';

/*
  Generated class for the ReviewAnswersPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/review-answers/review-answers.html',
})
export class ReviewAnswersPage {
  questions: Question[];
  questionPageResolver: any;
  constructor(private navCtrl: NavController, private navParams: NavParams) {
    this.questions = this.navParams.get('questions');
    this.questionPageResolver = this.navParams.get('questionPageResolver');
  }

  goToQuestion(index: number) {
    this.questionPageResolver(index - 1);
    this.navCtrl.popToRoot();
  }

}
