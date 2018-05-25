import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-demo-a',
  template: `
    <p>愿在衣而为领，承华首之余芳；悲罗襟之宵离，怨秋夜之未央。
      <br/>愿在裳而为带，束窈窕之纤身；嗟温凉之异气，或脱故而服新。</p>
  `
})

export class DemoAComponent implements OnInit {
  constructor() {
  }

  ngOnInit() {
  }
}
