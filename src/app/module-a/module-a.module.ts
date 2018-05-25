import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TestOneComponent } from './test-one/test-one.component';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  // 默认路由
  {
    path: '',
    component: TestOneComponent
  }
];

@NgModule({
  imports: [
    CommonModule, RouterModule.forChild(routes)
  ],
  declarations: [TestOneComponent]
})
export class ModuleAModule { }
