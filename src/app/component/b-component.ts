import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-demo-b',
  template: `
    <button>采菊东篱下，喝碗菊花茶</button>
  `
  // styleUrls: ['b-component.scss'] // styles: [require('./b-component.scss')]
})

export class DemoBComponent implements OnInit {
  constructor() {
  }

  ngOnInit() {
  }
}
