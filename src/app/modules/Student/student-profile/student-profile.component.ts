import { Overlay } from '@angular/cdk/overlay';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, Renderer2, ViewChild, ViewContainerRef, ViewEncapsulation } from '@angular/core';
import { UntypedFormArray, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDrawerToggleResult } from '@angular/material/sidenav';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { AuthService } from 'app/modules/auth/auth.service';
import { ApiService } from 'app/services/api.service';
import { passwordValidator } from 'app/shared/password.validator';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'student-profile',
  templateUrl: './student-profile.component.html',
  styleUrls: ['./student-profile.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StudentProfileComponent {
  @ViewChild('avatarFileInput') private _avatarFileInput: ElementRef;

  editMode: boolean = false;
  serverCoursesAndSubject: any[] = [];

  studentObject: any;
  teacherForm: UntypedFormGroup;
  avatarObject = null;

  user = null;

  private _unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _changeDetectorRef: ChangeDetectorRef,
    private apiService: ApiService,
    private _formBuilder: UntypedFormBuilder,
    private _fuseConfirmationService: FuseConfirmationService,
    private _authService: AuthService,
    private _router: Router,
    private _overlay: Overlay,
    private _viewContainerRef: ViewContainerRef,
    private domSanitizer: DomSanitizer,
    private _snackBar: MatSnackBar
  ) {
    this._authService.user.pipe((takeUntil(this._unsubscribeAll))).subscribe((user: any) => {
      // console.log({ user });
      this.user = user;
      if (user && user?.student_id) {
        this.getStudentFromServer();
      }
    });
  }


  ngOnInit(): void {
    // Open the drawer
    // this._teachersListComponent.matDrawer.open();

    // Create the studentObject form
    this.resetTeacherForm();
  }

  resetTeacherForm() {
    if (this.teacherForm) {
      this.teacherForm = null;
    }
    this.teacherForm = this._formBuilder.group({
      about_you: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
      first_name: ["", Validators.required],
      last_name: ["", Validators.required],
      home_address: ["", Validators.required],
      parent_phone_number: ["", Validators.required],
      phone_number: ["", Validators.required],
      roll_no: ["", Validators.required],
      school_name: ["", Validators.required],

      father_name: ['', Validators.required],
      mother_name: ['', Validators.required],
      gender: ['', Validators.required],
      dob: ['', Validators.required],
      class: ['', Validators.required],

      // linkedin_link: ["", Validators.required],
      // subjects: this._formBuilder.array([]),
      // city: ["", Validators.required],
      // password: ["", passwordValidator()]
    });

  }

  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }


  getStudentFromServer() {
    this.apiService.getStudentById(this.user.student_id).subscribe(async (getAdminByIdResponse: any) => {
      // console.log(getAdminByIdResponse);
      //todo update Object
      if (getAdminByIdResponse.data) {
        this.toggleEditMode(false);
        let _teacherObject = Array.isArray(getAdminByIdResponse.data) ? getAdminByIdResponse.data[0] : getAdminByIdResponse.data;
        _teacherObject.subjects = _teacherObject["teacher-subject"];
        delete _teacherObject["teacher-subject"];
        this.studentObject = _teacherObject;
        this._changeDetectorRef.markForCheck();
        console.log(this.studentObject);
        this.resetTeacherForm()
      }
    }, (err) => {
      console.log(err);
    });
  }


  isCheckedSubject(_subjectItem, _FormSubjects) {
    // console.log({_subjectItem, _FormSubjects});
    return Boolean(_FormSubjects.value.find(f => f.subject_id === _subjectItem.subject_id));
  }
  isPriceSubject(_subjectItem, _FormSubjects) {
    // console.log({_subjectItem, _FormSubjects});
    return _FormSubjects.value.find(f => f.subject_id === _subjectItem.subject_id)?.price || "";
  }
  setPriceSubject(_subjectItem, _FormSubjects, event) {
    // if (_FormSubjects.value.find(f => f.subject_id === _subjectItem.subject_id)) {
    //     _FormSubjects.value.find(f => f.subject_id === _subjectItem.subject_id).price = event.target.value;
    //     // let c:any = this.teacherForm.value.find(f => f.subject_id === _subjectItem.subject_id)
    //     // c?.price = event.target.value;
    // }

    return this.teacherForm.get("subjects")['controls']?.find(f => f.value.subject_id === _subjectItem.subject_id)?.get("price") || null;
    // console.log("dsds");

  }

  // closeDrawer(): Promise<MatDrawerToggleResult> {
  //     return this._teachersListComponent.matDrawer.close();
  // }

  toggleEditMode(editMode: boolean | null = null): void {
    if (editMode === null) {
      this.editMode = !this.editMode;
    } else {
      this.editMode = editMode;
      if (this.studentObject) {
        this.teacherForm.patchValue({ ...this.studentObject });
        this.teacherForm.get('email')?.disable();
        this.teacherForm.get('phone_number')?.disable();
      }
    }

    console.log(this.teacherForm);
    this._changeDetectorRef.markForCheck();
  }


  async updateContact(): Promise<void> {
    // Get the studentObject object
    console.log(this.teacherForm);
    const studentObject = this.teacherForm.getRawValue();
    console.log(studentObject);

    let postObject = {
      student_id: this.user.student_id,
      first_name: this.capitalizeFirstLetter(studentObject.first_name),
      last_name: this.capitalizeFirstLetter(studentObject.last_name),
      about_you: studentObject?.about_you || "",
      home_address: studentObject?.home_address || "",
      parent_phone_number: studentObject?.parent_phone_number || "",
      phone_number: studentObject?.phone_number || "",
      roll_no: studentObject?.roll_no || "",
      school_name: studentObject?.school_name || "",
      father_name: studentObject?.father_name || "",
      mother_name: studentObject?.mother_name || "",
      gender: studentObject?.gender || "",
      dob: studentObject?.dob || "",
      class: studentObject?.class || "",
    };
    this.updateTeacherQuery(postObject, studentObject.subjects);
    // this.toggleEditMode(false);
  }

  updateTeacherQuery(postObject: any, _subjects: any[]) {
    console.log({ _subjects });
    this.apiService.updateStudent(postObject).subscribe(async (res: any) => {
      console.log(res);
      let done = false;
      //todo update Object
      if (res.data) {
        if (this.avatarObject) {
          //todo add photo Admin query
          const file: any = await this.convertImageFileToWebpFile(this.avatarObject);
          let bodyForUploadImage = new FormData();
          bodyForUploadImage.append('photo', file, `${res.data.student_id}.webp`);
          bodyForUploadImage.append('id', res.data.student_id);
          this.apiService.studentUploadImage(bodyForUploadImage).subscribe(async (updateAdminResponse: any) => {
            console.log(updateAdminResponse);
            //todo update Object
            if (updateAdminResponse.data) {
              if (!done) {
                done = true;
                this.toggleEditMode(false);
                // this._router.navigate(['../', res.data.student_id], { relativeTo: this._activatedRoute });
                this.getStudentFromServer();
                this._snackBar.open("Profile update successfully.", "", {
                  horizontalPosition: "center",
                  verticalPosition: "top",
                  duration: 3000,
                  panelClass: ['success-toast']
                  // panelClass: ['error-toast']
                });
                this._changeDetectorRef.markForCheck();
              }
              this._authService.user = res?.data;
            }
          }, (err) => {
            console.log(err);
          });
        } else {
          this._authService.user = res?.data;
          this._snackBar.open("Profile update successfully.", "", {
            horizontalPosition: "center",
            verticalPosition: "top",
            duration: 3000,
            panelClass: ['success-toast']
            // panelClass: ['error-toast']
          });
          this._changeDetectorRef.markForCheck();
        }
      }
    }, (err) => {
      console.log(err);
    });
  }

  deleteContact(): void {
    // Open the confirmation dialog
    const confirmation = this._fuseConfirmationService.open({
      title: 'Delete studentObject',
      message: 'Are you sure you want to delete this studentObject? This action cannot be undone!',
      actions: {
        confirm: {
          label: 'Delete'
        }
      }
    });

    // Subscribe to the confirmation dialog closed action
    confirmation.afterClosed().subscribe((result) => {

      // If the confirm button pressed...
      if (result === 'confirmed') {
        // // Get the current studentObject's id
        // const id = this.studentObject.id;

        // // Get the next/previous studentObject's id
        // const currentContactIndex = this.teachers.findIndex(item => item.id === id);
        // const nextContactIndex = currentContactIndex + ((currentContactIndex === (this.teachers.length - 1)) ? -1 : 1);
        // const nextContactId = (this.teachers.length === 1 && this.teachers[0].id === id) ? null : this.teachers[nextContactIndex].id;

        // // Delete the studentObject
        // this._teachersService.deleteContact(id)
        //     .subscribe((isDeleted) => {

        //         // Return if the studentObject wasn't deleted...
        //         if ( !isDeleted )
        //         {
        //             return;
        //         }

        //         // Navigate to the next studentObject if available
        //         if ( nextContactId )
        //         {
        //             this._router.navigate(['../', nextContactId], {relativeTo: this._activatedRoute});
        //         }
        //         // Otherwise, navigate to the parent
        //         else
        //         {
        //             this._router.navigate(['../'], {relativeTo: this._activatedRoute});
        //         }

        //         // Toggle the edit mode off
        //         this.toggleEditMode(false);
        //     });

        // // Mark for check
        // this._changeDetectorRef.markForCheck();
      }
    });

  }

  goBack() {
    this._router.navigate(['../'], { relativeTo: this._activatedRoute });
  }

  uploadAvatar(fileList: FileList): void {
    // Return if canceled
    if (!fileList.length) {
      return;
    }

    const allowedTypes = ['image/jpeg', 'image/png'];
    const file = fileList[0];

    // Return if the file is not allowed
    if (!allowedTypes.includes(file.type)) {
      return;
    }

    console.log("file -> ", file);
    this.avatarObject = file;
  }


  removeAvatar(): void {

  }

  imageFileTOString(_fileObj) {
    if (typeof _fileObj === "string") {
      return _fileObj;
    } else {
      let _str: any = this.domSanitizer.bypassSecurityTrustResourceUrl(URL.createObjectURL(_fileObj));
      //   console.log(_str);
      return _str;
    }
  }

  capitalizeFirstLetter(str: string) {
    return str[0].toUpperCase() + str.slice(1).toLowerCase();
  }

  convertImageFileToWebpFile(file) {
    return new Promise((resolve, reject) => {
      const image = new Image();
      image.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = image.naturalWidth;
        canvas.height = image.naturalHeight;
        canvas.getContext('2d').drawImage(image, 0, 0);
        canvas.toBlob((blob) => {
          let myFile = new File([blob], 'my-new-group-image.webp', {
            type: blob.type,
          });
          resolve(myFile);
        }, 'image/webp');
      };
      image.crossOrigin = 'anonymous';
      image.src = URL.createObjectURL(file);
    });
  }
}
