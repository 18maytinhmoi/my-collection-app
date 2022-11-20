import { Pipe, PipeTransform } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

@Pipe({
  name: 'formInputErrors',
})
export class FormInputErrorsPipe implements PipeTransform {
  transform(value: ValidationErrors | null | undefined, args?: any): any {
    if (value?.['constraints']) {
      return Object.keys(value?.['constraints']).map(key => {
        return value?.['constraints'][key];
      });
    }
    return null;
  }
}
