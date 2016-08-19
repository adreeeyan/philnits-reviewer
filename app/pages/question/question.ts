import * as _ from 'lodash';
import { Component } from '@angular/core';
import { NavController, MenuController, NavParams, PopoverController } from 'ionic-angular';

import { QuestionsProvider } from '../../providers/questions/questions';
import { Question } from '../../models/question';
import { NumToCharPipe } from '../../pipes/num-to-char-pipe';

import { SummaryPage } from '../summary/summary';

//popover
import { QuestionPopover } from '../question-popover/question-popover';

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
export class QuestionPage {
  questions: Question[] = [];
  currentIndex: number = 0;
  choiceLegend: number = 65; //this is the starting choice legend 'A'
  constructor(private navCtrl: NavController, private navParams: NavParams, private questionsProvider: QuestionsProvider,
    menu: MenuController, private popoverCtrl: PopoverController) {
    menu.enable(false);
  }

  ionViewLoaded() {
    this.questionsProvider.generate().then(questions => {
      this.questions = questions;
    });
  }

  //opening the popover
  openPopover(event) {

    //same with currentQuestion workaround
    new Promise(resolve => {
      let popover = this.popoverCtrl.create(QuestionPopover, {
        questions: this.questions,
        currentIndex: this.currentIndex,
        unansweredQuestions: this.unansweredQuestions(),
        answeredQuestions: this.answeredQuestions(),
        questionPageResolver: resolve,
        navCtrl: this.navCtrl
      });
      popover.present({
        ev: event
      });
    }).then((index: number) => {
      this.currentIndex = index;
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

      //passing a parameter from child to parent is a hard nut job
      //a workaround is needed for it's still a feature request      
      //http://stackoverflow.com/questions/38143454/ionic2-send-params-between-pages-when-clicking-on-the-return-nav-button-using
      //what's happening here is before pushing the new page, we will add a promise so that we will know that it was closed
      //and we will let the child resolve with the data needed
      new Promise(resolve => {
        this.navCtrl.push(SummaryPage, {
          questions: this.questions,
          unansweredQuestions: this.unansweredQuestions(),
          answeredQuestions: this.answeredQuestions(),
          questionPageResolver: resolve
        });
      }).then((index: number) => {
        this.currentIndex = index;
      });
    } else {
      ++this.currentIndex;      
    }
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
