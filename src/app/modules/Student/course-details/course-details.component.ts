import { Component, ViewEncapsulation } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'app/services/api.service';

@Component({
  selector: 'course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CourseDetailsComponent {

  course_id: string;
  courseDetails: any;

  constructor(private _activatedRoute: ActivatedRoute, private apiService: ApiService, private _snackBar: MatSnackBar) {
    this._activatedRoute.params.subscribe(params => {
      this.course_id = params["course_id"];
      console.log(this.course_id);
      if (this.course_id) {
        this.getAllSubjectByCourseIdFromServer();
      }
    });
  }

  getAllSubjectByCourseIdFromServer() {
    // this.isLoading = true;
    this.apiService.getAllSubjectByCourseId(this.course_id).subscribe(async (getAllSubjectByCourseIdResponse: any) => {
      console.log("getAllSubjectByCourseIdResponse => ", getAllSubjectByCourseIdResponse);
      if (getAllSubjectByCourseIdResponse?.data) {
        this.courseDetails = getAllSubjectByCourseIdResponse?.data;
        console.log("this.courseDetails => ", this.courseDetails);

      } else if (getAllSubjectByCourseIdResponse?.error?.message) {
        this._snackBar.open(getAllSubjectByCourseIdResponse?.error?.message, "", {
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
    }, (err) => {
      console.log(err);
      this._snackBar.open("Something went wrong! Try again", "", {
        horizontalPosition: "center",
        verticalPosition: "top",
        duration: 3000,
        // panelClass: ['success-toast']
        panelClass: ['error-toast']
      })
    });
  }



  onTeacherImgError(event) {
    event.target.src = '../../../../assets/images/avatars/dummy user.png';
  }
}
