import {
  AbstractControl,
  AsyncValidatorFn,
  FormControl,
  FormGroup,
} from '@angular/forms';
import { validate, ValidationError } from 'class-validator';

type GroupControl<T> = { [key in keyof T]: FormControl<T[key] | null> };

export type CustomFormGroup<T> = FormGroup<GroupControl<T>>;

export function addAsyncValidators<T extends FormGroup>(
  form: T,
  formType: new () => any
) {
  const groupObj = Object.keys(form.controls).reduce(
    (obj: GroupControl<T>, key: string) => {
      const validators = [createValidatorFn(key, formType)];
      const formControl = new FormControl(form.value[key], {
        asyncValidators: validators,
      });
      return {
        ...obj,
        [key]: formControl,
      };
    },
    {} as GroupControl<T>
  );

  return new FormGroup(groupObj as GroupControl<T>) as T;
}

function createValidatorFn<T>(key: string, formType: new () => any): AsyncValidatorFn {
  return (control: AbstractControl) => {
    const toValidate = new formType();
    toValidate[key] = control.value;
    return validate(toValidate).then((validationErrors: ValidationError[]) => {
      const err = validationErrors.find((v: ValidationError) => v?.property === key);

      return err
        ? ({
            constraints: err.constraints,
            contexts: err.contexts,
          } as ValidationError)
        : null;
    });
  };
}
