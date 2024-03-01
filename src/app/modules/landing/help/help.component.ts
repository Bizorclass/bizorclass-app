import { Component, ViewEncapsulation } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiService } from 'app/services/api.service';

@Component({
  selector: 'help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HelpComponent {

  isLoading: boolean = true;
  textData: string;

  constructor(private apiService: ApiService, private _snackBar: MatSnackBar) {
    this.getHelpDataFromServer();
  }

  async getHelpDataFromServer() {
    try {
      this.isLoading = true;
      const getHelpDataResponse: any = await this.apiService.getHelpData();
      console.log("getHelpDataResponse => ", getHelpDataResponse);
      if (getHelpDataResponse?.data) {
        this.textData = getHelpDataResponse?.data?.help;
      } else if (getHelpDataResponse?.error?.message) {
        //! getHelpDataResponse?.error?.message
        this._snackBar.open(getHelpDataResponse?.error?.message, "", {
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
