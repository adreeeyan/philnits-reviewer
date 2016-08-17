import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { Question } from '../../models/question';

/*
  Generated class for the Questions provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class QuestionsProvider {

  constructor(private http: Http) {}
  generate() {
    return new Promise<Question[]>(resolve => {
      resolve([
        new Question(`Which of the following decimal values is equivalent to a hexadecimal fraction 0.B1?`,
          [
            `20 + 2−2 + 2−3 + 2−7`,
            `20 + 2−3 + 2−4 + 2−8`,
            `2−1 + 2−3 + 2−4 + 2−7`,
            `2−1 + 2−3 + 2−4 + 2−8`
          ],
          `2−1 + 2−3 + 2−4 + 2−7`
        ),
        new Question(`Alice and Mary take a math exam. The probability of passing this exam for Alice and Mary is 2/3 and 3/5, respectively. What is the probability that at least one of them will pass the exam?`,
          [
            `1/5`,
            `7/15`,
            `3/5`,
            `13/15`
          ],
          `7/15`
        ),
        new Question(`What is the distribution of arrival rate in an M/M/1 queuing model?`,
          [
            `Exponential distribution`,
            `Geometric distribution`,
            `Normal distribution`,
            `Poisson distribution`
          ],
          `Poisson distribution`
        )
      ])
    })
  }
}

