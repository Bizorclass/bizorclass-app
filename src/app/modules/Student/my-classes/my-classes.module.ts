import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Route, RouterModule } from '@angular/router';
import { SharedModule } from 'app/shared/shared.module';
import { MyClassesComponent } from './my-classes.component';

const myClassesRoutes: Route[] = [
    {
        path: '',
        component: MyClassesComponent
    }
];

@NgModule({
    declarations: [
        MyClassesComponent
    ],
    imports: [
        RouterModule.forChild(myClassesRoutes),
        SharedModule,
        MatIconModule,
    ]
})
export class MyClassesModule {
}
