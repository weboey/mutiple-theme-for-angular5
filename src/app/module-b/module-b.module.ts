import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TestTwoComponent } from './test-two/test-two.component';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  // 默认路由
  {
    path: '',
    component: TestTwoComponent
  }
];

@NgModule({
  imports: [
    CommonModule, RouterModule.forChild(routes)
  ],
  declarations: [TestTwoComponent]
})
export class ModuleBModule { }
