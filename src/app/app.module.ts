import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { DemoAComponent} from './component/a-component';
import { DemoBComponent} from './component/b-component';
import {AppRouterModule} from './app.router.module';


@NgModule({
  declarations: [
    AppComponent, DemoAComponent, DemoBComponent
  ],
  imports: [
    BrowserModule, AppRouterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
