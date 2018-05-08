import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { DemoAComponent} from './component/a-component';
import { DemoBComponent} from './component/b-component';


@NgModule({
  declarations: [
    AppComponent, DemoAComponent, DemoBComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
