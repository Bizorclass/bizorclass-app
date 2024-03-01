import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'app/modules/auth/auth.service';
import { ApiService } from 'app/services/api.service';
import { environment } from 'environments/environment';
import { Subject, takeUntil } from 'rxjs';
declare const Razorpay: any;

@Component({
  selector: 'subscriptions',
  templateUrl: './subscriptions.component.html',
  styleUrls: ['subscriptions.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SubscriptionsComponent implements OnInit, OnDestroy {

  teacher_id: string;
  student_id: string;
  user: any;
  subscriptionsList: any[];
  selectedPlan: any;
  private _unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(private _activatedRoute: ActivatedRoute, private apiService: ApiService, private _authService: AuthService, private _changeDetectorRef: ChangeDetectorRef, private _snackBar: MatSnackBar) {
    this._activatedRoute.params.subscribe(params => {
      this.teacher_id = params["teacher_id"];
      console.log(this.teacher_id);

      if (this.teacher_id) {
        this.getAllSubscriptionsFromServer();
      }
    });
    this._authService.user.pipe((takeUntil(this._unsubscribeAll))).subscribe((user: any) => {
      // console.log({ user });
      if (user && user?.student_id) {
        this.user = user;
        this.student_id = user?.student_id;
        this.getAllSubscriptionsFromServer();
      }
    });
  }
  ngOnInit(): void {

  }
  ngOnDestroy(): void {
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }

  getAllSubscriptionsFromServer() {
    if (this.teacher_id && this.student_id) {

      this.apiService.getStudentSubscribedToTeacherPlan(this.teacher_id, this.student_id).subscribe(async (getAllSubscriptionsResponse: any) => {
        //todo update Object
        if (getAllSubscriptionsResponse.data) {
          let _subscriptionsList = getAllSubscriptionsResponse.data.map(m => ({ ...m, isConnected: Boolean(m['subscription-teacher-user']?.length) }));
          this.subscriptionsList = [..._subscriptionsList];

          console.log(this.subscriptionsList);
          this._changeDetectorRef.markForCheck();

        } else {
          console.log(getAllSubscriptionsResponse);
        }
      }, (err) => {
        console.log(err);
      });
    }
  }


  connectToPlan(subscriptionData: any) {
    this.selectedPlan = subscriptionData;

    var options = {
      "key": environment.razorpay_Key,
      "amount": this.selectedPlan.price * 100, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      "currency": "INR",
      "name": "Bizorclass",
      "description": "Subscribe to " + this.selectedPlan?.title,
      // "image": "https://example.com/your_logo",
      "handler": this.razorpayResponse,
      "prefill": {
        "name": this.user?.first_name + ' ' + this.user?.last_name,
        "email": this.user?.email,
        "contact": this.user?.phone_number
      },
    }

    this.processForRazorpay(options);
  }

  processForRazorpay(options: any) {
    var rzp1 = new Razorpay(options);
    rzp1.on('payment.failed', this.paymentFailed);
    rzp1.open();
  }

  paymentFailed = (paymentFailedResponse: any) => {
    console.log("paymentFailed => ", paymentFailedResponse);

    // this.alertToastService.ToastWithMessageColorDuration(paymentFailedResponse.error.description, 'danger', 2000);
    alert(paymentFailedResponse.error.description);
  }

  razorpayResponse = async (paymentResponse: any) => {
    console.log(paymentResponse.razorpay_payment_id);
    // this.subscriptionService.subscription_plan_connect_with_user(this.user.uid, this.selectedPlan, paymentResponse).then(res => {
    //   this.alertToastService.ToastWithMessageColorDuration('Subscription Connect success', 'success', 2000);
    //   this.getUserSubscriptionData();
    // }).catch(err => {
    //   console.log(err);
    // //   this.alertToastService.ToastWithMessageColorDuration('Something went wrong! Try again.', 'danger', 2000);
    //   alert('Something went wrong! Try again.');
    // })

    let postBody = {
      teacher_id: this.teacher_id,
      student_id: this.student_id,
      subscription_plan_id: this.selectedPlan?.subscription_plan_id,
      razorpay_payment_id: paymentResponse.razorpay_payment_id,
      total_price: this.selectedPlan?.price
    }

    try {
      const studentSubscribeToPlanResponse: any = await this.apiService.studentSubscribeToPlan(postBody);
      console.log("studentSubscribeToPlanResponse => ", studentSubscribeToPlanResponse);

      if (studentSubscribeToPlanResponse?.data) {
        this._snackBar.open("Plan connected successfully.", "", {
          horizontalPosition: "center",
          verticalPosition: "top",
          duration: 3000,
          panelClass: ['success-toast']
          // panelClass: ['error-toast']
        });
        this.getAllSubscriptionsFromServer();
      } else if (studentSubscribeToPlanResponse?.error?.message) {
        //! studentSubscribeToPlanResponse?.error?.message
        this._snackBar.open(studentSubscribeToPlanResponse?.error?.message, "", {
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
      }
      //! Something went wrong! Try again
      this._snackBar.open("Something went wrong! Try again", "", {
        horizontalPosition: "center",
        verticalPosition: "top",
        duration: 3000,
        // panelClass: ['success-toast']
        panelClass: ['error-toast']
      });
    }
  }



  onTeacherImgError(event) {
    event.target.src = '../../../../assets/images/avatars/dummy user.png';
  }
}
