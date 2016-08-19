import * as _ from 'lodash';
import { Component } from '@angular/core';
import { ViewController, App } from 'ionic-angular';

import { Question } from '../../models/question';
import { UnansweredQuestionsPage } from '../unanswered-questions/unanswered-questions';
import { ReviewAnswersPage } from '../review-answers/review-answers';
import { SummaryPage } from '../summary/summary';

/*
  Generated class for the QuestionPopoverPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/question-popover/question-popover.html',
})
export class QuestionPopover {
  os: string = 'DOS';
  questions: Question[];
  unansweredQuestions: Question[];
  answeredQuestions: Question[];
  questionPageResolver: any;
  currentIndex: number;
  constructor(private viewCtrl: ViewController, private app: App) {
    this.questions = this.viewCtrl.data.questions
    this.unansweredQuestions = this.viewCtrl.data.unansweredQuestions;
    this.answeredQuestions = this.viewCtrl.data.answeredQuestions;
    this.questionPageResolver = this.viewCtrl.data.questionPageResolver;
    this.currentIndex = this.viewCtrl.data.currentIndex;
  }

  close() {
    return this.viewCtrl.dismiss();
  }

  goToSummary() {
    this.close().then(() => {
      this.app.getRootNav().push(SummaryPage, {
        questions: this.questions,
        unansweredQuestions: this.unansweredQuestions,
        answeredQuestions: this.answeredQuestions,
        questionPageResolver: this.questionPageResolver
      });
    });
  }

  goToUnansweredQuestions() {
    this.close().then(() => {
      this.app.getRootNav().push(UnansweredQuestionsPage, {
        questions: this.unansweredQuestions,
        questionPageResolver: this.questionPageResolver
      });
    });
  }

  goToReviewAnswers() {
    this.close().then(() => {
      this.app.getRootNav().push(ReviewAnswersPage, {
        questions: this.answeredQuestions,
        questionPageResolver: this.questionPageResolver
      });
    });
  }

  //find next unanswered question  
  goToNextUnansweredQuestion() {
    this.close().then(() => {
      //slice em up, search first starting with currentIndex
      let upper = _.slice(this.questions, this.currentIndex + 1);
      let lower = _.slice(this.questions, 0, this.currentIndex);

      //find in the upper list
      let upperIndex = _.findIndex(upper, question => _.isEmpty(question.choice));
      if (upperIndex !== -1) {
        this.questionPageResolver(upperIndex + this.currentIndex + 1);
        return;
      }

      //find in the lower list
      let lowerIndex = _.findIndex(lower, question => _.isEmpty(question.choice));
      if (lowerIndex !== -1) {
        this.questionPageResolver(lowerIndex);
        return;
      }
    });
  }

}
