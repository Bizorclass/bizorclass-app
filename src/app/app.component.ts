import { Component, OnInit } from '@angular/core';
import { App } from '@capacitor/app';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor() {
  }

  async ngOnInit() {
    await App.addListener('backButton', async ({ canGoBack }) => {
      console.log("canGoBack", canGoBack)
      if (!canGoBack) {
        App.exitApp();
      } else {
        window.history.back();
      }
    });
  }
}
