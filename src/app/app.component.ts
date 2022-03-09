import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  theme: string = 'light';
  title = 'telecom';
  isDarkMode: boolean = false;

  changed(event: any) {
    this.isDarkMode = event.checked;
    console.log(this.isDarkMode);
  }
}
