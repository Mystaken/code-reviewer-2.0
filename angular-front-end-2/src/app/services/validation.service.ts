import { Injectable } from '@angular/core';
import { SecurityContext } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Injectable()
export class ValidationService {
  constructor(private _sanitizer: DomSanitizer ) { }
  validateString(str, opt) {
    let errors = [];
    if (!str && str !== '') {
      return {
      errors: ['empty']
    };
    }
    if (opt.empty && !str) {
      errors.push('empty');
    }
    if (opt.maxLength && str.length > opt.maxLength) {
      errors.push('maxLength')
    }
    if (opt.minLength && str.length < opt.minLength) {
      errors.push('maxLength')
    }
    return {
      errors: errors,
      content: this._sanitizer.sanitize(SecurityContext.HTML, str)
    };
  }

  /*
   * int: the input to be validated
   * opt: restrictions of this int
   */
  validateInt(int, opt) {
    let errors = [];
    let num = parseInt(int);

    if (num != int) {
      return {
        errors: ['NaN']
      };
    }
    // greater than upper limit
    if (opt.max !== undefined && num > opt.max) {
      errors.push('max')
    }
    // smaller than lower limit
    if (opt.min !== undefined && num < opt.min) {
      errors.push('min')
    }
    return {
      errors: errors,
      content: num
    };
  }
}