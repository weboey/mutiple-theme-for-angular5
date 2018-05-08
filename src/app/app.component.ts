import { Component, NgZone} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  appSkin: any;
  constructor(private _ngZone: NgZone) {
    this.appSkin = {
      themes: process.env.themes,
      currentLink: null
    };
    console.log('app component----->>>>>>');
    console.log(this.appSkin);
  }

  changeThemes(theme: any) {
    this.runTimeoutOutsideZone(this.createThemeLink.bind(this, theme));
  }

  createThemeLink(theme: any) {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = `./theme-${theme}.css`;
    link.dataset.theme = theme;
    document.head.appendChild(link);
    link.onload = () => {
      console.error('link.onload');
      this.removeTheme();
      this.setActiveTheme(link);
    };
  }

  setActiveTheme(link: any) {
    this.appSkin.currentLink = link;
  }

  removeTheme = () => {
    if (this.appSkin.currentLink) {
      this.appSkin.currentLink.parentNode.removeChild(this.appSkin.currentLink);
    }
  }

  resetTheme() {
    this.removeTheme();
    this.setActiveTheme(null);
  }
  private runTimeoutOutsideZone(fn: Function, delay = 0) {
    this._ngZone.runOutsideAngular(() => setTimeout(fn, delay));
  }
}
