import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FuseCardModule } from '@fuse/components/card';
import { SharedModule } from 'app/shared/shared.module';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { ClassDetailsComponent } from './class-details.component';
import { ClassDetailsRoutes } from './class-details.routing';
import { ConfirmCancelDialogComponent } from './confirm-cancel-dialog/confirm-cancel-Dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import {MatChipsModule} from '@angular/material/chips';

@NgModule({
  declarations: [
    ClassDetailsComponent,
    ConfirmCancelDialogComponent
  ],
  imports: [
    RouterModule.forChild(ClassDetailsRoutes),
    MatButtonModule,
    MatCheckboxModule,
    MatDividerModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatMenuModule,
    MatTooltipModule,
    MatSelectModule,
    FuseCardModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatChipsModule,
    SharedModule
  ]
})
export class ClassDetailsModule {
}
