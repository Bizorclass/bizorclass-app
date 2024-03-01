import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { UntypedFormArray, UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { debounceTime, map, merge, Observable, Subject, switchMap, takeUntil } from 'rxjs';
import { fuseAnimations } from '@fuse/animations';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { InventoryBrand, InventoryCategory, InventoryPagination, InventoryProduct, InventoryTag, InventoryVendor } from 'app/modules/admin/courses-page/courses/courses.types';
import { CoursesService } from 'app/modules/admin/courses-page/courses/courses.service';
import { ApiService } from 'app/services/api.service';
import { AuthService } from 'app/modules/auth/auth.service';

@Component({
    selector: 'courses-list',
    templateUrl: './courses-list.component.html',
    styles: [
        `
            .inventory-grid {
                /* grid-template-columns: auto 112px 72px; */
                grid-template-columns: auto 72px;

                @screen sm {
                    /* grid-template-columns: auto 112px 72px; */
                    grid-template-columns: auto 72px;
                }

                @screen md {
                    /* grid-template-columns: auto 112px 72px; */
                    grid-template-columns: auto 72px;
                }

                @screen lg {
                    /* grid-template-columns: auto 112px 72px; */
                    grid-template-columns: auto 72px;
                }
            }
        `
    ],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations: fuseAnimations
})
export class CoursesListComponent implements OnInit, AfterViewInit, OnDestroy {
    @ViewChild(MatPaginator) private _paginator: MatPaginator;
    @ViewChild(MatSort) private _sort: MatSort;

    courseList:any[] = [];
    /* [
        {
            course_id: "abc1",
            title: "abc",
            description: "adskjh sdvn; ojvdnv ;osv znjxvdzlxhgvnb",
            subjects: [
                {
                    subject_id: "sub 1 1",
                    title: "math",
                    description: "number"
                },
                {
                    subject_id: "sub 1 2",
                    title: "English",
                    description: "sentencesx fjg oifdj nbc jxnkvn"
                },
            ]
        },
        {
            course_id: "abc2",
            title: "math",
            description: "adskjh sdvn; ojvdnv ;osv znjxvdzlxhgvnb",
        },
        {
            course_id: "abc3",
            title: "peryu",
            description: "adskjh sdvn; ojvdnv ;osv znjxvdzlxhgvnb",
        },
        {
            course_id: "abc4",
            title: "iop",
            description: "adskjh sdvn; ojvdnv ;osv znjxvdzlxhgvnb",
        },
        {
            course_id: "abc5",
            title: "hf",
            description: "adskjh sdvn; ojvdnv ;osv znjxvdzlxhgvnb",
        },
        {
            course_id: "abc6",
            title: "dffesd ",
            description: "adskjh sdvn; ojvdnv ;osv znjxvdzlxhgvnb",
        },

    ]; */


    flashMessage: 'success' | 'error' | null = null;

    isLoading: boolean = false;
    pagination = {
        "length": this.courseList.length,
        "size": 10,
        "page": 0,
        "lastPage": Math.ceil(this.courseList.length/10),
        "startIndex": 0,
        "endIndex": 9
    };
    searchInputControl: UntypedFormControl = new UntypedFormControl();
    selectedCourse: any | null = null;
    selectedCourseForm: UntypedFormGroup;

    user:any = null;

    private _unsubscribeAll: Subject<any> = new Subject<any>();

    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _fuseConfirmationService: FuseConfirmationService,
        private _formBuilder: UntypedFormBuilder,
        private _inventoryService: CoursesService,
        private apiService: ApiService,
        private authService:AuthService
    ) {
        this.authService.user.pipe((takeUntil(this._unsubscribeAll))).subscribe((user: any) => {
            // console.log({ user });
            this.user = user;
        });
    }

    ngOnInit(): void {
        this.getAllCoursesFromServer();
    }

    defaultForm() {
        this.selectedCourseForm = this._formBuilder.group({
            course_id: [''],
            title: ['', [Validators.required]],
            description: ['', [Validators.required]],
            /* subjects: this._formBuilder.array([]), */
            subjects: this._formBuilder.array([]),
        });
    }

    getAllCoursesFromServer() {
        this.apiService.getAllCourseWithSubject().subscribe(async (getAllSubjectCourseResponse: any) => {
            console.log(getAllSubjectCourseResponse);
            //todo update Object
            if (getAllSubjectCourseResponse.data) {
                let _courseList = getAllSubjectCourseResponse.data;
                for(var i = 0; i < _courseList.length; i++){
                    _courseList[i].subjects = _courseList[i]['subject'];
                    delete _courseList[i].subject;
                }
                this.courseList = [..._courseList];
                this._changeDetectorRef.detectChanges();
            }
            this.selectedCourse = null;
            this.closeDetails();
            this.defaultForm();
        }, (err) => {
            console.log(err);
        });
    }

    ngAfterViewInit(): void {
        if (this._sort && this._paginator) {
            // Set the initial sort
            this._sort.sort({
                id: 'name',
                start: 'asc',
                disableClear: true
            });

            // Mark for check
            this._changeDetectorRef.markForCheck();

            // If the user changes the sort order...
            this._sort.sortChange
                .pipe(takeUntil(this._unsubscribeAll))
                .subscribe(() => {
                    // Reset back to the first page
                    this._paginator.pageIndex = 0;

                    // Close the details
                    this.closeDetails();
                });

            // Get courseList if sort or page changes
            merge(this._sort.sortChange, this._paginator.page).pipe(
                switchMap(() => {
                    this.closeDetails();
                    this.isLoading = true;
                    return this._inventoryService.getProducts(this._paginator.pageIndex, this._paginator.pageSize, this._sort.active, this._sort.direction);
                }),
                map(() => {
                    this.isLoading = false;
                })
            ).subscribe();
        }
    }

    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }

    toggleDetails(courseId: string): void {
        // If the product is already selected...
        if (this.selectedCourse && this.selectedCourse.course_id === courseId) {
            // Close the details
            this.selectedCourse = null;
            this.closeDetails();
            this.defaultForm();
            return;
        }

        this.defaultForm();
        const _course = this.courseList.find(f => f.course_id === courseId)
        /* console.log(_course) */

        // Set the selected product
        this.selectedCourse = {..._course};
        this.selectedCourseForm.patchValue({..._course});


        const subjectsFormGroups = [];

        if ( _course?.subjects?.length > 0 ) {
            _course.subjects.forEach((subjectItem) => {
                subjectsFormGroups.push(
                    this._formBuilder.group({
                        subject_id: [subjectItem.subject_id],
                        title: [subjectItem.title, [Validators.required]],
                        description: [subjectItem.description, [Validators.required]]
                    })
                );
            });
        }
        else {
            subjectsFormGroups.push(
                this._formBuilder.group({
                    title: ['', [Validators.required]],
                    description: ['', [Validators.required]]
                })
            );
        }
        subjectsFormGroups.forEach((subjectFormGroup) => {
            (this.selectedCourseForm.get('subjects') as UntypedFormArray).push(subjectFormGroup);
        });

        this._changeDetectorRef.markForCheck();

        /* console.log("this.selectedCourseForm -> ", this.selectedCourseForm)
        console.log("selectedCourseForm.get('subjects')['controls'] -> ", this.selectedCourseForm.get('subjects')['controls']) */
    }

    addSubjectField(): void {
        const subjectFormGroup = this._formBuilder.group({
            title: ['', [Validators.required]],
            description: ['', [Validators.required]]
        });

        (this.selectedCourseForm.get('subjects') as UntypedFormArray).push(subjectFormGroup);

        // Mark for check
        this._changeDetectorRef.markForCheck();
    }


    closeDetails(): void {
        this.selectedCourse = null;
    }

    createCourse(): void {
        if(this.courseList.some(s => s.course_id === "new_course_id")) {
            this.toggleDetails("new_course_id");
            return;
        }
        const _newCourse = {
            course_id: "new_course_id",
            title: "",
            description: "",
            subjects: [
                {
                    title: "",
                    description: ""
                }
            ]
        };
        this.courseList.unshift({..._newCourse});
        this.toggleDetails("new_course_id");
    }

    updateSelectedCourse(): void {
        const _rawCourse = this.selectedCourseForm.getRawValue();

        if(_rawCourse.course_id === "new_course_id") {
            const coursePostObject = {
                title: _rawCourse.title,
                description: _rawCourse.description,
                admin_id: this.user.admin_id,
            }
            //todo post request to add new course
            console.log("coursePostObject => ", coursePostObject);
            this.apiService.addCourse(coursePostObject).subscribe(async (addCourseResponse: any) => {
                console.log(addCourseResponse);
                //todo update Object
                if (addCourseResponse.data) {
                    if(_rawCourse?.subjects && _rawCourse?.subjects.length > 0) {

                        _rawCourse?.subjects.forEach((subjectItem, _index) => {
                            const subjectPostObject = {
                                title: subjectItem.title,
                                description: subjectItem.description,
                                course_id: addCourseResponse.data.course_id,
                                admin_id: this.user.admin_id,
                            }
                            //todo post request to add new subject in course

                            this.apiService.addSubjectToCourse(subjectPostObject).subscribe((addCourseResponse: any) => {
                                console.log(addCourseResponse);
                                //todo update Object
                                if((_rawCourse?.subjects.length - 1) === _index) {
                                    this.getAllCoursesFromServer();
                                }
                            }, (err) => {
                                console.log(err);
                            });
                        })
                    }
                }
            }, (err) => {
                console.log(err);
            });
        } else {
            const coursePostObject = {
                title: _rawCourse.title,
                description: _rawCourse.description,
                course_id: _rawCourse.course_id,
            }
            //todo post request to add new course
            console.log("coursePostObject => ", coursePostObject);
            this.apiService.updateCourseById(coursePostObject).subscribe(async (updateCourseByIdResponse: any) => {
                console.log(updateCourseByIdResponse);
                //todo update Object
                if (updateCourseByIdResponse.data) {
                    if(_rawCourse?.subjects && _rawCourse?.subjects.length > 0) {

                        _rawCourse?.subjects.forEach((subjectItem, _index) => {
                            if(!subjectItem?.subject_id) {
                                const subjectPostObject = {
                                    title: subjectItem.title,
                                    description: subjectItem.description,
                                    course_id: updateCourseByIdResponse.data.course_id,
                                    admin_id: this.user.admin_id,
                                }
                                //todo post request to add new subject in course

                                this.apiService.addSubjectToCourse(subjectPostObject).subscribe((addCourseResponse: any) => {
                                    console.log(addCourseResponse);
                                    //todo update Object
                                    if((_rawCourse?.subjects.length - 1) === _index) {
                                        this.getAllCoursesFromServer();
                                    }
                                }, (err) => {
                                    console.log(err);
                                });
                            } else {
                                const subjectPostObject = {
                                    title: subjectItem.title,
                                    description: subjectItem.description,
                                }
                                //todo post request to add new subject in course

                                this.apiService.updateSubjectById(subjectPostObject).subscribe((addCourseResponse: any) => {
                                    console.log(addCourseResponse);
                                    //todo update Object
                                    if((_rawCourse?.subjects.length - 1) === _index) {
                                        this.getAllCoursesFromServer();
                                    }
                                }, (err) => {
                                    console.log(err);
                                });
                            }
                        })
                    }
                }
            }, (err) => {
                console.log(err);
            });
        }

        /* console.log(_rawCourse) */
    }

    /**
     * Delete the selected product using the form data
     */
    deleteSelectedProduct(): void {
        // Open the confirmation dialog
        const confirmation = this._fuseConfirmationService.open({
            title: 'Delete product',
            message: 'Are you sure you want to remove this product? This action cannot be undone!',
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

                // Get the product object
                const product = this.selectedCourseForm.getRawValue();

                // Delete the product on the server
                this._inventoryService.deleteProduct(product.id).subscribe(() => {

                    // Close the details
                    this.closeDetails();
                });
            }
        });
    }

    showFlashMessage(type: 'success' | 'error'): void {
        // Show the message
        this.flashMessage = type;

        // Mark for check
        this._changeDetectorRef.markForCheck();

        // Hide it after 3 seconds
        setTimeout(() => {

            this.flashMessage = null;

            // Mark for check
            this._changeDetectorRef.markForCheck();
        }, 3000);
    }
}
