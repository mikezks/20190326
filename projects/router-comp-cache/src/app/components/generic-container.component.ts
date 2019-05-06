import { OnInit, Component } from "@angular/core";
import { ActivatedRoute, RouterState } from "@angular/router";

import { Observable } from "rxjs";
import { map, filter } from "rxjs/operators";

import { DataService } from "../data/data.service";

@Component({
  template: ''
})
export class GenericContainerComponent implements OnInit {
  title$: Observable<string>;
  navigation$: Observable<any[]>;
  topNav$: Observable<any[]>;
  bottomNav$: Observable<any[]>;
  form$: Observable<any[]>;

  constructor(
    private dataService: DataService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.title$ = this.dataService.selectByRoute$<string>(this.route, 'title');
    this.navigation$ = this.dataService.selectByRoute$<any[]>(this.route, 'navigation');
    const filterNav = outlet =>
      this.navigation$
        .pipe(
          filter(nav => !!nav),
          map(nav =>
            nav.filter(item =>
              item.outlet === outlet
            )
          )
        );
    this.topNav$ = filterNav('top');
    this.bottomNav$ = filterNav('bottom');
    this.form$ = this.dataService.selectByRoute$<any[]>(this.route, 'form');      
  }
} 