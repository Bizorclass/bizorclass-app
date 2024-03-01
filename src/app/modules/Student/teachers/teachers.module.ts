import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { Route, RouterModule } from '@angular/router';
import { TeachersComponent } from 'app/modules/student/teachers/teachers.component';
import { SharedModule } from 'app/shared/shared.module';
import { filterDialogComponent } from './filter-dialog/filter-dialog.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSelectModule } from '@angular/material/select';

const teacherRoutes: Route[] = [
  {
    path: '',
    component: TeachersComponent
  }
];

@NgModule({
  declarations: [
    TeachersComponent,
    filterDialogComponent
  ],
  imports: [
    RouterModule.forChild(teacherRoutes),
    SharedModule,
    MatIconModule,
    MatDialogModule,
    MatButtonModule,
    MatExpansionModule,
    MatSelectModule,
  ]
})
export class TeachersModule {
}
