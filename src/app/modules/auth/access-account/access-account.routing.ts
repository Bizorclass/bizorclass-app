import { Route } from '@angular/router';
import { accessAccountComponent } from 'app/modules/auth/access-account/access-account.component';

export const accessAccountRoutes: Route[] = [
    {
        path     : '',
        component: accessAccountComponent
    }
];
