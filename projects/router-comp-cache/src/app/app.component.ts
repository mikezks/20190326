import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';

import { CustomUrlSerializerService, UrlData } from './router/custom-url-serializer.service';
import { routerAnimation } from './router/router-animation';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    routerAnimation
  ]
})
export class AppComponent implements OnInit {
  urlData$: Observable<UrlData>;

  constructor(
    private router: Router,
    private urlService: CustomUrlSerializerService) { }

  ngOnInit(): void {
    this.urlData$ =
      this.router.events
        .pipe(
          filter(event => event instanceof NavigationEnd),
          map(() => this.urlService.generateUrlData(this.router.url))
        );
  }
}
