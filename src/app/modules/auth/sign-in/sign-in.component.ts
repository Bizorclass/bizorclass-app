import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { FuseAlertType } from '@fuse/components/alert';
import { ApiService } from 'app/services/api.service';
import { AuthService } from '../auth.service';
// import { Geolocation } from '@capacitor/geolocation';

@Component({
  selector: 'auth-sign-in',
  templateUrl: './sign-in.component.html',
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class AuthSignInComponent implements OnInit {
  @ViewChild('signInNgForm') signInNgForm: NgForm;

  alert: { type: FuseAlertType; message: string } = {
    type: 'success',
    message: ''
  };
  signInForm: UntypedFormGroup;
  showAlert: boolean = false;

  selectedAccountType: string = "student";

  constructor(private _activatedRoute: ActivatedRoute, private _authService: AuthService, private apiService: ApiService, private _formBuilder: UntypedFormBuilder, private _router: Router) { }

  ngOnInit(): void {
    // Create the form
    this.signInForm = this._formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  signIn(): void {
    // Return if the form is invalid
    if (this.signInForm.invalid) {
      return;
    }

    // Disable the form
    this.signInForm.disable();

    // Hide the alert
    this.showAlert = false;

    if (this.selectedAccountType === "teacher") {
      this.apiService.teacherLogin(this.signInForm.value).subscribe((res: any) => {
        console.log(res);

        if (res?.data) {
          this._authService.user = res?.data;
          const redirectURL = this._activatedRoute.snapshot.queryParamMap.get('redirectURL') || '/dashboard';
          this._router.navigateByUrl(redirectURL);
        } else {
          this.signInForm.enable();

          this.alert = {
            type: 'error',
            message: 'Wrong email or password for the selected account type.'
          };

          // Show the alert
          this.showAlert = true;
        }

      }, (err) => {

        console.log(err);

        this.signInForm.enable();

        // Reset the form
        this.signInNgForm.resetForm();

        // Set the alert
        this.alert = {
          type: 'error',
          message: 'Wrong email or password for the selected account type.'
        };

        // Show the alert
        this.showAlert = true;
      });
    } else {
      this.apiService.studentLogin(this.signInForm.value).subscribe(async (res: any) => {
        console.log(res);

        if (res?.data) {
          this._authService.user = res?.data;

          // if (!res?.data?.latitude || !res?.data?.longitude) {
          //   const getLatitudeLongitudeResponse:any = await this.getLatitudeLongitude();
          //   console.log("getLatitudeLongitudeResponse => ", getLatitudeLongitudeResponse);

          //   if (getLatitudeLongitudeResponse.success && getLatitudeLongitudeResponse?.latitude && getLatitudeLongitudeResponse?.longitude) {
          //     const postObject = {
          //       student_id: res?.data?.student_id,
          //       latitude: getLatitudeLongitudeResponse?.latitude,
          //       longitude: getLatitudeLongitudeResponse?.longitude
          //     }
          //     const updateStudentResponse:any = await this.apiService.updateStudent(postObject).toPromise();
          //     console.log("updateStudentResponse for Location -> ", updateStudentResponse);
          //     if (updateStudentResponse?.data) {
          //       this._authService.user = updateStudentResponse?.data;
          //     }
          //   }
          // }

          //   const redirectURL = this._activatedRoute.snapshot.queryParamMap.get('redirectURL') || '/student/home';
          const redirectURL = '/student/home';

          this._router.navigateByUrl(redirectURL);
        } else {
          this.signInForm.enable();

          this.alert = {
            type: 'error',
            message: 'Wrong email or password for the selected account type.'
          };

          // Show the alert
          this.showAlert = true;
        }

      }, (err) => {

        console.log(err);

        this.signInForm.enable();

        // Reset the form
        this.signInNgForm.resetForm();

        // Set the alert
        this.alert = {
          type: 'error',
          message: 'Wrong email or password for the selected account type.'
        };

        // Show the alert
        this.showAlert = true;
      });
    }
  }

  // getLatitudeLongitude() {
  //   return new Promise(async (resolve, reject) => {
  //     try {
  //       const coordinates = await Geolocation.getCurrentPosition();
  //       console.log('Current position:', coordinates.coords.latitude);
  //       console.log('Current position:', coordinates.coords.longitude);
  //       resolve({
  //         success: true,
  //         latitude: coordinates.coords.latitude,
  //         longitude: coordinates.coords.longitude
  //       });
  //     } catch (error) {
  //       console.error("error -> ", error);
  //       resolve({success: false});
  //     }

  //   })
  // }
}
