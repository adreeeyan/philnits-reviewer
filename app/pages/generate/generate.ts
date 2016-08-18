import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { Standard } from './standard';
import { LogicCircuit } from './logic-circuit';

import { QuestionPage } from '../question/question';

/*
  Generated class for the GeneratePage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/generate/generate.html',
})
export class GeneratePage {

  constructor(private navCtrl: NavController) {

  }

  standards: Standard[] = [
    new Standard("ISO 9001", "ISO 9001:2008"),
    new Standard("ISO 14001", "ISO 14001:2004"),
    new Standard("ISO/IEC 20000-1", "ISO/IEC 20000-1:2011"),
    new Standard("ISO/IEC 20000-2", "ISO/IEC 20000-2:2012"),
    new Standard("ISO/IEC 25010", "ISO/IEC 25010:2011"),
    new Standard("ISO/IEC 27001", "ISO/IEC 27001:2005"),
    new Standard("ISO/IEC 27002", "ISO/IEC 27002:2013"),
    new Standard("ISO/IEC 12207", "ISO/IEC 12207:2008"),
    new Standard("ISO 21500", "ISO 21500:2012"),
    new Standard("ITIL", "ITIL 2011 edition"),
    new Standard("PMBOK", "PMBOK Guide – Fifth Edition")
  ]

  logicCircuits: LogicCircuit[] = [
    new LogicCircuit("and.png", "AND gate"),
    new LogicCircuit("nand.png", "NAND gate"),
    new LogicCircuit("or.png", "OR gate"),
    new LogicCircuit("nor.png", "NOR gate"),
    new LogicCircuit("xor.png", "Exclusive OR (XOR) gate"),
    new LogicCircuit("xnor.png", "Exclusive NOR gate"),
    new LogicCircuit("buffer.png", "Buffer"),
    new LogicCircuit("not.png", "NOT gate"),
    new LogicCircuit("tristate.png", "Three-state buffer (or tri-state buffer)")
  ]

  start() {
    this.navCtrl.push(QuestionPage);
  }

}
