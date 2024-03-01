import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { Route, RouterModule } from '@angular/router';
import { HomeComponent } from 'app/modules/student/home/home.component';
import { SharedModule } from 'app/shared/shared.module';

const homeRoutes: Route[] = [
    {
        path: '',
        component: HomeComponent
    }
];

@NgModule({
    declarations: [
        HomeComponent
    ],
    imports: [
        RouterModule.forChild(homeRoutes),
        SharedModule,
        MatIconModule,
        MatTabsModule
    ]
})
export class HomeModule { }
