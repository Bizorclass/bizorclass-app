import { Component, ViewEncapsulation } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiService } from 'app/services/api.service';

@Component({
  selector: 'terms-conditions',
  templateUrl: './terms-conditions.component.html',
  styleUrls: ['./terms-conditions.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TermsConditionsComponent {

  isLoading: boolean = true;
  textData: string;

  constructor(private apiService: ApiService, private _snackBar: MatSnackBar) {
    this.getTermsAndConditionsDataFromServer();
  }

  async getTermsAndConditionsDataFromServer() {
    try {
      this.isLoading = true;
      const getTermsAndConditionsDataResponse: any = await this.apiService.getTermsAndConditionsData();
      console.log("getTermsAndConditionsDataResponse => ", getTermsAndConditionsDataResponse);
      if (getTermsAndConditionsDataResponse?.data) {
        this.textData = getTermsAndConditionsDataResponse?.data?.terms_and_conditions;
      } else if (getTermsAndConditionsDataResponse?.error?.message) {
        //! getTermsAndConditionsDataResponse?.error?.message
        this._snackBar.open(getTermsAndConditionsDataResponse?.error?.message, "", {
          horizontalPosition: "center",
          verticalPosition: "top",
          duration: 3000,
          // panelClass: ['success-toast']
          panelClass: ['error-toast']
        })
      } else {
        //! Something went wrong! Try again
        this._snackBar.open("Something went wrong! Try again", "", {
          horizontalPosition: "center",
          verticalPosition: "top",
          duration: 3000,
          // panelClass: ['success-toast']
          panelClass: ['error-toast']
        })
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
      this.isLoading = false;
    }
  }
}
