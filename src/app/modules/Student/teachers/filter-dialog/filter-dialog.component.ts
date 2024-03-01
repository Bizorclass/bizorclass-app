import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BoardList, LanguagesList } from "../../../../services/defaultValues.js";

@Component({
  selector: 'filter-dialog',
  templateUrl: './filter-dialog.component.html',
  styleUrls: ['./filter-dialog.component.scss']
})
export class filterDialogComponent {

  selectedLanguage: string[];
  selectedBoard: string[];
  selectedCourse: string;
  selectedSubject: string[] = [];

  coursesAndSubjectsList: any[] = [];

  BoardList: string[] = BoardList;
  LanguagesList: string[] = LanguagesList;

  constructor(public dialogRef: MatDialogRef<filterDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    console.log(this.data);
    this.selectedLanguage = this.data.selectedLanguage;
    this.selectedBoard = this.data.selectedBoard;
    this.selectedCourse = this.data?.selectedCourse;
    this.selectedSubject = this.data?.selectedSubject;
    this.coursesAndSubjectsList = this.data?.coursesAndSubjectsList;
  }

  onApply(): void {
    this.dialogRef.close({ selectedLanguage: this.selectedLanguage, selectedBoard: this.selectedBoard, selectedCourse: this.selectedCourse, selectedSubject: this.selectedSubject });
  }

  getSubjectList() {
    return this.coursesAndSubjectsList?.find((f) => f.course_id === this.selectedCourse)?.subject || []
  }
}
