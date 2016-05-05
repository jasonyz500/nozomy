import {Component, OnInit, AfterViewChecked} from 'angular2/core';
import {CORE_DIRECTIVES, FORM_DIRECTIVES} from 'angular2/common';
import { InfiniteScroll } from 'angular2-infinite-scroll';
import {Router} from 'angular2/router';
import {ReflectionsService} from '../../shared/services/reflections.service';
declare var jQuery: any;
import * as moment from 'moment';

import {CanActivate, ComponentInstruction} from 'angular2/router';
import {isLoggedIn} from '../../+auth/services/is-logged-in';
@CanActivate((next: ComponentInstruction, previous: ComponentInstruction) => {
  return isLoggedIn(next, previous);
})

@Component({
  selector: 'visualize',
  templateUrl: 'app/+visualize/components/visualize.component.html',
  styleUrls: ['app/+visualize/components/visualize.component.css'],
  directives: [FORM_DIRECTIVES, CORE_DIRECTIVES, InfiniteScroll]
})
export class VisualizeComponent implements OnInit, AfterViewChecked {
  reflections: any = [];
  private initDatePicker: boolean;
  private dateModel: any;
  private showPrompts: boolean = true;
  constructor(private _router: Router, private _reflectionsService: ReflectionsService) {}

  getReflections() {
    this._reflectionsService.getManyReflections({
      start_date: moment(this.dateModel.startDate).format('YYYY-MM-DD'),
      end_date: moment(this.dateModel.endDate).format('YYYY-MM-DD')
    }).subscribe(data => {
      console.log(data);
      this.reflections = data;
    }, error => console.error(error));
  }

  onScroll(event: any) {
    console.log(event);
    console.log('scrolled!');
  }

  ngOnInit() {
    this.dateModel = {};
    this.dateModel.startDate = moment().subtract(1, 'weeks').startOf('week').toDate();
    this.dateModel.endDate = moment().add(1, 'weeks').startOf('week').toDate();
    this.getReflections();
  }

  ngAfterViewChecked() {
    var _this = this;
    if (jQuery('input[name="daterange"]').length > 0 && !this.initDatePicker) {
      jQuery('input[name="daterange"]').daterangepicker();
      jQuery('input[name="daterange"]').on('apply.daterangepicker', function(ev: any, picker: any) {
        _this.dateModel.startDate = moment(picker.startDate).toDate();
        _this.dateModel.endDate = moment(picker.endDate).toDate();
        _this.getReflections();
      });
      this.initDatePicker = true;
    }
  }
}
