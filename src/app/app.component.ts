import { Component } from '@angular/core';


/**
 * Generates the base component that will hold and implment all other components 
 */

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'myFlix-Angular-client';
}