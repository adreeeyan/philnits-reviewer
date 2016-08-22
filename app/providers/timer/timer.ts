import * as moment from 'moment';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';

/*
  Generated class for the Timer provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class TimerProvider {
  remaining: moment.Moment = moment();
  constructor(private http: Http) {}

  initTime() {
    let duration = 9000000; //9000000 is 150 minutes
    let remaining = moment([2016, 1, 1, 2, 30, 0, 0]); //150 minutes

    //add 1 second so that user will not be shocked o.o
    duration += 1000;
    remaining.add(1, 'seconds');

    return Observable.timer(0, 1000).map((run) => {
      remaining.subtract(1, 'seconds');
      this.remaining = remaining;
      return remaining;
    }).takeUntil(Observable.timer(duration));
  }

  getTime() {
    return this.remaining;
  }
}

