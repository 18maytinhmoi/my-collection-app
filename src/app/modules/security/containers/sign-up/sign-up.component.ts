import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import {
  addAsyncValidators,
  CustomFormGroup,
} from '@core/utils/add-async-validators';
import { PadButtonModule } from '@ui/button/button.module';
import { PadFormFieldModule } from '@ui/form-field/form-field.module';
import { PadIconModule } from '@ui/icon/icon.module';
import { filter, map, mergeMap, Observable, Subject } from 'rxjs';
import { SignUpForm } from '../../models/sign-up.form';
import { SecurityFacade } from '../../security.facade';

@Component({
  standalone: true,

  imports: [
    CommonModule,
    ReactiveFormsModule,
    PadIconModule,
    PadButtonModule,
    PadFormFieldModule,
  ],
  providers: [SecurityFacade],
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  signUpForm!: CustomFormGroup<SignUpForm>;
  signUpSub$!: Subject<SignUpForm>;
  // vm$!: Observable<ApiResponse<UserEntity | null>>;
  vm$!: Observable<string>;
  constructor(
    private readonly _securityFacade: SecurityFacade,
    private readonly _fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.signUpSub$ = new Subject<SignUpForm>();
    this.vm$ = this.signUpSub$.asObservable().pipe(
      filter(() => this.signUpForm.valid),
      mergeMap(dto => this._securityFacade.signUp(dto)),
      map(data => data.error as string)
    );

    this.signUpForm = addAsyncValidators(
      this._fb.group<SignUpForm>({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        passwordConfirm: '',
      }),
      SignUpForm
    );
  }

  public onSubmit(): void {
    const dto = this.signUpForm.value as any;
    this.signUpSub$.next(dto);
  }
}
