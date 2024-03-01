import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Route, RouterModule } from '@angular/router';
import { CourseDetailsComponent } from 'app/modules/student/course-details/course-details.component';
import { SharedModule } from 'app/shared/shared.module';
import { TeachersComponent } from '../teachers/teachers.component';

const courseDetailsRoutes: Route[] = [
    {
        path: '',
        component: CourseDetailsComponent
    },
    {
        path: ':subject_id',
        // component: TeachersComponent
        loadChildren: () => import('../teachers/teachers.module').then(m => m.TeachersModule)
    }
];

@NgModule({
    declarations: [
        CourseDetailsComponent
    ],
    imports: [
        RouterModule.forChild(courseDetailsRoutes),
        SharedModule,
        MatIconModule,
    ]
})
export class CourseDetailsModule {
}
