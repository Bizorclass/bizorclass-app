import { Component, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'app/modules/auth/auth.service';
import { ApiService } from 'app/services/api.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'classes',
  templateUrl: './classes.component.html',
  styleUrls: ['./classes.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ClassesComponent {

  user = null;
  displayedColumns: string[] = ['index', 'student_name', 'start_date', 'end_date', 'start_time', 'end_time'];
  dataSource = [];
  isLoading: boolean = false;
  private _unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(private apiService: ApiService, private _authService: AuthService, public dialog: MatDialog) {
    this._authService.user.pipe((takeUntil(this._unsubscribeAll))).subscribe((user: any) => {
      // console.log({ user });
      this.user = user;
      if (user && user?.teacher_id) {
        this.getTodayAllOrdersByTeacherIdFromServer();
      }
    });
  }

  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }



  getTodayAllOrdersByTeacherIdFromServer() {
    this.isLoading = true;
    this.apiService.getOngoingOrderByTeacherId(this.user.teacher_id).subscribe(async (getAllOrdersByTeacherIdResponse: any) => {
      console.log(getAllOrdersByTeacherIdResponse);
      if (getAllOrdersByTeacherIdResponse.data) {
        let _scheduleArray = getAllOrdersByTeacherIdResponse.data;
        this.dataSource = _scheduleArray.map((m, i) => ({
          ...m,
          index: i + 1,
          student_name: `${m?.student_id?.first_name} ${m?.student_id?.last_name}`,
          start_time: m?.start_time || '--',
          end_time: m?.end_time || '--',
          start_date: new Date(m.start_date).toDateString() || "__/__/____",
          end_date: new Date(m.end_date).toDateString() || "__/__/____",
        }))
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


  // createSchedule() {
  //     const dialogRef = this.dialog.open(ScheduleDetailsComponent, {
  //         width: '250px',
  //         data: { start_time: "", end_time: "", teacher_id: this.user.teacher_id }
  //     });

  //     dialogRef.afterClosed().subscribe(result => {
  //         console.log('The dialog was closed');
  //         console.log({ result });
  //         if (result?.flag) {
  //             this.getTodayAllOrdersByTeacherIdFromServer();
  //         }
  //     });

  // }

  openMap(classItem) {
    console.log(classItem);
    if (classItem?.latitude && classItem?.longitude) {
      const url = `https://maps.google.com/maps?q=${classItem?.latitude},${classItem?.longitude}`;
      window.open(url, '_blank');
    }
  }

  getDateString(classItem) {
    return `${new Date(classItem?.start_date).toDateString()} - ${new Date(classItem?.end_date).toDateString()}`
  }
  getTimeString(classItem) {
    return `${this.time24to12Convert(classItem?.start_time)} - ${this.time24to12Convert(classItem?.end_time)}`
  }
  time24to12Convert(time) {
    const [hourString, minute] = time.split(":");
    const hour = +hourString % 24;
    return (hour % 12 || 12) + ":" + minute + (hour < 12 ? " AM" : " PM");
  }
  onTeacherImgError(event) {
    event.target.src = '../../../../assets/images/avatars/dummy user.png';
  }
}
