import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ApiResponseStatus } from '@core/models/api-response';
import {
  addAsyncValidators,
  CustomFormGroup,
} from '@core/utils/add-async-validators';
import { PadButtonModule } from '@ui/button/button.module';
import { PadFormFieldModule } from '@ui/form-field/form-field.module';
import { PadIconModule } from '@ui/icon/icon.module';
import { filter, map, mergeMap, Observable, Subject } from 'rxjs';
import { SignInForm } from '../../models/sign-in.form';
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
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent implements OnInit {
  signInForm!: CustomFormGroup<SignInForm>;
  signInSub$!: Subject<SignInForm>;
  // vm$!: Observable<ApiResponse<UserEntity | null>>;
  vm$!: Observable<string>;

  constructor(
    private readonly _securityFacade: SecurityFacade,
    private readonly _fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.signInSub$ = new Subject<SignInForm>();
    this.vm$ = this.signInSub$.asObservable().pipe(
      filter(() => this.signInForm.valid),
      mergeMap(dto => this._securityFacade.signIn(dto)),
      filter(data => data.status === ApiResponseStatus.Failure),
      map(data => data.error as string)
    );

    this.signInForm = addAsyncValidators(
      this._fb.group<SignInForm>({
        email: '',
        password: '',
      }),
      SignInForm
    );
  }

  public onSubmit(): void {
    const dto = this.signInForm.value as any;
    this.signInSub$.next(dto);
  }
}
