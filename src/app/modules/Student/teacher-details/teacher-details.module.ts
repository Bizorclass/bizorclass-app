import { NgModule } from '@angular/core';
import { MatLuxonDateModule } from '@angular/material-luxon-adapter';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinner, MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { Route, RouterModule } from '@angular/router';
import { FullCalendarModule } from '@fullcalendar/angular';
import { TeacherDetailsComponent } from 'app/modules/student/teacher-details/teacher-details.component';
import { SharedModule } from 'app/shared/shared.module';
import { AddBookingSubscriptionComponent } from './add-booking-subscription/add-booking-subscription.component';
import { AddBookingComponent } from './add-booking/add-booking.component';
import { AddReviewComponent } from './add-review/add-review.component';
import { SubscriptionsComponent } from './subscriptions/subscriptions.component';

const teacherDetailsRoutes: Route[] = [
    {
        path: '',
        component: TeacherDetailsComponent
    },
    {
        path: 'subscriptions',
        component: SubscriptionsComponent
    },
    {
        path: 'add-review',
        component: AddReviewComponent
    },
    {
        path: 'add-booking',
        component: AddBookingSubscriptionComponent
    },
    // {     //* Old Flow
    //     path: 'add-booking/:schedule_id',
    //     component: AddBookingComponent
    // }
];

@NgModule({
    declarations: [
        TeacherDetailsComponent,
        SubscriptionsComponent,
        AddReviewComponent,
        AddBookingSubscriptionComponent,
        AddBookingComponent,
    ],
    imports: [
        RouterModule.forChild(teacherDetailsRoutes),
        MatIconModule,
        SharedModule,
        MatButtonModule,
        MatButtonToggleModule,
        // MatChipsModule,
        MatDatepickerModule,
        MatDividerModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatLuxonDateModule,
        MatMenuModule,
        MatSelectModule,
        MatSelectModule,
        MatProgressSpinnerModule,
        FullCalendarModule
    ]
})
export class TeacherDetailsModule {
}
