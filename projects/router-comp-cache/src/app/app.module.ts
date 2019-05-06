import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy, UrlSerializer } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { GenericContainerComponent } from './components/generic-container.component';
import { DefaultViewComponent } from './components/default-view/default-view.component';
import { ListViewComponent } from './components/list-view/list-view.component';
import { DetailViewComponent } from './components/detail-view/detail-view.component';

import { CustomReuseStrategy } from './router/custom-reuse-strategy';
import { CustomUrlSerializerService } from './router/custom-url-serializer.service';
import { RouterDynLinkTransformPipe } from './router/router-dyn-link-transform.pipe';

@NgModule({
  declarations: [
    AppComponent,
    GenericContainerComponent,
    DefaultViewComponent,
    ListViewComponent,
    DetailViewComponent,
    RouterDynLinkTransformPipe,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: CustomReuseStrategy },
    { provide: UrlSerializer, useClass: CustomUrlSerializerService },
    { provide: CustomUrlSerializerService, useExisting: UrlSerializer }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
