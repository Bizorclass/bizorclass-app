import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { HowToUseComponent } from './how-to-use.component';

const howToUseRoutes: Route[] = [
    {
        path: '',
        component: HowToUseComponent
    }
];

@NgModule({
    declarations: [
        HowToUseComponent
    ],
    imports: [
        RouterModule.forChild(howToUseRoutes)
    ]
})
export class HowToUseModule {
}
