import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { FuseAlertType } from '@fuse/components/alert';
import { ApiService } from 'app/services/api.service';
import { AuthService } from '../auth.service';

@Component({
    selector: 'auth-access-account',
    templateUrl: './access-account.component.html',
    styleUrls  : ['./access-account.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class accessAccountComponent implements OnInit {
    @ViewChild('signInNgForm') signInNgForm: NgForm;

    alert: { type: FuseAlertType; message: string } = {
        type: 'success',
        message: ''
    };
    signInForm: UntypedFormGroup;
    showAlert: boolean = false;

    /**
     * Constructor
     */
    constructor(
        private _activatedRoute: ActivatedRoute,
        private _authService: AuthService,
        private apiService: ApiService,
        private _formBuilder: UntypedFormBuilder,
        private _router: Router
    ) {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        // Create the form
        this.signInForm = this._formBuilder.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', Validators.required],
        });
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Sign in
     */
    signIn(): void {
        // Return if the form is invalid
        if (this.signInForm.invalid) {
            return;
        }

        // Disable the form
        this.signInForm.disable();

        // Hide the alert
        this.showAlert = false;
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
                    message: 'Wrong email or password'
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
                message: 'Wrong email or password'
            };

            // Show the alert
            this.showAlert = true;
        });

        // setTimeout(() => {
        //     let rawUser = {
        //         admin_d: "admin1233",
        //         first_name: "Super",
        //         last_name: "Admin",
        //         email: "admin@gmail.com",
        //         is_super_admin: true,
        //         photo_url: "https://statinfer.com/wp-content/uploads/dummy-user.png"
        //     }
        //     this._authService.user = rawUser;
        //     const redirectURL = this._activatedRoute.snapshot.queryParamMap.get('redirectURL') || '/dashboard';
        //     this._router.navigateByUrl(redirectURL);
        // }, 2000);



        // Sign in
        // this._authService.signIn(this.signInForm.value).subscribe(() => {
        //     // Set the redirect url.
        //     // The '/signed-in-redirect' is a dummy url to catch the request and redirect the user
        //     // to the correct page after a successful sign in. This way, that url can be set via
        //     // routing file and we don't have to touch here.
        //     const redirectURL = this._activatedRoute.snapshot.queryParamMap.get('redirectURL') || '/dashboard';

        //     // Navigate to the redirect url
        //     this._router.navigateByUrl(redirectURL);

        // }, (response) => {

        //     // Re-enable the form
        //     this.signInForm.enable();

        //     // Reset the form
        //     this.signInNgForm.resetForm();

        //     // Set the alert
        //     this.alert = {
        //         type   : 'error',
        //         message: 'Wrong email or password'
        //     };

        //     // Show the alert
        //     this.showAlert = true;
        // });
    }
}
