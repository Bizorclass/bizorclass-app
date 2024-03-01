import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { ApexOptions } from 'ng-apexcharts';
import { DashboardService } from 'app/modules/admin/dashboard/dashboard.service';
import { AuthService } from 'app/modules/auth/auth.service';
import { ApiService } from 'app/services/api.service';

@Component({
    selector: 'dashboard',
    templateUrl: './dashboard.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    styles: [`
        /* mat-tab: { */
            .mdc-tab__text-label {
                color: var(--color-dark) !important;
            }
        /* } */
    `]
})
export class DashboardComponent implements OnInit, OnDestroy {

    user: any;
    scheduleCount = "...";
    subscribedStudentCount = "...";
    // studentCount = "...";
    // revenue = "0";

    private _unsubscribeAll: Subject<any> = new Subject<any>();

    constructor(private _authService: AuthService, private _router: Router, private apiService: ApiService, private _changeDetectorRef: ChangeDetectorRef) { }

    ngOnInit(): void {
        this._authService.user.pipe((takeUntil(this._unsubscribeAll))).subscribe((user: any) => {
            // console.log({ user });
            this.user = user;
            if (user && user?.teacher_id) {
                this.getDataFromServer();
            }
        });
    }

    getDataFromServer() {
        this.apiService.dashboardApiForTeacherAnalytics(this.user.teacher_id).subscribe(async (dashboardApiForAnalyticsResponse: any) => {
            console.log(dashboardApiForAnalyticsResponse);
            //todo update Object
            if (dashboardApiForAnalyticsResponse) {
                this.scheduleCount = dashboardApiForAnalyticsResponse?.scheduleCount;
                this.subscribedStudentCount = dashboardApiForAnalyticsResponse?.subscribedStudentCount;
                // this.studentCount = dashboardApiForAnalyticsResponse?.studentCount;
                this._changeDetectorRef.markForCheck();
            }
        }, (err) => {
            console.log(err);
        });
    }

    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }

}
