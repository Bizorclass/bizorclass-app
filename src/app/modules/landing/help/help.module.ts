import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { HelpComponent } from './help.component';

const helpRoutes: Route[] = [
    {
        path: '',
        component: HelpComponent
    }
];

@NgModule({
    declarations: [
        HelpComponent
    ],
    imports: [
        RouterModule.forChild(helpRoutes)
    ]
})
export class HelpModule {
}
