import { Component, ViewEncapsulation, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'confirm-cancel-dialog',
  templateUrl: './confirm-cancel-dialog.component.html',
  styleUrls: ['./confirm-cancel-dialog.component.scss'],
})
export class ConfirmCancelDialogComponent {

  cancel_reason:string;

  constructor(public dialogRef: MatDialogRef<ConfirmCancelDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private _snackBar: MatSnackBar) {
  }

  onConfirm(): void {
    if (this.cancel_reason) {
      this.dialogRef.close({cancel_reason: this.cancel_reason});
    } else {
      this._snackBar.open("Please enter cancellation reason.", "", {
        horizontalPosition: "center",
        verticalPosition: "top",
        duration: 4000,
        //   panelClass: ['success-toast']
        panelClass: ['error-toast']
    });
    }
  }
}
