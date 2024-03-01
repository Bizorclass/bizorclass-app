import { Component, ViewEncapsulation } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'app/modules/auth/auth.service';
import { ApiService } from 'app/services/api.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
    selector: 'history-classes',
    templateUrl: './history-classes.component.html',
    styleUrls: ['./history-classes.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class HistoryClassesComponent {

    isLoading: boolean = true;
    studentId: string;

    classesList: any[];

    private _unsubscribeAll: Subject<any> = new Subject<any>();

    constructor(private _activatedRoute: ActivatedRoute, private apiService: ApiService, private _snackBar: MatSnackBar, private _authService: AuthService) {
        this._authService.user.pipe((takeUntil(this._unsubscribeAll))).subscribe((user: any) => {
            // console.log({ user });
            // this.user = user;
            if (user && user?.student_id) {
                this.studentId = user?.student_id;
                this.getStudentClassesFromServer();
            }
        });
    }

    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }

    // getAllSubjectByCourseIdFromServer() {
    //     // this.isLoading = true;
    //     this.apiService.getAllSubjectByCourseId(this.course_id).subscribe(async (getAllSubjectByCourseIdResponse: any) => {
    //         console.log("getAllSubjectByCourseIdResponse => ", getAllSubjectByCourseIdResponse);
    //         if (getAllSubjectByCourseIdResponse?.data) {
    //             this.courseDetails = getAllSubjectByCourseIdResponse?.data;
    //             console.log("this.courseDetails => ", this.courseDetails);

    //         } else if (getAllSubjectByCourseIdResponse?.error?.message) {
    //             this._snackBar.open(getAllSubjectByCourseIdResponse?.error?.message, "", {
    //                 horizontalPosition: "center",
    //                 verticalPosition: "top",
    //                 duration: 3000,
    //                 // panelClass: ['success-toast']
    //                 panelClass: ['error-toast']
    //             })
    //         } else {
    //             this._snackBar.open("Something went wrong! Try again", "", {
    //                 horizontalPosition: "center",
    //                 verticalPosition: "top",
    //                 duration: 3000,
    //                 // panelClass: ['success-toast']
    //                 panelClass: ['error-toast']
    //             })
    //         }
    //     }, (err) => {
    //         console.log(err);
    //         this._snackBar.open("Something went wrong! Try again", "", {
    //             horizontalPosition: "center",
    //             verticalPosition: "top",
    //             duration: 3000,
    //             // panelClass: ['success-toast']
    //             panelClass: ['error-toast']
    //         })
    //     });
    // }

    async getStudentClassesFromServer() {
        try {
            this.isLoading = true;
            const getOrderByStudentIdResponse: any = await this.apiService.getHistoryOrderByStudentId(this.studentId);
            console.log("getOrderByStudentIdResponse => ", getOrderByStudentIdResponse);
            if (getOrderByStudentIdResponse?.data) {
                this.classesList = getOrderByStudentIdResponse?.data;
                console.log("this.classesList => ", this.classesList);

            } else if (getOrderByStudentIdResponse?.error?.message) {
                //! getOrderByStudentIdResponse?.error?.message
                this._snackBar.open(getOrderByStudentIdResponse?.error?.message, "", {
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
            this.isLoading = false;
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
            this.isLoading = false;
        }
    }

    getDateString(classItem) {
        return `${new Date(classItem?.start_date).toDateString()} - ${new Date(classItem?.end_date).toDateString()}`
    }

    getTimeString(classItem) {
        return `${this.time24to12Convert(classItem?.start_time)} - ${this.time24to12Convert(classItem?.end_time)}`
    }


    time24to12Convert(time) {
        // Check correct time format and split into components
        // time = time.toString().match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

        // if (time.length > 1) { // If time format correct
        //     time = time.slice(1); // Remove full string match value
        //     time[5] = +time[0] < 12 ? 'AM' : 'PM'; // Set AM/PM
        //     time[0] = +time[0] % 12 || 12; // Adjust hours
        // }
        // return time.join(''); // return adjusted time or original string


            const [hourString, minute] = time.split(":");
            const hour = +hourString % 24;
            return (hour % 12 || 12) + ":" + minute + (hour < 12 ? " AM" : " PM");

    }

    onTeacherImgError(event) {
        event.target.src = '../../../../assets/images/avatars/dummy user.png';
    }
}
