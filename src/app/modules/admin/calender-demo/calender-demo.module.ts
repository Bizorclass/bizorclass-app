import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalenderDemoComponent } from 'app/modules/admin/calender-demo/calender-demo.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

const exampleRoutes: Route[] = [
    {
        path: '',
        component: CalenderDemoComponent
    }
];

@NgModule({
    declarations: [
        CalenderDemoComponent
    ],
    imports: [
        RouterModule.forChild(exampleRoutes),
        FullCalendarModule, // register FullCalendar with your app
        MatProgressSpinnerModule
    ]
})
export class CalenderDemoModule {
}
