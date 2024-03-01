import { Component, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'app/services/api.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmCancelDialogComponent } from './confirm-cancel-dialog/confirm-cancel-Dialog.component';

@Component({
  selector: 'class-details',
  templateUrl: './class-details.component.html',
  styleUrls: ['class-details.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ClassDetailsComponent {

  orderId: string;
  teacherDetails: any;
  orderDetails: any;
  isLoading: boolean = false;

  constructor(private _activatedRoute: ActivatedRoute, private apiService: ApiService, private _snackBar: MatSnackBar, public dialog: MatDialog, private _router: Router) {
    this._activatedRoute.params.subscribe(params => {
      this.orderId = params["orderId"];
      console.log(this.orderId);

      if (this.orderId) {
        this.getOrderFromServer();
      }
    });
  }

  async getOrderFromServer() {
    try {
      const getOrderByIdResponse: any = await this.apiService.getOrderById(this.orderId);
      console.log("getOrderByIdResponse => ", getOrderByIdResponse);

      if (getOrderByIdResponse.data) {
        let _orderDetails = getOrderByIdResponse.data;
        _orderDetails.isChangeRequestPending = _orderDetails?.['change-teacher-request']?.some(s => s?.request_status === 'pending');
        _orderDetails.isChangeRequestReject = _orderDetails?.['change-teacher-request']?.some(s => s?.request_status === 'reject');
        _orderDetails.isChangeRequestAccept = _orderDetails?.['change-teacher-request']?.some(s => s?.request_status === 'accept');

        if (_orderDetails.isChangeRequestPending || _orderDetails.isChangeRequestReject || _orderDetails.isChangeRequestAccept) {
          _orderDetails.changeRequestDetails = _orderDetails?.['change-teacher-request'][0];
        }


        this.orderDetails = _orderDetails;
        console.log("this.orderDetails -> ", this.orderDetails);
      } else {
        throw getOrderByIdResponse;
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

    // this.apiService.getOrderById(this.orderId).subscribe(async (getTeacherByIdResponse: any) => {
    //   console.log(getTeacherByIdResponse);
    //   //todo update Object
    //   if (getTeacherByIdResponse.data) {
    //     let _teacherObject = Array.isArray(getTeacherByIdResponse.data) ? getTeacherByIdResponse.data[0] : getTeacherByIdResponse.data;
    //     _teacherObject.rating = Math.round(_teacherObject.review.reduce((e, ar) => e + ar.rating_star || 0, 0) / _teacherObject.review?.length || 0);
    //     console.log(_teacherObject);
    //     this.teacherDetails = _teacherObject;
    //   }
    // }, (err) => {
    //   console.log(err);
    // });
  }

  async processForCancel() {
    console.log("--> processForCancel");
    const dialogRef = this.dialog.open(ConfirmCancelDialogComponent, {
      width: "90%",
      maxWidth: "unset",
      panelClass: "ConfirmCancelDialogComponentClass",
      data: { name: null },
    });

    dialogRef.afterClosed().subscribe(async result => {
      console.log('The dialog was closed => ', result);
      if (result?.cancel_reason) {

        try {
          this.isLoading = true;
          const cancelOrderByOrderIdResponse:any = await this.apiService.cancelOrderByOrderId({ order_id: this.orderDetails.order_id, cancel_reason: result?.cancel_reason });
          console.log("cancelOrderByOrderIdResponse -> ", cancelOrderByOrderIdResponse);
          if (cancelOrderByOrderIdResponse.success) {
            this._snackBar.open("Cancellation Request created successfully.", "", {
              horizontalPosition: "center",
              verticalPosition: "top",
              duration: 3000,
              panelClass: ['success-toast']
              // panelClass: ['error-toast']
            });
            this.orderDetails = cancelOrderByOrderIdResponse.data;
          } else {
            throw cancelOrderByOrderIdResponse;
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
            });
          } else {
            //! Something went wrong! Try again
            this._snackBar.open("Something went wrong! Try again", "", {
              horizontalPosition: "center",
              verticalPosition: "top",
              duration: 3000,
              // panelClass: ['success-toast']
              panelClass: ['error-toast']
            });
          }
          this.isLoading = false;
        }
      }
    });

  }

  isCancelButtonDisable() {
    if (!this.orderDetails) {
      return true;
    } else if(this.orderDetails?.cancel_status) {
      return true;
    } else {
      //   return !Boolean(new Date(this.orderDetails?.start_date) <= new Date())

      var datetimeString = this.orderDetails?.start_date + 'T' + this.orderDetails?.start_time;
      var datetime = new Date(datetimeString);

      var date24HoursAgo = new Date(Date.now() + 24 * 60 * 60 * 1000);
      //   console.log({date24HoursAgo, datetime});

      if (datetime > date24HoursAgo) {
        return false;
      } else {
        return true;
      }
    }
  }

  goToTeachers() {
    this._router.navigate(['student', 'change-teacher', this.orderId, 'teachers']);
  }

  getDateString() {
    return `${new Date(this.orderDetails?.start_date).toDateString()} - ${new Date(this.orderDetails?.end_date).toDateString()}`
  }

  getTimeString() {
    return `${this.time24to12Convert(this.orderDetails?.start_time)} - ${this.time24to12Convert(this.orderDetails?.end_time)}`
  }

  onTeacherImgError(event) {
    event.target.src = '../../../../assets/images/avatars/dummy user.png';
  }

  time24to12Convert(time) {
    const [hourString, minute] = time.split(":");
    const hour = +hourString % 24;
    return (hour % 12 || 12) + ":" + minute + (hour < 12 ? " AM" : " PM");
  }
}
