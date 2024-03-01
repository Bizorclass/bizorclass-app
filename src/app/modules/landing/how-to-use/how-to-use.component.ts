import { Component, ViewEncapsulation } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiService } from 'app/services/api.service';

@Component({
  selector: 'how-to-use',
  templateUrl: './how-to-use.component.html',
  styleUrls: ['./how-to-use.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HowToUseComponent {

  isLoading: boolean = true;
  textData: string;

  constructor(private apiService: ApiService, private _snackBar: MatSnackBar) {
    this.getHowToUseDataFromServer();
  }

  async getHowToUseDataFromServer() {
    try {
      this.isLoading = true;
      const getHowToUseDataResponse: any = await this.apiService.getHowToUseData();
      console.log("getHowToUseDataResponse => ", getHowToUseDataResponse);
      if (getHowToUseDataResponse?.data) {
        this.textData = getHowToUseDataResponse?.data?.how_to_use;
      } else if (getHowToUseDataResponse?.error?.message) {
        //! getHowToUseDataResponse?.error?.message
        this._snackBar.open(getHowToUseDataResponse?.error?.message, "", {
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
