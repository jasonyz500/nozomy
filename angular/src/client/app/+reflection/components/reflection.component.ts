import {Component, OnInit, Input, OnChanges} from 'angular2/core';
import {CORE_DIRECTIVES, FORM_DIRECTIVES} from 'angular2/common';
import {Http} from 'angular2/http';

import {Reflection} from '../../shared/index';
import {ReflectionsService} from '../../shared/index';

import * as _ from 'lodash';

@Component({
  selector: 'reflection',
  templateUrl: 'app/+reflection/components/reflection.component.html',
  styleUrls: ['app/+reflection/components/reflection.component.css'],
  directives: [FORM_DIRECTIVES, CORE_DIRECTIVES]
})
export class ReflectionComponent implements OnInit, OnChanges {
  @Input() id: string;
  @Input() changeTrigger: number;
  reflection: Reflection;
  constructor(private http: Http, private _reflectionsService: ReflectionsService) { }

  getData(id: string) {
    this._reflectionsService.getReflection(id)
      .subscribe(data => {
        console.log('returned reflection data:', data);
        this.reflection = new Reflection(data);
      }, error => console.error(error));
  }

  save() {
    this._reflectionsService.saveReflection(this.reflection)
      .subscribe(data => {
        console.log('successfully saved:', data);
      }, error => console.error(error));
  }

  ngOnInit() {
    this.getData(this.id);
  }


  ngOnChanges(changes: any) {
    // some hacky sh&t to trigger changes
    if (_.has(changes, 'changeTrigger') && this.changeTrigger > 1) {
      this.save();
    }
  }
}
