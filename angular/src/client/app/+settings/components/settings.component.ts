import {Component, OnInit} from 'angular2/core';
import {CORE_DIRECTIVES, FORM_DIRECTIVES} from 'angular2/common';
import {Http} from 'angular2/http';

import {SettingsService} from '../../shared/index';

import {CanActivate, ComponentInstruction} from 'angular2/router';
import {isLoggedIn} from '../../+auth/services/is-logged-in';
@CanActivate((next: ComponentInstruction, previous: ComponentInstruction) => {
  return isLoggedIn(next, previous);
})

@Component({
  selector: 'reflection',
  templateUrl: 'app/+settings/components/settings.component.html',
  styleUrls: ['app/+settings/components/settings.component.css'],
  directives: [FORM_DIRECTIVES, CORE_DIRECTIVES],
  providers: [SettingsService]
})
export class SettingsComponent implements OnInit {
  model: any;
  constructor(private http: Http, private _settingsService: SettingsService) { }

  getData() {
    this._settingsService.getSettingsPage()
      .subscribe(data => {
        console.log('returned settings:', data);
        this.model = data;
      }, error => console.error(error));
  }

  onSave() {
    this._settingsService.updateSettings(this.model)
      .subscribe(data => {
        console.log('successfully saved:', data);
      }, error => console.error(error));
  }

  ngOnInit() {
    this.getData();
  }
}
