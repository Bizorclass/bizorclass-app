import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { AuthService } from 'app/modules/auth/auth.service';
import { ApiService } from 'app/services/api.service';
import { environment } from 'environments/environment';
import { Subject, takeUntil } from 'rxjs';
declare const Razorpay: any;


@Component({
  selector: 'add-booking',
  templateUrl: './add-booking.component.html',
  styleUrls: ['add-booking.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddBookingComponent implements OnInit, OnDestroy {

  teacher_id: string;
  teacherDetails: any;

  schedule_id: string;
  scheduleDetails: any;

  student_id: string;
  user: any;

  startDate: string;
  endDate: string;
  booking_type: string = "single";
  group_details: string[] = [];

  subscriptionsList: any[];
  selectedPlan: any;
  private _unsubscribeAll: Subject<any> = new Subject<any>();

  reviewObject = {
    rating_star: 0,
    text: ""
  }

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [interactionPlugin, dayGridPlugin],
    dateClick: (e) => this.handleDateClick(e),
    businessHours: {
      // days of week. an array of zero-based day of week integers (0=Sunday)
      daysOfWeek: [], // Monday - Thursday
      display: 'background',
      color: '#8fdf82',
    },
    // events: [
    //   { title: 'event 1', date: '2023-03-01' },
    //   { title: 'event 2', date: '2023-03-02' },
    //   {
    //     start: '2023-03-10',
    //     // end: '2023-03-11T12:30:00',
    //     title: 'Booked',
    //     display: 'background',
    //     color: '#fa8072',
    //     overlap: true,
    //   }
    // ],
    height: 'auto',
  };

  constructor(private _activatedRoute: ActivatedRoute, private apiService: ApiService, private _authService: AuthService, private _changeDetectorRef: ChangeDetectorRef, private _snackBar: MatSnackBar, private _router: Router) {
    this._activatedRoute.params.subscribe(params => {
      this.teacher_id = params["teacher_id"];
      this.schedule_id = params["schedule_id"];
      console.log(this.teacher_id);
      console.log(this.schedule_id);

      if (this.teacher_id && this.schedule_id) {
        this.getScheduleByScheduleIdFromServer();
      }
    });
    this._authService.user.pipe((takeUntil(this._unsubscribeAll))).subscribe((user: any) => {
      // console.log({ user });
      if (user && user?.student_id) {
        this.user = user;
        this.student_id = user?.student_id;
      }
    });
  }
  ngOnInit(): void {

  }
  ngOnDestroy(): void {
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }

  getScheduleByScheduleIdFromServer() {
    this.apiService.getScheduleByScheduleId(this.schedule_id).subscribe(async (getScheduleByScheduleIdResponse: any) => {
      console.log(getScheduleByScheduleIdResponse);
      //todo update Object
      if (getScheduleByScheduleIdResponse.data) {
        this.teacherDetails = getScheduleByScheduleIdResponse.data.teacher_id;
        this.scheduleDetails = getScheduleByScheduleIdResponse.data;
        console.log(this.teacherDetails);
        console.log(this.scheduleDetails);

        let days = getScheduleByScheduleIdResponse.data.days.map(m => this.getWeekNumber(m));
        console.log({ days });
        this.calendarOptions.businessHours = {
          // days of week. an array of zero-based day of week integers (0=Sunday)
          daysOfWeek: days, // Monday - Thursday
          display: 'background',
          color: '#8fdf82',
        }

        this._changeDetectorRef.detectChanges();
      }
    }, (err) => {
      console.log(err);
    });
  }

  handleDateClick(arg) {
    console.log('arg => ', arg);
    console.log('date click => ' + arg.dateStr);

    if (this.scheduleDetails.days.some(s => s === this.getWeekName(new Date(arg.dateStr).getDay()))) {
      this.startDate = arg.dateStr;
      this.endDate = arg.dateStr;

      this.calendarOptions.events = [{
        start: arg.dateStr,
        end: arg.dateStr,
        title: 'Select',
        display: 'background',
        color: '#fa8072',
        overlap: true,
        className: "selectedDate"
      }]
    } else {
      this.startDate = "";
      this.endDate = "";

      this.calendarOptions.events = [];
      this._snackBar.open("Please select available date.", "", {
        horizontalPosition: "center",
        verticalPosition: "top",
        duration: 3000,
        // panelClass: ['success-toast']
        panelClass: ['error-toast']
      })
    }
    this._changeDetectorRef.detectChanges();
  }

  async processToBook() {
    const postBody = {
      start_date: this.startDate,
      end_date: this.endDate,
      start_time: this.scheduleDetails.start_time,
      end_time: this.scheduleDetails.end_time,
      student_id: this.student_id,
      teacher_id: this.teacher_id,
      schedule_id: this.schedule_id,
      booking_type: this.booking_type,
      group_details: this.group_details
    }
    console.log(postBody);

    try {
        const addReviewResponse:any = await this.apiService.bookTeacherScheduleSlot(postBody);
        console.log("addReviewResponse => ", addReviewResponse);

        if (addReviewResponse?.data) {
            this._snackBar.open("Slot booking successfully.", "", {
                horizontalPosition: "center",
                verticalPosition: "top",
                duration: 3000,
                panelClass: ['success-toast']
                // panelClass: ['error-toast']
            });

            this._router.navigate(['../']);
        } else if (addReviewResponse?.error?.message) {
            //! addReviewResponse?.error?.message
            this._snackBar.open(addReviewResponse?.error?.message, "", {
                horizontalPosition: "center",
                verticalPosition: "top",
                duration: 3000,
                // panelClass: ['success-toast']
                panelClass: ['error-toast']
            })
        } else {
            //! Something went wrong! Try again
            this._snackBar.open("Something went wrong! Try again", "", {
                horizontalPosition: "center",
                verticalPosition: "top",
                duration: 3000,
                // panelClass: ['success-toast']
                panelClass: ['error-toast']
            })
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

  changeGroupType(_groupType: string) {
    if (_groupType === "single") {
        this.group_details = [];
    } else {
        this.group_details = [""];
    }
  }

  inputChange(i, event) {
    console.log(event.target.value);

    this.group_details[i] = event.target.value;
  }

  addStudentField() {
    this.group_details.push("");
  }

  removeStudentField(i) {
    this.group_details.splice(i,1);
  }


  isBookButtonDisable() {
    if (this.booking_type === "single") {
        return Boolean(!this.startDate && !this.endDate);
    } else {
        if (!this.group_details.length) {
            return true;
        } else {
            let flag = false;
            this.group_details.forEach(ele => {
                if (!ele) {
                    flag = true;
                }
            })
            if (!this.startDate && !this.endDate) {
                flag = true;
            }
            return flag;
        }
    }
  }


  getWeekNumber(str: string) {
    const arr = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
    return arr.findIndex(f => f === str);
  }
  getWeekName(num: number) {
    const arr = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
    return arr[num];
  }
  onTeacherImgError(event) {
    event.target.src = '../../../../assets/images/avatars/dummy user.png';
  }
  trackByIdx(index: number, obj: any): any {
    return index;
  }
}
