import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { TermsConditionsComponent } from './terms-conditions.component';

const termsConditionsRoutes: Route[] = [
    {
        path: '',
        component: TermsConditionsComponent
    }
];

@NgModule({
    declarations: [
        TermsConditionsComponent
    ],
    imports: [
        RouterModule.forChild(termsConditionsRoutes)
    ]
})
export class TermsConditionsModule {
}
