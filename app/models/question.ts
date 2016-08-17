import * as _ from 'lodash';
export class Question{
    choice: string; //the answer of the user
    constructor(public description: string = '', public choices: string[] = [], public answer: string = '') {
        //shuffle the choices
        this.choices = _.shuffle(this.choices);
    }
}