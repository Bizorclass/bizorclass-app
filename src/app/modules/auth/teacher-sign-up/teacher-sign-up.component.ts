import { Component, OnInit, ViewChild, ViewEncapsulation, ChangeDetectorRef } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, NgForm, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { FuseAlertType } from '@fuse/components/alert';
import { AuthService } from 'app/core/auth/auth.service';
import { ApiService } from 'app/services/api.service';
import { passwordValidator } from 'app/shared/password.validator';
import { phoneNumberValidator } from 'app/shared/phoneNumber.validator';

@Component({
    selector     : 'auth-teacher-sign-up',
    templateUrl  : './teacher-sign-up.component.html',
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class AuthTeacherSignUpComponent implements OnInit
{
    @ViewChild('signUpNgForm') signUpNgForm: NgForm;

    alert: { type: FuseAlertType; message: string } = {
        type   : 'success',
        message: ''
    };
    signUpForm: UntypedFormGroup;
    showAlert: boolean = false;

    otpRequestLoading:boolean = false;
    server_otp: string= "";
    otp: string= "";
    otpHelperText: string= "";

    constructor( private _authService: AuthService, private _formBuilder: UntypedFormBuilder, private _router: Router, private apiService:ApiService, private _changeDetectorRef: ChangeDetectorRef, private _snackBar: MatSnackBar) { }

    ngOnInit(): void {
        // Create the form
        this.signUpForm = this._formBuilder.group({
            first_name      : ['',  Validators.required],
            last_name       : ['',  Validators.required],
            email           : ['', [Validators.required, Validators.email]],
            password        : ['', [Validators.required, passwordValidator()]],
            phone_number    : ['', [Validators.required, phoneNumberValidator('phone number')]],
            number_verified : ['',  Validators.requiredTrue],
            agreements      : ['',  Validators.requiredTrue]
        });
    }

    signUp(): void {
        // Do nothing if the form is invalid
        if (!this.signUpForm.get('phone_number').hasError('phoneNumberValidator') && !this.signUpForm.get('number_verified').valid) {
            this._snackBar.open("Please verified phone number.", "", {
                horizontalPosition: "center",
                verticalPosition: "top",
                duration: 3000,
                // panelClass: ['success-toast']
                panelClass: ['error-toast']
            })
        }
        if ( this.signUpForm.invalid ) {
            return;
        }

        // Disable the form
        this.signUpForm.disable();

        // Hide the alert
        this.showAlert = false;

        console.log(this.signUpForm.value);

        this.apiService.registrationTeacher({ email: this.signUpForm.value.email, password: this.signUpForm.value.password, first_name: this.signUpForm.value.first_name, last_name: this.signUpForm.value.last_name, phone_number: this.signUpForm.value.phone_number }).subscribe((res: any) => {
            console.log(res);
            //todo update Object
            if (res.data) {
                this._router.navigateByUrl('/sign-in');
            } else {
                console.log(res?.error?.message);
                if (res?.error?.message === "Email address already registered by another user") {
                    this.signUpForm.get("email").setErrors({ serverError: res?.error?.message });
                    this._changeDetectorRef.markForCheck();
                    this.alert = {
                        type   : 'error',
                        message: 'Email address already registered by another user.'
                    };
                    // Show the alert
                    this.showAlert = true;
                } else if (res?.error?.message) {
                    this.signUpNgForm.resetForm();
                    // Set the alert
                    this.alert = {
                        type   : 'error',
                        message: res?.error?.message
                    };
                    // Show the alert
                    this.showAlert = true;
                } else {
                    this.signUpNgForm.resetForm();
                    // Set the alert
                    this.alert = {
                        type   : 'error',
                        message: 'Something went wrong, please try again.'
                    };
                    // Show the alert
                    this.showAlert = true;
                }
                window.scroll(0,0);
                this.signUpForm.enable();
            }
        }, (err) => {
            console.log(err);
        });
    }

    onOtpChange(_value) {
        // this.otp = _value;

        if (_value.length === 4) {
            if (_value === this.server_otp) {
                this.otpHelperText = ""
                this.signUpForm.get('number_verified').setValue(true);
                this.otp = _value;
            } else {
                this.otpHelperText = "OTP incorrect.";
                this.signUpForm.get('number_verified').setValue(false);
            }
        }
    }

    async requestToOTP() {

        // console.log(this.signUpForm.get('number_verified').valid);
        // console.log(this.signUpForm.get('number_verified').hasError('requiredTrue'));
        // this.signUpForm.get('number_verified').setValue(true)
        // console.log(this.signUpForm.get('number_verified').hasError('requiredTrue'));

        if (this.signUpForm.get('phone_number').valid) {
            try {
                this.otpRequestLoading = true;
                this.signUpForm.get('phone_number').disable();

                const sendOTPResponse: any = await this.apiService.sendOTP({ to: `+91${this.signUpForm.get('phone_number').value}` });
                console.log(sendOTPResponse);
                if (sendOTPResponse?.success && sendOTPResponse?.otp) {
                    this.server_otp = ""+sendOTPResponse.otp;
                    this.otp = "";
                } else {
                    throw new Error(sendOTPResponse);
                }
                this.signUpForm.get('number_verified').setValue(false);
                this.otpRequestLoading = false;
            } catch (error) {
                console.error(error);
                if (error?.error?.message) {
                    this._snackBar.open(error?.error?.message, "", {
                        horizontalPosition: "center",
                        verticalPosition: "top",
                        duration: 3000,
                        // panelClass: ['success-toast']
                        panelClass: ['error-toast']
                    })
                } else {
                    this._snackBar.open("Something went wrong! Try again", "", {
                        horizontalPosition: "center",
                        verticalPosition: "top",
                        duration: 3000,
                        // panelClass: ['success-toast']
                        panelClass: ['error-toast']
                    })
                }
                this.otpRequestLoading = false;
                this.signUpForm.get('phone_number').enable();
                this.signUpForm.get('number_verified').setValue(false);
                this.server_otp = "";
                this.otp = "";
            }

            //   this.signUpForm.get('phone_number').disable();
            //   this.otpRequestLoading = true;
            //   setTimeout(() => {
            //     this.server_otp = "1234";
            //     this.otp = "";
            //     this.signUpForm.get('number_verified').setValue(false);
            //     this.otpRequestLoading = false;
            //   }, 2000);
        }

    }
}
