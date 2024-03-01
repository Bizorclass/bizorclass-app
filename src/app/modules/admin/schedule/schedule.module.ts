import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { ScheduleComponent } from 'app/modules/admin/schedule/schedule.component';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ScheduleDetailsComponent } from './details/details.component';
import { SharedModule } from 'app/shared/shared.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { NgxMatTimepickerModule } from 'ngx-mat-timepicker';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

const scheduleRoutes: Route[] = [
    {
        path: '',
        component: ScheduleComponent
    }
];

@NgModule({
    declarations: [
        ScheduleComponent,
        ScheduleDetailsComponent
    ],
    imports: [
        RouterModule.forChild(scheduleRoutes),
        MatTableModule,
        MatInputModule,
        MatButtonModule,
        MatIconModule,
        MatFormFieldModule,
        NgxMatTimepickerModule,
        MatSelectModule,
        MatSlideToggleModule,
        SharedModule,
    ]
})
export class ScheduleModule {
}
