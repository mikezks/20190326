import { Component, OnInit } from '@angular/core';

import { GenericContainerComponent } from '../generic-container.component';

@Component({
  selector: 'app-items-view',
  templateUrl: './list-view.component.html',
  styleUrls: ['./list-view.component.css']
})
export class ListViewComponent extends GenericContainerComponent implements OnInit {

  ngOnInit() {
    super.ngOnInit();
  }
}
