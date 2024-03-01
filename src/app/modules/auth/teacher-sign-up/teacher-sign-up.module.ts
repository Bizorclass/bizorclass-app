import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FuseCardModule } from '@fuse/components/card';
import { FuseAlertModule } from '@fuse/components/alert';
import { SharedModule } from 'app/shared/shared.module';
import { AuthTeacherSignUpComponent } from 'app/modules/auth/teacher-sign-up/teacher-sign-up.component';
import { authTeacherSignupRoutes } from 'app/modules/auth/teacher-sign-up/teacher-sign-up.routing';
import { NgOtpInputModule } from 'ng-otp-input';

@NgModule({
    declarations: [
        AuthTeacherSignUpComponent
    ],
    imports: [
        RouterModule.forChild(authTeacherSignupRoutes),
        MatButtonModule,
        MatCheckboxModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatProgressSpinnerModule,
        FuseCardModule,
        FuseAlertModule,
        NgOtpInputModule,
        SharedModule
    ]
})
export class AuthTeacherSignUpModule {
}
