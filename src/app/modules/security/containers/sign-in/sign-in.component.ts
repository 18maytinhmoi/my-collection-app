import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ApiResponse } from '@core/models/api-response';
import {
  addAsyncValidators,
  CustomFormGroup,
} from '@core/utils/add-async-validators';
import { PadButtonModule } from '@ui/button/button.module';
import { PadFormFieldModule } from '@ui/form-field/form-field.module';
import { PadIconModule } from '@ui/icon/icon.module';
import { mergeMap, Observable, Subject, tap } from 'rxjs';
import { SignInForm } from '../../models/sign-in.form';
import { SecurityFacade } from '../../security.facade';
import { UserEntity } from './../../../../@core/models/user.entity';

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
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent implements OnInit {
  signInForm!: CustomFormGroup<SignInForm>;
  signInSub$!: Subject<SignInForm>;
  vm$!: Observable<ApiResponse<UserEntity | null>>;

  constructor(
    private readonly securityFacade: SecurityFacade,
    private readonly fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.signInSub$ = new Subject<SignInForm>();
    this.vm$ = this.signInSub$.asObservable().pipe(
      mergeMap(dto => this.securityFacade.signIn(dto)),
      tap(data => console.log(data))
    );

    this.signInForm = addAsyncValidators(
      this.fb.group<SignInForm>({
        emailAddress: '',
        password: '',
      }),
      SignInForm
    );
  }

  public onSubmit(): void {
    console.log(this.signInForm.value);
  }
}
