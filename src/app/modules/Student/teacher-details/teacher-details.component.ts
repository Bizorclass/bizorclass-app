import { Component, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'app/services/api.service';

@Component({
  selector: 'teacher-details',
  templateUrl: './teacher-details.component.html',
  styleUrls: ['teacher-details.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TeacherDetailsComponent {

  teacher_id: string;
  orderId: string;
  teacherDetails: any;

  constructor(private _activatedRoute: ActivatedRoute, private apiService: ApiService) {
    this._activatedRoute.params.subscribe(params => {
      this.teacher_id = params["teacher_id"];
      this.orderId = params["orderId"];
      console.log(this.teacher_id);

      if (this.teacher_id) {
        this.getTeacherFromServer();
      }
    });
  }

  getTeacherFromServer() {
    this.apiService.getTeacherById(this.teacher_id).subscribe(async (getTeacherByIdResponse: any) => {
      console.log(getTeacherByIdResponse);
      //todo update Object
      if (getTeacherByIdResponse.data) {
        let _teacherObject = Array.isArray(getTeacherByIdResponse.data) ? getTeacherByIdResponse.data[0] : getTeacherByIdResponse.data;
        _teacherObject.rating = Math.round(_teacherObject.review.reduce((e, ar) => e + ar.rating_star || 0, 0) / _teacherObject.review?.length || 0);
        console.log(_teacherObject);
        this.teacherDetails = _teacherObject;
      }
    }, (err) => {
      console.log(err);
    });
  }



  onTeacherImgError(event){
    event.target.src = '../../../../assets/images/avatars/dummy user.png';
  }
}
