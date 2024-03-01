import { Location } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'app/modules/auth/auth.service';
import { ApiService } from 'app/services/api.service';
import { environment } from 'environments/environment';
import { Subject, takeUntil } from 'rxjs';
declare const Razorpay: any;


@Component({
  selector: 'add-review',
  templateUrl: './add-review.component.html',
  styleUrls: ['add-review.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddReviewComponent implements OnInit, OnDestroy {

  teacher_id: string;
  teacherDetails: any;

  student_id: string;
  user: any;

  subscriptionsList: any[];
  selectedPlan: any;
  private _unsubscribeAll: Subject<any> = new Subject<any>();

  reviewObject = {
    rating_star: 0,
    text: ""
  }
  messageHelperText: string = "";

  constructor(private _activatedRoute: ActivatedRoute, private apiService: ApiService, private _authService: AuthService, private _changeDetectorRef: ChangeDetectorRef, private _snackBar: MatSnackBar, private _router: Router, private _location: Location) {
    this._activatedRoute.params.subscribe(params => {
      this.teacher_id = params["teacher_id"];
      console.log(this.teacher_id);
      if (this.teacher_id) {
        this.getTeacherFromServer();
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

  getTeacherFromServer() {
    this.apiService.getTeacherById(this.teacher_id).subscribe(async (getTeacherByIdResponse: any) => {
      console.log(getTeacherByIdResponse);
      //todo update Object
      if (getTeacherByIdResponse.data) {
        let _teacherObject = Array.isArray(getTeacherByIdResponse.data) ? getTeacherByIdResponse.data[0] : getTeacherByIdResponse.data;
        console.log(_teacherObject);
        this.teacherDetails = _teacherObject;
        this._changeDetectorRef.detectChanges();
      }
    }, (err) => {
      console.log(err);
    });
  }

  checkMessage() {
    if (!this.reviewObject.text.trim()) {
        this.messageHelperText = "Please enter review message.";
    } else {
        this.messageHelperText = "";
    }
  }

  async clickOnSubmit() {
    this.checkMessage();
    if (!this.messageHelperText) {
        const postBody = {
            student_id: this.student_id,
            teacher_id: this.teacher_id,
            text: this.reviewObject.text,
            rating_star: this.reviewObject.rating_star
        }

        try {
            const addReviewResponse:any = await this.apiService.addReview(postBody);
            console.log("addReviewResponse => ", addReviewResponse);

            if (addReviewResponse?.data) {
                this._snackBar.open("Review added successfully.", "", {
                    horizontalPosition: "center",
                    verticalPosition: "top",
                    duration: 3000,
                    panelClass: ['success-toast']
                    // panelClass: ['error-toast']
                });
                this.reviewObject = {
                    rating_star: 0,
                    text: ""
                }
                this.messageHelperText = "";
                this._location.back();
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
            }
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

  onTeacherImgError(event) {
    event.target.src = '../../../../assets/images/avatars/dummy user.png';
  }
}
