import { Component, EventEmitter, Output } from '@angular/core';

import { MTasService } from './m-tas.service';
import { ValidationService } from '../services/validation.service';

@Component({
  selector: 'm-tas-add',
  templateUrl: './m-tas-add.component.html',
  styleUrls: ['./m-tas-add.component.css']
})
export class MTasAddComponent {
  @Output() taAdded = new EventEmitter();
  addingTa = false;
  newTaMsg = {
    show: false,
    type: 'warning',
    message: ''
  };
  pendingTa: any;
  allTas: any[];
  displayTas: any[];
  addNew = false;


  constructor(private _taAPI: MTasService, private _validator: ValidationService) {
    this.newTa();
  }

  newTa() {
    this.pendingTa = {
      first_name: {
        content: "",
        error: false,
        type: 'string'
      },
      last_name: {
        content: "",
        error: false,
        type: 'string'
      },
      email: {
        content: "",
        error: false,
        type: 'string'
      },
      utorid: {
        content: "",
        error: false,
        type: 'string'
      },
      contract_number: {
        content: "",
        error: false,
        type: 'number'
      }
    };
  }

  addTa() {
    var i,
      content,
      error,
      validation;
    for (i in this.pendingTa) {
      if (this.pendingTa.hasOwnProperty(i)) {
        content = this.pendingTa[i].content;
        if (this.pendingTa[i].type === 'string') {
          validation = this._validator.validateString(content, { empty: true });
          if (validation.errors.length) {
            this.pendingTa[i].error = true;
            error = true;
          } else {
            this.pendingTa[i].content = validation.content;
          }
        } else if (this.pendingTa[i].type === 'number') {
          validation = this._validator.validateString(content, { empty: true });
          if (validation.errors.length) {
            this.pendingTa[i].error = true;
            error = true;
          } else {
            this.pendingTa[i].content = validation.content;
          }
        }
      }
    }
    if (error) {
      return;
    }
    this.addingTa = true;
    return this._taAPI
      .addTa({
        first_name: this.pendingTa.first_name.content,
        last_name: this.pendingTa.last_name.content,
        utorid: this.pendingTa.utorid.content,
        email: this.pendingTa.email.content,
        contract_number: parseInt(this.pendingTa.contract_number.content),
      }).subscribe(response => {
          this.showTaMsg({
            type: 'green',
            message: 'Successfully added TA.'
          });
          this.newTa();
          this.taAdded.emit(response);
          this.addingTa = false;
        },
        error => {
          this.showTaMsg({
            type: 'red',
            message: (error.message[0].code === 'EXISTS') ? 'This TA exists':'Failed to add TA.' 
          });
          this.addingTa = false;
      });
  }

  /*
   * Validate the number of contract.
   * Contract number should be an integer between 0 and 10 inclusively.
   */
  validateContractNumber() {
    var result = this._validator.validateInt(this.pendingTa.contract_number.content, {min: 0, max:10});
    if (result.errors.length > 0)
      this.pendingTa.contract_number.error = "The contract number is an integer between 0 and 10 inclusively.";
    else
      this.pendingTa.contract_number.error = false;
  }



  showTaMsg(opt) {
    this.newTaMsg.type = opt.type;
    this.newTaMsg.message = opt.message;
    this.newTaMsg.show = true;
  }

  closeTaMsg() {
    this.newTaMsg.show = false;
  }
}
