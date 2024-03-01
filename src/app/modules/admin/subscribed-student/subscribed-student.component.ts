import { Component, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'app/modules/auth/auth.service';
import { ApiService } from 'app/services/api.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
    selector: 'subscribed-student',
    templateUrl: './subscribed-student.component.html',
    encapsulation: ViewEncapsulation.None
})
export class SubscribedStudentComponent {

    user = null;
    displayedColumns: string[] = ['index', 'student_name', 'teacher_name', 'subscription', 'start_date', 'end_date'];
    dataSource = [];
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
        this.apiService.getTeacherSubscribersStudentByTeacherId(this.user.teacher_id).subscribe(async (getAllScheduleByTeacherIdResponse: any) => {
            console.log(getAllScheduleByTeacherIdResponse);
            if (getAllScheduleByTeacherIdResponse.data) {
                let _scheduleArray = getAllScheduleByTeacherIdResponse.data;
                this.dataSource = _scheduleArray.map((m, i) => ({
                    ...m,
                    index: i+1,
                    student_name: `${m?.student_id?.first_name} ${m?.student_id?.last_name}`,
                    subscription: m.subscription_plan_id.title,
                    teacher_name: `${m?.teacher_id?.first_name} ${m?.teacher_id?.last_name}`,
                    start_date: m?.order[0]?.start_date || '--',
                    end_date: m?.order[0]?.end_date || '--',
                }))
                console.log(this.dataSource);
            } else {
                // !! error handle
            }
        }, (err) => {
            console.log(err);
        });
    }

    // createSchedule() {
    //     const dialogRef = this.dialog.open(ScheduleDetailsComponent, {
    //         width: '250px',
    //         data: { start_time: "", end_time: "", teacher_id: this.user.teacher_id }
    //     });

    //     dialogRef.afterClosed().subscribe(result => {
    //         console.log('The dialog was closed');
    //         console.log({ result });
    //         if (result?.flag) {
    //             this.getAllScheduleByTeacherIdFromServer();
    //         }
    //     });

    // }

    getDateString(_date) {
        if (_date) {
            return new Date(_date).toDateString();
        } else {
            return "--"
        }
    }
}
