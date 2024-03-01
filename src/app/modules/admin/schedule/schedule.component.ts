import { Component, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'app/modules/auth/auth.service';
import { ApiService } from 'app/services/api.service';
import { Subject, takeUntil } from 'rxjs';
import { ScheduleDetailsComponent } from './details/details.component';

@Component({
    selector: 'schedule',
    templateUrl: './schedule.component.html',
    encapsulation: ViewEncapsulation.None
})
export class ScheduleComponent {

    user = null;
    // displayedColumns: string[] = ['index', 'start_time', 'end_time', 'schedule_type', 'days'];
    displayedColumns: string[] = ['index', 'start_time', 'end_time', 'days', 'status', 'actions'];
    dataSource = [];

    isLoading: boolean = false;
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    constructor(private apiService: ApiService, private _authService: AuthService, public dialog: MatDialog) {
        this._authService.user.pipe((takeUntil(this._unsubscribeAll))).subscribe((user: any) => {
            // console.log({ user });
            this.user = user;
            if (user && user?.teacher_id) {
                this.getAllScheduleByTeacherIdFromServer();
            }
        });
    }

    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }



    getAllScheduleByTeacherIdFromServer() {
        this.isLoading = true;
        this.apiService.getAllScheduleByTeacherId(this.user.teacher_id).subscribe(async (getAllScheduleByTeacherIdResponse: any) => {
            console.log(getAllScheduleByTeacherIdResponse);
            if (getAllScheduleByTeacherIdResponse.data) {
                let _scheduleArray = getAllScheduleByTeacherIdResponse.data;
                this.dataSource = _scheduleArray.map((m, i) => ({ ...m, index: i + 1 }))
                console.log(this.dataSource);
            } else {
                // !! error handle
            }
            this.isLoading = false;
        }, (err) => {
            console.log(err);
            this.isLoading = false;
        });
    }

    createSchedule(_scheduleObject:any) {

        const dialogRef = this.dialog.open(ScheduleDetailsComponent, {
            width: 'min(350px, 90%)',
            data: {
                start_time: _scheduleObject?.start_time ? this.time24To12(_scheduleObject?.start_time) : '' || '',
                end_time: _scheduleObject?.end_time ? this.time24To12(_scheduleObject?.end_time) : '' || '',
                teacher_id: this.user.teacher_id,
                schedule_id: _scheduleObject?.schedule_id || null,
                is_active: _scheduleObject?.is_active || false,
                days: _scheduleObject?.days || []
            }
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed');
            console.log({ result });
            if (result?.flag) {
                this.getAllScheduleByTeacherIdFromServer();
            }
        });

    }

    htmlDays(_days: []) {
        return _days.map((m: string) => `${m.charAt(0).toUpperCase()}${m.slice(1)}`).join(",\xa0")
    }

    // time24To12(time) {
    //     // Check correct time format and split into components
    //     time = time.toString().match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

    //     if (time.length > 1) { // If time format correct
    //         time = time.slice(1);  // Remove full string match value
    //         time[5] = +time[0] < 12 ? ' AM' : ' PM'; // Set AM/PM
    //         time[0] = +time[0] % 12 || 12; // Adjust hours
    //     }
    //     return time.join(''); // return adjusted time or original string
    // }
    time24To12(time) {
        let timeArray = time.split(':');
        let hours = parseInt(timeArray[0], 10);
        let minutes = timeArray[1];
        let ampm = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12;
        hours = hours ? hours : 12;
        return hours + ':' + minutes + ' ' + ampm;
      }
}
