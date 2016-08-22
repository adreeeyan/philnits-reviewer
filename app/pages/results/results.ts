import * as _ from 'lodash';
import { Component } from '@angular/core';
import { NavController, NavParams, MenuController } from 'ionic-angular';

import { Question } from '../../models/question';
import { Result } from '../../models/result';
/*
  Generated class for the ResultsPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/results/results.html',
})
export class ResultsPage {
  results: Result[];
  view: string = 'summary';
  constructor(private navCtrl: NavController, private navParams: NavParams, menu: MenuController) {
    menu.enable(true);
    this.results = <Result[]> this.navParams.get('questions') || [];
  }

  ionViewWillEnter() {
    this.checkResults();
  }

  checkResults() {
    _.each(this.results, result => {
      result.isCorrect = result.answer === result.choice;
    });
  }

  correctAnswers() {
    return _.filter(this.results, result => {
      return result.isCorrect;
    });
  }

  wrongAnswers() {
    return _.filter(this.results, result => {
      return !result.isCorrect;
    });
  }

}
