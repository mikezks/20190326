import { Component, OnInit } from '@angular/core';

import { GenericContainerComponent } from '../generic-container.component';

@Component({
  selector: 'app-default-view',
  templateUrl: './default-view.component.html',
  styleUrls: ['./default-view.component.css']
})
export class DefaultViewComponent extends GenericContainerComponent implements OnInit {

  ngOnInit() {
    super.ngOnInit();
  }
}
