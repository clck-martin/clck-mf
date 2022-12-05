import { Component } from '@angular/core';

@Component({
  selector: 'clck-mf-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'clck-shell';

  /**
   * Requirement:
   * req_num: 1
   * This comment is meant to be read by the tool
   * somehow we need to link this with a Jira key
   * or generate a new one.
   * 
   */
  some_function(input_data: string) {

    return "Nothing " + input_data;
  }
}
