import { Component, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { ApiService } from 'app/services/api.service';
import { filterDialogComponent } from './filter-dialog/filter-dialog.component';

@Component({
  selector: 'teachers',
  templateUrl: './teachers.component.html',
  styleUrls: ['./teachers.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TeachersComponent {

  teacherList: any[];
  subjectId: string;
  orderId: string;
  subjectDetails: any;

  selectedLanguage: string[] = [];
  selectedBoard: string[] = [];
  selectedCourse: string;
  selectedSubject: string[] = [];

  coursesAndSubjectsList: any[];

  constructor(private apiService: ApiService, private _activatedRoute: ActivatedRoute, private _router: Router, public dialog: MatDialog) {
    this._activatedRoute.params.subscribe(params => {
      this.subjectId = params["subject_id"];
      this.orderId = params["orderId"];
      console.log(this.subjectId);
      // if (this.subjectId) {
      //     this.getTeachersBySubjectIdFromServer();
      // } else {
      // }
      this.getTeacherListFromServer();
    });
  }

  async getTeacherListFromServer() {
    // this.isLoading = true;
    if (!this.coursesAndSubjectsList) {
      await this.getAllCourseWithSubjectFromServer();
    }
    this.apiService.getTeacherListWithFilter(this.selectedLanguage, this.selectedBoard, this.selectedSubject).subscribe(async (getTeacherListResponse: any) => {
      console.log(getTeacherListResponse);
      if (getTeacherListResponse?.data) {
        let _teacherList = getTeacherListResponse?.data;
        if (this?.selectedSubject?.length > 0) {
          _teacherList = getTeacherListResponse?.data.filter(f => f['teacher-subject'].length > 0);
        }
        this.teacherList = _teacherList.map(m => {
          //   return ({ ...m, rating: (m.review.reduce((e, ar) => e + ar.rating_star || 0, 0) / m.review?.length || 0).toFixed(1) })
          return ({ ...m, rating: Math.round(m.review.reduce((e, ar) => e + ar.rating_star || 0, 0) / m.review?.length || 0) })
        });;
        console.log("teacherList => ", this.teacherList);
      } else {
        // !! error handle
      }
      // this.isLoading = false;
    }, (err) => {
      console.log(err);
      // this.isLoading = false;
    });
  }
  async getAllCourseWithSubjectFromServer() {
    const getAllCourseWithSubjectForStudentResponse: any = await this.apiService.getAllCourseWithSubjectForStudent();
    // console.log(getAllCourseWithSubjectForStudentResponse);
    if (getAllCourseWithSubjectForStudentResponse?.data) {
      this.coursesAndSubjectsList = getAllCourseWithSubjectForStudentResponse.data;

      if (this.subjectId) {
        let _selectedSubjectDetails = this.coursesAndSubjectsList.map(m => m.subject).flat().find((f) => f.subject_id === this.subjectId);
        this.selectedCourse = _selectedSubjectDetails.course_id;
        this.selectedSubject = [_selectedSubjectDetails.subject_id];
      }
    }
    console.log("this.coursesAndSubjectsList => ", this.coursesAndSubjectsList);

  }

  //   getTeachersBySubjectIdFromServer() {
  //     // this.isLoading = true;
  //     this.apiService.getTeachersBySubjectIdWithFilter(this.subjectId, this.selectedLanguage, this.selectedBoard).subscribe(async (getTeachersBySubjectIdResponse: any) => {
  //       console.log(getTeachersBySubjectIdResponse);
  //       if (getTeachersBySubjectIdResponse.data) {
  //         let _data = getTeachersBySubjectIdResponse.data.filter(f => f?.teacher_id);
  //         if (_data[0]) {
  //           console.log(_data[0].subject_id);
  //           this.subjectDetails = _data[0].subject_id;
  //         }
  //         this.teacherList = _data.map(m => {
  //           return ({ ...m.teacher_id, rating: (m.teacher_id.review.reduce((e, ar) => e + ar.rating_star || 0, 0) / m.teacher_id.review?.length || 0).toFixed(1) })
  //         });;
  //         console.log("teacherList => ", this.teacherList);
  //       } else {
  //         // !! error handle
  //       }
  //       // this.isLoading = false;
  //     }, (err) => {
  //       console.log(err);
  //       // this.isLoading = false;
  //     });
  //   }

  goToTeacherDetails(teacherItem) {
    if (this.orderId) {
      this._router.navigate(['student', 'change-teacher', this.orderId, 'teachers', teacherItem.teacher_id]);
    } else {
      this._router.navigate(['student', 'teachers', teacherItem.teacher_id]);
    }
    // if (this.subjectDetails && this.subjectId) {
    // } else {
    //   this._router.navigate(['', teacherItem.teacher_id]);
    // }
  }

  openFilterDialog() {
    const dialogRef = this.dialog.open(filterDialogComponent, {
      width: "90%",
      maxWidth: "unset",
      panelClass: "teacherFilterClass",
      data: { selectedLanguage: this.selectedLanguage, selectedBoard: this.selectedBoard, selectedCourse: this.selectedCourse, selectedSubject: this.selectedSubject, coursesAndSubjectsList: this.coursesAndSubjectsList }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log(result);
        this.selectedLanguage = result.selectedLanguage;
        this.selectedBoard = result.selectedBoard;
        this.selectedCourse = result.selectedCourse;
        this.selectedSubject = result.selectedSubject;
        this.getTeacherListFromServer();
      }
    });
  }



  onTeacherImgError(event) {
    event.target.src = '../../../../assets/images/avatars/dummy user.png';
  }
}


// CBSE
// ICSE

// English
// Marathi
// Hindi
