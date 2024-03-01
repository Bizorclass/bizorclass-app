import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiService } from 'app/services/api.service';

@Component({
    selector: 'fuse-confirmation-dialog',
    templateUrl: './details.component.html',
    styles: [
        `
            .fuse-confirmation-dialog-panel {

                @screen md {
                    @apply w-128;
                }

                .mat-mdc-dialog-container {

                    .mat-mdc-dialog-surface {
                        padding: 0 !important;
                    }
                }
            }
        `
    ],
    encapsulation: ViewEncapsulation.None
})
export class ScheduleDetailsComponent {

    scheduleForm:any = {
        // schedule_type: "",
        start_time: "",
        end_time: "",
        teacher_id: "",
        is_active: false,
        days: []
    };

    constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<ScheduleDetailsComponent>, private apiService: ApiService, private _snackBar: MatSnackBar) {
        console.log({data});
        this.scheduleForm = {...this.scheduleForm, ...data};

        console.log("this.scheduleForm => ", this.scheduleForm);

    }


    async saveSchedule() {
        if (this.scheduleForm?.schedule_id) {

            try {
                const updateScheduleResponse:any = await this.apiService.updateSchedule(this.scheduleForm).toPromise();
                console.log(updateScheduleResponse);
                if (updateScheduleResponse.data) {
                    this.closeModal(true);
                    this._snackBar.open("Schedule updated successfully.", "", {
                        horizontalPosition: "center",
                        verticalPosition: "top",
                        duration: 3000,
                        panelClass: ['success-toast']
                        // panelClass: ['error-toast']
                    });
                } else {
                    // !! error handle
                    throw updateScheduleResponse;
                }
            } catch (error) {
                console.error(error);

                if (error?.error?.message) {
                    this._snackBar.open(error?.error?.message, "", {
                        horizontalPosition: "center",
                        verticalPosition: "top",
                        duration: 3000,
                        // panelClass: ['success-toast']
                        panelClass: ['error-toast']
                    })
                } else {
                    this._snackBar.open("Something went wrong! Try again", "", {
                        horizontalPosition: "center",
                        verticalPosition: "top",
                        duration: 3000,
                        // panelClass: ['success-toast']
                        panelClass: ['error-toast']
                    })
                }
            }
        } else {
            const postBody = {...this.scheduleForm};
            delete postBody?.schedule_id;
            try {

                const addScheduleResponse:any = await this.apiService.addSchedule(postBody).toPromise();
                console.log(addScheduleResponse);
                if (addScheduleResponse.data) {
                    this.closeModal(true);
                    this._snackBar.open("Schedule added successfully.", "", {
                        horizontalPosition: "center",
                        verticalPosition: "top",
                        duration: 3000,
                        panelClass: ['success-toast']
                        // panelClass: ['error-toast']
                    })
                } else {
                    // !! error handle
                    throw addScheduleResponse;
                }
            } catch (error) {
                console.error(error);

                if (error?.error?.message) {
                    this._snackBar.open(error?.error?.message, "", {
                        horizontalPosition: "center",
                        verticalPosition: "top",
                        duration: 3000,
                        // panelClass: ['success-toast']
                        panelClass: ['error-toast']
                    })
                } else {
                    this._snackBar.open("Something went wrong! Try again", "", {
                        horizontalPosition: "center",
                        verticalPosition: "top",
                        duration: 3000,
                        // panelClass: ['success-toast']
                        panelClass: ['error-toast']
                    })
                }
            }
        }
    }

    closeModal(_result) {
        this.dialogRef.close({flag: _result});
    }
}
