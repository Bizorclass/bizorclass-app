import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';;
import { SharedModule } from 'app/shared/shared.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NgxMatTimepickerModule } from 'ngx-mat-timepicker';
import { ClassesComponent } from './classes.component';

const classesRoutes: Route[] = [
  {
    path: '',
    component: ClassesComponent
  }
];

@NgModule({
  declarations: [
    ClassesComponent
  ],
  imports: [
    RouterModule.forChild(classesRoutes),
    MatTableModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    NgxMatTimepickerModule,
    SharedModule,
  ]
})
export class ClassesModule {
}
