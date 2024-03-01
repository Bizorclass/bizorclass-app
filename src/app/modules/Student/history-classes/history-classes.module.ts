import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Route, RouterModule } from '@angular/router';
import { SharedModule } from 'app/shared/shared.module';
import { HistoryClassesComponent } from './history-classes.component';

const historyClassesRoutes: Route[] = [
    {
        path: '',
        component: HistoryClassesComponent
    }
];

@NgModule({
    declarations: [
        HistoryClassesComponent
    ],
    imports: [
        RouterModule.forChild(historyClassesRoutes),
        SharedModule,
        MatIconModule,
    ]
})
export class HistoryClassesModule {
}
