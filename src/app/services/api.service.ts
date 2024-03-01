import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  userLogin(postData: any) {
    return this.http.post(environment.backendApiBaseUrl + 'adminLogin', postData);
  }
  teacherLogin(postData: any) {
    return this.http.post(environment.backendApiBaseUrl + 'teacherLogin', postData);
  }
  studentLogin(postData: any) {
    return this.http.post(environment.backendApiBaseUrl + 'student/studentLogin', postData);
  }

  sendOTP(postBody: any) {
    console.log(postBody);

    // const httpOptions = {
    //     headers: new HttpHeaders({
    //       'Content-Type':  'application/x-www-form-urlencoded',
    //       'auth': {username: environment.twilioAccountSID, password: environment.twilioAuthToken}
    //     })
    //   };
    // return this.http.post(
    //     `https://api.twilio.com/2010-04-01/Accounts/${environment.twilioAccountSID}/Messages.json`,
    //     {...postBody, From: environment.twilioFromNumber },
    //     httpOptions
    // ).toPromise();

    return this.http.post(environment.backendApiBaseUrl + 'commonData/sendOTP', postBody).toPromise();
  }


  //*  ----------------------->   Dashboard
  dashboardApiForAnalytics() {
    return this.http.get(environment.backendApiBaseUrl + 'dashboardApiForAnalytics');
  }

  dashboardApiForTeacherAnalytics(teacher_id) {
    let params = new HttpParams().set('teacher_id', teacher_id);
    return this.http.get(environment.backendApiBaseUrl + 'dashboardApiForTeacherAnalytics', { params: params });
  }


  //*  ----------------------->   Admins
  registrationAdmin(postData: any) {
    return this.http.post(environment.backendApiBaseUrl + 'registrationAdmin', postData);
  }
  updateAdmin(postData: any) {
    return this.http.post(environment.backendApiBaseUrl + 'updateAdmin', postData);
  }
  adminUploadImage(postFormData: any) {
    return this.http.post(environment.backendApiBaseUrl + 'adminUploadImage', postFormData);
  }
  getAdmins() {
    return this.http.get(environment.backendApiBaseUrl + 'getAdminList');
  }
  getAdminById(admin_id) {
    let params = new HttpParams().set('admin_id', admin_id);
    return this.http.get(environment.backendApiBaseUrl + `getAdminById`, { params: params });
  }


  //*  ----------------------->   Courses
  getAllSubjectCourse() {
    return this.http.get(environment.backendApiBaseUrl + 'getAllSubjectCourse');
  }
  getAllCourseWithSubject() {
    return this.http.get(environment.backendApiBaseUrl + 'getAllCourseWithSubject');
  }
  getAllActiveCourseWithSubject() {
    return this.http.get(environment.backendApiBaseUrl + 'getAllActiveCourseWithSubject');
  }

  addCourse(postFormData: any) {
    return this.http.post(environment.backendApiBaseUrl + 'addCourse', postFormData);
  }
  updateCourseById(postFormData: any) {
    return this.http.post(environment.backendApiBaseUrl + 'updateCourseById', postFormData);
  }
  updateSubjectById(postFormData: any) {
    return this.http.post(environment.backendApiBaseUrl + 'updateSubjectById', postFormData);
  }
  addSubjectToCourse(postFormData: any) {
    return this.http.post(environment.backendApiBaseUrl + 'addSubjectToCourse', postFormData);
  }

  getCourseByTeacherId(teacher_id) {
    let params = new HttpParams().set('teacher_id', teacher_id);
    return this.http.get(environment.backendApiBaseUrl + 'student/getCourseByTeacherId', { params: params });
  }


  //*  ----------------------->   Teachers
  registrationTeacher(postData: any) {
    return this.http.post(environment.backendApiBaseUrl + 'registrationTeacher', postData);
  }
  getTeacherList() {
    return this.http.get(environment.backendApiBaseUrl + 'getTeacherList');
  }
  updateTeacher(postData: any) {
    return this.http.post(environment.backendApiBaseUrl + 'updateTeacher', postData);
  }
  getTeacherById(teacher_id) {
    let params = new HttpParams().set('teacher_id', teacher_id);
    return this.http.get(environment.backendApiBaseUrl + `getTeacherById`, { params: params });
  }
  teacherUploadImage(postFormData: any) {
    return this.http.post(environment.backendApiBaseUrl + 'teacherUploadImage', postFormData);
  }
  addCourseAndSubjectToTeacher(postFormData: any) {
    return this.http.post(environment.backendApiBaseUrl + 'addCourseAndSubjectToTeacher', postFormData);
  }
  deleteCourseAndSubjectToTeacher(postFormData: any) {
    return this.http.post(environment.backendApiBaseUrl + 'deleteCourseAndSubjectToTeacher', postFormData);
  }
  UpdateCourseAndSubjectToTeacherById(postFormData: any) {
    return this.http.post(environment.backendApiBaseUrl + 'UpdateCourseAndSubjectToTeacherById', postFormData);
  }

  //!  ----------------------->   Student
  registrationStudent(postData: any) {
    return this.http.post(environment.backendApiBaseUrl + 'student/registrationStudent', postData);
  }
  updateStudent(postData: any) {
    return this.http.post(environment.backendApiBaseUrl + 'student/updateStudent', postData);
  }
  studentUploadImage(postFormData: any) {
    return this.http.post(environment.backendApiBaseUrl + 'student/studentUploadImage', postFormData);
  }
  getStudentById(student_id) {
    let params = new HttpParams().set('student_id', student_id);
    return this.http.get(environment.backendApiBaseUrl + `student/getStudentById`, { params: params });
  }
  getAllCourseWithSubjectForStudent() {
    return this.http.get(environment.backendApiBaseUrl + 'student/getAllCourseWithSubject').toPromise();
  }

  getAllSubjectByCourseId(course_id) {
    let params = new HttpParams().set('course_id', course_id);
    return this.http.get(environment.backendApiBaseUrl + `student/getAllSubjectByCourseId`, { params: params });
  }

  getTeachersBySubjectId(subject_id) {
    let params = new HttpParams().set('subject_id', subject_id);
    return this.http.get(environment.backendApiBaseUrl + `student/getTeachersBySubjectId`, { params: params });
  }

  getScheduleByScheduleId(schedule_id) {
    let params = new HttpParams().set('schedule_id', schedule_id);
    return this.http.get(environment.backendApiBaseUrl + `student/getScheduleByScheduleId`, { params: params });
  }

  checkBookTeacherScheduleSlot(postData: any) {
    return this.http.post(environment.backendApiBaseUrl + 'student/checkBookTeacherScheduleSlot', postData).toPromise();
  }

  bookTeacherScheduleSlot(postData: any) {
    return this.http.post(environment.backendApiBaseUrl + 'student/bookTeacherScheduleSlot', postData).toPromise();
  }
  sendChangeRequest(postData: any) {
    return this.http.post(environment.backendApiBaseUrl + 'order/sendChangeRequest', postData).toPromise();
  }

  getTeacherListForStudent() {
    return this.http.get(environment.backendApiBaseUrl + 'student/getTeacherListForStudent');
  }

  // getTeachersBySubjectIdWithFilter(subject_id, selectedLanguage, selectedBoard) {
  //     let params = new HttpParams().set('subject_id', subject_id).set('selectedLanguage', selectedLanguage).set('selectedBoard', selectedBoard);
  //     return this.http.get(environment.backendApiBaseUrl + `student/getTeachersBySubjectIdWithFilter`, { params: params });
  // }

  getTeacherListWithFilter(selectedLanguage, selectedBoard, selectedSubject) {
    let params = new HttpParams().set('selectedLanguage', selectedLanguage).set('selectedBoard', selectedBoard).set('selectedSubject', selectedSubject);
    return this.http.get(environment.backendApiBaseUrl + 'student/getTeacherListWithFilter', { params: params });
  }

  getOrderByStudentId(student_id) {
    let params = new HttpParams().set('student_id', student_id);
    return this.http.get(environment.backendApiBaseUrl + `student/getOrderByStudentId`, { params: params }).toPromise();
  }

  getOngoingOrderByStudentId(student_id) {
    let params = new HttpParams().set('student_id', student_id);
    return this.http.get(environment.backendApiBaseUrl + `student/getOngoingOrderByStudentId`, { params: params }).toPromise();
  }

  getOngoingOrderByTeacherId(teacher_id) {
    let params = new HttpParams().set('teacher_id', teacher_id);
    return this.http.get(environment.backendApiBaseUrl + `student/getOngoingOrderByTeacherId`, { params: params });
  }

  getHistoryOrderByStudentId(student_id) {
    let params = new HttpParams().set('student_id', student_id);
    return this.http.get(environment.backendApiBaseUrl + `student/getHistoryOrderByStudentId`, { params: params }).toPromise();
  }

  getHistoryOrderByTeacherId(teacher_id) {
    let params = new HttpParams().set('teacher_id', teacher_id);
    return this.http.get(environment.backendApiBaseUrl + `student/getHistoryOrderByTeacherId`, { params: params });
  }

  getOrderById(order_id) {
    let params = new HttpParams().set('order_id', order_id);
    return this.http.get(environment.backendApiBaseUrl + `student/getOrderById`, { params: params }).toPromise();
  }


  //*  ----------------------->   Banner
  getBannerImages() {
    return this.http.get(environment.backendApiBaseUrl + 'getBannerImages');
  }


  //*  ----------------------->   Schedules
  getAllScheduleByTeacherId(teacher_id) {
    let params = new HttpParams().set('teacher_id', teacher_id);
    return this.http.get(environment.backendApiBaseUrl + 'getAllScheduleByTeacherId', { params: params });
  }
  addSchedule(postFormData: any) {
    return this.http.post(environment.backendApiBaseUrl + 'addSchedule', postFormData);
  }
  updateSchedule(postFormData: any) {
    return this.http.post(environment.backendApiBaseUrl + 'updateSchedule', postFormData);
  }
  getTeacherSubscribersStudentByTeacherId(teacher_id) {
    let params = new HttpParams().set('teacher_id', teacher_id);
    return this.http.get(environment.backendApiBaseUrl + 'getTeacherSubscribersStudentByTeacherId', { params: params });
  }


  //*  ----------------------->   Schedules
  getAllOrdersByTeacherId(teacher_id) {
    let params = new HttpParams().set('teacher_id', teacher_id);
    return this.http.get(environment.backendApiBaseUrl + 'getAllOrdersByTeacherId', { params: params });
  }
  getAllTodayOrdersByTeacherId(teacher_id) {
    let params = new HttpParams().set('teacher_id', teacher_id);
    return this.http.get(environment.backendApiBaseUrl + 'getAllTodayOrdersByTeacherId', { params: params });
  }

  //*  ----------------------->   Notification
  getAdminNotificationByAdminId(admin_id, page) {
    let params = new HttpParams().set('admin_id', admin_id).set('page', page);
    return this.http.get(environment.backendApiBaseUrl + 'notification/getAdminNotificationByAdminId', { params: params }).toPromise();
  }
  markReadAllAdminNotificationByAdminId(admin_id) {
    return this.http.post(environment.backendApiBaseUrl + 'notification/markReadAllAdminNotificationByAdminId', { admin_id }).toPromise();
  }

  getTeacherNotificationByTeacherId(teacher_id, page) {
    let params = new HttpParams().set('teacher_id', teacher_id).set('page', page);
    return this.http.get(environment.backendApiBaseUrl + 'notification/getTeacherNotificationByTeacherId', { params: params }).toPromise();
  }
  markReadAllTeacherNotificationByTeacherId(teacher_id) {
    return this.http.post(environment.backendApiBaseUrl + 'notification/markReadAllTeacherNotificationByTeacherId', { teacher_id }).toPromise();
  }

  getStudentNotificationByStudentId(student_id, page) {
    let params = new HttpParams().set('student_id', student_id).set('page', page);
    return this.http.get(environment.backendApiBaseUrl + 'notification/getStudentNotificationByStudentId', { params: params }).toPromise();
  }
  markReadAllStudentNotificationByStudentId(student_id) {
    return this.http.post(environment.backendApiBaseUrl + 'notification/markReadAllStudentNotificationByStudentId', { student_id }).toPromise();
  }

  //*  ----------------------->   Subscriptions
  getStudentSubscribedToTeacherPlan(teacher_id, student_id) {
    let params = new HttpParams().set('teacher_id', teacher_id).set('student_id', student_id);
    return this.http.get(environment.backendApiBaseUrl + 'student/getStudentSubscribedToTeacherPlan', { params: params });
  }

  studentSubscribeToPlan(postFormData: any) {
    return this.http.post(environment.backendApiBaseUrl + 'student/studentSubscribeToPlan', postFormData).toPromise();
  }


  //* ------------------------> Review

  addReview(postBody) {
    return this.http.post(environment.backendApiBaseUrl + 'review/addReview', postBody).toPromise();
  }

  //* ------------------------> Review
  getHowToUseData() {
    return this.http.get(environment.backendApiBaseUrl + 'commonData/getHowToUseData').toPromise();
  }

  getHelpData() {
    return this.http.get(environment.backendApiBaseUrl + 'commonData/getHelpData').toPromise();
  }

  getTermsAndConditionsData() {
    return this.http.get(environment.backendApiBaseUrl + 'commonData/getTermsAndConditionsData').toPromise();
  }

  //* razorpay
  razorpayCreateOrderId(_amount: any) {
    return this.http.post(environment.backendApiBaseUrl + 'payment/razorpayCreateOrderId', { amount: _amount }).toPromise();
  }

  createInstamojoPaymentRequest(amount, studentName, email, phoneNumber) {
    return this.http.post(environment.backendApiBaseUrl + 'payment/create-instamojo-payment-request', { amount, studentName, email, phoneNumber }).toPromise();
    // return this.http.post('http://localhost:8080/' + 'payment/create-instamojo-payment-request', { amount, studentName, email, phoneNumber }).toPromise();
  }

  cancelOrderByOrderId(postData: any) {
    return this.http.post(environment.backendApiBaseUrl + 'student/cancelOrderByOrderId', postData).toPromise();
  }
}
