import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { DefaultViewComponent } from './components/default-view/default-view.component';
import { TableViewComponent } from './components/table-view/table-view.component';
import { ListItemsViewComponent } from './components/list-items-view/list-items-view.component';
import { UrlSerializer, RouteReuseStrategy, ActivatedRoute, Router } from '@angular/router';
import { StandardUrlSerializer } from './router/custom-url-serializer';
import { CustomReuseStrategy } from './router/custom-reuse-strategy';

@NgModule({
  declarations: [
    AppComponent,
    DefaultViewComponent,
    TableViewComponent,
    ListItemsViewComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: CustomReuseStrategy },
    { provide: UrlSerializer, useClass: StandardUrlSerializer }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
