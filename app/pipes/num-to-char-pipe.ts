import { Injectable, Pipe } from '@angular/core';

/*
  Generated class for the NumToCharPipe pipe.

  See https://angular.io/docs/ts/latest/guide/pipes.html for more info on
  Angular 2 Pipes.
*/
@Pipe({
  name: 'NumToCharPipe'
})
@Injectable()
export class NumToCharPipe {
  /*
    Takes a value and makes it lowercase.
   */
  transform(value: number, args: any[]) {
    return String.fromCharCode(value);
  }
}
