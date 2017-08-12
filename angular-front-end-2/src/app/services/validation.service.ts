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
  validateInt(int, opt) {
    let errors = [];
    let num = parseInt(int);
    if (num != int) {
      return {
        errors: ['NaN']
      };
    }
    if (opt.max && num > opt.max) {
      errors.push('max')
    }
    if (opt.min && num < opt.min) {
      errors.push('max')
    }
    return {
      errors: errors,
      content: num
    };
  }
}