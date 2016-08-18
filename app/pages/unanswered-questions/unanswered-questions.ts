import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { Question } from '../../models/question';
import { QuestionPage } from '../question/question';

/*
  Generated class for the UnansweredQuestionsPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/unanswered-questions/unanswered-questions.html',
})
export class UnansweredQuestionsPage {

  questions: Question[];
  currentIndex: number;
  constructor(private navCtrl: NavController, private navParams: NavParams) {
    this.questions = this.navParams.get('questions') || [];
    this.currentIndex = this.navParams.get('currentIndex');
  }

  goToQuestion(index: number) {
    this.currentIndex = index;    
    this.navCtrl.popToRoot();
  }

}
