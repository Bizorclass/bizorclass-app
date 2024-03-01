import { Route } from '@angular/router';
import { AuthTeacherSignUpComponent } from 'app/modules/auth/teacher-sign-up/teacher-sign-up.component';

export const authTeacherSignupRoutes: Route[] = [
    {
        path     : '',
        component: AuthTeacherSignUpComponent
    }
];
